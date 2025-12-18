// app/api/send-confirmation/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { upsertReservationByPI } from "../../utils/server-db";

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

      // ✅ ID PaymentIntent de réservation
      paymentIntentId,
    } = body;

    if (!email || !checkin || !checkout || !chalet) {
      return NextResponse.json(
        { error: "Données de réservation manquantes." },
        { status: 400 }
      );
    }

    // ✅ Montant caution selon chalet
    const depositAmount = String(chalet).toUpperCase() === "C2" ? 300 : 150;

    const chaletLabel =
      String(chalet).toUpperCase() === "C2"
        ? "Ty-Koad Duo — spa privatif"
        : "Ty-Koad — 2 chambres / 2 SDB";

    // ✅ Mise à jour DB (email/prénom/dates) via PI
    if (paymentIntentId) {
      await upsertReservationByPI({
        paymentIntentId,
        status: "paid",
        email,
        firstname,
        ci: checkin,
        co: checkout,
        chalet,
        nights,
      });
    } else {
      console.warn(
        "[send-confirmation] paymentIntentId manquant, DB non mise à jour"
      );
    }

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
        "🔒 Caution (empreinte bancaire)",
        `• Montant : ${depositAmount} € (aucun débit immédiat)`,
        "• Vous recevrez automatiquement un lien par e-mail 24h avant votre arrivée pour valider la caution.",
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
      to: "hugo@chalets-tykoad.fr",
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
        `Caution (empreinte) : ${depositAmount} €`,
        paymentIntentId ? `PaymentIntent : ${paymentIntentId}` : "",
        "",
        "Liens options envoyés au client :",
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
