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
  // C1 = Cosy / 2 chambres ? (dans ton projet C1 = "Ty-Koad — 2 chambres / 2 SDB")
  // C2 = Duo spa
  if (chalet === "C2") return 30000; // 300€
  if (chalet === "C1") return 15000; // 150€
  return 0;
}

function CautionInner() {
  const search = useSearchParams();

  const chalet = (search.get("chalet") || "").toUpperCase(); // C1 / C2 / ""
  const chaletLabel =
    chalet === "C2"
      ? "Ty-Koad Duo — spa privatif"
      : chalet === "C1"
      ? "Ty-Koad — 2 chambres / 2 SDB"
      : "Les Chalets Ty-Koad";

  const depositCents = getDepositCentsByChalet(chalet);

  return (
    <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 md:p-7 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            Caution / dépôt de garantie
          </h1>

          <p className="mt-2 text-sm sm:text-base text-stone-700">
            Pour le séjour <b>{chaletLabel}</b>, une caution peut être demandée
            afin de couvrir d’éventuelles dégradations, manquements, pertes ou
            frais de remise en état constatés après votre départ.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="font-medium mb-2">Comment ça fonctionne ?</div>
              <ul className="list-disc pl-4 space-y-1 text-stone-700">
                <li>
                  La caution se fait généralement via une{" "}
                  <b>empreinte bancaire (pré-autorisation)</b>.
                </li>
                <li>
                  <b>Aucune somme n’est débitée</b> si tout est conforme à la
                  sortie.
                </li>
                <li>
                  En cas de problème, un montant peut être retenu (partiellement
                  ou totalement) avec justificatifs si besoin.
                </li>
              </ul>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="font-medium mb-2">Montant de la caution</div>

              {chalet === "C1" || chalet === "C2" ? (
                <div className="text-stone-700">
                  Caution :{" "}
                  <b className="text-stone-900">
                    {eurFromCents(depositCents)}
                  </b>
                </div>
              ) : (
                <div className="text-stone-700 space-y-1">
                  <div>
                    <b>Ty-Koad Cosy</b> : <b>150 €</b>
                  </div>
                  <div>
                    <b>Ty-Koad Duo (spa)</b> : <b>300 €</b>
                  </div>
                  <div className="mt-2 text-stone-600">
                    Astuce : tu peux afficher automatiquement le bon montant en
                    venant sur cette page avec{" "}
                    <code className="px-1 py-0.5 rounded bg-white border border-stone-200">
                      ?chalet=C1
                    </code>{" "}
                    ou{" "}
                    <code className="px-1 py-0.5 rounded bg-white border border-stone-200">
                      ?chalet=C2
                    </code>
                    .
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
              La caution est demandée avant l’arrivée (souvent par lien envoyé
              automatiquement), puis libérée après le départ si tout est OK.
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
            Cette page est informative. Les modalités exactes (montant, délai de
            libération, cas de retenue) sont précisées dans les CGV et/ou les
            conditions de location.
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
