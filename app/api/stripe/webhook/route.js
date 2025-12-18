import Stripe from "stripe";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";
import { upsertReservationByPI } from "../../../utils/server-db";

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const event = stripe.webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // ⚠️ Stripe object commun (PaymentIntent)
    const obj = event.data?.object;

    // ============================================================
    // ✅ CAS 1 : CAUTION (empreinte bancaire) — on ne touche PAS à Reservation
    // On détecte via metadata.purpose === "security_deposit"
    // ============================================================
    if (obj?.object === "payment_intent" && obj?.metadata?.purpose === "security_deposit") {
      const pi = obj;
      const reservationId = pi.metadata?.reservationId ? Number(pi.metadata.reservationId) : null;

      // Event envoyé quand l'empreinte est OK => montant capturable
      if (event.type === "payment_intent.amount_capturable_updated") {
        if (reservationId) {
          await prisma.depositHold.update({
            where: { reservationId },
            data: {
              status: "requires_capture",
              authorizedAt: new Date(),
              paymentIntentId: pi.id,
            },
          });
        }
      }

      // Si un jour tu captures (encaisse) => succeeded
      else if (event.type === "payment_intent.succeeded") {
        if (reservationId) {
          await prisma.depositHold.update({
            where: { reservationId },
            data: {
              status: "captured",
              capturedAt: new Date(),
              paymentIntentId: pi.id,
            },
          });
        }
      }

      else if (event.type === "payment_intent.canceled") {
        if (reservationId) {
          await prisma.depositHold.update({
            where: { reservationId },
            data: {
              status: "canceled",
              canceledAt: new Date(),
              paymentIntentId: pi.id,
            },
          });
        }
      }

      else if (event.type === "payment_intent.payment_failed") {
        if (reservationId) {
          await prisma.depositHold.update({
            where: { reservationId },
            data: {
              status: "failed",
              paymentIntentId: pi.id,
            },
          });
        }
      }

      return NextResponse.json({ received: true, kind: "deposit" });
    }

    // ============================================================
    // ✅ CAS 2 : PAIEMENT RÉSERVATION (ta logique actuelle)
    // ============================================================
    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object;
      await upsertReservationByPI({
        paymentIntentId: pi.id,
        status: "paid",
      });
    } else if (event.type === "payment_intent.payment_failed") {
      const pi = event.data.object;
      await upsertReservationByPI({
        paymentIntentId: pi.id,
        status: "failed",
      });
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    return new NextResponse(`Webhook Error: ${e.message}`, { status: 400 });
  }
}
