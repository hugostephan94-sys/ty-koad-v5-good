// lib/chalets.js
export const CHALETS = {
  C1: {
    id: "C1",
    name: "Ty-Koad — 2 chambres / 2 SDB",
    basePrice: 70,
    minNights: 2,
    deposit: 150,
    animalsAllowed: true,
    externalOnly: false,
    maxGuests: 4,             // ⬅️ capacité
  },
  C2: {
    id: "C2",
    name: "Ty-Koad Duo — spa privatif",
    priceWeekend: 130,        // ven-sam -> NOUVEAU
    priceWeek: 110,           // dim-jeu -> NOUVEAU
    minNights: 1,
    deposit: 500,
    animalsAllowed: true,
    externalOnly: false,
    bookingUrl: "https://www.booking.com/", // à ajuster si besoin
    maxGuests: 2,             // ⬅️ capacité
  },
};

export function iso(d) {
  return new Date(d).toISOString().slice(0, 10);
}

export function nightsBetween(ci, co) {
  if (!ci || !co) return 0;
  const d1 = new Date(ci), d2 = new Date(co);
  d1.setHours(12, 0, 0, 0);
  d2.setHours(12, 0, 0, 0);
  return Math.max(0, Math.round((d2 - d1) / 86400000));
}

export function* dateRangeIter(ci, n) {
  const d = new Date(ci);
  for (let i = 0; i < n; i++) {
    const dd = new Date(d);
    dd.setDate(d.getDate() + i);
    yield dd;
  }
}

export function computeTotal(chalet, ci, co) {
  const n = nightsBetween(ci, co);
  if (!n || !chalet) return { nights: 0, total: 0 };

  if (chalet.id === "C1") {
    return { nights: n, total: chalet.basePrice * n };
  }

  // C2 : prix semaine / week-end
  let total = 0;
  for (const d of dateRangeIter(ci, n)) {
    const wd = d.getDay(); // 0=dim … 6=sam
    const isFriSat = wd === 5 || wd === 6;
    total += isFriSat ? chalet.priceWeekend : chalet.priceWeek;
  }
  return { nights: n, total };
}
