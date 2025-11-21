"use client";

import { useRef, useState } from "react";
import SiteHeader from "../../components/SiteHeader";

export default function ContactPage() {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erreur serveur");
      }

      setOk(true);
      form?.reset();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur inconnue";
      setErr(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="max-w-3xl mx-auto space-y-6">
          {/* Titre + intro */}
          <header>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Nous contacter
            </h1>
            <p className="mt-3 text-sm sm:text-base text-stone-700">
              Une question sur une réservation, un chèque cadeau, ou les options
              gourmandes ? Écrivez-nous via ce formulaire — on vous répond
              rapidement.
            </p>
          </header>

          {/* Formulaire */}
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="space-y-5 bg-white/95 border border-stone-200 rounded-2xl p-5 sm:p-6 md:p-7 shadow-sm text-sm sm:text-[15px]"
          >
            {/* honeypot anti-bot */}
            <input
              type="text"
              name="website"
              autoComplete="off"
              className="hidden"
              tabIndex={-1}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-600">
                  Nom / Prénom *
                </label>
                <input
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Votre nom complet"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-600">
                  E-mail *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="vous@email.com"
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-medium text-stone-600">
                  Téléphone (optionnel)
                </label>
                <input
                  name="phone"
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="06…"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-600">
                Sujet
              </label>
              <select
                name="subject"
                className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option>Question générale</option>
                <option>Réservation / disponibilité</option>
                <option>Chèque cadeau</option>
                <option>Gourmets (plateaux / petit-déjeuner)</option>
                <option>Autre</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-600">
                Message *
              </label>
              <textarea
                name="message"
                required
                rows={6}
                className="mt-1 w-full rounded-2xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Détaillez votre demande, vos dates, le chalet souhaité…"
              />
              <p className="text-[11px] text-stone-500 mt-1">
                Les champs marqués d’une * sont obligatoires.
              </p>
            </div>

            {err && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-800">
                {err}
              </div>
            )}

            {ok && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs sm:text-sm text-emerald-900">
                Merci ! Votre message est bien envoyé. Nous revenons vers vous
                rapidement.
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-700 text-white text-sm sm:text-base font-medium shadow-sm hover:bg-emerald-800 disabled:opacity-70 disabled:cursor-not-allowed transition"
              >
                {loading ? "Envoi…" : "Envoyer le message"}
              </button>
            </div>
          </form>

          <div className="text-xs sm:text-sm text-stone-600">
            <div className="font-medium">Infos pratiques</div>
            <div>
              Nous répondons en général sous 24h (souvent bien plus vite ✉️).
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
