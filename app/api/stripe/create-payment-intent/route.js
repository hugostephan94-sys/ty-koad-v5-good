// app/api/stripe/create-payment-intent/route.js
import Stripe from "stripe";
import { upsertReservationByPI } from "../../../utils/server-db";

export async function POST(req) {
  try {
    const {
      amountCents,
      chalet,
      ci,
      co,
      nights,
      depositCents,
      giftCode,
      giftValueCents,

      // (optionnel si tu les ajoutes plus tard côté front)
      adults,
      children,
      firstname,
      email,
    } = await req.json();

    // Montant en centimes (min 0,50 €)
    const amount = Math.max(50, Number(amountCents || 0));

    if (!chalet || !ci || !co || !nights || !amount) {
      return new Response(
        JSON.stringify({ error: "Paramètres de réservation manquants." }),
        { status: 400 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    // 1) Créer le PaymentIntent Stripe
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        purpose: "booking_payment", // ✅ utile pour distinguer du dépôt si besoin
        chalet,
        ci,
        co,
        nights: String(nights || 0),
        depositCents: String(depositCents || 0),
        ...(giftCode
          ? { giftCode, giftValueCents: String(giftValueCents || 0) }
          : {}),
      },
    });

    // 2) Enregistrer / mettre à jour la réservation "pending" liée à ce PaymentIntent
    // ✅ On ne stocke en DB que ce qui existe dans ton model Reservation
    await upsertReservationByPI({
      paymentIntentId: intent.id,
      status: "pending", // passera à "paid" via webhook
      chalet,
      ci,
      co,
      firstname: firstname || undefined,
      email: email || undefined,
      adults: typeof adults === "number" ? adults : 1,
      children: typeof children === "number" ? children : 0,
    });

    // 3) Retourner le clientSecret au front
    return new Response(
      JSON.stringify({ clientSecret: intent.client_secret }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
    });
  }
}
