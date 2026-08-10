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

    const returnUrl = `${
      window.location.origin
    }/caution?token=${encodeURIComponent(token)}&success=1`;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: returnUrl,
      },
    });

    if (error) {
      setErr(error.message || "Erreur lors de la validation.");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "requires_capture") {
      setMsg(
        "Empreinte bancaire enregistrée ✅ Aucun débit immédiat n’a été effectué."
      );
    } else if (paymentIntent?.status === "succeeded") {
      setMsg("Validation effectuée avec succès ✅");
    } else {
      setMsg("Votre demande a bien été prise en compte ✅");
    }

    setLoading(false);
  }

  return (
    <div className="mt-6 rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-emerald-800 font-medium">
            Caution du séjour
          </div>

          <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-stone-900">
            Valider votre empreinte bancaire
          </h2>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-2">
          <div className="text-[11px] uppercase tracking-wide text-emerald-800">
            Montant
          </div>

          <div className="text-xl font-bold text-emerald-950">
            {eurFromCents(amountCents)}
          </div>
        </div>
      </div>

      {/* RÉASSURANCE */}
      <div className="mt-5 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-950">
        <div className="font-semibold">
          Aucun débit immédiat
        </div>

        <p className="mt-1 leading-relaxed">
          Il s’agit d’une <strong>empreinte bancaire</strong>, également
          appelée pré-autorisation. Le montant n’est utilisé qu’en cas de
          situation justifiée prévue dans nos conditions.
        </p>
      </div>

      {/* RAPPEL */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <div className="text-xl">🔒</div>

          <div className="mt-2 text-sm font-semibold text-stone-900">
            Sécurisé
          </div>

          <div className="mt-1 text-xs text-stone-500">
            Validation via Stripe
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <div className="text-xl">💳</div>

          <div className="mt-2 text-sm font-semibold text-stone-900">
            Pas de débit
          </div>

          <div className="mt-1 text-xs text-stone-500">
            Simple pré-autorisation
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <div className="text-xl">✅</div>

          <div className="mt-2 text-sm font-semibold text-stone-900">
            Libération
          </div>

          <div className="mt-1 text-xs text-stone-500">
            Si tout est conforme
          </div>
        </div>
      </div>

      {/* STRIPE */}
      <div className="mt-6 rounded-2xl border border-stone-200 p-4 sm:p-5">
        <PaymentElement />
      </div>

      <button
        type="button"
        onClick={onConfirm}
        disabled={!stripe || !elements || loading}
        className="w-full mt-5 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm sm:text-base font-semibold shadow-sm disabled:bg-stone-200 disabled:text-stone-500 disabled:cursor-not-allowed transition"
      >
        {loading
          ? "Validation en cours…"
          : `Valider l’empreinte de ${eurFromCents(amountCents)}`}
      </button>

      {msg && (
        <div
          role="status"
          className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        >
          {msg}
        </div>
      )}

      {err && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {err}
        </div>
      )}

      <p className="mt-4 text-[11px] leading-relaxed text-stone-500">
        Les informations bancaires sont saisies directement dans le module
        sécurisé Stripe.
      </p>
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

  const publishableKey =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

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

      try {
        const res = await fetch("/api/deposit/create-intent", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            token,
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setError(
            data.error || "Impossible de préparer la caution."
          );
          return;
        }

        if (data.alreadyDone) {
          setAlreadyDone(true);
          setStatus(data.status || "");
          setAmountCents(Number(data.amountCents || 0));
          return;
        }

        if (!data.clientSecret) {
          setError(
            "Impossible de préparer la caution (clientSecret manquant)."
          );
          return;
        }

        setClientSecret(data.clientSecret);
        setAmountCents(Number(data.amountCents || 0));
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "Impossible de préparer la caution."
        );
      }
    })();
  }, [token]);

  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="max-w-3xl mx-auto px-4">
          {/* HERO */}
          <header>
            <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
              Sécurisation de votre séjour
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-stone-900">
              Caution par empreinte bancaire
            </h1>

            <p className="mt-3 text-sm sm:text-base text-stone-700 leading-relaxed">
              Cette étape permet d’enregistrer une{" "}
              <strong>pré-autorisation bancaire</strong> pour votre séjour.
              Le montant indiqué n’est pas débité immédiatement.
            </p>
          </header>

          {/* EXPLICATION */}
          <div className="mt-6 rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold text-stone-900">
              Comment fonctionne la caution ?
            </h2>

            <div className="mt-4 space-y-3 text-sm text-stone-700">
              <div className="flex gap-3">
                <span className="font-semibold text-emerald-800">
                  1.
                </span>

                <p>
                  Vous validez l’empreinte bancaire avec votre carte.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold text-emerald-800">
                  2.
                </span>

                <p>
                  Aucun débit immédiat n’est effectué dans le cadre normal de
                  la pré-autorisation.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold text-emerald-800">
                  3.
                </span>

                <p>
                  Après votre séjour, si tout est conforme, aucune somme n’est
                  prélevée au titre de la caution.
                </p>
              </div>
            </div>

            <div className="mt-5">
              <a
                href="/cgv"
                className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition"
              >
                Consulter les conditions de caution →
              </a>
            </div>
          </div>

          {/* PAS DE TOKEN */}
          {!token && (
            <div className="mt-6 rounded-3xl border border-stone-200 bg-stone-50 p-5 sm:p-6">
              <div className="text-lg">✉️</div>

              <h2 className="mt-2 font-semibold text-stone-900">
                Utilisez le lien reçu par e-mail
              </h2>

              <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                Cette page est accessible à partir du lien personnel envoyé
                pour votre réservation avant votre arrivée.
              </p>
            </div>
          )}

          {/* CLE STRIPE MANQUANTE */}
          {token && !publishableKey && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              Configuration Stripe manquante :{" "}
              <strong>
                NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
              </strong>
              .
            </div>
          )}

          {/* ERREUR */}
          {token && error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <div className="font-semibold">
                Impossible de préparer la caution
              </div>

              <div className="mt-1">
                {error}
              </div>
            </div>
          )}

          {/* CHARGEMENT */}
          {token &&
            !error &&
            !alreadyDone &&
            !clientSecret && (
              <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
                <div className="flex items-center gap-3">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-stone-300 border-t-emerald-700" />

                  <span>
                    Préparation sécurisée de la caution…
                  </span>
                </div>
              </div>
            )}

          {/* DÉJÀ FAITE */}
          {token && alreadyDone && !error && (
            <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6 text-emerald-950">
              <div className="text-2xl">
                ✅
              </div>

              <h2 className="mt-2 text-lg font-semibold">
                Caution déjà enregistrée
              </h2>

              <p className="mt-2 text-sm">
                Votre empreinte bancaire a déjà été prise en compte
                {amountCents
                  ? ` pour un montant de ${eurFromCents(amountCents)}`
                  : ""}
                .
              </p>

              {status && (
                <p className="mt-2 text-xs text-emerald-800">
                  Statut : {status}
                </p>
              )}
            </div>
          )}

          {/* STRIPE */}
          {token &&
            clientSecret &&
            !alreadyDone &&
            stripePromise && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  locale: "fr",
                }}
              >
                <Checkout
                  amountCents={amountCents}
                  token={token}
                />
              </Elements>
            )}

          {/* SUCCES RETOUR */}
          {success && !alreadyDone && (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              Validation effectuée ✅
            </div>
          )}

          {/* LIENS */}
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
            >
              Retour à l’accueil
            </a>

            <a
              href="/infos-pratiques"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm text-stone-800 hover:border-emerald-500 hover:text-emerald-900 transition"
            >
              Infos pratiques
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 text-sm font-medium text-white hover:bg-emerald-800 transition"
            >
              Nous contacter
            </a>
          </div>

          <p className="mt-4 text-[11px] text-stone-500">
            En cas de difficulté, Hugo & Nina restent disponibles via la page
            contact.
          </p>
        </section>
      </main>
    </>
  );
}

export default function CautionPage() {
  return (
    <Suspense
      fallback={
        <>
          <SiteHeader />

          <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
            <section className="max-w-3xl mx-auto px-4">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
                Chargement…
              </div>
            </section>
          </main>
        </>
      }
    >
      <CautionInner />
    </Suspense>
  );
}
