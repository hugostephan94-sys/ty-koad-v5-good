import prisma from "../../../../lib/db";

// mini pricing serveur
const PRICES = {
  C1: { base: 7000 },             // 70,00 €/nuit
  C2: { week: 13000, weekend: 15000 } // dim-jeu, ven-sam
};

function iso(d){ return d.toISOString().slice(0,10); }
function nightsBetween(ci, co){
  if(!ci || !co) return 0;
  const d1 = new Date(ci), d2 = new Date(co);
  d1.setHours(12,0,0,0); d2.setHours(12,0,0,0);
  return Math.max(0, Math.round((d2 - d1) / 86400000));
}
function *days(ci, n){ const d=new Date(ci); for(let i=0;i<n;i++){const dd=new Date(d); dd.setDate(d.getDate()+i); yield dd;} }
function hasWeekNight(ci, n){ for(const d of days(ci,n)){ const wd=d.getDay(); if(wd>=0 && wd<=4) return true;} return false; } // dim(0) à jeu(4)
function hasWeekendNight(ci,n){ for(const d of days(ci,n)){ const wd=d.getDay(); if(wd===5 || wd===6) return true;} return false; }

function computeTotalCents(chalet, ci, co){
  const n = nightsBetween(ci,co);
  if(n===0) return 0;
  if(chalet==="C1"){
    return PRICES.C1.base * n;
  } else {
    let total = 0;
    for(const d of days(ci,n)){
      const wd = d.getDay();
      total += (wd===5 || wd===6) ? PRICES.C2.weekend : PRICES.C2.week;
    }
    return total;
  }
}

export async function POST(req){
  try{
    const { code, chalet, checkIn, checkOut } = await req.json();
    if(!code || !chalet || !checkIn || !checkOut)
      return new Response(JSON.stringify({ error:"Paramètres manquants" }), { status:400 });

    const gift = await prisma.gift.findUnique({ where: { code }});
    if(!gift) return new Response(JSON.stringify({ error:"Code introuvable" }), { status:404 });
    if(gift.usedAt) return new Response(JSON.stringify({ error:"Ce code a déjà été utilisé" }), { status:400 });
    if(gift.chalet !== chalet) return new Response(JSON.stringify({ error:"Code non valable pour ce chalet" }), { status:400 });
    if(gift.expiresAt && new Date(gift.expiresAt) < new Date())
      return new Response(JSON.stringify({ error:"Code expiré" }), { status:400 });

    const n = nightsBetween(checkIn, checkOut);
    if(n===0) return new Response(JSON.stringify({ error:"Sélectionne tes dates" }), { status:400 });

    // règles de validité selon plan
    const plan = gift.planKey;
    if(plan==="c2_week" && !hasWeekNight(checkIn,n))
      return new Response(JSON.stringify({ error:"Ce bon est valable sur une nuit en semaine (dim-jeu)" }), { status:400 });
    if(plan==="c2_weekend" && !hasWeekendNight(checkIn,n))
      return new Response(JSON.stringify({ error:"Ce bon est valable sur une nuit de week-end (ven-sam)" }), { status:400 });

    if(plan.startsWith("c1_")){
      const need = Number(plan.split("_")[1].replace("n",""));
      if(n < need) return new Response(JSON.stringify({ error:`Ce bon requiert au moins ${need} nuits` }), { status:400 });
    }

    const bookingCents = computeTotalCents(chalet, checkIn, checkOut);
    const valueCents = Math.min(bookingCents, gift.amountCents);

    return new Response(JSON.stringify({
      ok:true,
      valueCents,
      bookingCents,
      remainingCents: Math.max(0, gift.amountCents - valueCents), // (single-use ici)
      message:`Bon appliqué (− ${(valueCents/100).toLocaleString("fr-FR",{style:"currency",currency:"EUR"})})`
    }), { status:200 });
  }catch(e){
    console.error(e);
    return new Response(JSON.stringify({ error:e.message }), { status:500 });
  }
}
