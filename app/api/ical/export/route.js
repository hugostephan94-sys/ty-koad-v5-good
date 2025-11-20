import { NextResponse } from "next/server";
import { loadSiteReservations } from "../../../../lib/ical";

export const dynamic = "force-dynamic";
const esc = (s)=> (s||"").replace(/([,;])/g,"\\$1").replace(/\n/g,"\\n");
const dt = (d)=>{ const x=new Date(d); return `${x.getUTCFullYear()}${String(x.getUTCMonth()+1).padStart(2,"0")}${String(x.getUTCDate()).padStart(2,"0")}`; };

export async function GET(req){
  const { searchParams } = new URL(req.url);
  const chalet = (searchParams.get("chalet") || "C1").toUpperCase();

  const resas = await loadSiteReservations(chalet); // [{checkIn,checkOut,name,id}]
  const lines = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Ty-Koad//Unified iCal//FR","CALSCALE:GREGORIAN","METHOD:PUBLISH"];
  for(const r of resas){
    const uid = `site-${chalet}-${r.id || `${r.checkIn}-${r.checkOut}`}`;
    const dtstamp = new Date().toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";
    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;VALUE=DATE:${dt(r.checkIn)}`,
      `DTEND;VALUE=DATE:${dt(r.checkOut)}`,
      `SUMMARY:${esc(r.name || "Réservé sur le site")}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return new NextResponse(lines.join("\r\n"), { status:200, headers:{
    "Content-Type":"text/calendar; charset=utf-8",
    "Content-Disposition": `attachment; filename="ty-koad-${chalet.toLowerCase()}.ics"`,
  }});
}
