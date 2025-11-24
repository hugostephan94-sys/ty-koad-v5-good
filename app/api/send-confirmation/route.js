// app/api/send-confirmation/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      email,
      firstname,
      checkin,
      checkout,
      chalet,
      nights,
      price,
    } = body;

    if (!email || !checkin || !checkout || !chalet) {
      return NextResponse.json(
        { error: "Données de réservation manquantes." },
        { status: 400 }
      );
    }

    const chaletLabel =
      chalet === "C2"
        ? "Ty-Koad Duo — spa privatif"
        : "Ty-Koad — 2 chambres / 2 SDB";

    // 1) Mail pour le client
    await resend.emails.send({
      from: "Les Chalets Ty-Koad <onboarding@resend.dev>",
      to: email,
      subject: "Confirmation de votre réservation – Les Chalets Ty-Koad",
      text: [
        firstname ? `Bonjour ${firstname},` : "Bonjour,",
        "",
        "Merci pour votre réservation aux Chalets Ty-Koad 💚",
        "",
        `• Chalet : ${chaletLabel}`,
        `• Séjour : du ${checkin} au ${checkout} (${nights} nuit${
          nights > 1 ? "s" : ""
        })`,
        price ? `• Montant réglé : ${price} €` : "",
        "",
        "Nous vous contacterons rapidement avec toutes les infos pratiques (arrivée, spa, options gourmandes…).",
        "",
        "À très bientôt à Laz !",
        "Hugo & Nina – Les Chalets Ty-Koad",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // 2) Copie pour toi
    await resend.emails.send({
      from: "Les Chalets Ty-Koad <onboarding@resend.dev>",
      to: "hugostephan94@gmail.com",
      subject: "✅ Nouvelle réservation confirmée – Ty-Koad",
      text: [
        "Nouvelle réservation confirmée via le site :",
        "",
        `Client : ${firstname || ""} (${email})`,
        `Chalet : ${chaletLabel}`,
        `Séjour : du ${checkin} au ${checkout} (${nights} nuit${
          nights > 1 ? "s" : ""
        })`,
        price ? `Montant payé : ${price} €` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Erreur /api/send-confirmation:", e);
    return NextResponse.json(
      { error: "Erreur à l’envoi des e-mails." },
      { status: 500 }
    );
  }
}
