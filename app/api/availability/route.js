import { NextResponse } from "next/server";
import { fetchExternalIcal, loadSiteReservations } from "../../../lib/ical";

export const dynamic = "force-dynamic";

// util
function isoDay(d) {
  const x = new Date(d);
  x.setHours(12, 0, 0, 0);
  return x.toISOString().slice(0, 10); // YYYY-MM-DD
}

function isActiveReservation(r, now) {
  const st = String(r.status || "").toUpperCase();

  // Actifs sûrs
  if (st === "PAID" || st === "CONFIRMED") return true;

  // Pending uniquement si pas expiré
  if (st === "PENDING") {
    const exp = r.expiresAt ? new Date(r.expiresAt) : null;
    return exp && exp.getTime() > now.getTime();
  }

  return false;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  // Param chalet
  let rawChalet = (searchParams.get("chalet") || "C1").trim().toUpperCase();

  // Alias possibles
  let chalet = rawChalet;
  if (rawChalet === "DUO" || rawChalet === "SPA") chalet = "C2";

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  console.log("[availability] chalet =", chalet, "(raw =", rawChalet + ")");

  // 1) Flux externes (Airbnb/Booking/Abritel)
  const ext = await fetchExternalIcal(chalet);
  // => { bookedDates: [...], ranges: [...], updatedAt }

  // 2) Réservations faites sur TON site (DB)
  let siteRes = [];
  try {
    siteRes = await loadSiteReservations(chalet);
    // attendu: [{ checkIn, checkOut, status, expiresAt, ... }]
  } catch (e) {
    console.error("[availability] erreur loadSiteReservations", e);
    siteRes = [];
  }

  const now = new Date();

  console.log(
    "[availability] siteRes =",
    siteRes.length,
    "| ext bookedDates =",
    (ext.bookedDates || []).length
  );

  // 3) Exploser les nuits des réservations site (avec filtre sécurité)
  const siteDays = new Set();

  for (const r of siteRes) {
    if (!isActiveReservation(r, now)) continue;

    const d1 = new Date(r.checkIn);
    const d2 = new Date(r.checkOut);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) continue;

    d1.setHours(12, 0, 0, 0);
    d2.setHours(12, 0, 0, 0);

    // nuits: d1 inclus, d2 exclu
    for (let d = new Date(d1); d < d2; d.setDate(d.getDate() + 1)) {
      siteDays.add(isoDay(d));
    }
  }

  // 4) Fusion externes + site
  const merged = new Set(ext.bookedDates || []);
  for (const d of siteDays) merged.add(d);

  // 5) Fenêtrage (from/to)
  const start = from ? new Date(from) : new Date();
  const end = to
    ? new Date(to)
    : new Date(Date.now() + 365 * 24 * 3600 * 1000);

  start.setHours(12, 0, 0, 0);
  end.setHours(12, 0, 0, 0);

  const bookedDates = Array.from(merged)
    .filter((s) => {
      const dt = new Date(s);
      dt.setHours(12, 0, 0, 0);
      return dt >= start && dt <= end;
    })
    .sort();

  console.log("[availability] final bookedDates =", bookedDates.length);

  return NextResponse.json({
    chalet,
    bookedDates,
    ranges: ext.ranges, // [{start:"YYYY-MM-DD", end:"YYYY-MM-DD"}]
    updatedAt: ext.updatedAt,
    nextRefreshInMin: 15,
  });
}
