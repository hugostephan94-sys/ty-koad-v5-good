"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "tykoad_cookie_consent";
const META_PIXEL_ID = "27812680245025705";

export default function CookieConsent() {
  const [consent, setConsent] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const storedConsent = localStorage.getItem(CONSENT_KEY);

      if (storedConsent === "accepted") {
        setConsent("accepted");
        setShowBanner(false);
        return;
      }

      if (storedConsent === "refused") {
        setConsent("refused");
        setShowBanner(false);
        return;
      }

      setConsent(null);
      setShowBanner(true);
    } catch {
      setShowBanner(true);
    }
  }, []);

  function acceptCookies() {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {}

    setConsent("accepted");
    setShowBanner(false);
  }

  function refuseCookies() {
    try {
      localStorage.setItem(CONSENT_KEY, "refused");
    } catch {}

    setConsent("refused");
    setShowBanner(false);

    // Si Meta était déjà chargé pendant cette session,
    // on désactive son traitement futur.
    if (typeof window !== "undefined" && window.fbq) {
      try {
        window.fbq("consent", "revoke");
      } catch {}
    }
  }

  function reopenSettings() {
    setShowBanner(true);
  }

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* =====================================================
          META PIXEL
          Chargé uniquement après consentement
          ===================================================== */}
      {consent === "accepted" && (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(
                  window,
                  document,
                  'script',
                  'https://connect.facebook.net/en_US/fbevents.js'
                );

                fbq('consent', 'grant');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        </>
      )}

      {/* =====================================================
          BOUTON POUR MODIFIER LE CHOIX
          Toujours accessible
          ===================================================== */}
      {!showBanner && (
        <button
          type="button"
          onClick={reopenSettings}
          className="fixed bottom-3 left-3 z-[70] rounded-full border border-stone-300 bg-white/95 px-3 py-2 text-[11px] font-medium text-stone-700 shadow-md backdrop-blur transition hover:border-emerald-400 hover:text-emerald-900"
          aria-label="Gérer mes cookies"
        >
          Gérer mes cookies
        </button>
      )}

      {/* =====================================================
          BANDEAU DE CONSENTEMENT
          ===================================================== */}
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl">
            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                {/* TEXTE */}
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-lg"
                      aria-hidden="true"
                    >
                      🍪
                    </div>

                    <div className="font-semibold text-stone-900">
                      Respect de votre vie privée
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    Nous utilisons des cookies nécessaires au fonctionnement
                    du site. Avec votre accord, nous utilisons également le
                    Pixel Meta afin de mesurer l’efficacité de nos publicités
                    Facebook et Instagram.
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-stone-500">
                    Vous pouvez accepter ou refuser ces cookies publicitaires.
                    Votre choix n’empêche pas d’utiliser le site ni de
                    réserver.
                  </p>

                  <div className="mt-3">
                    <Link
                      href="/confidentialite"
                      className="text-xs font-medium text-emerald-800 hover:text-emerald-950 transition"
                    >
                      En savoir plus sur les cookies et la confidentialité →
                    </Link>
                  </div>
                </div>

                {/* BOUTONS */}
                <div className="grid w-full gap-2 sm:grid-cols-2 md:w-auto md:min-w-[320px]">
                  <button
                    type="button"
                    onClick={refuseCookies}
                    className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50"
                  >
                    Refuser
                  </button>

                  <button
                    type="button"
                    onClick={acceptCookies}
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                  >
                    Accepter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
