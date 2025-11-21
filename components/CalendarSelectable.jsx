"use client";

import { useEffect, useMemo, useState } from "react";
import { CHALETS, iso, nightsBetween, computeTotal } from "../lib/chalets";

/* libellés en-tête */
const FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const isFriSat = (d) => {
  const wd = d.getDay();
  return wd === 5 || wd === 6;
};

function monthStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function addMonths(date, n) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}
function startOfGrid(d) {
  const m1 = monthStart(d);
  const wd = (m1.getDay() + 6) % 7; // 0 = Lundi
  const g = new Date(m1);
  g.setDate(m1.getDate() - wd);
  return g;
}

export default function CalendarSelectable({
  chaletId = "C1",
  months = 3,
  className = "",
  onChange,
}) {
  const chalet = CHALETS[chaletId];

  // "Aujourd’hui" normalisé sur 12:00 pour éviter les décalages
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(12, 0, 0, 0);
    return t;
  }, []);
  const todayISO = useMemo(() => iso(today), [today]);
  const minMonth = useMemo(() => monthStart(today), [today]);

  const [when, setWhen] = useState(monthStart(new Date()));
  const [busy, setBusy] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  /* ==== Chargement des indispos iCal ==== */
  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoading(true);
      const from = iso(startOfGrid(addMonths(when, -1)));
      const to = iso(startOfGrid(addMonths(when, 13)));
      const url = `/api/availability?chalet=${chaletId}&from=${from}&to=${to}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (!ignore) {
          setBusy(new Set(data.bookedDates || []));
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [chaletId, when]);

  /* ==== Calculs ==== */
  const nights = nightsBetween(checkIn, checkOut);
  const { total } = computeTotal(chalet, checkIn, checkOut);
  const minOk = nights === 0 ? false : nights >= chalet.minNights;
  const valid = minOk;

  useEffect(() => {
    onChange?.({ chalet, checkIn, checkOut, nights, total, valid });
  }, [chalet, checkIn, checkOut, nights, total, valid, onChange]);

  const monthsArr = useMemo(
    () => Array.from({ length: months }, (_, i) => addMonths(when, i)),
    [when, months]
  );

  /* ==== Sélection / règles ==== */
  function clearAll() {
    setCheckIn("");
    setCheckOut("");
  }
  function resetAfter(ci) {
    setCheckIn(ci);
    setCheckOut("");
  }

  function isRangeBlocked(ci, co) {
    if (!ci || !co) return false;
    const s = new Date(ci),
      e = new Date(co);
    s.setHours(12, 0, 0, 0);
    e.setHours(12, 0, 0, 0);
    if (s < today || e <= today) return true;
    for (let d = new Date(s); d < e; d.setDate(d.getDate() + 1)) {
      if (busy.has(iso(d))) return true;
    }
    return false;
  }

  function onPick(dayStr) {
    // pas de passé
    if (dayStr < todayISO) return;

    const isBusy = busy.has(dayStr);

    // ───── Cas 1 : aucun check-in encore ─────
    // On ne peut PAS démarrer un séjour sur un jour occupé
    if (!checkIn) {
      if (isBusy) return;
      resetAfter(dayStr);
      return;
    }

    // ───── Cas 2 : on a déjà un range complet (checkIn + checkOut) ─────
    // On repart d'un nouveau check-in
    if (checkOut) {
      if (isBusy) return; // on ne commence pas sur un jour occupé
      resetAfter(dayStr);
      return;
    }

    // ───── Cas 3 : on a un checkIn mais pas encore de checkOut ─────

    // déselection : recliquer sur l’arrivée
    if (dayStr === checkIn) {
      clearAll();
      return;
    }

    // si on clique avant ou le même jour -> on redéfinit simplement le checkIn
    if (dayStr <= checkIn) {
      if (isBusy) return; // on ne déplace pas l’arrivée sur un jour occupé
      resetAfter(dayStr);
      return;
    }

    // ICI : dayStr est un candidat checkOut (même si isBusy === true)
    // → c'est ce qui permet d'avoir un séjour 24→25 alors que la nuit 25→26 est prise

    if (nightsBetween(checkIn, dayStr) < chalet.minNights) return;
    if (isRangeBlocked(checkIn, dayStr)) return;

    setCheckOut(dayStr);
  }

  // surbrillance douce entre check-in et check-out
  function inRange(d) {
    if (!checkIn || !checkOut) return false;
    const x = iso(d);
    return x > checkIn && x < checkOut;
  }
  function isStart(d) {
    return checkIn && iso(d) === checkIn;
  }
  function isEnd(d) {
    return checkOut && iso(d) === checkOut;
  }

  const prevDisabled = useMemo(() => {
    const prev = addMonths(when, -1);
    return prev < minMonth;
  }, [when, minMonth]);

  return (
    <div className={`relative z-0 ${className || ""}`}>
      {/* Barre info + légende vivace */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div className="text-xs sm:text-sm text-stone-700 max-w-[320px] sm:max-w-none">
          {checkIn ? (
            <>
              {new Date(checkIn).toLocaleDateString("fr-FR")} →{" "}
              {checkOut
                ? new Date(checkOut).toLocaleDateString("fr-FR")
                : "…"}{" "}
              • <b>{nights}</b> nuit{nights > 1 ? "s" : ""}
              {nights > 0 && !minOk && (
                <span className="text-amber-700 ml-1">
                  (min {chalet.minNights})
                </span>
              )}
              {nights > 0 && minOk && (
                <span className="ml-1">
                  • total{" "}
                  {total.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
              )}
            </>
          ) : (
            "Clique sur ta date d’arrivée puis sur ta date de départ."
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
          {chaletId === "C2" && (
            <>
              <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 px-2 py-0.5 border border-emerald-200">
                Dim–jeu 130 €
              </span>
              <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-800 px-2 py-0.5 border border-amber-200">
                Ven–sam 150 €
              </span>
            </>
          )}
          <button
            type="button"
            onClick={clearAll}
            className="px-2 py-1 rounded-lg border border-stone-300 text-stone-700 bg-white hover:bg-stone-50 text-[11px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            title="Réinitialiser la sélection"
          >
            Réinitialiser
          </button>
          <span className="text-stone-500">
            {loading ? "Mise à jour…" : "Dates barrées = indisponibles"}
          </span>
        </div>
      </div>

      {/* Navigateur mois */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => !prevDisabled && setWhen(addMonths(when, -1))}
          disabled={prevDisabled}
          className={`inline-flex items-center justify-center h-8 w-8 rounded-full border border-stone-300 bg-white text-stone-700 text-sm transition 
            ${
              prevDisabled
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            }`}
          aria-label="Mois précédent"
        >
          ‹
        </button>

        <div className="text-xs sm:text-sm text-stone-700 font-medium">
          {CHALETS[chaletId].name}
        </div>

        <button
          type="button"
          onClick={() => setWhen(addMonths(when, 1))}
          className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-stone-300 bg-white text-stone-700 text-sm hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          aria-label="Mois suivant"
        >
          ›
        </button>
      </div>

      {/* Grille des mois */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {monthsArr.map((m, i) => (
          <Month
            key={i}
            date={m}
            busy={busy}
            today={today}
            checkIn={checkIn}
            checkOut={checkOut}
            minNights={chalet.minNights}
            onPick={onPick}
            inRange={inRange}
            isStart={isStart}
            isEnd={isEnd}
          />
        ))}
      </div>

      {/* Légende indispo */}
      <div className="mt-3 text-[11px] text-stone-600 flex items-center gap-2">
        <span
          className="inline-block align-middle h-2.5 w-5 rounded"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(239,68,68,.36) 0, rgba(239,68,68,.36) 10px, transparent 10px, transparent 20px)",
          }}
        />
        <span>Indisponible</span>
      </div>
    </div>
  );
}

/* ---------- Un mois ---------- */
function Month({
  date,
  busy,
  today,
  checkIn,
  checkOut,
  minNights,
  onPick,
  inRange,
  isStart,
  isEnd,
}) {
  const title = date.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
  const start = startOfGrid(date);
  const days = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
  const monthIndex = date.getMonth();

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-3 sm:p-4 shadow-sm hover:shadow-md transition">
      <div className="text-center font-semibold capitalize text-stone-800 text-sm">
        {title}
      </div>

      <div className="mt-2 grid grid-cols-7 text-[10px] sm:text-[11px] text-stone-500">
        {FR.map((d) => (
          <div key={d} className="text-center py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d, idx) => {
          const inMonth = d.getMonth() === monthIndex;
          const key = iso(d);
          const isBusy = busy.has(key);
          const isPast = d < today;

          const weekendTint = isFriSat(d) ? "bg-emerald-50" : "bg-white";

          // trop court si la date cliquée + min nuits n’est pas respectée
          let tooShort = false;
          if (checkIn && key > checkIn && !checkOut) {
            const n = nightsBetween(checkIn, key);
            if (n < (minNights || 1)) tooShort = true;
          }

          const canUseAsCheckout =
            checkIn && !checkOut && key > checkIn;

          const disabled =
            (isBusy && !canUseAsCheckout) || isPast || tooShort;

          // styles de sélection
          const startSel = isStart(d);
          const endSel = isEnd(d);
          const inSel = inRange(d);

          const isToday = key === iso(today);

          return (
            <button
              key={idx}
              onClick={() => !disabled && onPick(key)}
              type="button"
              disabled={disabled}
              className={[
                "relative h-8 sm:h-9 rounded-lg text-[11px] sm:text-[12px] flex items-center justify-center border transition",
                inMonth
                  ? weekendTint + " text-stone-800 border-stone-200"
                  : "bg-stone-50 text-stone-400 border-stone-100",
                disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-stone-50",
                (startSel || endSel)
                  ? "ring-2 ring-emerald-500 bg-emerald-50 font-semibold"
                  : "",
                inSel ? "bg-emerald-100/40" : "",
              ].join(" ")}
              style={
                isBusy
                  ? {
                      backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(239,68,68,.36) 0, rgba(239,68,68,.36) 10px, transparent 10px, transparent 20px)",
                    }
                  : tooShort
                  ? {
                      backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(16,185,129,.22) 0, rgba(16,185,129,.22) 6px, transparent 6px, transparent 12px)",
                    }
                  : undefined
              }
              aria-label={key}
              title={
                isBusy
                  ? "Indisponible"
                  : isPast
                  ? "Passé"
                  : tooShort
                  ? `Minimum ${minNights} nuits`
                  : "Sélectionner"
              }
            >
              {d.getDate()}
              {isToday && (
                <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
