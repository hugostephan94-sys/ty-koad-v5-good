"use client";

import { useEffect, useMemo, useState } from "react";
import { CHALETS, iso, nightsBetween, computeTotal } from "../lib/chalets";

/* Libellés des jours */
const FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

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
  const wd = (m1.getDay() + 6) % 7; // 0 = lundi
  const g = new Date(m1);
  g.setDate(m1.getDate() - wd);
  return g;
}

function formatSelectedDate(value) {
  if (!value) return "À choisir";

  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function CalendarSelectable({
  chaletId = "C1",
  months = 3,
  className = "",
  onChange,
}) {
  const chalet = CHALETS[chaletId];

  // Aujourd’hui normalisé sur 12:00 pour éviter les décalages
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

  /* ============================================================
     CHARGEMENT DES INDISPONIBILITÉS
     ============================================================ */

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
        if (!ignore) {
          setLoading(false);
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, [chaletId, when]);

  /* ============================================================
     CALCUL DU SÉJOUR
     ============================================================ */

  const nights = nightsBetween(checkIn, checkOut);

  const { total } = computeTotal(
    chalet,
    checkIn,
    checkOut
  );

  const minOk =
    nights === 0
      ? false
      : nights >= chalet.minNights;

  const valid = minOk;

  useEffect(() => {
    onChange?.({
      chalet,
      checkIn,
      checkOut,
      nights,
      total,
      valid,
    });
  }, [
    chalet,
    checkIn,
    checkOut,
    nights,
    total,
    valid,
    onChange,
  ]);

  /* ============================================================
     MOIS AFFICHÉS
     ============================================================ */

  const monthsArr = useMemo(
    () =>
      Array.from(
        { length: months },
        (_, i) => addMonths(when, i)
      ),
    [when, months]
  );

  const firstVisible = monthsArr[0];
  const lastVisible =
    monthsArr[monthsArr.length - 1];

  const monthRangeLabel =
    firstVisible.getMonth() ===
      lastVisible.getMonth() &&
    firstVisible.getFullYear() ===
      lastVisible.getFullYear()
      ? firstVisible.toLocaleDateString(
          "fr-FR",
          {
            month: "long",
            year: "numeric",
          }
        )
      : `${firstVisible.toLocaleDateString(
          "fr-FR",
          {
            month: "long",
            year: "numeric",
          }
        )} – ${lastVisible.toLocaleDateString(
          "fr-FR",
          {
            month: "long",
            year: "numeric",
          }
        )}`;

  /* ============================================================
     SÉLECTION / RÈGLES
     ============================================================ */

  function clearAll() {
    setCheckIn("");
    setCheckOut("");
  }

  function resetAfter(ci) {
    setCheckIn(ci);
    setCheckOut("");
  }

  function* daysGen(ci, n) {
    const d = new Date(ci);

    for (let i = 0; i < n; i++) {
      const dd = new Date(d);
      dd.setDate(d.getDate() + i);
      yield dd;
    }
  }

  function isRangeBlocked(ci, co) {
    if (!ci || !co) return false;

    const s = new Date(ci);
    const e = new Date(co);

    s.setHours(12, 0, 0, 0);
    e.setHours(12, 0, 0, 0);

    if (s < today || e <= today) {
      return true;
    }

    const n = nightsBetween(ci, co);

    for (const d of daysGen(ci, n)) {
      if (busy.has(iso(d))) {
        return true;
      }
    }

    return false;
  }

  function onPick(dayStr) {
    // Pas de date passée
    if (dayStr < todayISO) return;

    const isBusy = busy.has(dayStr);

    // Cas 1 : aucune arrivée sélectionnée
    if (!checkIn) {
      if (isBusy) return;

      resetAfter(dayStr);
      return;
    }

    // Cas 2 : séjour complet déjà sélectionné
    if (checkOut) {
      if (isBusy) return;

      resetAfter(dayStr);
      return;
    }

    // Cas 3 : arrivée choisie,
    // mais pas encore le départ
    if (dayStr === checkIn) {
      clearAll();
      return;
    }

    if (dayStr <= checkIn) {
      if (isBusy) return;

      resetAfter(dayStr);
      return;
    }

    if (
      nightsBetween(checkIn, dayStr) <
      chalet.minNights
    ) {
      return;
    }

    if (
      isRangeBlocked(
        checkIn,
        dayStr
      )
    ) {
      return;
    }

    setCheckOut(dayStr);
  }

  const prevDisabled = useMemo(() => {
    const prev = addMonths(when, -1);
    return prev < minMonth;
  }, [when, minMonth]);

  /* ============================================================
     TEXTE D'AIDE
     ============================================================ */

  let instructionTitle =
    "Choisissez votre date d’arrivée";

  let instructionText =
    "Cliquez sur une date disponible pour commencer votre réservation.";

  if (checkIn && !checkOut) {
    instructionTitle =
      "Choisissez maintenant votre date de départ";

    instructionText = `Séjour minimum : ${
      chalet.minNights
    } nuit${
      chalet.minNights > 1 ? "s" : ""
    }.`;
  }

  if (
    checkIn &&
    checkOut &&
    valid
  ) {
    instructionTitle =
      "Votre séjour est sélectionné";

    instructionText =
      "Vous pouvez poursuivre votre réservation sous le calendrier.";
  }

  return (
    <div
      className={`relative z-0 ${className || ""}`}
    >
      {/* ======================================================
          BANDEAU D'AIDE
          ====================================================== */}

      <div
        className={`rounded-2xl border p-4 sm:p-5 transition ${
          checkIn &&
          checkOut &&
          valid
            ? "border-emerald-200 bg-emerald-50"
            : "border-stone-200 bg-white"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base ${
              checkIn &&
              checkOut &&
              valid
                ? "bg-emerald-700 text-white"
                : "bg-emerald-100 text-emerald-900"
            }`}
          >
            {checkIn &&
            checkOut &&
            valid
              ? "✓"
              : "📅"}
          </div>

          <div className="min-w-0">
            <div className="text-sm font-semibold text-stone-900">
              {instructionTitle}
            </div>

            <div className="mt-1 text-xs sm:text-sm text-stone-600">
              {instructionText}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          RÉCAPITULATIF DU SÉJOUR
          ====================================================== */}

      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {/* ARRIVÉE */}
        <div
          className={`rounded-2xl border p-3 sm:p-4 ${
            checkIn
              ? "border-emerald-200 bg-emerald-50"
              : "border-stone-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-stone-500">
            <span>📍</span>
            Arrivée
          </div>

          <div
            className={`mt-1.5 text-sm sm:text-base font-semibold ${
              checkIn
                ? "text-emerald-950"
                : "text-stone-500"
            }`}
          >
            {formatSelectedDate(checkIn)}
          </div>
        </div>

        {/* DÉPART */}
        <div
          className={`rounded-2xl border p-3 sm:p-4 ${
            checkOut
              ? "border-emerald-200 bg-emerald-50"
              : "border-stone-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-stone-500">
            <span>🏁</span>
            Départ
          </div>

          <div
            className={`mt-1.5 text-sm sm:text-base font-semibold ${
              checkOut
                ? "text-emerald-950"
                : "text-stone-500"
            }`}
          >
            {formatSelectedDate(checkOut)}
          </div>
        </div>

        {/* NUITS */}
        <div className="rounded-2xl border border-stone-200 bg-white p-3 sm:p-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-stone-500">
            <span>🌙</span>
            Durée
          </div>

          <div className="mt-1.5 text-sm sm:text-base font-semibold text-stone-900">
            {nights > 0
              ? `${nights} nuit${
                  nights > 1
                    ? "s"
                    : ""
                }`
              : "—"}
          </div>

          {nights > 0 &&
            !minOk && (
              <div className="mt-1 text-[11px] text-amber-700">
                Minimum{" "}
                {chalet.minNights} nuit
                {chalet.minNights >
                1
                  ? "s"
                  : ""}
              </div>
            )}
        </div>

        {/* TOTAL */}
        <div
          className={`rounded-2xl border p-3 sm:p-4 ${
            nights > 0 &&
            minOk
              ? "border-emerald-200 bg-emerald-950 text-white"
              : "border-stone-200 bg-white"
          }`}
        >
          <div
            className={`flex items-center gap-2 text-[11px] uppercase tracking-wide ${
              nights > 0 &&
              minOk
                ? "text-emerald-200"
                : "text-stone-500"
            }`}
          >
            <span>€</span>
            Tarif
          </div>

          <div
            className={`mt-1.5 text-base sm:text-lg font-bold ${
              nights > 0 &&
              minOk
                ? "text-white"
                : "text-stone-500"
            }`}
          >
            {nights > 0 &&
            minOk
              ? total.toLocaleString(
                  "fr-FR",
                  {
                    style:
                      "currency",
                    currency:
                      "EUR",
                  }
                )
              : "—"}
          </div>
        </div>
      </div>

      {/* ======================================================
          INFORMATIONS TARIFAIRES
          ====================================================== */}

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {chaletId ===
            "C2" && (
            <>
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] sm:text-xs font-medium text-emerald-900">
                Dimanche → jeudi :
                110 €
              </span>

              <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] sm:text-xs font-medium text-amber-900">
                Vendredi & samedi :
                130 €
              </span>
            </>
          )}

          <span className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[11px] sm:text-xs text-stone-600">
            Minimum{" "}
            {chalet.minNights} nuit
            {chalet.minNights > 1
              ? "s"
              : ""}
          </span>
        </div>

        {(checkIn ||
          checkOut) && (
          <button
            type="button"
            onClick={clearAll}
            className="self-start sm:self-auto text-xs font-medium text-stone-500 hover:text-red-700 transition"
          >
            ↺ Effacer mes dates
          </button>
        )}
      </div>

      {/* ======================================================
          NAVIGATION DES MOIS
          ====================================================== */}

      <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50/70 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() =>
              !prevDisabled &&
              setWhen(
                addMonths(
                  when,
                  -1
                )
              )
            }
            disabled={
              prevDisabled
            }
            aria-label="Mois précédent"
            className={`inline-flex h-10 w-10 sm:w-auto sm:px-4 items-center justify-center rounded-xl border text-sm font-medium transition ${
              prevDisabled
                ? "border-stone-200 bg-stone-100 text-stone-300 cursor-not-allowed"
                : "border-stone-300 bg-white text-stone-700 shadow-sm hover:border-emerald-300 hover:text-emerald-900 hover:bg-emerald-50"
            }`}
          >
            <span className="text-xl leading-none">
              ‹
            </span>

            <span className="hidden sm:inline ml-2">
              Précédent
            </span>
          </button>

          <div className="min-w-0 text-center">
            <div className="text-sm sm:text-base font-semibold text-stone-900">
              {
                CHALETS[
                  chaletId
                ].name
              }
            </div>

            <div className="mt-0.5 text-[11px] sm:text-xs text-stone-500 capitalize truncate">
              {
                monthRangeLabel
              }
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setWhen(
                addMonths(
                  when,
                  1
                )
              )
            }
            aria-label="Mois suivant"
            className="inline-flex h-10 w-10 sm:w-auto sm:px-4 items-center justify-center rounded-xl border border-stone-300 bg-white text-sm font-medium text-stone-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-900 hover:bg-emerald-50"
          >
            <span className="hidden sm:inline mr-2">
              Suivant
            </span>

            <span className="text-xl leading-none">
              ›
            </span>
          </button>
        </div>
      </div>

      {/* ======================================================
          ÉTAT DE CHARGEMENT
          ====================================================== */}

      {loading && (
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-stone-500">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
          Mise à jour des disponibilités…
        </div>
      )}

      {/* ======================================================
          GRILLE DES MOIS
          ====================================================== */}

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {monthsArr.map(
          (m, i) => (
            <Month
              key={i}
              date={m}
              busy={busy}
              today={
                today
              }
              checkIn={
                checkIn
              }
              checkOut={
                checkOut
              }
              minNights={
                chalet.minNights
              }
              onPick={
                onPick
              }
            />
          )
        )}
      </div>

      {/* ======================================================
          LÉGENDE
          ====================================================== */}

      <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-3 sm:p-4">
        <div className="text-[11px] uppercase tracking-wide font-medium text-stone-500">
          Légende
        </div>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-xs text-stone-600">
          <LegendItem>
            <span className="inline-block h-5 w-5 rounded-md border border-stone-300 bg-white" />
            Disponible
          </LegendItem>

          <LegendItem>
            <span className="inline-block h-5 w-5 rounded-md border border-emerald-700 bg-emerald-600" />
            Arrivée / départ
          </LegendItem>

          <LegendItem>
            <span className="inline-block h-5 w-5 rounded-md border border-emerald-200 bg-emerald-100" />
            Votre séjour
          </LegendItem>

          <LegendItem>
            <span
              className="inline-block h-5 w-5 rounded-md border border-stone-200 bg-white"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(239,68,68,.32) 0, rgba(239,68,68,.32) 6px, transparent 6px, transparent 12px)",
              }}
            />
            Indisponible
          </LegendItem>
        </div>
      </div>

      <div className="mt-3 text-center text-[11px] text-stone-500">
        Les dates barrées sont déjà réservées ou indisponibles.
      </div>
    </div>
  );
}

/* ==============================================================
   COMPOSANT : UN MOIS
   ============================================================== */

function Month({
  date,
  busy,
  today,
  checkIn,
  checkOut,
  minNights,
  onPick,
}) {
  const title =
    date.toLocaleDateString(
      "fr-FR",
      {
        month: "long",
        year: "numeric",
      }
    );

  const start =
    startOfGrid(date);

  const days = Array.from(
    { length: 42 },
    (_, i) => {
      const d =
        new Date(start);

      d.setDate(
        start.getDate() + i
      );

      return d;
    }
  );

  const monthIndex =
    date.getMonth();

  return (
    <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      {/* NOM DU MOIS */}
      <div className="border-b border-stone-100 bg-stone-50/80 px-4 py-3">
        <div className="text-center text-base font-bold capitalize text-stone-900">
          {title}
        </div>
      </div>

      <div className="p-3 sm:p-4">
        {/* JOURS DE LA SEMAINE */}
        <div className="grid grid-cols-7 mb-1">
          {FR.map(
            (day) => (
              <div
                key={day}
                className="py-2 text-center text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-stone-400"
              >
                {day}
              </div>
            )
          )}
        </div>

        {/* JOURS */}
        <div className="grid grid-cols-7 gap-1">
          {days.map(
            (d, idx) => {
              const inMonth =
                d.getMonth() ===
                monthIndex;

              const key =
                iso(d);

              const isBusy =
                busy.has(key);

              const isPast =
                d < today;

              let tooShort =
                false;

              if (
                checkIn &&
                key > checkIn &&
                !checkOut
              ) {
                const n =
                  nightsBetween(
                    checkIn,
                    key
                  );

                if (
                  n <
                  (minNights ||
                    1)
                ) {
                  tooShort =
                    true;
                }
              }

              const canUseAsCheckout =
                checkIn &&
                !checkOut &&
                key >
                  checkIn;

              const disabled =
                (isBusy &&
                  !canUseAsCheckout) ||
                isPast ||
                tooShort;

              const isStart =
                checkIn &&
                key ===
                  checkIn;

              const isEnd =
                checkOut &&
                key ===
                  checkOut;

              const isInRange =
                checkIn &&
                checkOut &&
                key >
                  checkIn &&
                key <
                  checkOut;

              const isSelected =
                isStart ||
                isEnd ||
                isInRange;

              const isToday =
                key ===
                iso(today);

              let classes =
                "relative flex h-10 sm:h-11 items-center justify-center rounded-xl border text-xs sm:text-sm transition-all ";

              if (!inMonth) {
                classes +=
                  "border-transparent bg-transparent text-stone-300 ";
              } else if (
                isSelected
              ) {
                if (
                  isStart ||
                  isEnd
                ) {
                  classes +=
                    "border-emerald-800 bg-emerald-700 text-white font-bold shadow-sm ";
                } else {
                  classes +=
                    "border-emerald-200 bg-emerald-100 text-emerald-950 font-medium ";
                }
              } else if (
                isPast
              ) {
                classes +=
                  "border-stone-100 bg-stone-50 text-stone-300 ";
              } else {
                classes +=
                  "border-stone-200 bg-white text-stone-800 ";
              }

              if (
                !disabled &&
                !isSelected &&
                inMonth
              ) {
                classes +=
                  "hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-950 hover:shadow-sm cursor-pointer ";
              }

              if (
                disabled
              ) {
                classes +=
                  "cursor-not-allowed ";
              }

              return (
                <button
                  key={idx}
                  onClick={() =>
                    !disabled &&
                    onPick(key)
                  }
                  type="button"
                  disabled={
                    disabled
                  }
                  aria-label={
                    key
                  }
                  aria-pressed={
                    !!isSelected
                  }
                  className={
                    classes
                  }
                  style={
                    isBusy &&
                    !isSelected
                      ? {
                          backgroundImage:
                            "repeating-linear-gradient(135deg, rgba(239,68,68,.28) 0, rgba(239,68,68,.28) 6px, transparent 6px, transparent 12px)",
                        }
                      : tooShort
                      ? {
                          backgroundImage:
                            "repeating-linear-gradient(45deg, rgba(16,185,129,.16) 0, rgba(16,185,129,.16) 5px, transparent 5px, transparent 10px)",
                        }
                      : undefined
                  }
                  title={
                    isBusy
                      ? "Indisponible"
                      : isPast
                      ? "Date passée"
                      : tooShort
                      ? `Minimum ${minNights} nuits`
                      : isStart
                      ? "Date d’arrivée"
                      : isEnd
                      ? "Date de départ"
                      : "Sélectionner"
                  }
                >
                  {d.getDate()}

                  {isToday &&
                    !isStart &&
                    !isEnd && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-emerald-600" />
                    )}

                  {isStart && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-950 text-[8px] text-white">
                      A
                    </span>
                  )}

                  {isEnd && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-emerald-950 text-[8px] text-white">
                      D
                    </span>
                  )}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

/* ==============================================================
   PETIT COMPOSANT LÉGENDE
   ============================================================== */

function LegendItem({
  children,
}) {
  return (
    <div className="flex items-center gap-2">
      {children}
    </div>
  );
}
