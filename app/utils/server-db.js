// app/utils/server-db.js
import prisma from "../../lib/db";

// ⏳ Durée de blocage (pending) avant expiration
const HOLD_MINUTES = 20;

// petit helper pour sécuriser les dates
function toDateOrNull(value) {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;

  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return d;
}

function computeExpiresAtForStatus(status) {
  if (status === "pending") {
    return new Date(Date.now() + HOLD_MINUTES * 60 * 1000);
  }
  // dès que c’est “terminé” (paid/failed/canceled/confirmed...) => plus d’expiration
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
 * ✅ Liste “occupé calendrier” (ignore pending expirées)
 * - Occupé: paid/confirmed
 * - + pending uniquement si expiresAt > maintenant
 */
export async function listReservationsForCalendar({ chalet } = {}) {
  const now = new Date();

  const where = {
    ...(chalet ? { chalet: String(chalet).toUpperCase() } : {}),
    OR: [
      { status: { in: ["paid", "confirmed"] } },
      { status: "pending", expiresAt: { gt: now } },
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
    status = "confirmed",
  } = resa;

  const ciDate = toDateOrNull(ci);
  const coDate = toDateOrNull(co);

  // 🔴 dates invalides → on log et on sort sans planter
  if (!ciDate || !coDate) {
    console.warn("[saveReservation] ci/co invalides, réservation ignorée", {
      chalet,
      ci,
      co,
      status,
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
      adults,
      children,
      status: status || "confirmed",
      expiresAt: status === "pending" ? computeExpiresAtForStatus("pending") : null,
    },
  });

  return created;
}

/**
 * ✅ Upsert réservation via PaymentIntentId (Stripe)
 * Utilisé par :
 * - webhook Stripe (status paid/failed/canceled)
 * - /api/send-confirmation (pour sauver email/prénom en DB)
 *
 * ⭐ IMPORTANT :
 * - Si status === "pending" => on met/rafraîchit expiresAt (hold)
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

  // expiresAt : seulement si on reçoit un status
  // - pending => now + HOLD
  // - autre   => null
  const expiresAt =
    status !== undefined ? computeExpiresAtForStatus(status) : undefined;

  // On construit un patch propre (on n'écrase pas avec undefined)
  const data = {
    status: status || undefined,
    chalet: chalet ? String(chalet).toUpperCase() : undefined,
    firstname: firstname !== undefined ? (firstname || null) : undefined,
    email: email !== undefined ? (email || null) : undefined,
    adults: typeof adults === "number" ? adults : undefined,
    children: typeof children === "number" ? children : undefined,
    ci: ciDate || undefined,
    co: coDate || undefined,
    expiresAt, // ✅
  };

  // Prisma n'aime pas les undefined si on les passe explicitement
  Object.keys(data).forEach((k) => data[k] === undefined && delete data[k]);

  try {
    // Si existe : update
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

    // Sinon : create (on a besoin au minimum de chalet/ci/co)
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
        status: status || "confirmed",
        chalet: chaletNorm,
        ci: ciDate,
        co: coDate,
        firstname: firstname || null,
        email: email || null,
        adults: typeof adults === "number" ? adults : 1,
        children: typeof children === "number" ? children : 0,
        expiresAt: status ? computeExpiresAtForStatus(status) : null, // ✅
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
