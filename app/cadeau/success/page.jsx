"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SiteHeader from "../../../components/SiteHeader";

export default function GiftSuccessPage() {
  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="max-w-xl mx-auto">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 shadow-sm">
                <p className="text-sm sm:text-base text-stone-700">
                  Validation en cours…
                </p>
              </div>
            }
          >
            <GiftSuccessInner />
          </Suspense>
        </section>
      </main>
    </>
  );
}

function GiftSuccessInner() {
  const search = useSearchParams();
  const session_id = search.get("session_id");
  const [state, setState] = useState({
    loading: true,
    error: undefined,
    code: undefined,
    downloadUrl: undefined,
  });

  useEffect(() => {
    let ignore = false;

    (async () => {
      if (!session_id) {
        setState({ loading: false, error: "Session introuvable" });
        return;
      }

      try {
        const res = await fetch("/api/gift/claim", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id }),
        });

        const data = await res.json();
        if (ignore) return;

        if (data.error) {
          setState({ loading: false, error: data.error });
        } else {
          setState({
            loading: false,
            error: undefined,
            code: data.code,
            downloadUrl: data.downloadUrl,
          });
        }
      } catch (err) {
        if (!ignore) {
          setState({
            loading: false,
            error:
              err instanceof Error
                ? err.message
                : "Une erreur inattendue est survenue",
          });
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, [session_id]);

  if (state.loading) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 shadow-sm">
        <p className="text-sm sm:text-base text-stone-700">
          Validation en cours…
        </p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-white p-6 sm:p-7 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-semibold text-rose-900">
          Oups…
        </h1>
        <p className="mt-2 text-sm sm:text-base text-rose-700">
          {state.error}
        </p>
        <Link
          href="/cadeau"
          className="inline-flex mt-4 w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-sm font-medium text-white shadow-sm transition"
        >
          Revenir à la page cadeau
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-6 sm:p-7 shadow-sm">
      <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900">
        Merci 🎁
      </h1>
      <p className="mt-2 text-sm sm:text-base text-stone-700">
        Votre paiement est confirmé. Le chèque cadeau a été envoyé par e-mail.
      </p>

      <div className="mt-5 p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-100">
        <div className="text-xs sm:text-sm text-emerald-900/80">
          Code du chèque cadeau
        </div>
        <div className="mt-1 font-mono text-lg sm:text-xl tracking-[0.3em] text-emerald-950 break-all">
          {state.code || "—"}
        </div>
      </div>

      {state.downloadUrl && (
        <a
          href={state.downloadUrl}
          className="inline-flex mt-6 w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-sm font-medium text-white shadow-sm transition"
        >
          Télécharger le PDF
        </a>
      )}

      <div className="mt-6">
        <Link
          href="/"
          className="text-sm sm:text-base text-emerald-900 underline underline-offset-4"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
