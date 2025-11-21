"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import CalendarSelectable from "../../components/CalendarSelectable";
import { CHALETS } from "../../lib/chalets";

function eur(n) {
  return (n || 0).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

export default function ReserverPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <Suspense
          fallback={
            <section className="max-w-3xl mx-auto">
              <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 text-sm sm:text-base text-stone-700 shadow-sm">
                Chargement de la réservation…
              </div>
            </section>
          }
        >
          <ReserverInner />
        </Suspense>
      </main>
    </>
  );
}

function ReserverInner() {
  const search = useSearchParams();
  const initialTab = (search.get("tab") || "C1").toUpperCase();

  const [tab, setTab] = useState(initialTab); // "C1" ou "C2"
  const [state, setState] = useState({}); // {checkIn, checkOut, nights, total, valid}
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Code cadeau
  const [giftCode, setGiftCode] = useState("");
  const [gift, setGift] = useState(null); // { valueCents, message }
  const discountCents = gift?.valueCents ?? 0;

  useEffect(() => {
    setTab(initialTab);
    setGift(null);
    setGiftCode("");
  }, [initialTab]);

  const chalet = CHALETS[tab];
  const maxGuests = chalet.maxGuests ?? 2;
  const totalGuests = adults + children;

  // Ajuste adultes/enfants quand on change de chalet
  useEffect(() => {
    if (totalGuests > maxGuests) {
      const newAdults = Math.min(
        adults,
        Math.max(1, maxGuests - children)
      );
      const newChildren = Math.max(
        0,
        Math.min(children, maxGuests - newAdults)
      );
      setAdults(newAdults);
      setChildren(newChildren);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const priceText = useMemo(() => {
    if (!state?.nights) return "";
    const net = Math.max(0, (state.total || 0) - discountCents);
    return eur(net);
  }, [state, discountCents]);

  const peopleError =
    totalGuests < 1
      ? "Merci d’indiquer au moins 1 adulte."
      : totalGuests > maxGuests
      ? `Capacité max : ${maxGuests} personne${
          maxGuests > 1 ? "s" : ""
        }.`
      : adults < 1
      ? "Au moins 1 adulte requis."
      : "";

  async function applyGift() {
    try {
      if (!giftCode?.trim()) return;
      if (!state?.checkIn || !state?.checkOut) {
        alert("Choisissez d’abord vos dates.");
        return;
      }
      const res = await fetch("/api/gift/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: giftCode.trim().toUpperCase(),
          chalet: tab,
          checkIn: state.checkIn,
          checkOut: state.checkOut,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Code invalide");
        setGift(null);
        return;
      }
      setGift(data);
    } catch (e) {
      alert(e.message);
    }
  }

  function clearGift() {
    setGift(null);
    setGiftCode("");
  }

  function goPay() {
    const { checkIn, checkOut, nights, total } = state;
    const net = Math.max(0, (total || 0) - discountCents);

    const q = new URLSearchParams({
      chalet: chalet.id,
      ci: checkIn,
      co: checkOut,
      nights: String(nights),
      amount: String((net / 100) * 100), // total en €
      deposit: String(chalet.deposit),
      adults: String(adults),
      children: String(children),
      ...(gift
        ? {
            giftCode: giftCode.trim().toUpperCase(),
            giftValue: String(discountCents),
          }
        : {}),
    }).toString();

    window.location.assign(`/payer?${q}`);
  }

  return (
    <section className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* Titre / intro */}
      <header>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Réserver
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-700">
          Choisissez votre chalet, vos dates, le nombre de personnes… puis
          validez votre réservation en quelques clics.
        </p>
      </header>

      {/* Carte de réservation */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm space-y-5">
        {/* Onglets chalets */}
        <div>
          <div className="text-xs font-medium text-stone-600 mb-2">
            Choix du chalet
          </div>
          <div className="inline-flex rounded-xl border border-stone-200 overflow-hidden bg-stone-50 text-sm">
            {["C1", "C2"].map((id) => (
              <button
                key={id}
                onClick={() => {
                  setTab(id);
                  clearGift();
                }}
                className={`px-3 sm:px-4 py-2 transition ${
                  tab === id
                    ? "bg-emerald-900 text-white"
                    : "bg-white text-stone-700 hover:bg-stone-50"
                }`}
              >
                {CHALETS[id].name}
              </button>
            ))}
          </div>
        </div>

        {/* Capacité */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-stone-600">
            Nombre de personnes
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-stone-700">Adultes :</span>
              <select
                value={adults}
                onChange={(e) => {
                  const a = Number(e.target.value);
                  setAdults(a);
                  if (a + children > maxGuests) {
                    setChildren(Math.max(0, maxGuests - a));
                  }
                }}
                className="rounded-xl border border-stone-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map(
                  (n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-stone-700">Enfants :</span>
              <select
                value={children}
                onChange={(e) => {
                  const c = Number(e.target.value);
                  if (adults + c > maxGuests) return;
                  setChildren(c);
                }}
                className="rounded-xl border border-stone-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {Array.from(
                  { length: Math.max(0, maxGuests - adults + 1) },
                  (_, i) => i
                ).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xs sm:text-sm text-stone-500">
              Capacité : max {maxGuests} pers.
            </div>
          </div>
          {peopleError && (
            <div className="text-xs sm:text-sm text-red-700">
              {peopleError}
            </div>
          )}
        </div>

        {/* Calendrier + code cadeau + résumé */}
        <div className="space-y-5">
          {/* Calendrier */}
          <div>
            <div className="text-xs font-medium text-stone-600 mb-2">
              Dates de séjour
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-3 sm:p-4">
              {["C1", "C2"].includes(tab) && (
                <CalendarSelectable
                  chaletId={tab}
                  months={3}
                  onChange={setState}
                />
              )}
            </div>
          </div>

          {/* Code cadeau */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-stone-600">
              Code cadeau (optionnel)
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <input
                value={giftCode}
                onChange={(e) => setGiftCode(e.target.value)}
                placeholder="Code cadeau"
                className="w-full sm:w-auto flex-1 rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={applyGift}
                className="inline-flex items-center justify-center px-3 py-2 rounded-xl border border-stone-300 text-sm text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
              >
                Appliquer
              </button>
              {gift && (
                <button
                  type="button"
                  onClick={clearGift}
                  className="text-xs sm:text-sm text-stone-600 underline"
                >
                  Retirer
                </button>
              )}
            </div>
            {gift && (
              <div className="text-xs sm:text-sm text-emerald-800">
                {gift.message}
              </div>
            )}
          </div>

          {/* Résumé / bouton payer */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 text-xs sm:text-sm text-stone-700">
              {state?.nights > 0 ? (
                <>
                  Séjour de <b>{state.nights}</b> nuit
                  {state.nights > 1 ? "s" : ""} —{" "}
                  {gift ? (
                    <>
                      <span className="line-through mr-1">
                        {eur(state.total)}
                      </span>
                      <b>{priceText}</b>{" "}
                      <span className="text-emerald-800">
                        ({gift.message})
                      </span>
                    </>
                  ) : (
                    <b>{eur(state.total)}</b>
                  )}{" "}
                  — caution {eur(CHALETS[tab].deposit)}
                </>
              ) : (
                "Sélectionnez vos dates pour voir le total."
              )}
            </div>
            <button
              type="button"
              onClick={goPay}
              disabled={!state?.valid || !!peopleError}
              className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm sm:text-base font-medium shadow-sm transition w-full sm:w-auto ${
                !state?.valid || !!peopleError
                  ? "bg-stone-200 text-stone-500 cursor-not-allowed"
                  : "bg-emerald-900 text-white hover:bg-emerald-800"
              }`}
            >
              Réserver maintenant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
