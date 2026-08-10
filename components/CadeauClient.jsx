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
    price: 65,
  },
  {
    key: "champagne",
    label: "Champagne",
    price: 45,
  },
  {
    key: "petales",
    label: "Pétales de rose",
    price: 15,
  },
  {
    key: "charcuterie",
    label: "Plateau charcuterie",
    price: 30,
  },
  {
    key: "petitdej2",
    label: "Petit déjeuner (2 pers.)",
    price: 24,
  },
];

const GIFT_PLANS = {
  C2: [
    {
      key: "c2_week",
      label: "1 nuit semaine (dim-jeu)",
      amount: 110,
      validity: "week",
    },
    {
      key: "c2_weekend",
      label: "1 nuit week-end (ven-sam)",
      amount: 130,
      validity: "weekend",
    },
  ],

  C1: [
    {
      key: "c1_2n",
      label: "2 nuits (pack)",
      amount: 140,
      nights: 2,
    },
    {
      key: "c1_3n",
      label: "3 nuits (pack)",
      amount: 210,
      nights: 3,
    },
    {
      key: "c1_4n",
      label: "4 nuits (pack)",
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

  const today = new Date().toLocaleDateString("fr-FR");

  return (
    <section className="space-y-4">
      <div>
        <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-900">
          Aperçu en direct
        </div>

        <h2 className="mt-2 text-lg sm:text-xl font-semibold text-stone-900">
          Aperçu du chèque cadeau
        </h2>

        <p className="mt-1 text-xs sm:text-sm text-stone-500">
          Le contenu évolue automatiquement selon vos choix.
        </p>
      </div>

      <div className="rounded-3xl border border-emerald-900/10 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 p-4 sm:p-6">
        <div className="relative mx-auto max-w-lg rounded-[28px] bg-white/90 shadow-2xl ring-1 ring-stone-200 backdrop-blur">
          {/* ENCOCHES TICKET */}
          <div className="absolute -left-3 top-24 h-6 w-6 rounded-full bg-emerald-50 border border-stone-200" />

          <div className="absolute -right-3 top-24 h-6 w-6 rounded-full bg-emerald-50 border border-stone-200" />

          {/* LOGO */}
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

              <div className="text-xs text-stone-500">
                {today}
              </div>
            </div>
          </div>

          {/* TITRE */}
          <div className="mx-6 mt-4 rounded-xl bg-gradient-to-r from-emerald-900 to-teal-700 px-4 py-2 text-white text-sm font-medium shadow">
            🎁 Chèque cadeau Ty-Koad
          </div>

          {/* CORPS */}
          <div className="px-6 py-5">
            <div className="text-xs text-stone-500">
              Pour
            </div>

            <div className="text-xl font-semibold text-stone-900">
              {toName || "Nom du bénéficiaire"}
            </div>

            <div className="mt-3 text-xs text-stone-500">
              De la part de
            </div>

            <div className="font-medium text-stone-900">
              {fromName || "Votre nom"}
            </div>

            {/* SÉJOUR */}
            <div className="mt-4 rounded-xl bg-stone-50/80 border border-stone-200 p-3">
              <div className="text-xs text-stone-600">
                Séjour
              </div>

              <div className="font-medium text-stone-900">
                {chaletLabel(chalet)} —{" "}
                {plan?.label || "Sélectionnez une formule"}
              </div>
            </div>

            {/* OPTIONS */}
            {extrasLabels.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-stone-600">
                  Options
                </div>

                <div className="mt-1 flex flex-wrap gap-2">
                  {extrasLabels.map((label) => (
                    <span
                      key={label}
                      className="rounded-full bg-emerald-50 text-emerald-900 text-[11px] px-2 py-1 border border-emerald-100"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGE */}
            {message?.trim() && (
              <div className="mt-4 italic text-stone-700 bg-emerald-50/60 border border-emerald-100 rounded-xl p-3">
                « {message} »
              </div>
            )}

            {/* MONTANT / CODE */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-stone-200 p-3">
                <div className="text-xs text-stone-500">
                  Montant
                </div>

                <div className="text-2xl font-bold text-emerald-900">
                  {eur(amount)}
                </div>
              </div>

              <div className="rounded-xl border border-stone-200 p-3">
                <div className="text-xs text-stone-500">
                  Code
                </div>

                <div className="mt-1 font-mono text-sm sm:text-base tracking-widest bg-stone-900 text-white px-3 py-1 rounded-md inline-block">
                  {code}
                </div>
              </div>
            </div>
          </div>

          {/* BAS DU BON */}
          <div className="px-6 pb-6">
            <div className="my-4 h-[10px] w-full bg-[radial-gradient(circle,_rgba(0,0,0,0.18)_2px,transparent_2px)] bg-[length:10px_10px]" />

            <div className="rounded-xl bg-stone-50 border border-stone-200 px-4 py-3 text-[12px] text-stone-600 leading-relaxed">
              Ce bon s’utilise lors d’une réservation, dans la limite des
              disponibilités et selon nos CGV.
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
    <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
      {/* ========================================================
          FORMULAIRE
          ======================================================== */}

      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 md:p-7 shadow-sm">
        <div className="mb-6">
          <div className="inline-flex rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-medium text-emerald-900">
            Composez votre cadeau
          </div>

          <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-stone-900">
            Personnalisez votre chèque cadeau
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            Choisissez le chalet, la formule et les options que vous souhaitez
            offrir.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-6 text-sm sm:text-[15px]"
        >
          {/* CHALET */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-stone-600">
              1. Choisissez le chalet
            </label>

            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onChaletChange("C2")}
                className={`rounded-2xl border p-4 text-left transition ${
                  chalet === "C2"
                    ? "border-emerald-700 bg-emerald-50 ring-1 ring-emerald-700"
                    : "border-stone-200 bg-white hover:border-emerald-300"
                }`}
              >
                <div className="text-lg">
                  ♨️
                </div>

                <div className="mt-2 font-semibold text-stone-900">
                  Ty-Koad Duo
                </div>

                <div className="mt-1 text-xs text-stone-500">
                  Spa privatif · 2 personnes
                </div>
              </button>

              <button
                type="button"
                onClick={() => onChaletChange("C1")}
                className={`rounded-2xl border p-4 text-left transition ${
                  chalet === "C1"
                    ? "border-emerald-700 bg-emerald-50 ring-1 ring-emerald-700"
                    : "border-stone-200 bg-white hover:border-emerald-300"
                }`}
              >
                <div className="text-lg">
                  🏡
                </div>

                <div className="mt-2 font-semibold text-stone-900">
                  Ty-Koad
                </div>

                <div className="mt-1 text-xs text-stone-500">
                  2 chambres · 2 salles de bain
                </div>
              </button>
            </div>
          </div>

          {/* FORMULE */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-stone-600">
              2. Choisissez la formule
            </label>

            <div className="grid gap-2">
              {plans.map((plan) => (
                <label
                  key={plan.key}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 cursor-pointer transition ${
                    plan.key === planKey
                      ? "border-emerald-900 bg-emerald-50"
                      : "border-stone-300 bg-white hover:border-emerald-400"
                  }`}
                >
                  <span className="flex-1 pr-3">
                    <span className="font-medium text-stone-900">
                      {plan.label}
                    </span>

                    {plan.validity === "week" && (
                      <span className="ml-2 text-xs text-stone-500">
                        valable dim–jeu
                      </span>
                    )}

                    {plan.validity === "weekend" && (
                      <span className="ml-2 text-xs text-stone-500">
                        valable ven–sam
                      </span>
                    )}

                    {plan.nights && (
                      <span className="ml-2 text-xs text-stone-500">
                        {plan.nights} nuit
                        {plan.nights > 1 ? "s" : ""}
                      </span>
                    )}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-emerald-900">
                      {eur(plan.amount)}
                    </span>

                    <input
                      type="radio"
                      name="plan"
                      checked={planKey === plan.key}
                      onChange={() =>
                        setPlanKey(plan.key)
                      }
                      className="h-4 w-4"
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* OPTIONS */}
          <div className="space-y-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-stone-600">
                3. Ajoutez des options
              </div>

              <p className="mt-1 text-xs text-stone-500">
                Facultatif
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {EXTRAS.map((extra) => (
                <label
                  key={extra.key}
                  className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition ${
                    extras[extra.key]
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-stone-200 bg-white hover:border-emerald-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!extras[extra.key]}
                    onChange={(event) =>
                      setExtras((current) => ({
                        ...current,

                        [extra.key]:
                          event.target.checked,
                      }))
                    }
                    className="h-4 w-4"
                  />

                  <span className="flex-1 text-sm text-stone-800">
                    {extra.label}
                  </span>

                  <span className="text-sm font-semibold text-emerald-900">
                    +{eur(extra.price)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* OFFRANT / BÉNÉFICIAIRE */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-stone-600">
              4. Personnalisez le cadeau
            </div>

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
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-600">
                  Votre e-mail
                </label>

                <input
                  type="email"
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={buyerEmail}
                  onChange={(e) =>
                    setBuyerEmail(e.target.value)
                  }
                  placeholder="vous@email.com"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-600">
                  Pour
                </label>

                <input
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={toName}
                  onChange={(e) =>
                    setToName(e.target.value)
                  }
                  placeholder="Nom du bénéficiaire"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-600">
                  E-mail du bénéficiaire
                </label>

                <input
                  type="email"
                  className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={toEmail}
                  onChange={(e) =>
                    setToEmail(e.target.value)
                  }
                  placeholder="Optionnel"
                />
              </div>
            </div>
          </div>

          {/* MESSAGE */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-600">
              Message personnel
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

            <p className="text-[11px] text-stone-500">
              Ce message apparaîtra sur le chèque cadeau.
            </p>
          </div>

          {/* TOTAL */}
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-600">
                Séjour
              </span>

              <span className="font-medium">
                {eur(selectedPlan?.amount)}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-stone-600">
                Options
              </span>

              <span className="font-medium">
                {eur(extrasTotal)}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-stone-200 flex items-end justify-between gap-4">
              <span className="font-semibold text-stone-900">
                Total
              </span>

              <span className="text-2xl font-bold text-emerald-900">
                {eur(total)}
              </span>
            </div>
          </div>

          {/* PAIEMENT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-emerald-900 text-white font-semibold text-sm sm:text-base shadow-sm hover:bg-emerald-800 disabled:opacity-70 disabled:cursor-not-allowed transition"
          >
            {loading
              ? "Redirection vers Stripe…"
              : `Acheter le chèque cadeau · ${eur(total)}`}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-stone-500">
            <span aria-hidden="true">
              🔒
            </span>

            <span>
              Paiement sécurisé via Stripe · Chèque cadeau envoyé par e-mail
              au format PDF
            </span>
          </div>
        </form>
      </div>

      {/* ========================================================
          APERÇU
          ======================================================== */}

      <div className="lg:sticky lg:top-6 bg-white/80 rounded-3xl border border-stone-200 p-4 sm:p-5 md:p-6">
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
