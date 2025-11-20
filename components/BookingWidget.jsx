"use client";
import { useEffect, useMemo, useState } from "react";
import { CHALETS, iso, nightsBetween, computeTotal } from "../lib/chalets";

function todayISO() {
  const t = new Date();
  t.setHours(12, 0, 0, 0);
  return t.toISOString().slice(0, 10);
}

// reconstruit les nuits du séjour (exclut le jour du départ)
function buildNights(ci, co) {
  if (!ci || !co) return [];
  const s = new Date(ci); s.setHours(12,0,0,0);
  const e = new Date(co); e.setHours(12,0,0,0);
  const out = [];
  for (let d = new Date(s); d < e; d.setDate(d.getDate() + 1)) {
    out.push(iso(d));
  }
  return out;
}

export default function BookingWidget({
  selected, setSelected,
  checkIn, setCheckIn,
  checkOut, setCheckOut,
  adults = 2, setAdults,
}) {
  const [bookedDates, setBookedDates] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const minDate = todayISO();

  // état local si le parent ne fournit pas tout
  const [sel, setSel] = useState(selected || "C1");
  const activeId = selected || sel;
  const setActive = setSelected || setSel;

  const [ci, setCi] = useState(checkIn || "");
  const [co, setCo] = useState(checkOut || "");
  const setCiAll = setCheckIn || setCi;
  const setCoAll = setCheckOut || setCo;

  const [ad, setAd] = useState(adults || 2);
  const setAdAll = setAdults || setAd;

  const chalet = CHALETS[activeId];
  const nights = useMemo(() => nightsBetween(ci, co), [ci, co]);
  const { total } = useMemo(() => computeTotal(chalet, ci, co), [chalet, ci, co]);

  // charger indispos iCal quand chalet ou dates changent
  useEffect(() => {
    let ignore = false;
    async function run() {
      if (!ci || !co) { setBookedDates(new Set()); return; }
      setLoading(true);
      try {
        const url = `/api/availability?chalet=${activeId}&from=${ci}&to=${co}`;
        const res = await fetch(url);
        const data = await res.json();
        if (!ignore) setBookedDates(new Set(data.bookedDates || []));
      } catch {
        if (!ignore) setBookedDates(new Set());
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, [activeId, ci, co]);

  // validations
  const hasConflict = useMemo(() => {
    if (!ci || !co) return false;
    return buildNights(ci, co).some(d => bookedDates.has(d));
  }, [ci, co, bookedDates]);

  const tooShort = useMemo(() => {
    if (!ci || !co) return false;
    return nights < chalet.minNights;
  }, [nights, chalet]);

  const pastError = useMemo(() => {
    if (!ci) return false;
    return ci < minDate || (co && co <= minDate);
  }, [ci, co, minDate]);

  const canReserve = !!ci && !!co && !hasConflict && !tooShort && !pastError;

  useEffect(() => {
    if (!ci || !co) { setMsg("Choisissez vos dates."); return; }
    if (pastError) { setMsg("Dates passées non autorisées."); return; }
    if (hasConflict) { setMsg("Ces dates ne sont plus disponibles."); return; }
    if (tooShort) { setMsg(`Séjour minimum : ${chalet.minNights} nuit${chalet.minNights>1?"s":""}.`); return; }
    setMsg("");
  }, [ci, co, hasConflict, tooShort, pastError, chalet]);

  // cas “réservation externe” (Duo/Booking pour l’instant)
  if (chalet?.externalOnly) {
    return (
      <aside className="bg-white rounded-3xl shadow-sm border border-stone-200 p-5">
        <div className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-900">
          Réservation sur Booking.com
        </div>
        <h3 className="mt-2 text-xl font-semibold">{chalet.name}</h3>
        <p className="mt-2 text-sm text-stone-600">
          Ce logement se réserve actuellement <strong>exclusivement</strong> sur Booking.com.
          Tarifs indicatifs : <b>130 €</b> (dim-jeu) • <b>150 €</b> (ven-sam).
        </p>
        <a
          href={chalet.bookingUrl || "#"}
          target="_blank" rel="noreferrer"
          className="mt-4 inline-flex px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
        >
          Voir sur Booking
        </a>
      </aside>
    );
  }

  // UI standard (réservation directe)
  return (
    <aside className="bg-white rounded-3xl shadow-sm border border-stone-200 p-5">
      {/* sélecteur de chalet si le parent ne l’affiche pas */}
      {!selected && (
        <div className="mb-4">
          <label className="text-xs text-stone-600">Chalet</label>
          <select
            className="mt-1 w-full rounded-xl border border-stone-300 p-2"
            value={activeId}
            onChange={(e)=>setActive(e.target.value)}
          >
            <option value="C1">{CHALETS.C1.name}</option>
            <option value="C2">{CHALETS.C2.name}</option>
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-stone-600">Arrivée</label>
          <input
            type="date"
            min={minDate}
            className="mt-1 w-full rounded-xl border border-stone-300 p-2"
            value={ci}
            onChange={(e)=>{
              const v=e.target.value;
              setCiAll(v);
              if (co && v >= co) setCoAll("");         // force un départ > arrivée
            }}
          />
        </div>
        <div>
          <label className="text-xs text-stone-600">Départ</label>
          <input
            type="date"
            min={ci || minDate}
            className="mt-1 w-full rounded-xl border border-stone-300 p-2"
            value={co}
            onChange={(e)=>{
              const v=e.target.value;
              // bloque un départ non conforme au minimum
              if (ci && nightsBetween(ci, v) < chalet.minNights) return;
              setCoAll(v);
            }}
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="text-xs text-stone-600">Adultes</label>
        <select
          className="mt-1 w-full rounded-xl border border-stone-300 p-2"
          value={ad}
          onChange={(e)=>setAdAll(Number(e.target.value))}
        >
          {[1,2,3,4,5,6].map(n=> <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <div className="mt-3 text-sm text-stone-700">
        {ci && co ? (
          <>
            {nights} nuit{nights>1?"s":""} —{" "}
            <b>{total.toLocaleString("fr-FR",{style:"currency",currency:"EUR"})}</b>{" "}
            • caution {chalet.deposit} €
          </>
        ) : (
          "Choisissez vos dates pour voir le total"
        )}
      </div>

      {msg && (
        <div className="mt-3 text-sm text-red-700">{loading ? "Vérification…" : msg}</div>
      )}

      <button
        onClick={()=>{
          const q = new URLSearchParams({
            chalet: chalet.id,
            ci, co,
            nights: String(nights),
            amount: String(total),
            deposit: String(chalet.deposit),
            adults: String(ad),
          }).toString();
          location.assign(`/payer?${q}`);
        }}
        disabled={!canReserve}
        className={`mt-4 px-4 py-2 rounded-xl w-full ${
          canReserve ? "bg-emerald-900 text-white" : "bg-stone-200 text-stone-500 cursor-not-allowed"
        }`}
      >
        Réserver maintenant
      </button>
    </aside>
  );
}
