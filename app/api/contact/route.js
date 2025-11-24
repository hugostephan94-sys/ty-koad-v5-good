// app/api/contact/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// adresse où tu veux recevoir les messages du formulaire
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hugostephan94@gmail.com";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, website } = body || {};

    // honeypot anti-bot
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    const mailSubject =
      "📨 Contact Ty-Koad – " + (subject || "Nouveau message");

    const text = [
      `Nom : ${name}`,
      `Email : ${email}`,
      `Téléphone : ${phone || "-"}`,
      "",
      "Message :",
      message,
    ].join("\n");

    await resend.emails.send({
      from: "Les Chalets Ty-Koad <contact@ty-koad.fr>",
      to: [TO_EMAIL],
      reply_to: email,
      subject: mailSubject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Erreur /api/contact :", e);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message." },
      { status: 500 }
    );
  }
}
