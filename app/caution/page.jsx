// app/caution/page.jsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";

function eurFromCents(cents) {
  const n = Number(cents || 0);
  return (n / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

function getDepositCentsByChalet(chalet) {
  if (chalet === "C2") return 30000; // Ty-Koad Duo (spa)
  if (chalet === "C1") return 15000; // Ty-Koad (cosy)
  return 0;
}

function getChaletLabel(chalet) {
  if (chalet === "C2") return "Ty-Koad Duo — spa privatif";
  if (chalet === "C1") return "Ty-Koad — 2 chambres / 2 SDB";
  return "Les Chalets Ty-Koad";
}

function CautionInner() {
  const search = useSearchParams();
  const chalet = (search.get("chalet") || "").toUpperCase(); // C1 / C2 / ""

  const chaletLabel = getChaletLabel(chalet);

  // Montants fixes (affichés même si aucun chalet n'est précisé)
  const depositC1 = getDepositCentsByChalet("C1");
  const depositC2 = getDepositCentsByChalet("C2");

  // Si on connaît le chalet, on met en avant le bon montant
  const depositCents = getDepositCentsByChalet(chalet);

  return (
    <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 md:p-7 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            Caution / dépôt de garantie
          </h1>

          <p className="mt-2 text-sm sm:text-base text-stone-700">
            Une caution (dépôt de garantie) peut être demandée afin de couvrir
            d’éventuelles dégradations, pertes, manquements ou frais de remise en
            état constatés après votre départ.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="font-medium mb-2">Comment ça fonctionne ?</div>
              <ul className="list-disc pl-4 space-y-1 text-stone-700">
                <li>
                  La caution est effectuée via une{" "}
                  <b>empreinte bancaire (pré-autorisation)</b>.
                </li>
                <li>
                  <b>Aucune somme n’est débitée</b> si tout est conforme à la
                  sortie.
                </li>
                <li>
                  En cas de problème, un montant peut être retenu (partiellement
                  ou totalement) selon les conditions de location.
                </li>
              </ul>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="font-medium mb-2">Montant</div>

              {depositCents > 0 ? (
                <>
                  <div className="text-stone-700">
                    Séjour : <b className="text-stone-900">{chaletLabel}</b>
                  </div>
                  <div className="mt-1 text-stone-700">
                    Caution :{" "}
                    <b className="text-stone-900">
                      {eurFromCents(depositCents)}
                    </b>
                  </div>
                </>
              ) : (
                <div className="text-stone-700 space-y-1">
                  <div>
                    <b>Ty-Koad Cosy</b> :{" "}
                    <b className="text-stone-900">{eurFromCents(depositC1)}</b>
                  </div>
                  <div>
                    <b>Ty-Koad Duo (spa)</b> :{" "}
                    <b className="text-stone-900">{eurFromCents(depositC2)}</b>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-stone-200 bg-stone-50/60 p-4 text-xs sm:text-sm text-stone-700">
            <div className="font-medium text-stone-900 mb-1">
              Quand est-elle demandée ?
            </div>
            <div>
              La caution est demandée avant l’arrivée et est libérée après le
              départ si tout est conforme.
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/reserver"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-900 text-white text-sm sm:text-base font-medium shadow-sm hover:bg-emerald-800 transition"
            >
              Réserver
            </a>
            <a
              href="/cgv"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm sm:text-base text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
            >
              Lire les CGV
            </a>
            <a
              href="/infos-pratiques"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm sm:text-base text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
            >
              Infos pratiques
            </a>
          </div>

          <p className="mt-4 text-[11px] text-stone-500">
            Les modalités exactes (délai de libération, cas de retenue, etc.)
            sont détaillées dans les CGV et/ou les conditions de location.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function CautionPage() {
  return (
    <>
      <SiteHeader />

      {/* Obligatoire pour useSearchParams */}
      <Suspense
        fallback={
          <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
            <section className="max-w-3xl mx-auto px-4">
              <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 text-sm text-stone-700 shadow-sm">
                Chargement…
              </div>
            </section>
          </main>
        }
      >
        <CautionInner />
      </Suspense>
    </>
  );
}
