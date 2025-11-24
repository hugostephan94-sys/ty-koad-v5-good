import Stripe from "stripe";
import { NextResponse } from "next/server";
import { upsertReservationByPI } from "../../../utils/server-db";

// Stripe a besoin du runtime Node, pas Edge
export const runtime = "nodejs";

// pour être sûr qu'il ne soit jamais mis en cache
export const dynamic = "force-dynamic";

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return new NextResponse("Missing stripe-signature header", { status: 400 });
  }

  const raw = await req.text();

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    const event = stripe.webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Log minimal pour debug (tu verras ça dans les logs Vercel)
    console.log("[stripe webhook] event type =", event.type);

    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object;

      // Mise à jour / création de la réservation
      await upsertReservationByPI({
        paymentIntentId: pi.id,
        status: "paid",
      });

      // 💡 ici plus tard : tu pourras aussi appeler une fonction
      // qui envoie l'e-mail de confirmation à partir de la réservation
      // ex: sendConfirmEmail(reservation);

    } else if (event.type === "payment_intent.payment_failed") {
      const pi = event.data.object;
      await upsertReservationByPI({
        paymentIntentId: pi.id,
        status: "failed",
      });
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("[stripe webhook] error", e);
    return new NextResponse(`Webhook Error: ${e.message}`, { status: 400 });
  }
}
