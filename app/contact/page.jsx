"use client";
import { useRef, useState } from "react";
import SiteHeader from "../../components/SiteHeader";

export default function ContactPage(){
  const [loading,setLoading] = useState(false);
  const [ok,setOk] = useState(false);
  const [err,setErr] = useState("");
  const formRef = useRef(null);

  async function onSubmit(e){
    e.preventDefault();
    setErr(""); setOk(false);

    const form = formRef.current || e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name")?.toString().trim(),
      email: fd.get("email")?.toString().trim(),
      phone: fd.get("phone")?.toString().trim(),
      subject: fd.get("subject")?.toString(),
      message: fd.get("message")?.toString().trim(),
      website: fd.get("website")?.toString().trim() || ""
    };
    if(!payload.name || !payload.email || !payload.message){
      setErr("Merci de renseigner nom, e-mail et message.");
      return;
    }

    try{
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if(!res.ok){ throw new Error(data.error || "Erreur serveur"); }

      setOk(true);
      form?.reset();
    }catch(e){
      setErr(e.message || "Erreur inconnue");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <SiteHeader />
      <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold">Nous contacter</h1>
        <p className="mt-2 text-stone-600">
          Une question sur une réservation, un chèque cadeau, ou les options gourmandes ?
          Écris-nous via ce formulaire — on te répond vite.
        </p>

        <form ref={formRef} onSubmit={onSubmit} className="mt-6 space-y-4 bg-white border border-stone-200 rounded-2xl p-6">
          {/* honeypot anti-bot */}
          <input type="text" name="website" autoComplete="off" className="hidden" tabIndex={-1} />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-600">Nom / Prénom *</label>
              <input name="name" required className="mt-1 w-full rounded-xl border border-stone-300 p-2" />
            </div>
            <div>
              <label className="text-xs text-stone-600">E-mail *</label>
              <input type="email" name="email" required className="mt-1 w-full rounded-xl border border-stone-300 p-2" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-stone-600">Téléphone (optionnel)</label>
              <input name="phone" className="mt-1 w-full rounded-xl border border-stone-300 p-2" />
            </div>
          </div>

          <div>
            <label className="text-xs text-stone-600">Sujet</label>
            <select name="subject" className="mt-1 w-full rounded-xl border border-stone-300 p-2">
              <option>Question générale</option>
              <option>Réservation / disponibilité</option>
              <option>Chèque cadeau</option>
              <option>Gourmets (plateaux / petit-déjeuner)</option>
              <option>Autre</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-stone-600">Message *</label>
            <textarea name="message" required rows={6} className="mt-1 w-full rounded-xl border border-stone-300 p-2" />
            <p className="text-[12px] text-stone-500 mt-1">Les champs marqués d’une * sont obligatoires.</p>
          </div>

          {err && <div className="text-red-700 text-sm">{err}</div>}
          {ok && (
            <div className="text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm">
              Merci ! Ton message est bien envoyé. On revient vers toi rapidement.
            </div>
          )}

          <div>
            <button disabled={loading} className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm">
              {loading ? "Envoi…" : "Envoyer"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-sm text-stone-600">
          <div className="font-medium">Infos pratiques</div>
          <div>Réponse généralement sous 24h (souvent beaucoup plus vite ✉️).</div>
        </div>
      </section>
    </div>
  );
}
