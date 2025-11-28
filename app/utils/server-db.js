// app/utils/server-db.js
// ➜ Version sans fichiers, compatible Vercel (read-only FS)

import prisma from "../../lib/db";

/* ------------------- RÉSERVATIONS (PRISMA) ------------------- */

/**
 * Retourne la liste des réservations, la plus récente en premier.
 * Utilisée par loadSiteReservations() (iCal) pour bloquer les dates.
 */
export async function listReservations() {
  const rows = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });

  // On renvoie un format proche de l'ancien JSON pour ne rien casser
  return rows.map((r) => ({
    id: r.id,
    chalet: r.chalet,
    ci: r.ci,
    co: r.co,
    firstname: r.firstname ?? "",
    email: r.email ?? "",
    adults: r.adults,
    children: r.children,
    status: r.status,
    createdAt: r.createdAt.toISOString(),
    paymentIntentId: r.paymentIntentId ?? undefined,
  }));
}

/**
 * Enregistre une nouvelle réservation dans la table Reservation.
 * @param {Object} resa
 *   - chalet: "C1" ou "C2"
 *   - ci / co: string ISO ou Date
 *   - firstname, email (optionnels)
 *   - adults, children
 *   - status (par défaut "confirmed")
 *   - paymentIntentId (optionnel, si tu veux le lier à Stripe)
 */
export async function saveReservation(resa) {
  const {
    chalet,
    ci,
    co,
    firstname,
    email,
    adults = 1,
    children = 0,
    status = "confirmed",
    paymentIntentId,
  } = resa;

  await prisma.reservation.create({
    data: {
      chalet,
      ci: ci instanceof Date ? ci : new Date(ci),
      co: co instanceof Date ? co : new Date(co),
      firstname: firstname || null,
      email: email || null,
      adults,
      children,
      status,
      ...(paymentIntentId ? { paymentIntentId } : {}),
    },
  });

  return { ok: true };
}

/**
 * Met à jour une réservation à partir du paymentIntentId Stripe (si tu l'utilises).
 * Tu peux l'appeler depuis un webhook Stripe par exemple.
 */
export async function upsertReservationByPI({ paymentIntentId, ...patch }) {
  if (!paymentIntentId) {
    return { ok: false, error: "paymentIntentId manquant" };
  }

  const data = {};

  if (patch.chalet) data.chalet = patch.chalet;
  if (patch.ci) data.ci = patch.ci instanceof Date ? patch.ci : new Date(patch.ci);
  if (patch.co) data.co = patch.co instanceof Date ? patch.co : new Date(patch.co);
  if (patch.firstname) data.firstname = patch.firstname;
  if (patch.email) data.email = patch.email;
  if (typeof patch.adults === "number") data.adults = patch.adults;
  if (typeof patch.children === "number") data.children = patch.children;
  if (patch.status) data.status = patch.status;

  await prisma.reservation.updateMany({
    where: { paymentIntentId },
    data,
  });

  return { ok: true };
}

/* ------------------- CONFIG (ICal, etc.) ------------------- */
/* 
   Anciennement en fichiers JSON.
   Ici, on fait juste un petit stockage en mémoire pour ne PAS écrire sur le disque.
   Si tu ne les utilises plus, ce n’est pas grave, ça ne cassera rien.
*/

let _config = { icalC1: "", icalC2: "" };

export async function getConfig() {
  return _config;
}

export async function setConfig(patch) {
  _config = { ..._config, ...patch };
  return _config;
}

/* ------------------- VOUCHERS (legacy) ------------------- */
/*
   Ces fonctions étaient basées sur vouchers.json.
   Comme tu utilises maintenant le modèle Gift avec Prisma,
   ces fonctions sont conservées en mémoire juste pour éviter les erreurs
   si quelque chose les appelle encore.
   (Mais elles ne persistent pas entre deux déploiements / lambdas.)
*/

let _vouchers = [];

export async function createVoucher(voucher) {
  if (_vouchers.some((v) => v.code === voucher.code)) {
    throw new Error("Code déjà existant");
  }
  const now = new Date().toISOString();
  const v = {
    ...voucher,
    createdAt: now,
    status: "active",
    redemptions: [],
  };
  _vouchers.unshift(v);
  return v;
}

export async function getVoucherByCode(code) {
  return _vouchers.find((v) => v.code === code) || null;
}

export async function getVoucherBySession(sessionId) {
  return _vouchers.find((v) => v.stripeSessionId === sessionId) || null;
}

export async function listVouchers() {
  return _vouchers;
}

export async function redeemVoucher(code, details) {
  const idx = _vouchers.findIndex((v) => v.code === code);
  if (idx < 0) throw new Error("Code invalide");
  if (_vouchers[idx].status !== "active") {
    throw new Error("Bon déjà utilisé / inactif");
  }
  _vouchers[idx].status = "used";
  _vouchers[idx].redemptions.push({
    at: new Date().toISOString(),
    ...details,
  });
  return _vouchers[idx];
}
