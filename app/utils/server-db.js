// app/utils/server-db.js
import prisma from "../../lib/db";

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
 * (à appeler quand le paiement Stripe est confirmé)
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

  const created = await prisma.reservation.create({
    data: {
      chalet,
      ci: new Date(ci),
      co: new Date(co),
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
 * (C1_ICAL_BOOKING, C2_ICAL_BOOKING, etc.)
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
