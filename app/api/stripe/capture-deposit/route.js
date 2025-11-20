import Stripe from "stripe";
import { NextResponse } from "next/server";
export async function POST(req){
  try{
    const { intentId, amount } = await req.json();
    if(!process.env.STRIPE_SECRET_KEY){ return NextResponse.json({ error:"STRIPE_SECRET_KEY manquant" }, { status:500 }); }
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion:"2024-06-20" });
    const args = amount ? { amount_to_capture: Math.floor(Number(amount)) } : {};
    const pi = await stripe.paymentIntents.capture(intentId, args);
    return NextResponse.json({ status: pi.status });
  } catch(e){ return NextResponse.json({ error:e.message }, { status:400 }); }
}
