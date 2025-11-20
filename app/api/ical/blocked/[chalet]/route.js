import { NextResponse } from "next/server";
// adapte le chemin si besoin
import { fetchExternalIcal, loadSiteReservations } from "../../../../../lib/ical";

export const dynamic = "force-dynamic";

function isoDay(d) {
  const x = new Date(d);
  x.setHours(12, 0, 0, 0);
  return x.toISOString().slice(0, 10);
}

export async function GET(_req, { params }) {
  const chalet = (params?.chalet || "").toUpperCase();
  if (!chalet) {
    return NextResponse.json({ error: "chalet requis" }, { status: 400 });
  }

  try {
    const ext = await fetchExternalIcal(chalet); // { bookedDates: [...], updatedAt }
    const resas = await loadSiteReservations(chalet); // [{ checkIn, checkOut }]

    const siteBlocked = new Set();
    for (const r of resas) {
      const d1 = new Date(r.checkIn); d1.setHours(12, 0, 0, 0);
      const d2 = new Date(r.checkOut); d2.setHours(12, 0, 0, 0);
      for (let d = new Date(d1); d < d2; d.setDate(d.getDate() + 1)) {
        siteBlocked.add(isoDay(d));
      }
    }

    const merged = new Set(ext.bookedDates || []);
    for (const d of siteBlocked) merged.add(d);

    return NextResponse.json({
      chalet,
      blocked: Array.from(merged).sort(),
      updatedAt: ext.updatedAt,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur iCal" }, { status: 500 });
  }
}
