// utils/server-db.js
import prisma from "../lib/db"; // adapte le chemin si ton db.js est ailleurs

/* ================== RÉSERVATIONS ================== */

export async function listReservations() {
  try {
    return await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("Erreur listReservations (Prisma)", e);
    // Très important : on ne plante pas l'API, on renvoie juste []
    return [];
  }
}

export async function saveReservation(resa) {
  const {
    chalet,
    ci,
    co,
    firstname = null,
    email = null,
    adults = 1,
    children = 0,
    status = "confirmed",
    paymentIntentId = null,
  } = resa || {};

  if (!chalet || !ci || !co) {
    throw new Error("Chalet, check-in et check-out sont obligatoires.");
  }

  return prisma.reservation.create({
    data: {
      chalet,
      ci: new Date(ci),
      co: new Date(co),
      firstname,
      email,
      adults,
      children,
      status,
      paymentIntentId,
    },
  });
}

// pour plus tard si tu veux mettre à jour via l’ID Stripe
export async function upsertReservationByPI({ paymentIntentId, ...patch }) {
  if (!paymentIntentId) {
    throw new Error("paymentIntentId requis");
  }

  const data = {};
  if (patch.status !== undefined) data.status = patch.status;
  if (patch.ci) data.ci = new Date(patch.ci);
  if (patch.co) data.co = new Date(patch.co);
  if (patch.firstname !== undefined) data.firstname = patch.firstname;
  if (patch.email !== undefined) data.email = patch.email;
  if (patch.adults !== undefined) data.adults = patch.adults;
  if (patch.children !== undefined) data.children = patch.children;

  await prisma.reservation.update({
    where: { paymentIntentId },
    data,
  });

  return { ok: true };
}

/* ================== CHÈQUES CADEAUX (Gift) ================== */

export async function createGift(data) {
  return prisma.gift.create({ data });
}

export async function getGiftByCode(code) {
  return prisma.gift.findUnique({ where: { code } });
}

export async function markGiftUsed(code) {
  return prisma.gift.update({
    where: { code },
    data: { usedAt: new Date() },
  });
}
