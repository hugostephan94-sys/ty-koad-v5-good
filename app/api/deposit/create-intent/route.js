// app/api/deposit/create-intent/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import Stripe from "stripe";
import prisma from "../../../../lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

function tokenToHash(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function POST(req) {
  try {
    const { token } = await req.json().catch(() => ({}));
    const cleanToken = String(token || "").trim();
    if (!cleanToken) {
      return NextResponse.json({ error: "Token manquant." }, { status: 400 });
    }

    const tokenHash = tokenToHash(cleanToken);
    const now = new Date();

    const hold = await prisma.depositHold.findUnique({
      where: { tokenHash },
      include: { reservation: true },
    });

    if (!hold || !hold.reservation) {
      return NextResponse.json(
        { error: "Lien de caution invalide." },
        { status: 404 }
      );
    }

    if (hold.tokenExpiresAt <= now) {
      return NextResponse.json(
        { error: "Lien de caution expiré." },
        { status: 410 }
      );
    }

    // Si déjà fait / annulé => pas de nouveau PI
    if (
      hold.status === "REQUIRES_CAPTURE" ||
      hold.status === "CAPTURED" ||
      hold.status === "CANCELED"
    ) {
      return NextResponse.json({
        alreadyDone: true,
        status: hold.status,
        amountCents: hold.amountCents,
        chalet: hold.reservation.chalet,
      });
    }

    // Si PI déjà créé, renvoyer le client_secret
    if (hold.paymentIntentId) {
      const pi = await stripe.paymentIntents.retrieve(hold.paymentIntentId);

      // Si l’empreinte a déjà été validée côté Stripe
      if (pi.status === "requires_capture") {
        await prisma.depositHold.update({
          where: { id: hold.id },
          data: {
            status: "REQUIRES_CAPTURE",
            authorizedAt: hold.authorizedAt ?? new Date(),
          },
        });

        return NextResponse.json({
          alreadyDone: true,
          status: "REQUIRES_CAPTURE",
          amountCents: hold.amountCents,
          chalet: hold.reservation.chalet,
        });
      }

      // Si jamais capturé (rare ici, mais on gère proprement)
      if (pi.status === "succeeded") {
        await prisma.depositHold.update({
          where: { id: hold.id },
          data: {
            status: "CAPTURED",
            capturedAt: hold.capturedAt ?? new Date(),
          },
        });

        return NextResponse.json({
          alreadyDone: true,
          status: "CAPTURED",
          amountCents: hold.amountCents,
          chalet: hold.reservation.chalet,
        });
      }

      if (!pi.client_secret) {
        return NextResponse.json(
          { error: "Empreinte existante introuvable." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        clientSecret: pi.client_secret,
        amountCents: hold.amountCents,
        chalet: hold.reservation.chalet,
      });
    }

    const amountCents = Number(hold.amountCents || 0);
    if (!amountCents || amountCents < 100) {
      return NextResponse.json(
        { error: "Montant de caution invalide." },
        { status: 400 }
      );
    }

    // Création du PaymentIntent = empreinte bancaire (manual capture)
    const pi = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "eur",
      capture_method: "manual",
      payment_method_types: ["card"],
      description: `Caution - ${hold.reservation.chalet}`,
      metadata: {
        // ✅ important : pour que TON webhook match dans tous les cas
        purpose: "security_deposit",
        type: "deposit_hold",
        reservationId: String(hold.reservationId),
        depositHoldId: String(hold.id),
        chalet: String(hold.reservation.chalet || ""),
      },
    });

    await prisma.depositHold.update({
      where: { id: hold.id },
      data: {
        paymentIntentId: pi.id,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      clientSecret: pi.client_secret,
      amountCents,
      chalet: hold.reservation.chalet,
    });
  } catch (e) {
    console.error("deposit/create-intent error:", e);
    return new NextResponse(null, { status: 500 });
  }
}
