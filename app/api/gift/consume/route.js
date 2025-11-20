import prisma from "../../../../lib/db";

export async function POST(req){
  try{
    const { code } = await req.json();
    if(!code) return new Response(JSON.stringify({ error:"Code manquant" }), { status:400 });
    const gift = await prisma.gift.findUnique({ where: { code }});
    if(!gift) return new Response(JSON.stringify({ error:"Code introuvable" }), { status:404 });
    if(gift.usedAt) return new Response(JSON.stringify({ ok:true })); // idempotent
    await prisma.gift.update({ where: { code }, data: { usedAt: new Date() }});
    return new Response(JSON.stringify({ ok:true }), { status:200 });
  }catch(e){
    return new Response(JSON.stringify({ error:e.message }), { status:500 });
  }
}
