"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SiteHeader from "../../../components/SiteHeader";

export default function GiftSuccessPage(){
  const search = useSearchParams();
  const session_id = search.get("session_id");
  const [state, setState] = useState({ loading: true });

  useEffect(()=>{
    let ignore=false;
    (async ()=>{
      if(!session_id){ setState({ loading:false, error:"Session introuvable" }); return; }
      try{
        const res = await fetch("/api/gift/claim", {
          method: "POST",
          headers: { "Content-Type":"application/json" },
          body: JSON.stringify({ session_id })
        });
        const data = await res.json();
        if(ignore) return;
        if(data.error){ setState({ loading:false, error:data.error }); }
        else { setState({ loading:false, code:data.code, downloadUrl:data.downloadUrl }); }
      }catch(err){
        if(!ignore) setState({ loading:false, error: err.message });
      }
    })();
    return ()=>{ ignore=true; };
  }, [session_id]);

  return (
    <div>
      <SiteHeader />
      <div className="h-16" />

      <section className="max-w-3xl mx-auto px-4 py-12">
        {state.loading ? (
          <div className="rounded-2xl border p-6 bg-white">Validation en cours…</div>
        ) : state.error ? (
          <div className="rounded-2xl border p-6 bg-white">
            <h1 className="text-xl font-semibold">Oups</h1>
            <p className="text-red-700 mt-2">{state.error}</p>
            <Link href="/cadeau" className="inline-block mt-4 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm">Revenir</Link>
          </div>
        ) : (
          <div className="rounded-2xl border p-6 bg-white">
            <h1 className="text-2xl font-bold">Merci 🎁</h1>
            <p className="mt-2 text-stone-700">
              Votre paiement est confirmé. Le chèque cadeau a été envoyé par e-mail.
            </p>
            <div className="mt-4 p-4 rounded-xl bg-stone-50 border">
              <div className="text-sm text-stone-600">Code du chèque cadeau</div>
              <div className="font-mono text-lg tracking-widest">{state.code}</div>
            </div>
            <a href={state.downloadUrl} className="inline-flex mt-6 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm">
              Télécharger le PDF
            </a>
            <div className="mt-6">
              <Link href="/" className="text-emerald-900 underline">Retour à l’accueil</Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
