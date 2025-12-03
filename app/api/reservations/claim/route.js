import { NextResponse } from "next/server";
import Stripe from "stripe";
import { saveReservation } from "../../../utils/server-db";

export async function POST(req) {
  try {
    const { session_id } = await req.json();

    if (!session_id) {
      return NextResponse.json(
        { error: "session_id manquant" },
        { status: 400 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // On récupère la session de paiement
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "customer_details"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Paiement non confirmé" },
        { status: 400 }
      );
    }

    const md = session.metadata || {};

    // ⚠️ Ces champs doivent être mis dans metadata
    const chalet = (md.chalet || "").toUpperCase();
    const ci = md.ci; // date d’arrivée (string ISO)
    const co = md.co; // date de départ
    const firstname = md.firstname || md.name || "";
    const email =
      session.customer_details?.email || md.email || "";

    const adults = md.adults ? parseInt(md.adults, 10) : 2;
    const children = md.children ? parseInt(md.children, 10) : 0;

    if (!chalet || !ci || !co) {
      return NextResponse.json(
        { error: "Données de réservation manquantes (chalet / ci / co)" },
        { status: 400 }
      );
    }

    // On passe tout ça à saveReservation
    // (il ignorera les champs qu’il ne gère pas)
    await saveReservation({
      chalet,
      ci,
      co,
      firstname,
      email,
      adults,
      children,
      status: "confirmed",
      stripeSessionId: session.id,      // adapte si besoin
      amount: session.amount_total || 0 // si tu as une colonne pour le montant
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Erreur /api/reservations/claim :", e);
    return NextResponse.json(
      { error: "Erreur serveur lors de la validation de la réservation." },
      { status: 500 }
    );
  }
}
