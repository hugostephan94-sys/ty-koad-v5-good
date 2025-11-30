// app/api/gift/redeem/route.js
import prisma from "../../../../lib/db";

// 💶 Mini grille tarifaire côté serveur (en centimes)
const PRICES = {
  C1: { base: 7000 },                    // 70,00 €/nuit
  C2: { week: 11000, weekend: 13000 },   // C2 : 110 € (dim–jeu), 130 € (ven–sam)
};

// Petite util si besoin un jour
function iso(d) {
  return new Date(d).toISOString().slice(0, 10);
}

// 🔢 Nombre de nuits entre 2 dates (ci/co)
function nightsBetween(ci, co) {
  if (!ci || !co) return 0;
  const d1 = new Date(ci),
    d2 = new Date(co);
  d1.setHours(12, 0, 0, 0);
  d2.setHours(12, 0, 0, 0);
  return Math.max(0, Math.round((d2 - d1) / 86400000));
}

// Générateur de jours successifs à partir du check-in
function* days(ci, n) {
  const d = new Date(ci);
  for (let i = 0; i < n; i++) {
    const dd = new Date(d);
    dd.setDate(d.getDate() + i);
    yield dd;
  }
}

// Est-ce qu'il y a au moins une nuit de semaine (dim–jeu) ?
function hasWeekNight(ci, n) {
  for (const d of days(ci, n)) {
    const wd = d.getDay(); // 0=dim, 1=lun... 4=jeu
    if (wd >= 0 && wd <= 4) return true;
  }
  return false;
}

// Est-ce qu'il y a au moins une nuit de week-end (ven/sam) ?
function hasWeekendNight(ci, n) {
  for (const d of days(ci, n)) {
    const wd = d.getDay(); // 5=ven, 6=sam
    if (wd === 5 || wd === 6) return true;
  }
  return false;
}

// 💰 Calcul du prix de la réservation en centimes
function computeTotalCents(chalet, ci, co) {
  const n = nightsBetween(ci, co);
  if (n === 0) return 0;

  if (chalet === "C1") {
    // Tarif fixe par nuit
    return PRICES.C1.base * n;
  } else {
    // C2 : tarif selon jour de la semaine
    let total = 0;
    for (const d of days(ci, n)) {
      const wd = d.getDay();
      const isWeekend = wd === 5 || wd === 6;
      total += isWeekend ? PRICES.C2.weekend : PRICES.C2.week;
    }
    return total;
  }
}

export async function POST(req) {
  try {
    const { code, chalet, checkIn, checkOut } = await req.json();

    if (!code || !chalet || !checkIn || !checkOut) {
      return new Response(
        JSON.stringify({ error: "Paramètres manquants" }),
        { status: 400 }
      );
    }

    // 🔍 1) On récupère le Gift dans la base
    const gift = await prisma.gift.findUnique({ where: { code } });

    if (!gift) {
      return new Response(
        JSON.stringify({ error: "Code introuvable" }),
        { status: 404 }
      );
    }

    if (gift.usedAt) {
      return new Response(
        JSON.stringify({ error: "Ce code a déjà été utilisé" }),
        { status: 400 }
      );
    }

    if (gift.chalet !== chalet) {
      return new Response(
        JSON.stringify({ error: "Code non valable pour ce chalet" }),
        { status: 400 }
      );
    }

    if (gift.expiresAt && new Date(gift.expiresAt) < new Date()) {
      return new Response(
        JSON.stringify({ error: "Code expiré" }),
        { status: 400 }
      );
    }

    // 🔢 2) Vérif des dates
    const n = nightsBetween(checkIn, checkOut);
    if (n === 0) {
      return new Response(
        JSON.stringify({ error: "Sélectionne tes dates" }),
        { status: 400 }
      );
    }

    // ✅ 3) Règles de validité selon le type de bon
    const plan = gift.planKey;

    // C2 semaine uniquement (au moins une nuit dim–jeu)
    if (plan === "c2_week" && !hasWeekNight(checkIn, n)) {
      return new Response(
        JSON.stringify({
          error:
            "Ce bon est valable sur une nuit en semaine (du dimanche au jeudi).",
        }),
        { status: 400 }
      );
    }

    // C2 week-end uniquement (au moins une nuit ven/sam)
    if (plan === "c2_weekend" && !hasWeekendNight(checkIn, n)) {
      return new Response(
        JSON.stringify({
          error:
            "Ce bon est valable sur une nuit de week-end (vendredi ou samedi).",
        }),
        { status: 400 }
      );
    }

    // C1 : packs 2, 3, 4 nuits…
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

    // 💶 4) Calcul du montant appliqué
    const bookingCents = computeTotalCents(chalet, checkIn, checkOut);
    const valueCents = Math.min(bookingCents, gift.amountCents);

    // On ne marque PAS encore usedAt ici (ce sera fait au moment du paiement)
    return new Response(
      JSON.stringify({
        ok: true,
        valueCents,
        bookingCents,
        remainingCents: Math.max(0, gift.amountCents - valueCents),
        message: `Bon appliqué (− ${(valueCents / 100).toLocaleString(
          "fr-FR",
          { style: "currency", currency: "EUR" }
        )})`,
      }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: e.message }),
      { status: 500 }
    );
  }
}
