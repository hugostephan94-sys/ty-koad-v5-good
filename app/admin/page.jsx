"use client";
import { useEffect, useState } from "react";
export default function AdminPage(){
  const [list, setList] = useState([]);
  const [cfg, setCfg] = useState({ icalC1:"", icalC2:"" });
  const [msg, setMsg] = useState("");
  useEffect(()=>{
    fetch("/api/reservations/list").then(r=>r.json()).then(d=>setList(d.reservations||[]));
    fetch("/api/config/get").then(r=>r.json()).then(setCfg);
  },[]);
  const saveCfg = async () => { const res = await fetch("/api/config/set", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(cfg) }); const data = await res.json(); setCfg(data); setMsg("Configuration enregistrée."); setTimeout(()=>setMsg(""), 2500); };
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin — Ty-Koad</h1>
        <a href="/" className="px-4 py-2 rounded-xl border">Accueil</a>
      </div>
      <section className="mt-6 bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">iCal</h2>
        <p className="text-sm text-stone-600">Renseignez vos URLs iCal et exportez l’ICS du site.</p>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          <div>
            <label className="text-xs text-stone-600">URL iCal — C1</label>
            <input className="mt-1 w-full rounded-xl border border-stone-300 p-2" value={cfg.icalC1||""} onChange={e=>setCfg(c=>({...c, icalC1:e.target.value}))}/>
          </div>
          <div>
            <label className="text-xs text-stone-600">URL iCal — C2</label>
            <input className="mt-1 w-full rounded-xl border border-stone-300 p-2" value={cfg.icalC2||""} onChange={e=>setCfg(c=>({...c, icalC2:e.target.value}))}/>
          </div>
        </div>
        <div className="mt-3 flex gap-3">
          <button onClick={saveCfg} className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm">Enregistrer</button>
          <a className="px-4 py-2 rounded-xl border" href="/api/ical/C1" target="_blank">Exporter ICS C1</a>
          <a className="px-4 py-2 rounded-xl border" href="/api/ical/C2" target="_blank">Exporter ICS C2</a>
          {msg && <div className="text-sm text-emerald-700">{msg}</div>}
        </div>
      </section>
      <section className="mt-6 bg-white border border-stone-200 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Réservations</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2 pr-4">Créée</th>
                <th className="py-2 pr-4">Client</th>
                <th className="py-2 pr-4">Séjour</th>
                <th className="py-2 pr-4">Montant</th>
                <th className="py-2 pr-4">Caution</th>
                <th className="py-2 pr-4">PI</th>
                <th className="py-2">PI Caution</th>
              </tr>
            </thead>
            <tbody>
              {(list||[]).map((r,i)=>(
                <tr key={i} className="border-t">
                  <td className="py-2 pr-4">{new Date(r.createdAt).toLocaleString()}</td>
                  <td className="py-2 pr-4">{r.name} ({r.email})</td>
                  <td className="py-2 pr-4">{r.ci} → {r.co} ({r.nights} n) [{r.chalet}]</td>
                  <td className="py-2 pr-4">{r.amountEUR} €</td>
                  <td className="py-2 pr-4">{r.depositEUR} €</td>
                  <td className="py-2 pr-4"><code>{r.paymentIntentId}</code></td>
                  <td className="py-2"><code>{r.depositIntentId}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
