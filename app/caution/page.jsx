// app/caution/page.jsx
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import SiteHeader from "../../components/SiteHeader";

function eurFromCents(cents) {
  const n = Number(cents || 0);
  return (n / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

function Checkout({ amountCents, token }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function onConfirm() {
    if (!stripe || !elements) return;
    setLoading(true);
    setErr("");
    setMsg("");

    const returnUrl = `${window.location.origin}/caution?token=${encodeURIComponent(
      token
    )}&success=1`;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: { return_url: returnUrl },
    });

    if (error) {
      setErr(error.message || "Erreur lors de la validation.");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "requires_capture") {
      setMsg("Merci ✅ L’empreinte bancaire est enregistrée.");
    } else if (paymentIntent?.status === "succeeded") {
      setMsg("Merci ✅ Paiement validé.");
    } else {
      setMsg("Merci ✅ Traitement effectué.");
    }

    setLoading(false);
  }

  return (
    <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 md:p-7 shadow-sm">
      <div className="text-sm text-stone-700 mb-3">
        Montant de la caution :{" "}
        <b className="text-stone-900">{eurFromCents(amountCents)}</b>
      </div>

      <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-3 text-[12px] text-stone-600 mb-4">
        Aucun débit immédiat : il s’agit d’une <b>empreinte bancaire</b> (pré-autorisation).
        Elle sera libérée après votre départ si tout est conforme.
      </div>

      <PaymentElement />

      <button
        onClick={onConfirm}
        disabled={!stripe || !elements || loading}
        className="w-full mt-4 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-medium shadow-sm disabled:bg-stone-200 disabled:text-stone-500 disabled:cursor-not-allowed transition"
      >
        {loading ? "Validation en cours…" : "Valider l’empreinte"}
      </button>

      {msg && <div className="mt-3 text-sm text-emerald-800">{msg}</div>}
      {err && <div className="mt-3 text-sm text-red-700">{err}</div>}
    </div>
  );
}

function CautionInner() {
  const search = useSearchParams();
  const token = (search.get("token") || "").trim();
  const success = search.get("success") === "1";

  const [clientSecret, setClientSecret] = useState(null);
  const [amountCents, setAmountCents] = useState(0);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  const stripePromise = useMemo(() => {
    if (!publishableKey) return null;
    return loadStripe(publishableKey);
  }, [publishableKey]);

  useEffect(() => {
    if (!token) return;

    (async () => {
      setError("");
      setClientSecret(null);
      setAlreadyDone(false);

      const res = await fetch("/api/deposit/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Impossible de préparer la caution.");
        return;
      }

      if (data.alreadyDone) {
        setAlreadyDone(true);
        setStatus(data.status || "");
        setAmountCents(Number(data.amountCents || 0));
        return;
      }

      if (!data.clientSecret) {
        setError("Impossible de préparer la caution (clientSecret manquant).");
        return;
      }

      setClientSecret(data.clientSecret);
      setAmountCents(Number(data.amountCents || 0));
    })();
  }, [token]);

  return (
    <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 md:p-7 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            Caution / dépôt de garantie
          </h1>

          <p className="mt-2 text-sm sm:text-base text-stone-700">
            Cette étape permet d’enregistrer une <b>empreinte bancaire</b> (pré-autorisation).
            <b> Aucun débit immédiat.</b>
          </p>

          {!token && (
            <div className="mt-5 rounded-xl border border-stone-200 bg-stone-50/60 p-4 text-sm text-stone-700">
              Cette page s’utilise via le lien reçu par e-mail.
            </div>
          )}

          {token && !publishableKey && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              Configuration Stripe manquante : <b>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</b>.
            </div>
          )}

          {token && error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {error}
            </div>
          )}

          {token && !error && !alreadyDone && !clientSecret && (
            <div className="mt-5 rounded-xl border border-stone-200 bg-stone-50/60 p-4 text-sm text-stone-700">
              Préparation de la caution…
            </div>
          )}

          {token && alreadyDone && !error && (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              ✅ Caution déjà enregistrée
              {amountCents ? ` (${eurFromCents(amountCents)})` : ""}.
              {status ? ` Statut : ${status}.` : ""}
            </div>
          )}

          {token && clientSecret && !alreadyDone && stripePromise && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, locale: "fr" }}
            >
              <Checkout amountCents={amountCents} token={token} />
            </Elements>
          )}

          {success && (
            <div className="mt-4 text-sm text-emerald-800">
              Paiement validé ✅
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
            >
              Retour à l’accueil
            </a>
          </div>

          <p className="mt-4 text-[11px] text-stone-500">
            En cas de souci, contactez Hugo & Nina.
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
