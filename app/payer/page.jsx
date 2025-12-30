// app/payer/page.jsx
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

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function eur(cents) {
  const n = Number(cents || 0);
  return (n / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
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
              Finalisez votre réservation. Le paiement est sécurisé via Stripe 🔒
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

function CheckoutShell() {
  const search = useSearchParams();

  const chalet = (search.get("chalet") || "").toUpperCase();
  const ci = search.get("ci") || "";
  const co = search.get("co") || "";
  const nights = Number(search.get("nights") || 0);

  const adults = Number(search.get("adults") || 1);
  const children = Number(search.get("children") || 0);

  const giftCode = (search.get("giftCode") || "").trim().toUpperCase();
  const firstname = search.get("firstname") || "";
  const emailFromUrl = search.get("email") || "";

  const [clientSecret, setClientSecret] = useState(null);
  const [amountCents, setAmountCents] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const [fetchError, setFetchError] = useState("");
  const [freeProcessing, setFreeProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chalet,
            ci,
            co,
            nights,
            adults,
            children,
            giftCode: giftCode || undefined,
            firstname: firstname || undefined,
            email: (emailFromUrl || "").trim() || undefined,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setFetchError(data.error || "Erreur lors de la préparation du paiement.");
          return;
        }

        setBreakdown(data.breakdown || null);
        setAmountCents(typeof data.amountCents === "number" ? data.amountCents : 0);

        // ✅ CAS GRATUIT : on envoie direct la confirmation + redirect success
        if (data.free) {
          setFreeProcessing(true);

          const paymentIntentId = data.paymentIntentId || "";
          try {
            await fetch("/api/send-confirmation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: (emailFromUrl || "").trim(),
                firstname,
                checkin: ci,
                checkout: co,
                chalet,
                nights,
                price: "0.00",
                paymentIntentId, // FREE_...
              }),
            });
          } catch {
            // on n'empêche pas la redirection
          }

          const params = new URLSearchParams({
            chalet: chalet || "",
            ci: ci || "",
            co: co || "",
            nights: String(nights || 0),
            amount: "0.00",
            pi: paymentIntentId,
            name: firstname || "",
            email: (emailFromUrl || "").trim(),
          });

          window.location.href = `/success?${params.toString()}`;
          return;
        }

        // ✅ CAS STRIPE normal
        if (!data.clientSecret) {
          setFetchError("clientSecret manquant.");
          return;
        }
        setClientSecret(data.clientSecret);
      } catch (e) {
        setFetchError(e?.message || "Erreur réseau.");
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

  if (freeProcessing) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 text-sm text-stone-700 shadow-sm">
        Votre chèque cadeau couvre 100% du séjour ✅<br />
        Confirmation en cours…
      </div>
    );
  }

  if (!clientSecret || amountCents === null) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 text-sm text-stone-700 shadow-sm">
        Préparation du paiement…
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutInner
        clientSecret={clientSecret}
        amountCents={amountCents}
        breakdown={breakdown}
        giftCode={giftCode}
        firstname={firstname}
        initialEmail={emailFromUrl}
        checkin={ci}
        checkout={co}
        chalet={chalet}
        nights={nights}
      />
    </Elements>
  );
}

function CheckoutInner({
  clientSecret,
  amountCents,
  breakdown,
  giftCode,
  firstname,
  initialEmail,
  checkin,
  checkout,
  chalet,
  nights,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [status, setStatus] = useState("ready");
  const [error, setError] = useState("");
  const [email, setEmail] = useState(initialEmail || "");

  const depositAmount = (chalet || "").toUpperCase() === "C2" ? 300 : 150;

  async function pay() {
    if (!stripe || !elements) return;

    if (!email.trim()) {
      setError("Merci de renseigner votre adresse e-mail.");
      return;
    }

    setStatus("paying");
    setError("");

    const { error: err, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        payment_method_data: {
          billing_details: { email: email.trim(), name: firstname || undefined },
        },
      },
    });

    if (err) {
      setError(err.message || "Erreur");
      setStatus("error");
      return;
    }

    const piId =
      paymentIntent?.id || ((clientSecret || "").split("_secret")[0] || "");

    // ✅ Plus de /api/gift/consume ici : c'est le webhook Stripe qui consomme le cadeau

    try {
      await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          firstname,
          checkin,
          checkout,
          chalet,
          nights,
          price: (amountCents / 100).toFixed(2),
          paymentIntentId: piId,
        }),
      });
    } catch {}

    setStatus("done");

    const params = new URLSearchParams({
      chalet: chalet || "",
      ci: checkin || "",
      co: checkout || "",
      nights: String(nights || 0),
      amount: (amountCents / 100).toFixed(2),
      pi: piId,
      name: firstname || "",
      email: email.trim(),
    });

    setTimeout(() => {
      window.location.href = `/success?${params.toString()}`;
    }, 500);
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 md:p-7 shadow-sm">
      <div className="text-xs sm:text-sm text-stone-600 mb-4 space-y-1">
        <div>
          Total à payer : <b className="text-stone-900">{eur(amountCents)}</b>
          {giftCode ? " (chèque cadeau appliqué)" : ""}
        </div>

        {breakdown ? (
          <div className="mt-2 text-[11px] sm:text-xs text-stone-500 space-y-0.5">
            <div>Prix de base : {eur(breakdown.baseTotalCents || 0)}</div>
            {(breakdown.autoDiscountCents || 0) > 0 ? (
              <div>
                {breakdown.autoDiscountLabel || "Remise automatique"} : −
                {eur(breakdown.autoDiscountCents)}
              </div>
            ) : null}
            {(breakdown.giftCents || 0) > 0 ? (
              <div>Code cadeau : −{eur(breakdown.giftCents)}</div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mb-4">
        <label className="block text-xs sm:text-sm text-stone-700 mb-1">
          Adresse e-mail pour la confirmation de réservation
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm"
          placeholder="ex : prenom.nom@email.com"
          required
        />
      </div>

      <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-3 sm:p-4 mb-4 text-[11px] sm:text-xs text-stone-600">
        Le paiement est traité par Stripe. Vos coordonnées bancaires ne sont jamais
        stockées par les Chalets Ty-Koad.
      </div>

      <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-3 sm:p-4 mb-4 text-[11px] sm:text-xs text-stone-700">
        <div className="font-medium text-stone-900 mb-1">Caution (empreinte bancaire)</div>
        <div>
          Montant : <b>{depositAmount}€</b> — aucun débit immédiat.
        </div>
        <div className="mt-1">
          Vous recevrez automatiquement un lien par e-mail <b>24h avant votre arrivée</b>.
        </div>
      </div>

      <div className="space-y-3">
        <PaymentElement />
        <button
          type="button"
          onClick={pay}
          disabled={status !== "ready"}
          className="w-full inline-flex items-center justify-center mt-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm sm:text-base font-medium shadow-sm disabled:bg-stone-200 disabled:text-stone-500 disabled:cursor-not-allowed transition"
        >
          {status === "paying" ? "Paiement en cours…" : "Payer"}
        </button>
      </div>

      {status === "done" ? (
        <div className="mt-3 text-sm text-emerald-800">Merci ! Votre paiement est confirmé ✅</div>
      ) : null}
      {status === "error" ? (
        <div className="mt-3 text-sm text-red-700">{error}</div>
      ) : null}
    </div>
  );
}
