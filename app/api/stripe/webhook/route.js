import Stripe from "stripe";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";
import { upsertReservationByPI } from "../../../utils/server-db";

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();

  try {
    if (!sig) {
      return new NextResponse("Missing stripe-signature header", { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    const event = stripe.webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    const obj = event.data?.object;

    // ============================================================
    // ✅ CAS 1 : CAUTION (empreinte bancaire)
    // Détection robuste via metadata:
    // - purpose === "security_deposit" (ton ancien)
    // - type === "deposit_hold" (mon recommandé)
    // - depositHoldId présent
    // ============================================================
    const isDepositPI =
      obj?.object === "payment_intent" &&
      (obj?.metadata?.purpose === "security_deposit" ||
        obj?.metadata?.type === "deposit_hold" ||
        !!obj?.metadata?.depositHoldId);

    if (isDepositPI) {
      const pi = obj;

      const reservationId = pi.metadata?.reservationId
        ? Number(pi.metadata.reservationId)
        : null;

      const depositHoldId = pi.metadata?.depositHoldId
        ? Number(pi.metadata.depositHoldId)
        : null;

      // Petite helper pour update sans casser si pas trouvé
      async function updateDepositHold(data) {
        if (depositHoldId) {
          await prisma.depositHold.updateMany({
            where: { id: depositHoldId },
            data: { ...data, paymentIntentId: pi.id },
          });
          return;
        }

        if (reservationId) {
          await prisma.depositHold.updateMany({
            where: { reservationId },
            data: { ...data, paymentIntentId: pi.id },
          });
          return;
        }

        // fallback: si jamais tu veux rattacher via paymentIntentId
        await prisma.depositHold.updateMany({
          where: { paymentIntentId: pi.id },
          data,
        });
      }

      if (event.type === "payment_intent.amount_capturable_updated") {
        await updateDepositHold({
          status: "REQUIRES_CAPTURE",
          authorizedAt: new Date(),
        });
      }

      // ⚠️ Avec capture_method="manual", "succeeded" arrive au moment de la CAPTURE,
      // pas à l'autorisation. Donc ça servira si tu captures plus tard.
      else if (event.type === "payment_intent.succeeded") {
        await updateDepositHold({
          status: "CAPTURED",
          capturedAt: new Date(),
        });
      } else if (event.type === "payment_intent.canceled") {
        await updateDepositHold({
          status: "CANCELED",
          canceledAt: new Date(),
        });
      } else if (event.type === "payment_intent.payment_failed") {
        await updateDepositHold({
          status: "FAILED",
        });
      }

      return NextResponse.json({ received: true, kind: "deposit" });
    }

    // ============================================================
    // ✅ CAS 2 : PAIEMENT RÉSERVATION
    // ============================================================
    if (obj?.object === "payment_intent") {
      const pi = obj;

      if (event.type === "payment_intent.succeeded") {
        // 1) Marquer la réservation payée
        await upsertReservationByPI({
          paymentIntentId: pi.id,
          status: "PAID", // ✅ correspond à ton enum ReservationStatus
        });

        // 2) ✅ Consommer le gift côté serveur (idempotent)
        const giftCode = (pi.metadata?.giftCode || "").trim().toUpperCase();
        const giftCents = Number(pi.metadata?.giftCents || 0);

        if (giftCode && giftCents > 0) {
          await prisma.gift.updateMany({
            where: { code: giftCode, usedAt: null },
            data: { usedAt: new Date() },
          });
        }
      } else if (event.type === "payment_intent.payment_failed") {
        await upsertReservationByPI({
          paymentIntentId: pi.id,
          status: "FAILED",
        });
      } else if (event.type === "payment_intent.canceled") {
        await upsertReservationByPI({
          paymentIntentId: pi.id,
          status: "CANCELED",
        });
      }

      return NextResponse.json({ received: true, kind: "booking" });
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    return new NextResponse(`Webhook Error: ${e.message}`, { status: 400 });
  }
}
