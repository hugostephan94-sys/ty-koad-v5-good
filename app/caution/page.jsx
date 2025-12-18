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

function CautionInner() {
  const search = useSearchParams();

  // Optionnel : tu peux passer depositCents dans l’URL si tu veux afficher un montant
  const chalet = (search.get("chalet") || "").toUpperCase(); // C1 / C2
  const depositCents = Number(search.get("depositCents") || 0);

  const chaletLabel =
    chalet === "C2"
      ? "Ty-Koad Duo — spa privatif"
      : chalet === "C1"
      ? "Ty-Koad — 2 chambres / 2 SDB"
      : "Les Chalets Ty-Koad";

  return (
    <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 md:p-7 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            Caution / dépôt de garantie
          </h1>

          <p className="mt-2 text-sm sm:text-base text-stone-700">
            Pour le séjour <b>{chaletLabel}</b>, une caution peut être demandée
            afin de couvrir d’éventuelles dégradations ou manquements constatés
            après votre départ.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="font-medium mb-1">Comment ça fonctionne ?</div>
              <ul className="list-disc pl-4 space-y-1 text-stone-700">
                <li>
                  La caution est une <b>empreinte</b> (ou une pré-autorisation)
                  selon le moyen de paiement.
                </li>
                <li>
                  Elle n’est pas encaissée si tout est conforme à la sortie.
                </li>
                <li>
                  En cas de problème, un montant peut être retenu selon les
                  conditions de location.
                </li>
              </ul>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="font-medium mb-1">Montant</div>

              {depositCents > 0 ? (
                <div className="text-stone-700">
                  Caution :{" "}
                  <b className="text-stone-900">{eurFromCents(depositCents)}</b>
                </div>
              ) : (
                <div className="text-stone-700">
                  Le montant exact est indiqué lors du parcours de réservation
                  (ou dans le mail de confirmation).
                </div>
              )}

              <div className="mt-2 text-stone-600">
                Si tu veux afficher un montant ici, tu peux appeler cette page
                avec <code>?depositCents=XXXX</code>.
              </div>
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
              href="/"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm sm:text-base text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
            >
              Retour à l’accueil
            </a>
          </div>

          <p className="mt-4 text-[11px] text-stone-500">
            Cette page est informative. Les modalités exactes (montant, délai de
            restitution, cas de retenue) sont définies dans vos conditions de
            location.
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
      {/* ✅ Obligatoire pour useSearchParams */}
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
