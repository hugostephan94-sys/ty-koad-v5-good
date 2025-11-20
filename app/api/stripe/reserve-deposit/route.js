import Stripe from "stripe";
import { NextResponse } from "next/server";
export async function POST(req){
  try{
    const { amount, currency="eur", customerId, paymentMethodId } = await req.json();
    if(!process.env.STRIPE_SECRET_KEY){ return NextResponse.json({ error:"STRIPE_SECRET_KEY manquant" }, { status:500 }); }
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion:"2024-06-20" });
    const pi=await stripe.paymentIntents.create({
      amount: Math.max(50, Math.floor(Number(amount||0))),
      currency, customer: customerId,
      payment_method: paymentMethodId,
      capture_method: "manual",
      confirm: true, off_session: true
    });
    return NextResponse.json({ intentId: pi.id, status: pi.status });
  } catch(e){ return NextResponse.json({ error:e.message }, { status:400 }); }
}
