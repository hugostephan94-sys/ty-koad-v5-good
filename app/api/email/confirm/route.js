import { NextResponse } from "next/server";
export async function POST(req){
  try{
    const { to, subject, text } = await req.json();
    if(!to) return NextResponse.json({ ok: true });
    if(!process.env.RESEND_API_KEY){
      return NextResponse.json({ ok: true, note: "RESEND_API_KEY absente — email ignoré (démo)" });
    }
    const res = await fetch("https://api.resend.com/emails", {
      method:"POST",
      headers: { "Content-Type":"application/json", "Authorization": `Bearer ${process.env.RESEND_API_KEY}` },
      body: JSON.stringify({ from: process.env.RESEND_FROM || "Ty-Koad <onboarding@resend.dev>", to: [to], subject, text })
    });
    const data = await res.json();
    return NextResponse.json(data);
  }catch(e){
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
