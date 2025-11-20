import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createVoucher, getVoucherBySession } from "../../../utils/server-db";

function randomCode(len=8){
  const s="ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sans O/0 confus
  let out=""; for(let i=0;i<len;i++) out += s[Math.floor(Math.random()*s.length)];
  return out;
}

export async function GET(req){
  try{
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");
    if(!session_id) return NextResponse.json({ error:"session_id manquant" },{ status:400 });
    if(!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error:"STRIPE_SECRET_KEY manquant" },{ status:500 });

    // déjà créé ?
    const existing = await getVoucherBySession(session_id);
    if(existing) return NextResponse.json({ voucher: existing });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion:"2024-06-20" });
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if(session.payment_status !== "paid") return NextResponse.json({ error:"Paiement non confirmé" },{ status:400 });

    const m = session.metadata || {};
    const gift = {
      chalet: m.chalet || "C2",
      amountEUR: Number(m.amount||0),
      extras: JSON.parse(m.extras||"[]"),
      fromName: m.fromName || "",
      buyerEmail: m.buyerEmail || "",
      toName: m.toName || "",
      toEmail: m.toEmail || "",
      message: m.message || "",
      stripeSessionId: session.id,
      code: randomCode(10)
    };
    await createVoucher(gift);

    // email via Resend (facultatif)
    if(process.env.RESEND_API_KEY && gift.buyerEmail){
      const pdfUrl = `${(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000")}/api/gift/pdf/${gift.code}`;
      try{
        await fetch("https://api.resend.com/emails", {
          method:"POST",
          headers:{ "Content-Type":"application/json", "Authorization": `Bearer ${process.env.RESEND_API_KEY}` },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || "Ty-Koad <onboarding@resend.dev>",
            to: gift.toEmail ? [gift.buyerEmail, gift.toEmail] : [gift.buyerEmail],
            subject: "Votre chèque cadeau — Les Chalets Ty-Koad",
            text: `Merci ! Code: ${gift.code}\nMontant: ${gift.amountEUR}€\nChalet: ${gift.chalet}\nPDF: ${pdfUrl}`
          })
        });
      }catch(_e){}
    }

    return NextResponse.json({ voucher: gift });
  }catch(e){
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
