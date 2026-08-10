"use client";

import { useEffect, useState } from "react";

const platforms = [
  {
    id: "google",
    name: "Google",
    score: "4,9 / 5",
    detail: "12 avis",
    badge: "Excellent",
    icon: "G",
    url: "https://www.google.com/maps/place/Ty+koad/@48.140941,-3.8319211,17z/data=!3m1!4b1!4m14!1m7!3m6!1s0x48112300530f71cf:0xafd238db29c29199!2sTy+koad!8m2!3d48.1409374!4d-3.8293462!16s%2Fg%2F11ydmj1lp1!3m5!1s0x48112300530f71cf:0xafd238db29c29199!8m2!3d48.1409374!4d-3.8293462!16s%2Fg%2F11ydmj1lp1",
  },
  {
    id: "booking",
    name: "Booking.com",
    score: "9,6 / 10",
    detail: "Ty-Koad Spa",
    badge: "Exceptionnel",
    icon: "B",
    url: "https://www.booking.com/hotel/fr/ty-koad-spa.fr.html",
  },
  {
    id: "airbnb",
    name: "Airbnb",
    score: "4,8 / 5",
    detail: "15 avis",
    badge: "Superhôte",
    icon: "A",
    url: "https://www.airbnb.fr/rooms/1557096196739955432",
  },
];

/*
  On ne copie volontairement pas de longs avis depuis les plateformes.

  Les textes ci-dessous résument les points qui reviennent dans les avis
  publics : propreté, calme, spa, équipement, communication et confort.

  Tu pourras ensuite me donner des captures de nouveaux avis précis si tu
  veux remplacer ces résumés par des citations exactes.
*/
const highlights = [
  {
    title: "Un chalet très propre",
    text: "La propreté et le soin apporté au logement font partie des points particulièrement appréciés par les voyageurs.",
    source: "Booking & Airbnb",
    icon: "✨",
  },
  {
    title: "Le spa fait la différence",
    text: "Les voyageurs apprécient particulièrement le spa privatif, le calme et l’intimité du Ty-Koad Duo.",
    source: "Booking & Airbnb",
    icon: "♨️",
  },
  {
    title: "Un séjour au calme",
    text: "L’environnement paisible et la tranquillité des lieux reviennent régulièrement dans les retours des voyageurs.",
    source: "Avis voyageurs",
    icon: "🌿",
  },
  {
    title: "Des hôtes disponibles",
    text: "La communication et la réactivité sont très bien évaluées, notamment sur Airbnb.",
    source: "Airbnb",
    icon: "💬",
  },
  {
    title: "Tout est prévu pour le séjour",
    text: "Le confort, les équipements et l’attention portée aux détails sont régulièrement mis en avant.",
    source: "Booking",
    icon: "🏡",
  },
];

function Stars() {
  return (
    <div
      className="flex items-center gap-0.5 text-amber-400"
      aria-label="5 étoiles"
    >
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </div>
  );
}

export default function GuestReviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (highlights.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % highlights.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const current = highlights[index];

  const previousReview = () => {
    setIndex(
      (currentIndex) =>
        (currentIndex - 1 + highlights.length) % highlights.length
    );
  };

  const nextReview = () => {
    setIndex((currentIndex) => (currentIndex + 1) % highlights.length);
  };

  return (
    <section className="max-w-6xl mx-auto px-4">
      {/* TITRE */}
      <div className="text-center mb-7">
        <div className="inline-flex rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-medium text-emerald-900">
          Avis voyageurs
        </div>

        <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-stone-900">
          Ils ont séjourné aux Chalets Ty-Koad
        </h2>

        <p className="mt-2 max-w-2xl mx-auto text-sm sm:text-base text-stone-600 leading-relaxed">
          Retrouvez les évaluations laissées par nos voyageurs sur Google,
          Booking.com et Airbnb.
        </p>
      </div>

      {/* 3 PLATEFORMES */}
      <div className="grid gap-4 sm:grid-cols-3">
        {platforms.map((platform) => (
          <a
            key={platform.id}
            href={platform.url}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-50 border border-stone-200 font-bold text-stone-800">
                {platform.icon}
              </div>

              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-900">
                {platform.badge}
              </span>
            </div>

            <div className="mt-4 text-sm font-semibold text-stone-700">
              {platform.name}
            </div>

            <div className="mt-1 text-2xl sm:text-3xl font-bold text-emerald-950">
              {platform.score}
            </div>

            <div className="mt-2">
              <Stars />
            </div>

            <div className="mt-2 text-xs sm:text-sm text-stone-500">
              {platform.detail}
            </div>

            <div className="mt-4 text-xs font-medium text-emerald-800">
              Voir sur {platform.name} <span aria-hidden="true">↗</span>
            </div>
          </a>
        ))}
      </div>

      {/* RETOURS VOYAGEURS */}
      <div className="mt-6 overflow-hidden rounded-3xl bg-emerald-950 text-white shadow-lg">
        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs sm:text-sm uppercase tracking-[0.18em] text-emerald-200">
                Ce que nos voyageurs apprécient
              </div>

              <div className="mt-3">
                <Stars />
              </div>
            </div>

            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl"
              aria-hidden="true"
            >
              {current.icon}
            </div>
          </div>

          <div key={index} className="tk-review">
            <h3 className="mt-6 text-xl sm:text-2xl md:text-3xl font-bold">
              {current.title}
            </h3>

            <p className="mt-3 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-emerald-50/90">
              {current.text}
            </p>

            <div className="mt-4 text-xs sm:text-sm text-emerald-200">
              Source : {current.source}
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {highlights.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Afficher le retour ${i + 1}`}
                  className={[
                    "h-2 rounded-full transition-all duration-200",
                    i === index
                      ? "w-8 bg-white"
                      : "w-2 bg-white/30 hover:bg-white/60",
                  ].join(" ")}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={previousReview}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition"
                aria-label="Retour précédent"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextReview}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition"
                aria-label="Retour suivant"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LIENS VERS LES PLATEFORMES */}
      <div className="mt-5 flex flex-wrap justify-center gap-2 sm:gap-3">
        {platforms.map((platform) => (
          <a
            key={platform.id}
            href={platform.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-stone-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 transition"
          >
            Avis {platform.name}
            <span className="ml-1.5" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>

      <style jsx>{`
        .tk-review {
          animation: tkReviewFade 500ms ease-out both;
        }

        @keyframes tkReviewFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
