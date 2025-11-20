"use client";
import { useMemo, useState } from "react";
import SiteHeader from "../../components/SiteHeader";

/* ---------- Config ---------- */
/* Ajuste librement les prix ci-dessous */
const EXTRAS = [
  { key: "fruits",      label: "Plateau fruits de mer", price: 65 },
  { key: "champagne",   label: "Champagne",             price: 45 },
  { key: "petales",     label: "Pétales de rose",       price: 15 },
  { key: "charcuterie", label: "Plateau charcuterie",   price: 30 }, // ✅ ajouté
  { key: "petitdej2",   label: "Petit déjeuner (2 pers.)", price: 24 }, // ✅ ajouté
];

const GIFT_PLANS = {
  C2: [
    { key: "c2_week",    label: "1 nuit semaine (dim-jeu)", amount: 130, validity: "week" },
    { key: "c2_weekend", label: "1 nuit week-end (ven-sam)", amount: 150, validity: "weekend" },
  ],
  C1: [
    { key: "c1_2n", label: "2 nuits (pack)", amount: 140, nights: 2 },
    { key: "c1_3n", label: "3 nuits (pack)", amount: 210, nights: 3 },
    { key: "c1_4n", label: "4 nuits (pack)", amount: 280, nights: 4 },
  ],
};

/* ---------- Helpers ---------- */
const eur = (n) => (n || 0).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const chaletLabel = (id) => (id === "C2" ? "Ty-Koad Duo (spa privatif)" : "Ty-Koad — 2 chambres / 2 SDB");
const giftCode = (fromName, toName) => {
  const base = (fromName + "-" + toName + "-" + new Date().toISOString().slice(0, 10)).toUpperCase();
  let h = 0; for (let i = 0; i < base.length; i++) h = (h * 31 + base.charCodeAt(i)) >>> 0;
  const chunk = (h.toString(36).toUpperCase() + "0000").slice(0, 8);
  return `TKO-${chunk.slice(0, 4)}-${chunk.slice(4, 8)}`;
};

/* ---------- Petit logo “triskell” en SVG ---------- */
function Triskell({ className = "h-9 w-9" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="#065f46" />
          <stop offset="1" stopColor="#0ea5a0" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="none" stroke="url(#g)" strokeWidth="4" />
      <g fill="url(#g)">
        <path d="M50 48c8-12 18-10 18-20 0-6-5-11-11-11S46 22 46 28c0 3 1 5 4 8z" />
        <path d="M52 50c-12 8-10 18-20 18-6 0-11-5-11-11s5-11 11-11c3 0 5 1 8 4z" />
        <path d="M54 52c8 12 18 10 18 20 0 6-5 11-11 11s-11-5-11-11c0-3 1-5 4-8z" />
      </g>
    </svg>
  );
}

/* ---------- Carte d’aperçu soignée ---------- */
function GiftPreview({ chalet, plan, amount, fromName, toName, message, extrasLabels = [] }) {
  const code = giftCode(fromName || "OFFRANT", toName || "BENEFICIAIRE");
  const today = new Date().toLocaleDateString("fr-FR");

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Aperçu</h2>

      <div className="rounded-3xl border border-emerald-900/10 bg-gradient-to-br from-emerald-50 to-white p-6">
        <div className="relative mx-auto max-w-lg rounded-[28px] bg-white/90 shadow-2xl ring-1 ring-stone-200 backdrop-blur">
          {/* Notches (ticket) */}
          <div className="absolute -left-3 top-24 h-6 w-6 rounded-full bg-emerald-50 border border-stone-200" />
          <div className="absolute -right-3 top-24 h-6 w-6 rounded-full bg-emerald-50 border border-stone-200" />

          {/* En-tête */}
          <div className="flex items-center justify-between px-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-50 p-1 ring-1 ring-emerald-900/10">
                <Triskell />
              </div>
              <div>
                <div className="text-sm text-emerald-900 font-semibold">Les Chalets Ty-Koad</div>
                <div className="text-xs text-stone-500">{today}</div>
              </div>
            </div>
            <div
              className="h-12 w-12 rounded-full opacity-90"
              style={{
                background: "conic-gradient(from 0deg, #34d399, #06b6d4, #a78bfa, #f59e0b, #34d399)",
                filter: "saturate(1.2)",
              }}
              aria-hidden
            />
          </div>

          {/* Bandeau titre */}
          <div className="mx-6 mt-4 rounded-xl bg-gradient-to-r from-emerald-900 to-teal-700 px-4 py-2 text-white text-sm font-medium shadow">
            🎁 Chèque cadeau
          </div>

          {/* Corps */}
          <div className="px-6 py-5">
            <div className="text-xs text-stone-500">Pour</div>
            <div className="text-xl font-semibold">{toName || "Nom du bénéficiaire"}</div>

            <div className="mt-3 text-xs text-stone-500">De la part de</div>
            <div className="font-medium">{fromName || "Votre nom"}</div>

            <div className="mt-4 rounded-xl bg-stone-50/80 border border-stone-200 p-3">
              <div className="text-xs text-stone-600">Séjour</div>
              <div className="font-medium">{chaletLabel(chalet)} — {plan?.label || "…"}</div>
            </div>

            {extrasLabels.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-stone-600">Options</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {extrasLabels.map((l) => (
                    <span key={l} className="rounded-full bg-emerald-50 text-emerald-900 text-[11px] px-2 py-1 border border-emerald-100">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {message?.trim() && (
              <div className="mt-4 italic text-stone-700 bg-emerald-50/60 border border-emerald-100 rounded-xl p-3">
                « {message} »
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-stone-200 p-3">
                <div className="text-xs text-stone-500">Montant</div>
                <div className="text-2xl font-bold text-emerald-900">{eur(amount)}</div>
              </div>
              <div className="rounded-xl border border-stone-200 p-3">
                <div className="text-xs text-stone-500">Code</div>
                <div className="font-mono text-base tracking-widest bg-stone-900 text-white px-3 py-1 rounded-md inline-block">
                  {code}
                </div>
              </div>
            </div>
          </div>

          {/* Pied + perforation */}
          <div className="px-6 pb-6">
            <div className="my-4 h-[10px] w-full bg-[radial-gradient(circle,_rgba(0,0,0,0.18)_2px,transparent_2px)] bg-[length:10px_10px]" />
            <div className="rounded-xl bg-stone-50 border border-stone-200 px-4 py-3 text-[12px] text-stone-600">
              Ce bon s’utilise lors de la réservation (directe ou plateforme) selon nos CGV.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
export default function CadeauPage() {
  const [chalet, setChalet] = useState("C2");
  const [planKey, setPlanKey] = useState(GIFT_PLANS.C2[0].key);
  const [extras, setExtras] = useState({});
  const [fromName, setFromName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [toName, setToName] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const plans = GIFT_PLANS[chalet];
  const selectedPlan = plans.find((p) => p.key === planKey) || plans[0];

  const extrasTotal = useMemo(() => EXTRAS.reduce((s, e) => s + (extras[e.key] ? e.price : 0), 0), [extras]);
  const extrasLabels = useMemo(() => EXTRAS.filter((e) => extras[e.key]).map((e) => e.label), [extras]);

  const total = (selectedPlan?.amount || 0) + extrasTotal;

  const onChaletChange = (val) => {
    setChalet(val);
    setPlanKey(GIFT_PLANS[val][0].key);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) return;
    try {
      setLoading(true);
      const res = await fetch("/api/gift/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chalet,
          planKey: selectedPlan.key,
          extras: Object.keys(extras).filter((k) => extras[k]),
          fromName,
          buyerEmail,
          toName,
          toEmail,
          message,
        }),
      });
      const data = await res.json();
      if (data.error) { alert("Erreur: " + data.error); setLoading(false); return; }
      location.href = data.url;
    } catch (err) {
      alert("Erreur réseau: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <SiteHeader />
      <div className="h-16 md:h-16" />
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8">
        {/* Formulaire */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h1 className="text-2xl font-bold">Chèque cadeau</h1>
          <p className="mt-2 text-stone-600 text-sm">
            Offrez un séjour avec un <strong>montant fixe</strong> selon le chalet, et ajoutez des options gourmandes.
          </p>

          <form onSubmit={submit} className="mt-4 space-y-4">
            <div>
              <label className="text-xs text-stone-600">Chalet</label>
              <select value={chalet} onChange={(e) => onChaletChange(e.target.value)} className="mt-1 w-full rounded-xl border border-stone-300 p-2">
                <option value="C2">Ty-Koad Duo (spa privatif)</option>
                <option value="C1">Ty-Koad (2 chambres / 2 SDB)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-stone-600">{chalet === "C2" ? "Type de nuit" : "Pack nuits"}</label>
              <div className="mt-2 grid gap-2">
                {plans.map((p) => (
                  <label key={p.key} className={`flex items-center justify-between rounded-xl border p-3 text-sm cursor-pointer ${p.key === planKey ? "border-emerald-900 bg-emerald-50" : "border-stone-300 bg-white"}`}>
                    <span>
                      {p.label}
                      {p.validity === "week"    && <span className="ml-2 text-xs text-stone-500">(valable dim-jeu)</span>}
                      {p.validity === "weekend" && <span className="ml-2 text-xs text-stone-500">(valable ven-sam)</span>}
                      {p.nights && <span className="ml-2 text-xs text-stone-500">({p.nights} nuit{p.nights>1?"s":""})</span>}
                    </span>
                    <input type="radio" name="plan" checked={planKey === p.key} onChange={() => setPlanKey(p.key)} />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-stone-600 mb-1">Options gourmandes & romance</div>
              <div className="space-y-2">
                {EXTRAS.map((e) => (
                  <label key={e.key} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={!!extras[e.key]} onChange={(ev) => setExtras((x) => ({ ...x, [e.key]: ev.target.checked }))} />
                    <span>{e.label} — {eur(e.price)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div><label className="text-xs text-stone-600">De la part de</label>
                <input className="mt-1 w-full rounded-xl border border-stone-300 p-2" value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder="Votre nom" />
              </div>
              <div><label className="text-xs text-stone-600">Votre e-mail (reçu)</label>
                <input type="email" className="mt-1 w-full rounded-xl border border-stone-300 p-2" value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} placeholder="vous@email.com" />
              </div>
              <div><label className="text-xs text-stone-600">Pour (bénéficiaire)</label>
                <input className="mt-1 w-full rounded-xl border border-stone-300 p-2" value={toName} onChange={(e) => setToName(e.target.value)} placeholder="Nom du bénéficiaire" />
              </div>
              <div><label className="text-xs text-stone-600">E-mail du bénéficiaire (optionnel)</label>
                <input type="email" className="mt-1 w-full rounded-xl border border-stone-300 p-2" value={toEmail} onChange={(e) => setToEmail(e.target.value)} placeholder="parent@email.com" />
              </div>
            </div>

            <div>
              <label className="text-xs text-stone-600">Message personnel (affiché sur le PDF)</label>
              <textarea rows={3} className="mt-1 w-full rounded-xl border border-stone-300 p-2" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Joyeux anniversaire !" />
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm">
              <div className="flex items-center justify-between"><span>Chèque cadeau</span><span>{eur(selectedPlan?.amount)}</span></div>
              <div className="flex items-center justify-between"><span>Options</span><span>{eur(extrasTotal)}</span></div>
              <div className="mt-1 pt-2 border-t flex items-center justify-between font-semibold">
                <span>Total</span><span>{eur(total)}</span>
              </div>
            </div>

            <button disabled={loading} className="w-full px-4 py-3 rounded-xl bg-emerald-900 text-white font-medium">
              {loading ? "Redirection vers Stripe…" : "Acheter le chèque cadeau"}
            </button>
          </form>
        </div>

        {/* Aperçu live */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <GiftPreview chalet={chalet} plan={selectedPlan} amount={total} fromName={fromName} toName={toName} message={message} extrasLabels={extrasLabels} />
        </div>
      </section>
    </div>
  );
}
