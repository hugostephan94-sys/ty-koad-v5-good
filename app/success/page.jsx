"use client";

import { useEffect, useState } from "react";
import SiteHeader from "../../components/SiteHeader";

function useQuery() {
  const [params, setParams] = useState({});

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const obj = {};
    q.forEach((v, k) => {
      obj[k] = v;
    });
    setParams(obj);
  }, []);

  return params;
}

function toEUR(n) {
  return Number(n || 0).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

export default function SuccessPage() {
  const q = useQuery();

  const [saveState, setSaveState] = useState({
    saving: true,
    error: undefined,
  });

  // 👉 Dès que les paramètres sont dispo, on enregistre la réservation en DB
  useEffect(() => {
    // On attend d’avoir au moins ces 3 infos
    if (!q.chalet || !q.ci || !q.co) {
      setSaveState((s) => ({ ...s, saving: false }));
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/reservations/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chalet: q.chalet,
            ci: q.ci,             // ex: "2025-12-10"
            co: q.co,             // ex: "2025-12-12"
            firstname: q.name || "",
            email: q.email || "",
            adults: q.adults ? Number(q.adults) : 2,
            children: q.children ? Number(q.children) : 0,
            status: "confirmed",
            // tu peux ajouter d’autres champs si ton saveReservation les gère :
            // amount: q.amount ? Number(q.amount) : undefined,
            // pi: q.pi,
          }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          setSaveState({
            saving: false,
            error:
              data.error ||
              "Erreur lors de l’enregistrement de la réservation.",
          });
        } else {
          setSaveState({
            saving: false,
            error: undefined,
          });
        }
      } catch (e) {
        setSaveState({
          saving: false,
          error:
            e instanceof Error
              ? e.message
              : "Erreur inattendue lors de l’enregistrement.",
        });
      }
    })();
  }, [q.chalet, q.ci, q.co, q.name, q.email, q.adults, q.children]);

  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="max-w-3xl mx-auto px-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 md:p-7 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Merci ! Votre réservation est confirmée ✅
            </h1>
            <p className="mt-2 text-sm sm:text-base text-stone-700">
              Un e-mail de confirmation est envoyé si la clé{" "}
              <code className="text-[11px] bg-stone-100 px-1 py-0.5 rounded">
                RESEND_API_KEY
              </code>{" "}
              est configurée.
            </p>

            {/* Petit statut côté enregistrement DB */}
            {saveState.saving && (
              <p className="mt-2 text-xs text-stone-500">
                Enregistrement de votre réservation dans notre système…
              </p>
            )}
            {saveState.error && (
              <p className="mt-2 text-xs text-rose-600">
                {saveState.error}
              </p>
            )}

            {/* Détails réservation / paiement */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                <div className="font-medium mb-1">Détails du séjour</div>
                <div>Chalet : {q.chalet || "—"}</div>
                <div>Arrivée : {q.ci || "—"}</div>
                <div>Départ : {q.co || "—"}</div>
                <div>Nuits : {q.nights || "—"}</div>
                <div>Montant payé : {toEUR(q.amount)}</div>
              </div>

              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                <div className="font-medium mb-1">Paiement</div>
                <div className="break-all">
                  PaymentIntent :{" "}
                  <code className="text-[11px] bg-stone-100 px-1 py-0.5 rounded">
                    {q.pi || "—"}
                  </code>
                </div>
                <div className="mt-1">
                  Client : {q.name || "—"}{" "}
                  {q.email && (
                    <span className="text-stone-500">({q.email})</span>
                  )}
                </div>
              </div>
            </div>

            {/* Boutons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm sm:text-base text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
              >
                Retour à l’accueil
              </a>
            </div>

            <p className="mt-4 text-[11px] text-stone-500">
              Conservez bien l’e-mail de confirmation : il récapitule vos dates
              de séjour ainsi que les informations pratiques pour votre arrivée
              aux Chalets Ty-Koad.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
