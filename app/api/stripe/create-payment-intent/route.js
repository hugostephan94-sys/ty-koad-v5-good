// app/api/stripe/create-payment-intent/route.js
import Stripe from "stripe";
import crypto from "crypto";
import prisma from "../../../../lib/db";
import { upsertReservationByPI } from "../../../utils/server-db";
import { CHALETS, computeTotal, nightsBetween } from "../../../../lib/chalets";
import { getAutoDiscount } from "../../../../lib/autoDiscount";

// Générateur de jours successifs à partir du check-in
function* days(ci, n) {
  const d = new Date(ci);
  for (let i = 0; i < n; i++) {
    const dd = new Date(d);
    dd.setDate(d.getDate() + i);
    yield dd;
  }
}

function hasWeekNight(ci, n) {
  for (const d of days(ci, n)) {
    const wd = d.getDay(); // 0..4
    if (wd >= 0 && wd <= 4) return true;
  }
  return false;
}

function hasWeekendNight(ci, n) {
  for (const d of days(ci, n)) {
    const wd = d.getDay(); // 5,6
    if (wd === 5 || wd === 6) return true;
  }
  return false;
}

function freeKey({ chalet, ci, co, email, giftCode }) {
  const base = [
    "FREE",
    String(chalet || "").toUpperCase(),
    String(ci || ""),
    String(co || ""),
    String(email || "").trim().toLowerCase(),
    String(giftCode || "").trim().toUpperCase(),
  ].join("|");

  const h = crypto.createHash("sha256").update(base).digest("hex");
  return `FREE_${h.slice(0, 24)}`; // court + unique
}

// ✅ check overlap + statuts actifs (ENUM => valeurs en MAJUSCULE)
async function hasConflict({ chalet, ciDate, coDate }) {
  const now = new Date();

  const conflict = await prisma.reservation.findFirst({
    where: {
      chalet,
      ci: { lt: coDate },
      co: { gt: ciDate },
      OR: [
        { status: { in: ["PAID", "CONFIRMED"] } },
        { status: "PENDING", expiresAt: { gt: now } },
      ],
    },
    select: { id: true, status: true, expiresAt: true, ci: true, co: true },
  });

  return !!conflict;
}

export async function POST(req) {
  try {
    const {
      chalet,
      ci,
      co,
      adults,
      children,
      firstname,
      email,
      giftCode,
    } = await req.json();

    const ch = (chalet || "").trim().toUpperCase();
    if (!ch || !ci || !co) {
      return new Response(
        JSON.stringify({ error: "Paramètres de réservation manquants." }),
        { status: 400 }
      );
    }
    if (!CHALETS[ch]) {
      return new Response(JSON.stringify({ error: "Chalet invalide." }), {
        status: 400,
      });
    }

    const ciDate = new Date(ci);
    const coDate = new Date(co);
    if (isNaN(ciDate.getTime()) || isNaN(coDate.getTime())) {
      return new Response(JSON.stringify({ error: "Dates invalides." }), {
        status: 400,
      });
    }

    // ✅ Refus immédiat si dates déjà prises
    if (await hasConflict({ chalet: ch, ciDate, coDate })) {
      return new Response(JSON.stringify({ error: "Dates indisponibles." }), {
        status: 409,
      });
    }

    // ✅ nuits = vérité serveur
    const n = nightsBetween(ci, co);
    if (!n || n <= 0) {
      return new Response(JSON.stringify({ error: "Dates invalides." }), {
        status: 400,
      });
    }

    // ✅ prix de base serveur
    const base = computeTotal(CHALETS[ch], ci, co);
    const baseTotalCents = Math.round(Number(base.total || 0) * 100);
    if (!Number.isFinite(baseTotalCents) || baseTotalCents <= 0) {
      return new Response(
        JSON.stringify({ error: "Impossible de calculer le prix du séjour." }),
        { status: 400 }
      );
    }

    // ✅ remise auto serveur
    const auto = getAutoDiscount({
      chaletId: ch,
      nights: n,
      baseTotalCents,
    });
    const afterAutoCents = Math.max(
      0,
      baseTotalCents - (auto.amountCents || 0)
    );

    // ✅ cadeau serveur (revalidation DB)
    let giftCents = 0;
    let normalizedGiftCode = "";

    if (giftCode && String(giftCode).trim()) {
      normalizedGiftCode = String(giftCode).trim().toUpperCase();

      const giftRecord = await prisma.gift.findUnique({
        where: { code: normalizedGiftCode },
      });

      if (!giftRecord) {
        return new Response(
          JSON.stringify({ error: "Code cadeau introuvable." }),
          { status: 404 }
        );
      }
      if (giftRecord.usedAt) {
        return new Response(
          JSON.stringify({ error: "Ce code cadeau a déjà été utilisé." }),
          { status: 400 }
        );
      }
      if ((giftRecord.chalet || "").toUpperCase() !== ch) {
        return new Response(
          JSON.stringify({ error: "Code cadeau non valable pour ce chalet." }),
          { status: 400 }
        );
      }
      if (giftRecord.expiresAt && new Date(giftRecord.expiresAt) < new Date()) {
        return new Response(JSON.stringify({ error: "Code cadeau expiré." }), {
          status: 400,
        });
      }

      // règles planKey
      const plan = giftRecord.planKey;

      if (plan === "c2_week" && !hasWeekNight(ci, n)) {
        return new Response(
          JSON.stringify({
            error:
              "Ce bon est valable sur une nuit en semaine (du dimanche au jeudi).",
          }),
          { status: 400 }
        );
      }
      if (plan === "c2_weekend" && !hasWeekendNight(ci, n)) {
        return new Response(
          JSON.stringify({
            error:
              "Ce bon est valable sur une nuit de week-end (vendredi ou samedi).",
          }),
          { status: 400 }
        );
      }
      if (plan && plan.startsWith("c1_")) {
        const need = Number(plan.split("_")[1].replace("n", ""));
        if (Number.isFinite(need) && n < need) {
          return new Response(
            JSON.stringify({
              error: `Ce bon requiert au moins ${need} nuit${
                need > 1 ? "s" : ""
              }.`,
            }),
            { status: 400 }
          );
        }
      }

      giftCents = Math.min(afterAutoCents, Number(giftRecord.amountCents || 0));
    }

    const finalAmountCents = Math.max(0, afterAutoCents - giftCents);

    const breakdown = {
      baseTotalCents,
      autoDiscountCents: auto.amountCents || 0,
      autoDiscountLabel: auto.label || "",
      giftCents,
      finalAmountCents,
    };

    // ✅ CAS GRATUIT : 0€ -> pas de Stripe, mais réservation + consume gift
    if (finalAmountCents === 0) {
      // re-check conflit (au cas où entre temps)
      if (await hasConflict({ chalet: ch, ciDate, coDate })) {
        return new Response(JSON.stringify({ error: "Dates indisponibles." }), {
          status: 409,
        });
      }

      const piFree = freeKey({
        chalet: ch,
        ci,
        co,
        email,
        giftCode: normalizedGiftCode,
      });

      // idempotent : si déjà créé, on renvoie pareil
      const existing = await prisma.reservation.findUnique({
        where: { paymentIntentId: piFree },
      });

      if (!existing) {
        await prisma.$transaction(async (tx) => {
          // consommer le gift (si présent)
          if (normalizedGiftCode) {
            const g = await tx.gift.findUnique({
              where: { code: normalizedGiftCode },
            });
            if (!g) throw new Error("Code cadeau introuvable.");
            if (g.usedAt) throw new Error("Ce code cadeau a déjà été utilisé.");

            await tx.gift.update({
              where: { code: normalizedGiftCode },
              data: { usedAt: new Date() },
            });
          }

          await tx.reservation.create({
            data: {
              paymentIntentId: piFree,
              status: "PAID",
              chalet: ch,
              ci: new Date(ci),
              co: new Date(co),
              firstname: firstname || null,
              email: (email || "").trim() || null,
              adults: Number.isFinite(Number(adults)) ? Number(adults) : 1,
              children: Number.isFinite(Number(children)) ? Number(children) : 0,
              expiresAt: null,
            },
          });
        });
      }

      return new Response(
        JSON.stringify({
          free: true,
          paymentIntentId: piFree,
          amountCents: 0,
          breakdown,
        }),
        { status: 200 }
      );
    }

    // ✅ Sinon : paiement Stripe normal (montant doit être >= 0,50€)
    if (finalAmountCents < 50) {
      return new Response(
        JSON.stringify({ error: "Montant trop faible pour un paiement Stripe." }),
        { status: 400 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });

    const intent = await stripe.paymentIntents.create({
      amount: finalAmountCents,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        purpose: "booking_payment",
        chalet: ch,
        ci,
        co,
        nights: String(n),
        baseTotalCents: String(baseTotalCents),
        autoDiscountCents: String(auto.amountCents || 0),
        autoDiscountLabel: auto.label || "",
        giftCode: normalizedGiftCode || "",
        giftCents: String(giftCents),
        finalAmountCents: String(finalAmountCents),
      },
    });

    // ✅ réservation PENDING liée au PI (expiresAt géré dans upsert)
    await upsertReservationByPI({
      paymentIntentId: intent.id,
      status: "PENDING",
      chalet: ch,
      ci,
      co,
      firstname: firstname || undefined,
      email: (email || "").trim() || undefined,
      adults: Number.isFinite(Number(adults)) ? Number(adults) : 1,
      children: Number.isFinite(Number(children)) ? Number(children) : 0,
    });

    return new Response(
      JSON.stringify({
        clientSecret: intent.client_secret,
        amountCents: finalAmountCents,
        breakdown,
      }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
