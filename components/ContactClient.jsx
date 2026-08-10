"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function ContactClient() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const formRef = useRef(null);

  async function onSubmit(e) {
    e.preventDefault();

    setErr("");
    setOk(false);

    const form = formRef.current || e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: fd.get("name")?.toString().trim(),
      email: fd.get("email")?.toString().trim(),
      phone: fd.get("phone")?.toString().trim(),
      subject: fd.get("subject")?.toString(),
      message: fd.get("message")?.toString().trim(),
      website: fd.get("website")?.toString().trim() || "",
    };

    if (!payload.name || !payload.email || !payload.message) {
      setErr("Merci de renseigner nom, e-mail et message.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur serveur");
      }

      setOk(true);
      form?.reset();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Erreur inconnue";

      setErr(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.6fr)] items-start">
      {/* FORMULAIRE */}
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="space-y-5 bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 md:p-7 shadow-sm text-sm sm:text-[15px]"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-stone-900">
            Envoyez-nous un message
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            Donnez-nous le maximum d’informations pour que nous puissions
            vous répondre précisément.
          </p>
        </div>

        {/* HONEYPOT ANTI-BOT */}
        <input
          type="text"
          name="website"
          autoComplete="off"
          className="hidden"
          tabIndex={-1}
        />

        {/* NOM + EMAIL */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label
              htmlFor="contact-name"
              className="text-xs font-medium text-stone-600"
            >
              Nom / Prénom *
            </label>

            <input
              id="contact-name"
              name="name"
              required
              autoComplete="name"
              className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Votre nom complet"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="contact-email"
              className="text-xs font-medium text-stone-600"
            >
              E-mail *
            </label>

            <input
              id="contact-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="vous@email.com"
            />
          </div>
        </div>

        {/* TELEPHONE */}
        <div className="space-y-1">
          <label
            htmlFor="contact-phone"
            className="text-xs font-medium text-stone-600"
          >
            Téléphone
            <span className="ml-1 font-normal text-stone-400">
              (optionnel)
            </span>
          </label>

          <input
            id="contact-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="06…"
          />
        </div>

        {/* SUJET */}
        <div className="space-y-1">
          <label
            htmlFor="contact-subject"
            className="text-xs font-medium text-stone-600"
          >
            Votre demande concerne
          </label>

          <select
            id="contact-subject"
            name="subject"
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option>Question générale</option>
            <option>Réservation / disponibilité</option>
            <option>Ty-Koad Duo / spa privatif</option>
            <option>Ty-Koad / 2 chambres</option>
            <option>Chèque cadeau</option>
            <option>Gourmets (plateaux / petit-déjeuner)</option>
            <option>Autre</option>
          </select>
        </div>

        {/* MESSAGE */}
        <div className="space-y-1">
          <label
            htmlFor="contact-message"
            className="text-xs font-medium text-stone-600"
          >
            Message *
          </label>

          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            className="mt-1 w-full rounded-2xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Détaillez votre demande, vos dates éventuelles, le chalet souhaité…"
          />

          <p className="mt-1 text-[11px] text-stone-500">
            Les champs marqués d’une * sont obligatoires.
          </p>
        </div>

        {/* ERREUR */}
        {err && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs sm:text-sm text-red-800"
          >
            <div className="font-semibold">
              Impossible d’envoyer le message
            </div>

            <div className="mt-1">
              {err}
            </div>
          </div>
        )}

        {/* SUCCÈS */}
        {ok && (
          <div
            role="status"
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs sm:text-sm text-emerald-900"
          >
            <div className="font-semibold">
              ✓ Votre message est bien envoyé
            </div>

            <div className="mt-1">
              Merci ! Nous revenons vers vous rapidement.
            </div>
          </div>
        )}

        {/* BOUTON */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full sm:w-auto items-center justify-center px-5 py-3 rounded-xl bg-emerald-700 text-white text-sm sm:text-base font-semibold shadow-sm hover:bg-emerald-800 disabled:opacity-70 disabled:cursor-not-allowed transition"
        >
          {loading ? "Envoi en cours…" : "Envoyer mon message"}
        </button>

        <p className="text-[11px] text-stone-500">
          Les informations transmises sont utilisées uniquement pour répondre
          à votre demande.
        </p>
      </form>

      {/* COLONNE CONTACT */}
      <aside className="space-y-4">
        {/* TELEPHONE */}
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
          <div className="text-2xl">
            📞
          </div>

          <h2 className="mt-3 text-lg font-semibold text-emerald-950">
            Vous préférez nous appeler ?
          </h2>

          <p className="mt-2 text-sm text-emerald-950/80">
            Vous pouvez également nous joindre directement par téléphone.
          </p>

          <a
            href="tel:0695491124"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900 transition"
          >
            06 95 49 11 24
          </a>
        </div>

        {/* AVANT DE CONTACTER */}
        <div className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-900">
            Peut-être avons-nous déjà la réponse
          </h2>

          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            Horaires, arrivée autonome, caution, animaux ou fonctionnement du
            spa : retrouvez les principales informations avant votre séjour.
          </p>

          <Link
            href="/infos-pratiques"
            className="mt-4 inline-flex text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition"
          >
            Voir les infos pratiques →
          </Link>
        </div>

        {/* RESERVATION */}
        <div className="rounded-3xl bg-emerald-950 p-5 sm:p-6 text-white shadow-sm">
          <div className="text-xs uppercase tracking-[0.15em] text-emerald-200">
            Vous connaissez vos dates ?
          </div>

          <h2 className="mt-2 text-lg font-semibold">
            Vérifiez directement les disponibilités
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-emerald-50/90">
            Le calendrier de réservation vous permet de consulter les dates et
            les tarifs disponibles.
          </p>

          <Link
            href="/reserver"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-50 transition"
          >
            Voir les disponibilités
          </Link>
        </div>
      </aside>
    </div>
  );
}
