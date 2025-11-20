import Stripe from "stripe";

export async function POST(req){
  try{
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { amountCents, chalet, ci, co, nights, depositCents, giftCode, giftValueCents } = await req.json();

    let amt = Math.max(50, Number(amountCents||0)); // min 0,50 €
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amt),
      currency: "eur",
      automatic_payment_methods: { enabled:true },
      metadata: {
        chalet, ci, co, nights: String(nights||0),
        depositCents: String(depositCents||0),
        ...(giftCode ? { giftCode, giftValueCents: String(giftValueCents||0) } : {})
      }
    });
    return new Response(JSON.stringify({ clientSecret: intent.client_secret }), { status:200 });
  }catch(e){
    console.error(e);
    return new Response(JSON.stringify({ error:e.message }), { status:500 });
  }
}
