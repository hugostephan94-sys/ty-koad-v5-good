import { NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";
import prisma from "../../../../lib/db";

export async function POST(req) {
  try {
    const { token } = await req.json();
    if (!token) return NextResponse.json({ error: "token manquant" }, { status: 400 });

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const hold = await prisma.depositHold.findUnique({
      where: { tokenHash },
      include: { reservation: true },
    });

    if (!hold) return NextResponse.json({ error: "Lien invalide" }, { status: 404 });
    if (new Date(hold.tokenExpiresAt) < new Date())
      return NextResponse.json({ error: "Lien expiré" }, { status: 410 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Déjà créé ? on renvoie le client_secret existant
    if (hold.paymentIntentId) {
      const pi = await stripe.paymentIntents.retrieve(hold.paymentIntentId);
      return NextResponse.json({ clientSecret: pi.client_secret });
    }

    const pi = await stripe.paymentIntents.create({
      amount: hold.amountCents,
      currency: "eur",
      capture_method: "manual",
      automatic_payment_methods: { enabled: true },
      metadata: {
        purpose: "security_deposit",
        reservationId: String(hold.reservationId),
        chalet: hold.reservation.chalet,
      },
      description: `Caution (empreinte) - réservation #${hold.reservationId}`,
    });

    await prisma.depositHold.update({
      where: { id: hold.id },
      data: { paymentIntentId: pi.id },
    });

    return NextResponse.json({ clientSecret: pi.client_secret });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
