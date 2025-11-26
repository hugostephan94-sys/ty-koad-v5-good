import Stripe from "stripe";
import { saveReservation } from "../../../utils/server-db";

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
      amount: Math.round(amount), // déjà en centimes
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
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

    // 2) Enregistrer une réservation "en attente" liée à ce PaymentIntent
    await saveReservation({
      paymentIntentId: intent.id,
      status: "pending",          // 🔹 passera à "paid" via le webhook
      chalet,
      checkIn: ci,
      checkOut: co,
      nights,
      amountCents: Math.round(amount),
      depositCents: Number(depositCents || 0),
      giftCode: giftCode || null,
      giftValueCents: giftValueCents || 0,
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
