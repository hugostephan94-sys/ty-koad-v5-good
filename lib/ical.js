import ical from "node-ical";
import { listReservations } from "../app/utils/server-db";

const TTL_MS = 15 * 60 * 1000;
const cache = new Map();

function envUrlsFor(chalet) {
  const U = (k) => process.env[k]?.trim();
  if (chalet === "C1")
    return [
      U("C1_ICAL_AIRBNB"),
      U("C1_ICAL_BOOKING"),
      U("C1_ICAL_ABRITEL"),
    ].filter(Boolean);
  if (chalet === "C2")
    return [
      U("C2_ICAL_AIRBNB"),
      U("C2_ICAL_BOOKING"),
      U("C2_ICAL_ABRITEL"),
    ].filter(Boolean);
  return [];
}

const iso = (d) => new Date(d).toISOString().slice(0, 10);

function explodeNights(start, end) {
  const s = new Date(start); s.setHours(12, 0, 0, 0);
  const e = new Date(end);   e.setHours(12, 0, 0, 0);
  const out = [];
  for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    out.push(iso(d));
  }
  // iCal: DTEND non-inclus -> retire la dernière date (jour du départ)
  out.pop();
  return out;
}

function mergeRanges(ranges) {
  const a = ranges
    .slice()
    .sort((x, y) => new Date(x.start) - new Date(y.start));
  const out = [];
  for (const r of a) {
    if (!out.length) {
      out.push({ ...r });
      continue;
    }
    const last = out[out.length - 1];
    if (new Date(r.start) <= new Date(last.end)) {
      last.end = new Date(
        Math.max(+new Date(last.end), +new Date(r.end))
      );
    } else {
      out.push({ ...r });
    }
  }
  return out;
}

// 1) Flux externes (Airbnb / Booking / Abritel)
export async function fetchExternalIcal(chalet) {
  const key = `ext-${chalet}`;
  const now = Date.now();
  const c = cache.get(key);
  if (c && c.expires > now) return c.data;

  const urls = envUrlsFor(chalet);
  const events = [];

  for (const url of urls) {
    try {
      const data = await ical.async.fromURL(url);
      for (const k in data) {
        const v = data[k];
        if (v.type !== "VEVENT" || !v.start || !v.end) continue;
        if ((v.status || "").toUpperCase() === "CANCELLED") continue;
        events.push({ start: v.start, end: v.end });
      }
    } catch (_e) {
      // on ignore les erreurs d'une URL isolée
    }
  }

  const ranges = mergeRanges(events);
  const nightsSet = new Set();
  for (const r of ranges) {
    for (const d of explodeNights(r.start, r.end)) nightsSet.add(d);
  }

  const data = {
    chalet,
    ranges: ranges.map((r) => ({
      start: iso(r.start),
      end: iso(r.end),
    })),
    bookedDates: [...nightsSet].sort(),
    updatedAt: new Date().toISOString(),
  };

  cache.set(key, { expires: now + TTL_MS, data });
  return data;
}

// 2) Réservations faites sur TON site (via la DB / listReservations)
export async function loadSiteReservations(chalet) {
  const normChalet = (chalet || "").toUpperCase();

  const all = await listReservations(); // vient de utils/server-db
  const filtered = all.filter((r) => {
    const rc = (r.chalet || "").toUpperCase();
    const status = (r.status || "confirmed").toLowerCase();
    return rc === normChalet && status !== "cancelled";
  });

  const mapped = filtered.map((r) => ({
    id: r.id,
    checkIn: r.ci,       // IMPORTANT : ci -> checkIn
    checkOut: r.co,      // co -> checkOut
    name: r.name || "",
    status: r.status || "confirmed",
  }));

  console.log(
    "[loadSiteReservations]",
    normChalet,
    "->",
    mapped.length,
    "réservations trouvées"
  );

  return mapped;
}
