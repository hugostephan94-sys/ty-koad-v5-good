import Stripe from "stripe";
import { NextResponse } from "next/server";
import { upsertReservationByPI } from "../../../utils/server-db";
export async function POST(req){
  const sig = req.headers.get('stripe-signature');
  const raw = await req.text();
  try{
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
    const event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET);
    if(event.type === "payment_intent.succeeded"){
      const pi = event.data.object;
      await upsertReservationByPI({ paymentIntentId: pi.id, status: "paid" });
    } else if(event.type === "payment_intent.payment_failed"){
      const pi = event.data.object;
      await upsertReservationByPI({ paymentIntentId: pi.id, status: "failed" });
    }
    return NextResponse.json({ received: true });
  }catch(e){
    return new NextResponse(`Webhook Error: ${e.message}`, { status: 400 });
  }
}
