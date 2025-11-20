import { NextResponse } from "next/server";
// adapte le chemin si ton lib/ical.js est ailleurs
import { loadSiteReservations } from "../../../../lib/ical";

export const dynamic = "force-dynamic";

const esc = (s) =>
  (s || "").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");

const dt = (d) => {
  const x = new Date(d);
  const year = x.getUTCFullYear();
  const month = String(x.getUTCMonth() + 1).padStart(2, "0");
  const day = String(x.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

export async function GET(_req, { params }) {
  const chalet = (params && params.chalet ? params.chalet : "C1").toUpperCase(); // "C1" ou "C2"

  const resas = await loadSiteReservations(chalet); // [{checkIn, checkOut, name, id}]
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ty-Koad//iCal Export//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  for (const r of resas) {
    const uid = `site-${chalet}-${r.id || `${r.checkIn}-${r.checkOut}`}`;
    const dtstamp =
      new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;VALUE=DATE:${dt(r.checkIn)}`,
      `DTEND;VALUE=DATE:${dt(r.checkOut)}`,
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
}
