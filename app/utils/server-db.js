// app/utils/server-db.js
import prisma from "../../lib/db";

// petit helper pour sécuriser les dates
function toDateOrNull(value) {
  if (!value) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;

  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return d;
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
 * Sauvegarde une réservation dans la DB
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
      chalet,
      ci: ciDate,
      co: coDate,
      firstname: firstname || null,
      email: email || null,
      adults,
      children,
      status: status || "confirmed",
    },
  });

  return created;
}

/**
 * Ancienne fonction (fichiers JSON).
 * On la garde pour ne pas casser d’éventuels imports,
 * mais elle ne fait plus rien.
 */
export async function upsertReservationByPI(_payload) {
  return { ok: true };
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
