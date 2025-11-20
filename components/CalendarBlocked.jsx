"use client";
import { useEffect, useMemo, useState } from "react";

const FR = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
const isFriSat = (d) => { const wd=d.getDay(); return wd===5 || wd===6; };
function iso(d){ return d.toISOString().slice(0,10); }
function monthStart(date){ return new Date(date.getFullYear(), date.getMonth(), 1); }
function addMonths(date, n){ const d=new Date(date); d.setMonth(d.getMonth()+n); return d; }
function startOfGrid(d){
  const m1 = monthStart(d);
  const wd = (m1.getDay()+6)%7; // 0 = Lundi
  const g  = new Date(m1); g.setDate(m1.getDate()-wd); return g;
}

export default function CalendarBlocked({ chalet="C1", months=3, className="" }){
  const [when, setWhen] = useState(monthStart(new Date()));
  const [busy, setBusy] = useState(new Set());
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    let ignore=false;
    (async ()=>{
      setLoading(true);
      const from = iso(startOfGrid(addMonths(when,-1)));
      const to   = iso(startOfGrid(addMonths(when, 13)));
      const url = `/api/availability?chalet=${chalet}&from=${from}&to=${to}`;
      const res = await fetch(url);
      const data = await res.json();
      if(!ignore){
        setBusy(new Set(data.bookedDates||[]));
        setLoading(false);
      }
    })();
    return ()=>{ ignore=true; };
  },[chalet, when]);

  const monthsArr = useMemo(()=>{
    return Array.from({length:months},(_,i)=> addMonths(when,i));
  },[when, months]);

  return (
    <div className={`relative z-0 ${className || ""}`}>
      <div className="flex items-center justify-between mb-3">
        <button onClick={()=>setWhen(addMonths(when,-1))} className="px-2 py-1 rounded-lg border">‹</button>
        <div className="text-sm text-stone-600">
          {loading ? "Mise à jour…" : "Dates barrées = indisponibles"}
        </div>
        <button onClick={()=>setWhen(addMonths(when, 1))} className="px-2 py-1 rounded-lg border">›</button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {monthsArr.map((m,i)=> <Month key={i} date={m} busy={busy} />)}
      </div>
      <div className="mt-2 text-[11px] text-stone-500">
        <span className="inline-block align-middle h-2.5 w-4 mr-1"
          style={{backgroundImage:"repeating-linear-gradient(135deg, rgba(220,38,38,.22) 0, rgba(220,38,38,.22) 10px, transparent 10px, transparent 20px)"}} />
        <span>Indisponible</span>
      </div>
    </div>
  );
}

function Month({ date, busy }){
  const title = date.toLocaleDateString("fr-FR", { month:"long", year:"numeric" });
  const start = startOfGrid(date);
  const days = Array.from({length:42},(_,i)=> { const d=new Date(start); d.setDate(start.getDate()+i); return d; });
  const monthIndex = date.getMonth();

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-3">
      <div className="text-center font-medium capitalize">{title}</div>
      <div className="mt-2 grid grid-cols-7 text-[11px] text-stone-500">
        {FR.map((d)=><div key={d} className="text-center py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d,idx)=>{
          const inMonth = d.getMonth()===monthIndex;
          const key = iso(d);
          const isBusy = busy.has(key);
          const weekendTint = isFriSat(d) ? "bg-amber-50" : "bg-white";
          return (
            <div key={idx}
              className={`h-8 rounded-lg text-[12px] flex items-center justify-center border
                ${inMonth ? weekendTint : "bg-stone-50 text-stone-400"}`}
              style={isBusy ? {
                backgroundImage: "repeating-linear-gradient(135deg, rgba(220,38,38,.22) 0, rgba(220,38,38,.22) 10px, transparent 10px, transparent 20px)"
              } : undefined}
            >
              {d.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
