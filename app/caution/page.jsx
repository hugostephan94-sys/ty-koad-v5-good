"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function DepositForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMsg("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) setMsg(error.message || "Erreur lors de la validation.");
    else if (paymentIntent?.status === "requires_capture")
      setMsg("✅ Empreinte bancaire validée. Merci !");
    else
      setMsg("✅ Terminé.");

    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 bg-white rounded-2xl border border-stone-200">
      <h1 className="text-xl font-semibold mb-2">Caution (empreinte bancaire)</h1>
      <p className="text-sm text-stone-600 mb-4">
        Aucun débit immédiat : c’est une empreinte bancaire. Elle sera annulée automatiquement après votre séjour si tout est OK.
      </p>

      <PaymentElement />

      <button disabled={!stripe || loading} className="mt-4 w-full rounded-xl px-4 py-3 bg-black text-white">
        {loading ? "Validation..." : "Valider la caution"}
      </button>

      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </form>
  );
}

export default function CautionPage() {
  const sp = useSearchParams();
  const token = sp.get("token");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (!token) return;
    (async () => {
      const r = await fetch("/api/deposit/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await r.json();
      setClientSecret(data.clientSecret || "");
    })();
  }, [token]);

  const options = useMemo(() => ({ clientSecret }), [clientSecret]);

  if (!token) return <div className="p-8 text-center">Lien invalide.</div>;
  if (!clientSecret) return <div className="p-8 text-center">Chargement…</div>;

  return (
    <Elements stripe={stripePromise} options={options}>
      <DepositForm />
    </Elements>
  );
}
