import { NextResponse } from "next/server";
import { loadSiteReservations } from "../../../../lib/ical";

export const dynamic = "force-dynamic";

// échappe les virgules / points-virgules / retours à la ligne
const esc = (s = "") =>
  s
    .replace(/([,;])/g, "\\$1")
    .replace(/\r?\n/g, "\\n");

// normalise une date (Date ou string) en date UTC "pure jour"
function toDateOnly(d) {
  if (!d) return null;
  const x = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(x.getTime())) return null;
  // valeur en "date uniquement" côté UTC
  return new Date(Date.UTC(x.getFullYear(), x.getMonth(), x.getDate()));
}

// format YYYYMMDD pour iCal
function formatIcalDate(d) {
  const x = toDateOnly(d);
  if (!x) return null;
  const year = x.getUTCFullYear();
  const month = String(x.getUTCMonth() + 1).padStart(2, "0");
  const day = String(x.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const chalet = (searchParams.get("chalet") || "C1").toUpperCase();

    const resas = await loadSiteReservations(chalet); // [{ id, checkIn, checkOut, name, ... }]

    const now = new Date();
    const dtstamp = now
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";

    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ty-Koad//Unified iCal//FR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
    ];

    for (const r of resas) {
      const dtStart = formatIcalDate(r.checkIn);
      const dtEnd = formatIcalDate(r.checkOut);

      // si une résa a des dates invalides, on la saute au lieu de tout faire planter
      if (!dtStart || !dtEnd) continue;

      const uid = `site-${chalet}-${r.id || `${dtStart}-${dtEnd}`}`;

      lines.push(
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART;VALUE=DATE:${dtStart}`,
        `DTEND;VALUE=DATE:${dtEnd}`,
        `SUMMARY:${esc(r.name || "Réservé sur le site")}`,
        "END:VEVENT"
      );
    }

    lines.push("END:VCALENDAR");

    return new NextResponse(lines.join("\r\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="ty-koad-${chalet.toLowerCase()}.ics"`,
      },
    });
  } catch (err) {
    console.error("[api/ical/export] ERROR:", err);

    // Fallback : on renvoie quand même un calendrier vide
    const fallback = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ty-Koad//Error Fallback//FR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "END:VCALENDAR",
    ].join("\r\n");

    return new NextResponse(fallback, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
      },
    });
  }
}
