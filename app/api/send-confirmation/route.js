// app/api/send-confirmation/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// adresse d’expéditeur avec ton domaine vérifié
const FROM = "Les Chalets Ty-Koad <reservation@chalets-tykoad.fr>";

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
      from: FROM,
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
        "🐣 En option pour votre séjour :",
        "- Petit déjeuner livré au chalet :",
        "  https://tally.so/r/npjkGB",
        "- Plateaux gourmands pour 2 personnes :",
        "  https://tally.so/r/w4WDWk",
        "",
        "Vous pouvez réserver ces options dès maintenant via les liens ci-dessus.",
        "",
        "Nous vous contacterons rapidement avec toutes les infos pratiques (arrivée, spa, accès au chalet…).",
        "",
        "À très bientôt à Laz !",
        "Hugo & Nina – Les Chalets Ty-Koad",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // 2) Copie pour toi
    await resend.emails.send({
      from: FROM,
      to: "hugo@chalets-tykoad.fr", // ou ton Gmail si tu préfères
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
        "",
        "Liens options (petits déjeuners / plateaux) envoyés au client :",
        "Petit déjeuner : https://tally.so/r/npjkGB",
        "Plateaux : https://tally.so/r/w4WDWk",
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
