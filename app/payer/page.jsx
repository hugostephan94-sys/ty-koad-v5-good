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
    <div>
      <SiteHeader />
      <div className="h-16" />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Suspense fallback={<div className="p-6">Préparation du paiement…</div>}>
          <CheckoutShell />
        </Suspense>
      </div>
    </div>
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
      <div className="p-6 rounded-2xl border bg-white text-red-700">
        {fetchError}
      </div>
    );
  }

  if (!clientSecret) {
    return <div className="p-6">Préparation du paiement…</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutInner
        amountCents={amountCents}
        depositCents={depositCents}
        giftCode={giftCode}
      />
    </Elements>
  );
}

/**
 * Affiche PaymentElement et gère le bouton "Payer"
 */
function CheckoutInner({ amountCents, depositCents, giftCode }) {
  const stripe = useStripe();
  const elements = useElements();

  const [status, setStatus] = useState("ready"); // ready | paying | done | error
  const [error, setError] = useState("");

  async function pay() {
    if (!stripe || !elements) return;
    setStatus("paying");

    const { error: err } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (err) {
      setError(err.message || "Erreur");
      setStatus("error");
      return;
    }

    // marquer le code cadeau utilisé
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

    setStatus("done");
  }

  return (
    <div className="max-w-md mx-auto bg-white border rounded-2xl p-5">
      <div className="text-sm text-stone-600 mb-2">
        Total à payer : <b>{eur(amountCents)}</b>
        {giftCode && ` (bon appliqué)`}
        <br />
        Caution (séparée) : {eur(depositCents)}
      </div>

      <PaymentElement />

      <button
        onClick={pay}
        disabled={status !== "ready"}
        className="w-full mt-4 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm disabled:bg-stone-200 disabled:text-stone-500 disabled:cursor-not-allowed"
      >
        {status === "paying" ? "Paiement en cours…" : "Payer"}
      </button>

      {status === "done" && (
        <div className="mt-3 text-emerald-800">Merci ! Paiement confirmé.</div>
      )}
      {status === "error" && (
        <div className="mt-3 text-red-700">{error}</div>
      )}
    </div>
  );
}
