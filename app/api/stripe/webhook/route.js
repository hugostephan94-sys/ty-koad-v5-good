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
    // ✅ CAS 1 : CAUTION (empreinte bancaire) — ne touche PAS Reservation
    // Détection: PaymentIntent + metadata.purpose === "security_deposit"
    // ============================================================
    if (
      obj?.object === "payment_intent" &&
      obj?.metadata?.purpose === "security_deposit"
    ) {
      const pi = obj;
      const reservationId = pi.metadata?.reservationId
        ? Number(pi.metadata.reservationId)
        : null;

      if (event.type === "payment_intent.amount_capturable_updated") {
        if (reservationId) {
          await prisma.depositHold.update({
            where: { reservationId },
            data: {
              status: "REQUIRES_CAPTURE",
              authorizedAt: new Date(),
              paymentIntentId: pi.id,
            },
          });
        }
      } else if (event.type === "payment_intent.succeeded") {
        if (reservationId) {
          await prisma.depositHold.update({
            where: { reservationId },
            data: {
              status: "CAPTURED",
              capturedAt: new Date(),
              paymentIntentId: pi.id,
            },
          });
        }
      } else if (event.type === "payment_intent.canceled") {
        if (reservationId) {
          await prisma.depositHold.update({
            where: { reservationId },
            data: {
              status: "CANCELED",
              canceledAt: new Date(),
              paymentIntentId: pi.id,
            },
          });
        }
      } else if (event.type === "payment_intent.payment_failed") {
        if (reservationId) {
          await prisma.depositHold.update({
            where: { reservationId },
            data: {
              status: "FAILED",
              paymentIntentId: pi.id,
            },
          });
        }
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
          status: "PAID",
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
