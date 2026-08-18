"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

/* ============================================================
   CONFIGURATION
   ============================================================ */

const EXTRAS = [
  {
    key: "fruits",
    label: "Plateau fruits de mer",
    description: "Une attention gourmande à partager",
    icon: "🦐",
    price: 65,
  },
  {
    key: "champagne",
    label: "Champagne",
    description: "Pour trinquer à cette parenthèse",
    icon: "🥂",
    price: 45,
  },
  {
    key: "petales",
    label: "Pétales de rose",
    description: "Une petite touche romantique",
    icon: "🌹",
    price: 15,
  },
  {
    key: "charcuterie",
    label: "Plateau charcuterie",
    description: "À savourer tranquillement au chalet",
    icon: "🧀",
    price: 30,
  },
  {
    key: "petitdej2",
    label: "Petit déjeuner (2 pers.)",
    description: "Pour prolonger le plaisir au réveil",
    icon: "🥐",
    price: 24,
  },
];

const GIFT_PLANS = {
  C2: [
    {
      key: "c2_week",
      label: "1 nuit en semaine",
      sublabel: "Du dimanche au jeudi",
      amount: 110,
      validity: "week",
    },
    {
      key: "c2_weekend",
      label: "1 nuit le week-end",
      sublabel: "Vendredi ou samedi",
      amount: 130,
      validity: "weekend",
    },
  ],

  C1: [
    {
      key: "c1_2n",
      label: "2 nuits",
      sublabel: "Séjour de 2 nuits",
      amount: 140,
      nights: 2,
    },
    {
      key: "c1_3n",
      label: "3 nuits",
      sublabel: "Séjour de 3 nuits",
      amount: 210,
      nights: 3,
    },
    {
      key: "c1_4n",
      label: "4 nuits",
      sublabel: "Séjour de 4 nuits",
      amount: 280,
      nights: 4,
    },
  ],
};

/* ============================================================
   HELPERS
   ============================================================ */

const eur = (n) =>
  (n || 0).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

const chaletLabel = (id) =>
  id === "C2"
    ? "Ty-Koad Duo · Spa privatif"
    : "Ty-Koad · 2 chambres / 2 SDB";

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

/* ============================================================
   TITRE D'ÉTAPE
   ============================================================ */

function StepTitle({ number, title, description, optional = false }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-sm font-bold text-white shadow-sm">
        {number}
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-stone-900">
            {title}
          </h3>

          {optional && (
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-500">
              Facultatif
            </span>
          )}
        </div>

        {description && (
          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-stone-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   APERÇU DU CHÈQUE CADEAU
   ============================================================ */

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

  return (
    <section>
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
            👀 Aperçu en direct
          </div>

          <h2 className="mt-2 text-xl font-bold text-stone-900">
            Votre chèque cadeau
          </h2>

          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            Il se personnalise automatiquement avec vos choix.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-100 via-stone-50 to-amber-50 p-3 sm:p-5">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-amber-300/30 blur-3xl" />

        <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-xl">
          {/* EN-TÊTE */}
          <div className="relative overflow-hidden bg-emerald-950 px-5 py-5 sm:px-6 sm:py-6 text-white">
            <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-emerald-700/40 blur-2xl" />

            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20 bg-white shadow">
                  <Image
                    src="/logo-tykoad.png"
                    alt="Les Chalets Ty-Koad"
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-emerald-200">
                    Les Chalets Ty-Koad
                  </div>

                  <div className="mt-0.5 font-semibold">
                    Chèque cadeau
                  </div>
                </div>
              </div>

              <div className="text-3xl">
                🎁
              </div>
            </div>

            <div className="relative mt-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-200">
                Une parenthèse en Bretagne
              </div>

              <div className="mt-1 text-2xl sm:text-3xl font-bold">
                Un séjour à vivre
              </div>
            </div>
          </div>

          {/* DESTINATAIRE */}
          <div className="px-5 pt-5 sm:px-6 sm:pt-6">
            <div className="text-[11px] uppercase tracking-wide text-stone-400">
              Ce cadeau est pour
            </div>

            <div className="mt-1 text-2xl font-bold text-stone-900">
              {toName || "Votre bénéficiaire"}
            </div>

            <div className="mt-3 text-sm text-stone-500">
              De la part de{" "}
              <strong className="font-semibold text-stone-800">
                {fromName || "vous"}
              </strong>
            </div>
          </div>

          {/* SÉJOUR */}
          <div className="mx-5 mt-5 sm:mx-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                {chalet === "C2" ? "♨️" : "🏡"}
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-wide text-emerald-700">
                  Le séjour offert
                </div>

                <div className="mt-1 font-semibold text-emerald-950">
                  {chaletLabel(chalet)}
                </div>

                <div className="mt-0.5 text-sm text-emerald-900/70">
                  {plan?.label || "Sélectionnez une formule"}
                </div>
              </div>
            </div>
          </div>

          {/* OPTIONS */}
          {extrasLabels.length > 0 && (
            <div className="px-5 mt-5 sm:px-6">
              <div className="text-[11px] uppercase tracking-wide text-stone-400">
                Les petites attentions
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {extrasLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] text-stone-700"
                  >
                    ✓ {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* MESSAGE */}
          {message?.trim() && (
            <div className="mx-5 mt-5 sm:mx-6 rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
              <div className="text-xl text-amber-700/50">
                “
              </div>

              <div className="-mt-2 text-sm italic leading-relaxed text-stone-700">
                {message}
              </div>
            </div>
          )}

          {/* TOTAL */}
          <div className="px-5 py-6 sm:px-6">
            <div className="border-t border-dashed border-stone-300 pt-5">
              <div className="grid grid-cols-[1fr_auto] gap-4 items-end">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-stone-400">
                    Valeur du cadeau
                  </div>

                  <div className="mt-1 text-3xl font-bold text-emerald-950">
                    {eur(amount)}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wide text-stone-400">
                    Code
                  </div>

                  <div className="mt-1 rounded-lg bg-stone-900 px-3 py-1.5 font-mono text-xs tracking-wider text-white">
                    {code}
                  </div>
                </div>
              </div>

              <p className="mt-5 text-[11px] leading-relaxed text-stone-400">
                Utilisable sur réservation selon les disponibilités et les
                conditions applicables aux Chalets Ty-Koad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FORMULAIRE
   ============================================================ */

export default function CadeauClient() {
  const [chalet, setChalet] = useState("C2");

  const [planKey, setPlanKey] = useState(
    GIFT_PLANS.C2[0].key
  );

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
        (sum, extra) =>
          sum + (extras[extra.key] ? extra.price : 0),
        0
      ),
    [extras]
  );

  const extrasLabels = useMemo(
    () =>
      EXTRAS.filter((extra) => extras[extra.key]).map(
        (extra) => extra.label
      ),
    [extras]
  );

  const total =
    (selectedPlan?.amount || 0) + extrasTotal;

  const onChaletChange = (value) => {
    setChalet(value);

    setPlanKey(
      GIFT_PLANS[value][0].key
    );
  };

  /* ============================================================
     PAIEMENT STRIPE
     ============================================================ */

  const submit = async (e) => {
    e.preventDefault();

    if (!selectedPlan) return;

    try {
      setLoading(true);

      const res = await fetch(
        "/api/gift/create-checkout",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            chalet,

            planKey: selectedPlan.key,

            extras: Object.keys(extras).filter(
              (key) => extras[key]
            ),

            fromName,

            buyerEmail,

            toName,

            toEmail,

            message,
          }),
        }
      );

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
          (err instanceof Error
            ? err.message
            : "inconnue")
      );

      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] items-start">
      {/* ========================================================
          FORMULAIRE
          ======================================================== */}

      <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
        {/* EN-TÊTE */}
        <div className="border-b border-stone-100 bg-gradient-to-r from-emerald-50/80 to-white px-5 py-5 sm:px-7 sm:py-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1 text-xs font-semibold text-emerald-900 shadow-sm">
            ✨ Composez votre cadeau
          </div>

          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-stone-900">
            Créez une expérience sur mesure
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600">
            Choisissez le séjour, ajoutez quelques attentions et personnalisez
            votre chèque cadeau.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="divide-y divide-stone-100"
        >
          {/* ====================================================
              1. CHALET
              ==================================================== */}

          <section className="p-5 sm:p-7">
            <StepTitle
              number="1"
              title="Choisissez l'expérience"
              description="Spa privatif à deux ou séjour en famille."
            />

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onChaletChange("C2")}
                className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 text-left transition-all ${
                  chalet === "C2"
                    ? "border-emerald-700 bg-emerald-50 shadow-sm ring-1 ring-emerald-700"
                    : "border-stone-200 bg-white hover:border-emerald-300 hover:shadow-sm"
                }`}
              >
                {chalet === "C2" && (
                  <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white">
                    ✓
                  </div>
                )}

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  ♨️
                </div>

                <div className="mt-4 font-bold text-stone-900">
                  Ty-Koad Duo
                </div>

                <div className="mt-1 text-xs sm:text-sm text-stone-500">
                  2 personnes · Spa entièrement privatif
                </div>

                <div className="mt-4 text-xs font-medium text-emerald-900">
                  À partir de 110 €
                </div>
              </button>

              <button
                type="button"
                onClick={() => onChaletChange("C1")}
                className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 text-left transition-all ${
                  chalet === "C1"
                    ? "border-emerald-700 bg-emerald-50 shadow-sm ring-1 ring-emerald-700"
                    : "border-stone-200 bg-white hover:border-emerald-300 hover:shadow-sm"
                }`}
              >
                {chalet === "C1" && (
                  <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white">
                    ✓
                  </div>
                )}

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  🏡
                </div>

                <div className="mt-4 font-bold text-stone-900">
                  Ty-Koad
                </div>

                <div className="mt-1 text-xs sm:text-sm text-stone-500">
                  Jusqu'à 4 personnes · 2 chambres
                </div>

                <div className="mt-4 text-xs font-medium text-emerald-900">
                  À partir de 140 €
                </div>
              </button>
            </div>
          </section>

          {/* ====================================================
              2. FORMULE
              ==================================================== */}

          <section className="p-5 sm:p-7">
            <StepTitle
              number="2"
              title="Choisissez la formule"
              description="Sélectionnez le séjour que vous souhaitez offrir."
            />

            <div className="mt-5 grid gap-3">
              {plans.map((plan) => {
                const selected = plan.key === planKey;

                return (
                  <label
                    key={plan.key}
                    className={`group relative flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-all ${
                      selected
                        ? "border-emerald-700 bg-emerald-50 shadow-sm ring-1 ring-emerald-700"
                        : "border-stone-200 bg-white hover:border-emerald-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      checked={selected}
                      onChange={() => setPlanKey(plan.key)}
                      className="sr-only"
                    />

                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                          selected
                            ? "border-emerald-800 bg-emerald-800 text-white"
                            : "border-stone-300 bg-white"
                        }`}
                      >
                        {selected && (
                          <span className="text-[11px] font-bold">
                            ✓
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="font-semibold text-stone-900">
                          {plan.label}
                        </div>

                        <div className="mt-0.5 text-xs text-stone-500">
                          {plan.sublabel}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 text-lg font-bold text-emerald-950">
                      {eur(plan.amount)}
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          {/* ====================================================
              3. OPTIONS
              ==================================================== */}

          <section className="p-5 sm:p-7">
            <StepTitle
              number="3"
              title="Ajoutez une petite attention"
              description="Rendez le cadeau encore plus spécial."
              optional
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {EXTRAS.map((extra) => {
                const selected = !!extras[extra.key];

                return (
                  <label
                    key={extra.key}
                    className={`relative cursor-pointer rounded-2xl border p-4 transition-all ${
                      selected
                        ? "border-emerald-600 bg-emerald-50 shadow-sm"
                        : "border-stone-200 bg-white hover:border-emerald-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={(event) =>
                        setExtras((current) => ({
                          ...current,
                          [extra.key]: event.target.checked,
                        }))
                      }
                      className="sr-only"
                    />

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-50 text-xl">
                        {extra.icon}
                      </div>

                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          selected
                            ? "border-emerald-700 bg-emerald-700 text-white"
                            : "border-stone-300"
                        }`}
                      >
                        {selected && (
                          <span className="text-[10px]">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 font-semibold text-stone-900">
                      {extra.label}
                    </div>

                    <div className="mt-1 text-xs leading-relaxed text-stone-500">
                      {extra.description}
                    </div>

                    <div className="mt-3 text-sm font-bold text-emerald-900">
                      + {eur(extra.price)}
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          {/* ====================================================
              4. PERSONNALISATION
              ==================================================== */}

          <section className="p-5 sm:p-7">
            <StepTitle
              number="4"
              title="Personnalisez le cadeau"
              description="Indiquez qui offre le cadeau et à qui il est destiné."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-stone-700">
                  Votre nom
                </label>

                <div className="relative mt-1.5">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-stone-400">
                    👤
                  </div>

                  <input
                    className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder="Votre prénom ou vos prénoms"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700">
                  Votre e-mail
                </label>

                <div className="relative mt-1.5">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-stone-400">
                    ✉️
                  </div>

                  <input
                    type="email"
                    className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="vous@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700">
                  Nom du bénéficiaire
                </label>

                <div className="relative mt-1.5">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-stone-400">
                    ❤️
                  </div>

                  <input
                    className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                    placeholder="À qui souhaitez-vous l'offrir ?"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-stone-700">
                    E-mail du bénéficiaire
                  </label>

                  <span className="text-[10px] uppercase tracking-wide text-stone-400">
                    Facultatif
                  </span>
                </div>

                <div className="relative mt-1.5">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-stone-400">
                    📩
                  </div>

                  <input
                    type="email"
                    className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    value={toEmail}
                    onChange={(e) => setToEmail(e.target.value)}
                    placeholder="beneficiaire@email.com"
                  />
                </div>

                <p className="mt-1.5 text-[11px] leading-relaxed text-stone-400">
                  Laissez vide si vous préférez lui remettre vous-même le
                  chèque cadeau.
                </p>
              </div>
            </div>
          </section>

          {/* ====================================================
              5. MESSAGE
              ==================================================== */}

          <section className="p-5 sm:p-7">
            <StepTitle
              number="5"
              title="Ajoutez votre message"
              description="Quelques mots qui apparaîtront sur le chèque cadeau."
              optional
            />

            <div className="mt-5">
              <textarea
                rows={4}
                className="w-full resize-none rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm leading-relaxed outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Joyeux anniversaire ! Profitez bien de cette parenthèse à deux… ❤️"
              />

              <div className="mt-2 flex justify-between gap-3 text-[11px] text-stone-400">
                <span>
                  Ce message apparaîtra sur le chèque.
                </span>

                <span>
                  {message.length} caractère{message.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </section>

          {/* ====================================================
              TOTAL + PAIEMENT
              ==================================================== */}

          <section className="bg-stone-50/70 p-5 sm:p-7">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-stone-500">
                  Séjour
                </span>

                <span className="font-semibold text-stone-900">
                  {eur(selectedPlan?.amount)}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                <span className="text-stone-500">
                  Options
                </span>

                <span className="font-semibold text-stone-900">
                  {eur(extrasTotal)}
                </span>
              </div>

              {extrasLabels.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {extrasLabels.map((label) => (
                    <span
                      key={label}
                      className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] text-emerald-800"
                    >
                      + {label}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-end justify-between gap-4 border-t border-stone-200 pt-4">
                <div>
                  <div className="text-xs text-stone-500">
                    Total à régler
                  </div>

                  <div className="mt-0.5 text-[11px] text-stone-400">
                    Paiement sécurisé
                  </div>
                </div>

                <div className="text-3xl font-bold text-emerald-950">
                  {eur(total)}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-900 px-5 py-4 text-sm sm:text-base font-bold text-white shadow-md transition hover:bg-emerald-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="animate-pulse">
                    ●
                  </span>
                  Redirection vers Stripe…
                </>
              ) : (
                <>
                  🔒 Acheter le chèque cadeau · {eur(total)}
                </>
              )}
            </button>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-stone-200 bg-white p-2.5">
                <div className="text-base">
                  🔒
                </div>

                <div className="mt-1 text-[10px] font-medium text-stone-600">
                  Paiement sécurisé
                </div>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-2.5">
                <div className="text-base">
                  📄
                </div>

                <div className="mt-1 text-[10px] font-medium text-stone-600">
                  PDF personnalisé
                </div>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-2.5">
                <div className="text-base">
                  ✉️
                </div>

                <div className="mt-1 text-[10px] font-medium text-stone-600">
                  Envoi par e-mail
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>

      {/* ========================================================
          APERÇU
          ======================================================== */}

      <div className="lg:sticky lg:top-24 rounded-[2rem] border border-stone-200 bg-white/90 p-4 sm:p-5 shadow-sm backdrop-blur">
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
  );
}
