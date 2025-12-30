// app/api/send-confirmation/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";
import { upsertReservationByPI } from "../../utils/server-db";

const resend = new Resend(process.env.RESEND_API_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

// adresse d’expéditeur avec ton domaine vérifié
const FROM = "Les Chalets Ty-Koad <reservation@chalets-tykoad.fr>";

function isFreePi(id) {
  return typeof id === "string" && id.startsWith("FREE_");
}

function isStripePi(id) {
  return typeof id === "string" && id.startsWith("pi_");
}

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
      // ❌ on ne fait plus confiance à "price"
      paymentIntentId,
    } = body;

    if (!email || !checkin || !checkout || !chalet) {
      return NextResponse.json(
        { error: "Données de réservation manquantes." },
        { status: 400 }
      );
    }

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "paymentIntentId manquant." },
        { status: 400 }
      );
    }

    // ✅ Montant caution selon chalet
    const depositAmount = String(chalet).toUpperCase() === "C2" ? 300 : 150;

    const chaletLabel =
      String(chalet).toUpperCase() === "C2"
        ? "Ty-Koad Duo — spa privatif"
        : "Ty-Koad — 2 chambres / 2 SDB";

    // ✅ Vérification paiement (FREE ou Stripe PI)
    let paidAmountEuros = 0;

    if (isFreePi(paymentIntentId)) {
      paidAmountEuros = 0;
    } else if (isStripePi(paymentIntentId)) {
      const pi = await stripe.paymentIntents.retrieve(paymentIntentId);

      // sécurité : on envoie la confirmation uniquement si paiement OK
      if (pi.status !== "succeeded") {
        return NextResponse.json(
          { error: `Paiement non confirmé (status=${pi.status}).` },
          { status: 400 }
        );
      }

      // montant réellement payé
      paidAmountEuros = (Number(pi.amount || 0) / 100);
    } else {
      return NextResponse.json(
        { error: "paymentIntentId invalide." },
        { status: 400 }
      );
    }

    // ✅ Mise à jour DB via PI (FREE_... ou pi_...)
    await upsertReservationByPI({
      paymentIntentId,
      status: "paid", // ton cron caution prend paid/confirmed
      email,
      firstname,
      ci: checkin,
      co: checkout,
      chalet,
      adults: undefined,
      children: undefined,
    });

    const paidText = `${paidAmountEuros.toFixed(2)} €`;

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
        `• Séjour : du ${checkin} au ${checkout} (${nights} nuit${Number(nights) > 1 ? "s" : ""})`,
        `• Montant réglé : ${paidText}`,
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
        `Séjour : du ${checkin} au ${checkout} (${nights} nuit${Number(nights) > 1 ? "s" : ""})`,
        `Montant payé : ${paidText}`,
        `Caution (empreinte) : ${depositAmount} €`,
        `PaymentIntent : ${paymentIntentId}`,
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
