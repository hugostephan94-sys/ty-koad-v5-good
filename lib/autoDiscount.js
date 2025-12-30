// lib/autoDiscount.js

/**
 * Remises automatiques
 * - C2 : -10% dès 2 nuits
 * - C1 : -10% dès 5 nuits
 *
 * baseTotalCents = total avant remise (en centimes)
 */
export function getAutoDiscount({ chaletId, nights, baseTotalCents }) {
  const n = Number(nights || 0);
  const base = Number(baseTotalCents || 0);

  let pct = 0;
  let label = "";

  if (chaletId === "C2" && n >= 2) {
    pct = 0.1;
    label = "Remise long séjour (−10% dès 2 nuits)";
  } else if (chaletId === "C1" && n >= 5) {
    pct = 0.1;
    label = "Remise long séjour (−10% dès 5 nuitées)";
  }

  const amountCents = Math.round(base * pct);

  return { pct, amountCents, label };
}
