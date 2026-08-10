"use client";

import { useEffect, useMemo, useState } from "react";

function Star({ filled = true }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      className={filled ? "text-amber-400" : "text-stone-300"}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.75l2.86 5.8 6.4.93-4.63 4.51 1.09 6.37L12 17.35l-5.72 3.01 1.09-6.37-4.63-4.51 6.4-.93L12 2.75z" />
    </svg>
  );
}

function StarsRow({ rating = 5 }) {
  const full = Math.round(Number(rating) || 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < full} />
      ))}
    </div>
  );
}

export default function GoogleReviewsMini({
  rating = 5.0,
  count = 0,
  reviews = [],
  googleUrl = "#",
}) {
  const safeReviews = useMemo(
    () => (Array.isArray(reviews) ? reviews : []),
    [reviews]
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (safeReviews.length <= 1) return;

    const t = setInterval(() => {
      setIdx((i) => (i + 1) % safeReviews.length);
    }, 5000);

    return () => clearInterval(t);
  }, [safeReviews.length]);

  const current = safeReviews[idx] || null;

  return (
    <div className="relative">
      {/* Liseré léger */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-emerald-200 via-stone-200 to-amber-200 opacity-80" />

      <div className="relative rounded-3xl border border-white/60 bg-white/90 backdrop-blur p-5 sm:p-6 shadow-sm">
        {/* EN-TÊTE */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Logo G simplifié */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white border border-stone-200 shadow-sm">
              <span className="text-xl font-bold text-stone-800">G</span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-stone-900 text-base">
                  Avis Google
                </span>

                <StarsRow rating={rating} />
              </div>

              <div className="mt-0.5 text-sm text-stone-600">
                <span className="font-bold text-stone-900">
                  {Number(rating || 0).toFixed(1).replace(".", ",")}
                </span>{" "}
                <span className="text-stone-500">
                  sur 5 · {count} avis
                </span>
              </div>
            </div>
          </div>

          <a
            href={googleUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 transition shadow-sm"
          >
            Voir les avis
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* AVIS */}
        {current ? (
          <div className="mt-5">
            <div
              key={idx}
              className="tk-fade-slide rounded-2xl border border-stone-200 bg-stone-50/70 px-4 py-4 sm:px-5"
            >
              <div className="flex items-center gap-1 mb-3">
                <StarsRow rating={5} />
              </div>

              <blockquote className="text-sm sm:text-base text-stone-700 leading-relaxed">
                “{current.text}”
              </blockquote>

              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="text-sm font-medium text-stone-900">
                  {current.author}
                </div>

                <div className="text-xs text-stone-500">
                  Avis Google
                </div>
              </div>
            </div>

            {/* POINTS DU CARROUSEL */}
            {safeReviews.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-1.5">
                {safeReviews.slice(0, 6).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIdx(i)}
                    className={[
                      "h-2 rounded-full transition-all",
                      i === idx
                        ? "w-7 bg-emerald-700"
                        : "w-2 bg-stone-300 hover:bg-stone-400",
                    ].join(" ")}
                    aria-label={`Afficher l’avis ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 text-sm text-stone-600">
            Nos avis clients sont disponibles sur Google.
          </div>
        )}

        {/* BAS DE CARTE */}
        <div className="mt-5 pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xs sm:text-sm text-stone-600">
            Vous avez séjourné chez nous ?
          </div>

          <a
            href={googleUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 text-sm font-semibold transition"
          >
            Laisser un avis Google
          </a>
        </div>
      </div>

      <style jsx>{`
        .tk-fade-slide {
          animation: tkFadeSlide 520ms ease-out both;
        }

        @keyframes tkFadeSlide {
          from {
            opacity: 0;
            transform: translateY(6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
