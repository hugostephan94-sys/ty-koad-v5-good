// Fix Stripe / redeploy
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import SiteHeader from "../../components/SiteHeader";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function eur(n) {
  return (n / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

export default function PayerPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
          <header>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
              Paiement sécurisé
            </h1>
            <p className="mt-2 text-sm sm:text-base text-stone-700">
              Finalisez votre réservation en réglant le montant indiqué ci-dessous.
              Le paiement est sécurisé via Stripe 🔒
            </p>
          </header>

          <Suspense
            fallback={
              <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 text-sm text-stone-700 shadow-sm">
                Préparation du paiement…
              </div>
            }
          >
            <CheckoutShell />
          </Suspense>
        </section>
      </main>
    </>
  );
}

/**
 * Récupère le clientSecret via l’API puis installe <Elements>
 */
function CheckoutShell() {
  const search = useSearchParams();

  const amountCents = Math.round(Number(search.get("amount") || 0) * 100); // € -> cents
  const depositCents = Math.round(Number(search.get("deposit") || 0) * 100);
  const chalet = search.get("chalet");
  const ci = search.get("ci");
  const co = search.get("co");
  const nights = Number(search.get("nights") || 0);
  const giftCode = search.get("giftCode") || "";
  const giftValueCents = Number(search.get("giftValue") || 0);

  // 👉 nouvelles infos client passées dans l’URL /payer
  const firstname = search.get("firstname") || "";
  const email = search.get("email") || "";

  const [clientSecret, setClientSecret] = useState(null);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amountCents,
            depositCents,
            chalet,
            ci,
            co,
            nights,
            giftCode: giftCode || undefined,
            giftValueCents: giftValueCents || undefined,
            // tu peux aussi envoyer email / firstname côté Stripe si tu veux loguer
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.clientSecret) {
          setFetchError(
            data.error || "Erreur lors de la préparation du paiement."
          );
          return;
        }

        setClientSecret(data.clientSecret);
      } catch (e) {
        setFetchError(e.message || "Erreur réseau.");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6 text-sm text-red-800 shadow-sm">
        {fetchError}
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 text-sm text-stone-700 shadow-sm">
        Préparation du paiement…
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutInner
        amountCents={amountCents}
        depositCents={depositCents}
        giftCode={giftCode}
        // 👉 on passe les infos client + séjour au composant de paiement
        firstname={firstname}
        email={email}
        checkin={ci}
        checkout={co}
        chalet={chalet}
        nights={nights}
      />
    </Elements>
  );
}

/**
 * Affiche PaymentElement et gère le bouton "Payer"
 */
function CheckoutInner({
  amountCents,
  depositCents,
  giftCode,
  firstname,
  email,
  checkin,
  checkout,
  chalet,
  nights,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [status, setStatus] = useState("ready"); // ready | paying | done | error
  const [error, setError] = useState("");

  async function pay() {
    if (!stripe || !elements) return;
    setStatus("paying");
    setError("");

    const { error: err } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (err) {
      setError(err.message || "Erreur");
      setStatus("error");
      return;
    }

    // marquer le code cadeau utilisé (si applicable)
    if (giftCode) {
      try {
        await fetch("/api/gift/consume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: giftCode }),
        });
      } catch {
        // on ignore pour ne pas bloquer le client
      }
    }

    // 👉 NOUVEAU : envoyer les emails (client + admin)
    try {
      await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstname,
          checkin,
          checkout,
          chalet,
          nights,
          price: (amountCents / 100).toFixed(2),
        }),
      });
    } catch (e) {
      console.error("Erreur envoi email:", e);
      // on ne bloque pas la confirmation si l'email échoue
    }

    setStatus("done");
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 md:p-7 shadow-sm">
      <div className="text-xs sm:text-sm text-stone-600 mb-4 space-y-1">
        <div>
          Total à payer :{" "}
          <b className="text-stone-900">{eur(amountCents)}</b>
          {giftCode && " (chèque cadeau appliqué)"}
        </div>
        <div className="text-[11px] sm:text-xs">
          Caution (séparée, via lien dédié) : {eur(depositCents)}
        </div>
      </div>

      <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-3 sm:p-4 mb-4 text-[11px] sm:text-xs text-stone-600">
        Le paiement est traité par Stripe. Vos coordonnées bancaires ne sont
        jamais stockées par les Chalets Ty-Koad.
      </div>

      <div className="space-y-3">
        <PaymentElement />

        <button
          onClick={pay}
          disabled={status !== "ready"}
          className="w-full inline-flex items-center justify-center mt-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-medium shadow-sm disabled:bg-stone-200 disabled:text-stone-500 disabled:cursor-not-allowed transition"
        >
          {status === "paying" ? "Paiement en cours…" : "Payer"}
        </button>
      </div>

      {status === "done" && (
        <div className="mt-3 text-sm text-emerald-800">
          Merci ! Votre paiement est confirmé ✅
        </div>
      )}
      {status === "error" && (
        <div className="mt-3 text-sm text-red-700">{error}</div>
      )}
    </div>
  );
}
