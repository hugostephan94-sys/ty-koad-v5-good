"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import CalendarSelectable from "../../components/CalendarSelectable";
import { CHALETS } from "../../lib/chalets";

function eur(n){ return (n||0).toLocaleString("fr-FR",{style:"currency",currency:"EUR"}); }

export default function ReserverPage(){
  const search = useSearchParams();
  const initialTab = (search.get("tab") || "C1").toUpperCase();

  const [tab, setTab] = useState(initialTab);     // "C1" ou "C2"
  const [state, setState] = useState({});         // {checkIn, checkOut, nights, total, valid}
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Code cadeau
  const [giftCode, setGiftCode] = useState("");
  const [gift, setGift] = useState(null);         // { valueCents, message }
  const discountCents = gift?.valueCents ?? 0;

  useEffect(()=>{ setTab(initialTab); setGift(null); setGiftCode(""); }, [initialTab]);

  const chalet = CHALETS[tab];
  const maxGuests = chalet.maxGuests ?? 2;
  const totalGuests = adults + children;

  // Ajuste adultes/enfants quand on change de chalet
  useEffect(()=>{
    if (totalGuests > maxGuests){
      const newAdults = Math.min(adults, Math.max(1, maxGuests - children));
      const newChildren = Math.max(0, Math.min(children, maxGuests - newAdults));
      setAdults(newAdults);
      setChildren(newChildren);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const priceText = useMemo(()=>{
    if(!state?.nights) return "";
    const net = Math.max(0, (state.total||0) - discountCents);
    return eur(net);
  },[state, discountCents]);

  const peopleError =
    totalGuests < 1 ? "Merci d’indiquer au moins 1 adulte."
    : totalGuests > maxGuests ? `Capacité max : ${maxGuests} personne${maxGuests>1?"s":""}.`
    : (adults < 1 ? "Au moins 1 adulte requis." : "");

  async function applyGift(){
    try{
      if(!giftCode?.trim()) return;
      if(!state?.checkIn || !state?.checkOut) { alert("Choisis d’abord tes dates"); return; }
      const res = await fetch("/api/gift/redeem",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          code: giftCode.trim().toUpperCase(),
          chalet: tab,
          checkIn: state.checkIn,
          checkOut: state.checkOut
        })
      });
      const data = await res.json();
      if(!res.ok){ alert(data.error || "Code invalide"); setGift(null); return; }
      setGift(data);
    }catch(e){ alert(e.message); }
  }

  function clearGift(){ setGift(null); setGiftCode(""); }

  function goPay(){
    const { checkIn, checkOut, nights, total } = state;
    const net = Math.max(0, (total||0) - discountCents);
    const q = new URLSearchParams({
      chalet: chalet.id,
      ci: checkIn, co: checkOut, nights: String(nights),
      amount: String(net/100*100), // total en €
      deposit: String(chalet.deposit),
      adults: String(adults), children: String(children),
      ...(gift ? { giftCode: giftCode.trim().toUpperCase(), giftValue: String(discountCents) } : {})
    }).toString();
    location.assign(`/payer?${q}`);
  }

  return (
    <div>
      <SiteHeader />
      <div className="h-16 md:h-16" />

      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold">Réserver</h1>
        <p className="mt-2 text-stone-600">
          Choisis ton chalet puis tes dates.
        </p>

        {/* Onglets chalets */}
        <div className="mt-6 inline-flex rounded-xl border border-stone-200 overflow-hidden">
          {["C1","C2"].map(id=>(
            <button key={id}
              onClick={()=>{ setTab(id); clearGift(); }}
              className={`px-4 py-2 text-sm ${tab===id ? "bg-emerald-900 text-white" : "bg-white hover:bg-stone-50"}`}>
              {CHALETS[id].name}
            </button>
          ))}
        </div>

        {/* Capacité */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <div>
            <label className="mr-2 text-stone-700">Adultes :</label>
            <select value={adults} onChange={(e)=>{const a=+e.target.value; setAdults(a); if(a+children>maxGuests) setChildren(Math.max(0,maxGuests-a));}}
              className="rounded-xl border border-stone-300 px-2 py-1">
              {Array.from({length:maxGuests},(_,i)=>i+1).map(n=><option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="mr-2 text-stone-700">Enfants :</label>
            <select value={children} onChange={(e)=>{const c=+e.target.value; if(adults+c>maxGuests) return; setChildren(c);}}
              className="rounded-xl border border-stone-300 px-2 py-1">
              {Array.from({length:Math.max(0,maxGuests-adults+1)},(_,i)=>i).map(n=><option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="text-stone-500">Capacité : max {maxGuests} pers.</div>
        </div>
        {peopleError && <div className="mt-2 text-sm text-red-700">{peopleError}</div>}

        {/* Contenu onglet : C1 et C2 -> même logique calendrier + paiement */}
        <div className="mt-6">
          {["C1","C2"].includes(tab) && (
            <>
              <CalendarSelectable chaletId={tab} months={3} onChange={setState} />

              {/* Code cadeau */}
              <div className="mt-4 flex items-center gap-2">
                <input value={giftCode} onChange={e=>setGiftCode(e.target.value)}
                  placeholder="Code cadeau" className="rounded-xl border border-stone-300 px-3 py-2" />
                <button onClick={applyGift} className="px-3 py-2 rounded-xl border">Appliquer</button>
                {gift && <button onClick={clearGift} className="text-sm text-stone-600 underline">Retirer</button>}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="text-sm text-stone-700">
                  {state?.nights>0 ? (
                    <>
                      Séjour de <b>{state.nights}</b> nuit{state.nights>1?"s":""} —{" "}
                      {gift ? (
                        <>
                          <span className="line-through mr-1">{eur(state.total)}</span>
                          <b>{priceText}</b> <span className="text-emerald-800">({gift.message})</span>
                        </>
                      ) : (
                        <b>{eur(state.total)}</b>
                      )}
                      {" "}— caution {eur(CHALETS[tab].deposit)}
                    </>
                  ) : "Sélectionne tes dates pour voir le total"}
                </div>
                <button
                  onClick={goPay}
                  disabled={!state?.valid || !!peopleError}
                  className={`px-4 py-2 rounded-xl ${(!state?.valid || !!peopleError) ? "bg-stone-200 text-stone-500 cursor-not-allowed" : "bg-emerald-900 text-white"}`}
                >
                  Réserver maintenant
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
