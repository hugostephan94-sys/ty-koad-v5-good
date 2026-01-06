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
    // ============================================================
    const isDepositPI =
      obj?.object === "payment_intent" &&
      (obj?.metadata?.purpose === "security_deposit" ||
        obj?.metadata?.type === "deposit_hold" ||
        !!obj?.metadata?.depositHoldId);

    if (isDepositPI) {
      const pi = obj;

      const reservationIdRaw = pi.metadata?.reservationId;
      const depositHoldIdRaw = pi.metadata?.depositHoldId;

      const reservationId = reservationIdRaw ? Number(reservationIdRaw) : null;
      const depositHoldId = depositHoldIdRaw ? Number(depositHoldIdRaw) : null;

      const safeReservationId =
        Number.isFinite(reservationId) && reservationId > 0 ? reservationId : null;

      const safeDepositHoldId =
        Number.isFinite(depositHoldId) && depositHoldId > 0 ? depositHoldId : null;

      async function updateDepositHold(data) {
        // ✅ on force paymentIntentId partout
        const payload = { ...data, paymentIntentId: pi.id };

        if (safeDepositHoldId) {
          await prisma.depositHold.updateMany({
            where: { id: safeDepositHoldId },
            data: payload,
          });
          return;
        }

        if (safeReservationId) {
          await prisma.depositHold.updateMany({
            where: { reservationId: safeReservationId },
            data: payload,
          });
          return;
        }

        // fallback
        await prisma.depositHold.updateMany({
          where: { paymentIntentId: pi.id },
          data: payload,
        });
      }

      if (event.type === "payment_intent.amount_capturable_updated") {
        await updateDepositHold({
          status: "REQUIRES_CAPTURE",
          authorizedAt: new Date(),
        });
      } else if (event.type === "payment_intent.succeeded") {
        // arrive au moment de la CAPTURE (manual capture)
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
        await upsertReservationByPI({
          paymentIntentId: pi.id,
          status: "PAID",
        });

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
