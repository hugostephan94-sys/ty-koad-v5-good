import { NextResponse } from "next/server";
import { fetchExternalIcal, loadSiteReservations } from "../../../lib/ical";

export const dynamic = "force-dynamic";

// util
function isoDay(d) {
  const x = new Date(d);
  x.setHours(12, 0, 0, 0);
  return x.toISOString().slice(0, 10);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  // On nettoie bien le paramètre chalet
  let rawChalet = searchParams.get("chalet") || "C1";
  rawChalet = rawChalet.trim().toUpperCase(); // <- important

  // Si tu veux, tu peux aussi gérer des alias ici :
  // ex: DUO -> C2
  let chalet = rawChalet;
  if (rawChalet === "DUO" || rawChalet === "SPA") chalet = "C2";

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  console.log("[availability] chalet =", chalet, "(raw =", rawChalet + ")");

  // 1) Flux externes (Airbnb/Booking/Abritel)
  const ext = await fetchExternalIcal(chalet); // => { bookedDates: [...], ranges: [...], updatedAt }

  // 2) Réservations faites sur TON site
  const siteRes = await loadSiteReservations(chalet); // [{ checkIn, checkOut, status, ... }]
  console.log(
    "[availability] siteRes count =",
    siteRes.length,
    "ext bookedDates count =",
    (ext.bookedDates || []).length
  );

  const siteDays = new Set();
  for (const r of siteRes) {
    const d1 = new Date(r.checkIn); d1.setHours(12, 0, 0, 0);
    const d2 = new Date(r.checkOut); d2.setHours(12, 0, 0, 0);
    for (let d = new Date(d1); d < d2; d.setDate(d.getDate() + 1)) {
      siteDays.add(isoDay(d));
    }
  }

  // 3) Fusion externes + site
  const merged = new Set(ext.bookedDates || []);
  for (const d of siteDays) merged.add(d);

  // 4) Fenêtrage (from/to) pour limiter la réponse
  const start = from ? new Date(from) : new Date();
  const end = to ? new Date(to) : new Date(Date.now() + 365 * 24 * 3600 * 1000);
  start.setHours(12, 0, 0, 0);
  end.setHours(12, 0, 0, 0);

  const bookedDates = Array.from(merged)
    .filter((s) => {
      const dt = new Date(s); dt.setHours(12, 0, 0, 0);
      return dt >= start && dt <= end;
    })
    .sort();

  console.log(
    "[availability] final bookedDates count =",
    bookedDates.length
  );

  return NextResponse.json({
    chalet,
    bookedDates,
    ranges: ext.ranges,       // [{start:"YYYY-MM-DD", end:"YYYY-MM-DD"}]
    updatedAt: ext.updatedAt, // ISO string
    nextRefreshInMin: 15,
  });
}
