import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

async function ensureFile(){
  await fs.mkdir(DATA_DIR, { recursive: true });
  try { await fs.access(MESSAGES_FILE); }
  catch { await fs.writeFile(MESSAGES_FILE, "[]", "utf-8"); }
}

export async function POST(req){
  try{
    const body = await req.json();
    const { name="", email="", phone="", subject="Question générale", message="", website="" } = body || {};
    // honeypot
    if(website) return NextResponse.json({ ok:true }); // bot ignoré

    if(!name || !email || !message) {
      return NextResponse.json({ error:"Champs manquants." }, { status:400 });
    }
    if(message.length > 2000){
      return NextResponse.json({ error:"Message trop long (2000 caractères max)." }, { status:400 });
    }

    await ensureFile();
    const now = new Date().toISOString();
    const stored = { id: `${Date.now()}`, name, email, phone, subject, message, createdAt: now };
    const list = JSON.parse(await fs.readFile(MESSAGES_FILE, "utf-8") || "[]");
    list.unshift(stored);
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(list, null, 2), "utf-8");

    // Envoi e-mail (optionnel) via Resend si variables présentes
    if(process.env.RESEND_API_KEY && process.env.RESEND_TO && process.env.RESEND_FROM){
      const text = [
        `Nouveau message Ty-Koad`,
        `Date: ${now}`,
        `Nom: ${name}`,
        `Email: ${email}`,
        phone ? `Téléphone: ${phone}` : null,
        `Sujet: ${subject}`,
        ``,
        message,
      ].filter(Boolean).join("\n");

      try{
        await fetch("https://api.resend.com/emails", {
          method:"POST",
          headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${process.env.RESEND_API_KEY}` },
          body: JSON.stringify({
            from: process.env.RESEND_FROM,     // ex: 'Ty-Koad <onboarding@resend.dev>'
            to: [process.env.RESEND_TO],       // ex: 'toi@tondomaine.fr'
            reply_to: [email],
            subject: `Contact site — ${subject}`,
            text
          })
        });
      }catch(_e){ /* on ignore les erreurs d’envoi mail pour ne pas bloquer l’utilisateur */ }
    }

    return NextResponse.json({ ok:true });
  }catch(e){
    return NextResponse.json({ error: e.message }, { status:500 });
  }
}
