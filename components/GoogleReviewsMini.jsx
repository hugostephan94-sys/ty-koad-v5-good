"use client";

import { useEffect, useMemo, useState } from "react";

function Star({ filled = true }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      className={filled ? "text-amber-400" : "text-stone-300"}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 17.27l-5.18 3.05 1.4-5.9-4.6-3.98 6.06-.52L12 4.5l2.32 5.42 6.06.52-4.6 3.98 1.4 5.9L12 17.27z" />
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
  const safeReviews = useMemo(() => (Array.isArray(reviews) ? reviews : []), [reviews]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (safeReviews.length <= 1) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % safeReviews.length);
    }, 4500);
    return () => clearInterval(t);
  }, [safeReviews.length]);

  const current = safeReviews[idx] || null;

  return (
    <div className="relative">
      {/* gradient border */}
      <div className="rounded-3xl p-[1px] bg-gradient-to-r from-emerald-200 via-stone-200 to-emerald-200 shadow-sm">
        {/* glass card */}
        <div className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl px-4 py-3 sm:px-5 sm:py-4 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-white/80 border border-stone-200 shadow-sm">
                  {/* “G” simple */}
                  <span className="font-bold text-stone-800 text-sm">G</span>
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900 text-sm">
                      Google
                    </span>
                    <StarsRow rating={rating} />
                  </div>

                  <div className="text-xs text-stone-600">
                    <span className="font-semibold text-stone-900">
                      {Number(rating || 0).toFixed(1).replace(".", ",")}
                    </span>{" "}
                    <span className="text-stone-500">
                      ({count} avis)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={googleUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white/80 px-3 py-2 text-xs sm:text-sm font-medium text-stone-800 hover:bg-white hover:border-emerald-300 hover:text-emerald-900 transition shadow-sm"
            >
              Voir les avis
              <span aria-hidden="true" className="text-stone-400">
                ↗
              </span>
            </a>
          </div>

          {/* review slider */}
          {current ? (
            <div className="mt-3">
              <div key={idx} className="tk-fade-slide rounded-2xl border border-stone-200/70 bg-white/60 px-3 py-2.5">
                <div className="text-[12px] sm:text-[13px] text-stone-700 leading-snug">
                  “{current.text}”
                </div>
                <div className="mt-1 text-[11px] text-stone-500">
                  — {current.author}
                </div>
              </div>

              {/* dots */}
              {safeReviews.length > 1 ? (
                <div className="mt-2 flex items-center gap-1.5">
                  {safeReviews.slice(0, 6).map((_, i) => (
                    <span
                      key={i}
                      className={[
                        "h-1.5 rounded-full transition-all",
                        i === idx ? "w-6 bg-emerald-700/70" : "w-1.5 bg-stone-300",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="mt-3 text-xs text-stone-600">
              Avis disponibles sur Google.
            </div>
          )}
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
