// app/utils/server-db.js
import prisma from "../../lib/db";

// ⏳ Durée de blocage (PENDING) avant expiration
const HOLD_MINUTES = 20;

// petit helper pour sécuriser les dates
function toDateOrNull(value) {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;

  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return d;
}

// normalise les statuts (enum Prisma attend MAJUSCULE)
function normalizeStatus(status) {
  if (!status) return undefined;
  return String(status).trim().toUpperCase();
}

function computeExpiresAtForStatus(status) {
  const st = normalizeStatus(status);

  if (st === "PENDING") {
    return new Date(Date.now() + HOLD_MINUTES * 60 * 1000);
  }

  // Dès que c’est “terminé” (PAID/FAILED/CANCELED/CONFIRMED/EXPIRED...) => plus d’expiration
  return null;
}

/**
 * Liste toutes les réservations (DB Prisma)
 */
export async function listReservations() {
  const all = await prisma.reservation.findMany({
    orderBy: { ci: "desc" },
  });
  return all;
}

/**
 * ✅ Liste “occupé calendrier” (ignore PENDING expirées)
 * - Occupé: PAID/CONFIRMED
 * - + PENDING uniquement si expiresAt > maintenant
 */
export async function listReservationsForCalendar({ chalet } = {}) {
  const now = new Date();

  const where = {
    ...(chalet ? { chalet: String(chalet).toUpperCase() } : {}),
    OR: [
      { status: { in: ["PAID", "CONFIRMED"] } },
      { status: "PENDING", expiresAt: { gt: now } },
    ],
  };

  return prisma.reservation.findMany({
    where,
    orderBy: { ci: "asc" },
  });
}

/**
 * Sauvegarde une réservation dans la DB (sans Stripe PI)
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
    status = "CONFIRMED",
  } = resa || {};

  const ciDate = toDateOrNull(ci);
  const coDate = toDateOrNull(co);

  const st = normalizeStatus(status) || "CONFIRMED";

  // 🔴 dates invalides → on log et on sort sans planter
  if (!ciDate || !coDate) {
    console.warn("[saveReservation] ci/co invalides, réservation ignorée", {
      chalet,
      ci,
      co,
      status: st,
    });
    return null;
  }

  const created = await prisma.reservation.create({
    data: {
      chalet: String(chalet || "").toUpperCase(),
      ci: ciDate,
      co: coDate,
      firstname: firstname || null,
      email: email || null,
      adults: Number.isFinite(Number(adults)) ? Number(adults) : 1,
      children: Number.isFinite(Number(children)) ? Number(children) : 0,
      status: st,
      expiresAt: st === "PENDING" ? computeExpiresAtForStatus("PENDING") : null,
    },
  });

  return created;
}

/**
 * ✅ Upsert réservation via PaymentIntentId (Stripe)
 * Utilisé par :
 * - webhook Stripe (status PAID/FAILED/CANCELED)
 * - /api/send-confirmation (pour sauver email/prénom en DB)
 *
 * ⭐ IMPORTANT :
 * - Si status === "PENDING" => on met/rafraîchit expiresAt (hold)
 * - Sinon => expiresAt = null
 */
export async function upsertReservationByPI(payload) {
  const {
    paymentIntentId,
    status,
    chalet,
    ci,
    co,
    firstname,
    email,
    adults,
    children,
  } = payload || {};

  if (!paymentIntentId) {
    console.warn("[upsertReservationByPI] paymentIntentId manquant");
    return { ok: false, error: "paymentIntentId manquant" };
  }

  const ciDate = toDateOrNull(ci);
  const coDate = toDateOrNull(co);

  const st = status !== undefined ? normalizeStatus(status) : undefined;

  // expiresAt : seulement si on reçoit un status
  // - PENDING => now + HOLD
  // - autre   => null
  const expiresAt = st !== undefined ? computeExpiresAtForStatus(st) : undefined;

  // Patch propre (on n'écrase pas avec undefined)
  const data = {
    status: st || undefined,
    chalet: chalet ? String(chalet).toUpperCase() : undefined,
    firstname: firstname !== undefined ? (firstname || null) : undefined,
    email: email !== undefined ? (email || null) : undefined,
    adults: adults !== undefined ? (Number.isFinite(Number(adults)) ? Number(adults) : 1) : undefined,
    children:
      children !== undefined
        ? (Number.isFinite(Number(children)) ? Number(children) : 0)
        : undefined,
    ci: ciDate || undefined,
    co: coDate || undefined,
    expiresAt,
  };

  Object.keys(data).forEach((k) => data[k] === undefined && delete data[k]);

  try {
    const existing = await prisma.reservation.findUnique({
      where: { paymentIntentId },
    });

    if (existing) {
      const updated = await prisma.reservation.update({
        where: { paymentIntentId },
        data,
      });
      return { ok: true, action: "updated", reservation: updated };
    }

    // create : besoin de chalet/ci/co
    const chaletNorm = chalet ? String(chalet).toUpperCase() : "";

    if (!chaletNorm || !ciDate || !coDate) {
      console.warn(
        "[upsertReservationByPI] create impossible (chalet/ci/co manquants)",
        { paymentIntentId, chalet, ci, co }
      );
      return {
        ok: false,
        error: "create impossible (chalet/ci/co manquants)",
      };
    }

    const created = await prisma.reservation.create({
      data: {
        paymentIntentId,
        status: st || "CONFIRMED",
        chalet: chaletNorm,
        ci: ciDate,
        co: coDate,
        firstname: firstname || null,
        email: email || null,
        adults: Number.isFinite(Number(adults)) ? Number(adults) : 1,
        children: Number.isFinite(Number(children)) ? Number(children) : 0,
        expiresAt: st ? computeExpiresAtForStatus(st) : null,
      },
    });

    return { ok: true, action: "created", reservation: created };
  } catch (e) {
    console.error("[upsertReservationByPI] erreur", e);
    return { ok: false, error: e.message };
  }
}

/**
 * Config iCal : on lit juste les variables d’environnement
 */
export async function getConfig() {
  return {
    icalC1: process.env.C1_ICAL_BOOKING || "",
    icalC2: process.env.C2_ICAL_BOOKING || "",
  };
}

/**
 * setConfig ne persiste plus rien (Vercel est en read-only),
 * on renvoie juste l’objet fusionné pour que l’admin ne plante pas.
 */
export async function setConfig(patch) {
  const current = await getConfig();
  return { ...current, ...patch };
}
