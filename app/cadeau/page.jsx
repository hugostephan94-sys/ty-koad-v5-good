"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import SiteHeader from "../../components/SiteHeader";

/* ---------- Config ---------- */
/* Ajuste librement les prix ci-dessous */
const EXTRAS = [
  { key: "fruits",      label: "Plateau fruits de mer",        price: 65 },
  { key: "champagne",   label: "Champagne",                    price: 45 },
  { key: "petales",     label: "Pétales de rose",              price: 15 },
  { key: "charcuterie", label: "Plateau charcuterie",          price: 30 },
  { key: "petitdej2",   label: "Petit déjeuner (2 pers.)",     price: 24 },
];

const GIFT_PLANS = {
  C2: [
    { key: "c2_week",    label: "1 nuit semaine (dim-jeu)",  amount: 110, validity: "week" },
    { key: "c2_weekend", label: "1 nuit week-end (ven-sam)", amount: 130, validity: "weekend" },
  ],
  C1: [
    { key: "c1_2n", label: "2 nuits (pack)", amount: 140, nights: 2 },
    { key: "c1_3n", label: "3 nuits (pack)", amount: 210, nights: 3 },
    { key: "c1_4n", label: "4 nuits (pack)", amount: 280, nights: 4 },
  ],
};

/* ---------- Helpers ---------- */
const eur = (n) =>
  (n || 0).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

const chaletLabel = (id) =>
  id === "C2"
    ? "Ty-Koad Duo (spa privatif)"
    : "Ty-Koad — 2 chambres / 2 SDB";

const giftCode = (fromName, toName) => {
  const base = (
    fromName +
    "-" +
    toName +
    "-" +
    new Date().toISOString().slice(0, 10)
  ).toUpperCase();
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    h = (h * 31 + base.charCodeAt(i)) >>> 0;
  }
  const chunk = (h.toString(36).toUpperCase() + "0000").slice(0, 8);
  return `TKO-${chunk.slice(0, 4)}-${chunk.slice(4, 8)}`;
};

/* ---------- Carte d’aperçu soignée ---------- */
function GiftPreview({
  chalet,
  plan,
  amount,
  fromName,
  toName,
  message,
  extrasLabels = [],
}) {
  const code = giftCode(
    fromName || "OFFRANT",
    toName || "BENEFICIAIRE"
  );
  const today = new Date().toLocaleDateString("fr-FR");

  return (
    <section className="space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold">
        Aperçu du chèque cadeau
      </h2>

      <div className="rounded-3xl border border-emerald-900/10 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 p-4 sm:p-6">
        <div className="relative mx-auto max-w-lg rounded-[28px] bg-white/90 shadow-2xl ring-1 ring-stone-200 backdrop-blur">
          {/* Notches (ticket) */}
          <div className="absolute -left-3 top-24 h-6 w-6 rounded-full bg-emerald-50 border border-stone-200" />
          <div className="absolute -right-3 top-24 h-6 w-6 rounded-full bg-emerald-50 border border-stone-200" />

          {/* En-tête avec logo */}
          <div className="flex items-center gap-3 px-6 pt-6">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-full bg-white border border-emerald-100 shadow-sm">
              <Image
                src="/logo-tykoad.png"
                alt="Les Chalets Ty-Koad"
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <div>
              <div className="text-sm text-emerald-900 font-semibold">
                Les Chalets Ty-Koad
              </div>
              <div className="text-xs text-stone-500">{today}</div>
            </div>
          </div>

          {/* Bandeau titre */}
          <div className="mx-6 mt-4 rounded-xl bg-gradient-to-r from-emerald-900 to-teal-700 px-4 py-2 text-white text-sm font-medium shadow">
            🎁 Chèque cadeau Ty-Koad
          </div>

          {/* Corps */}
          <div className="px-6 py-5">
            <div className="text-xs text-stone-500">Pour</div>
            <div className="text-xl font-semibold">
              {toName || "Nom du bénéficiaire"}
            </div>

            <div className="mt-3 text-xs text-stone-500">De la part de</div>
            <div className="font-medium">
              {fromName || "Votre nom"}
            </div>

            <div className="mt-4 rounded-xl bg-stone-50/80 border border-stone-200 p-3">
              <div className="text-xs text-stone-600">Séjour</div>
              <div className="font-medium">
                {chaletLabel(chalet)} —{" "}
                {plan?.label || "Sélectionnez une formule"}
              </div>
            </div>

            {extrasLabels.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-stone-600">Options</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {extrasLabels.map((l) => (
                    <span
                      key={l}
                      className="rounded-full bg-emerald-50 text-emerald-900 text-[11px] px-2 py-1 border border-emerald-100"
                    >
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
                <div className="text-2xl font-bold text-emerald-900">
                  {eur(amount)}
                </div>
              </div>
              <div className="rounded-xl border border-stone-200 p-3">
                <div className="text-xs text-stone-500">Code</div>
                <div className="mt-1 font-mono text-base tracking-widest bg-stone-900 text-white px-3 py-1 rounded-md inline-block">
                  {code}
                </div>
              </div>
            </div>
          </div>

          {/* Pied + perforation */}
          <div className="px-6 pb-6">
            <div className="my-4 h-[10px] w-full bg-[radial-gradient(circle,_rgba(0,0,0,0.18)_2px,transparent_2px)] bg-[length:10px_10px]" />
            <div className="rounded-xl bg-stone-50 border border-stone-200 px-4 py-3 text-[12px] text-stone-600">
              Ce bon s’utilise lors d’une réservation (site direct ou plateforme),
              dans la limite des disponibilités et selon nos CGV.
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
  const selectedPlan =
    plans.find((p) => p.key === planKey) || plans[0];

  const extrasTotal = useMemo(
    () =>
      EXTRAS.reduce(
        (s, e) => s + (extras[e.key] ? e.price : 0),
        0
      ),
    [extras]
  );

  const extrasLabels = useMemo(
    () => EXTRAS.filter((e) => extras[e.key]).map((e) => e.label),
    [extras]
  );

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
      if (data.error) {
        alert("Erreur: " + data.error);
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      alert(
        "Erreur réseau: " +
          (err instanceof Error ? err.message : "inconnue")
      );
      setLoading(false);
    }
  };

  return (
    <>
      <SiteHeader />

      <main className="pt-4 sm:pt-6 md:pt-10 pb-12 md:pb-16">
        <section className="space-y-6 sm:space-y-8">
          {/* Titre / intro */}
          <header className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Chèque cadeau Ty-Koad
            </h1>
            <p className="mt-3 text-sm sm:text-base text-stone-700">
              Offrez un séjour dans l’un de nos chalets, avec la possibilité
              d’ajouter un plateau fruits de mer, du champagne, un petit
              déjeuner… De quoi faire un cadeau vraiment mémorable 💫
            </p>
          </header>

          {/* Contenu principal */}
          <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
            {/* Formulaire */}
            <div className="bg-white/90 rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
              <form
                onSubmit={submit}
                className="space-y-5 text-sm sm:text-[15px]"
              >
                {/* Chalet */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-600">
                    Chalet
                  </label>
                  <select
                    value={chalet}
                    onChange={(e) => onChaletChange(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="C2">
                      Ty-Koad Duo (spa privatif)
                    </option>
                    <option value="C1">
                      Ty-Koad (2 chambres / 2 SDB)
                    </option>
                  </select>
                </div>

                {/* Plan */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-stone-600">
                    {chalet === "C2"
                      ? "Type de nuit"
                      : "Pack nuits"}
                  </label>
                  <div className="grid gap-2">
                    {plans.map((p) => (
                      <label
                        key={p.key}
                        className={`flex items-center justify-between rounded-xl border px-3 py-2.5 cursor-pointer transition ${
                          p.key === planKey
                            ? "border-emerald-900 bg-emerald-50"
                            : "border-stone-300 bg-white hover:border-emerald-400"
                        }`}
                      >
                        <span className="flex-1 pr-3">
                          <span className="font-medium">
                            {p.label}
                          </span>
                          {p.validity === "week" && (
                            <span className="ml-2 text-xs text-stone-500">
                              (valable dim-jeu)
                            </span>
                          )}
                          {p.validity === "weekend" && (
                            <span className="ml-2 text-xs text-stone-500">
                              (valable ven-sam)
                            </span>
                          )}
                          {p.nights && (
                            <span className="ml-2 text-xs text-stone-500">
                              ({p.nights} nuit{p.nights > 1 ? "s" : ""})
                            </span>
                          )}
                        </span>
                        <input
                          type="radio"
                          name="plan"
                          checked={planKey === p.key}
                          onChange={() => setPlanKey(p.key)}
                          className="h-4 w-4"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Extras */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-stone-600">
                    Options gourmandes & romance
                  </div>
                  <div className="space-y-2 sm:grid sm:grid-cols-2 sm:gap-2">
                    {EXTRAS.map((e) => (
                      <label
                        key={e.key}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={!!extras[e.key]}
                          onChange={(ev) =>
                            setExtras((x) => ({
                              ...x,
                              [e.key]: ev.target.checked,
                            }))
                          }
                          className="h-4 w-4"
                        />
                        <span className="flex-1">
                          {e.label} — {eur(e.price)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Infos offrants / bénéficiaire */}
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-600">
                      De la part de
                    </label>
                    <input
                      className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      value={fromName}
                      onChange={(e) =>
                        setFromName(e.target.value)
                      }
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-600">
                      Votre e-mail (reçu)
                    </label>
                    <input
                      type="email"
                      className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      value={buyerEmail}
                      onChange={(e) =>
                        setBuyerEmail(e.target.value)
                      }
                      placeholder="vous@email.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-600">
                      Pour (bénéficiaire)
                    </label>
                    <input
                      className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      value={toName}
                      onChange={(e) =>
                        setToName(e.target.value)
                      }
                      placeholder="Nom du bénéficiaire"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-600">
                      E-mail du bénéficiaire (optionnel)
                    </label>
                    <input
                      type="email"
                      className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      value={toEmail}
                      onChange={(e) =>
                        setToEmail(e.target.value)
                      }
                      placeholder="parent@email.com"
                    />
                  </div>
                </div>

                {/* Message perso */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-600">
                    Message personnel (affiché sur le PDF)
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    placeholder="Joyeux anniversaire, profitez bien de ce moment à deux… 💕"
                  />
                </div>

                {/* Récap total */}
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Chèque cadeau</span>
                    <span>{eur(selectedPlan?.amount)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Options</span>
                    <span>{eur(extrasTotal)}</span>
                  </div>
                  <div className="mt-1 pt-2 border-t flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <span>{eur(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-emerald-900 text-white font-medium text-sm sm:text-base shadow-sm hover:bg-emerald-800 disabled:opacity-70 disabled:cursor-not-allowed transition"
                >
                  {loading
                    ? "Redirection vers Stripe…"
                    : "Acheter le chèque cadeau"}
                </button>

                <p className="text-[11px] text-stone-500">
                  Paiement sécurisé via Stripe. Le chèque cadeau est envoyé
                  par e-mail au format PDF.
                </p>
              </form>
            </div>

            {/* Aperçu live */}
            <div className="bg-white/80 rounded-3xl border border-stone-200 p-4 sm:p-5 md:p-6">
              <GiftPreview
                chalet={chalet}
                plan={selectedPlan}
                amount={total}
                fromName={fromName}
                toName={toName}
                message={message}
                extrasLabels={extrasLabels}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
