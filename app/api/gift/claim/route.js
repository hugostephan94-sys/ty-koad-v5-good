import Stripe from "stripe";
import { Resend } from "resend";
import prisma from "../../../../lib/db";

export async function POST(req) {
  try {
    const { session_id } = await req.json();
    if (!session_id) return new Response(JSON.stringify({ error: "session_id manquant" }), { status: 400 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ["line_items"] });

    if (session.payment_status !== "paid")
      return new Response(JSON.stringify({ error: "Paiement non confirmé" }), { status: 400 });

    const md = session.metadata || {};
    const amountCents = session.amount_total || 0;

    const chaletLabel = md.chalet === "C2"
      ? "Ty-Koad Duo (spa privatif)"
      : "Ty-Koad — 2 chambres / 2 SDB";
    const mainItem = session.line_items?.data?.[0];
    const planLabel = mainItem?.description || "Séjour";

    // ✅ mapping lisible des extras (inclut les nouveaux)
    const extrasCSV = (md.extrasCSV || "")
      .split(",").filter(Boolean).map((s) => s.trim())
      .map((k) => {
        if (k === "fruits")      return "Plateau fruits de mer";
        if (k === "champagne")   return "Champagne";
        if (k === "petales")     return "Pétales de rose";
        if (k === "charcuterie") return "Plateau charcuterie";
        if (k === "petitdej2")   return "Petit déjeuner (2 pers.)";
        return k;
      })
      .join(", ");

    // code “joli”
    const base = (md.fromName + "-" + md.toName + "-" + new Date().toISOString().slice(0,10)).toUpperCase();
    let h = 0; for (let i=0;i<base.length;i++) h = (h*31 + base.charCodeAt(i)) >>> 0;
    const chunk = (h.toString(36).toUpperCase() + "0000").slice(0,8);
    const code = `TKO-${chunk.slice(0,4)}-${chunk.slice(4,8)}`;

    // enregistre le Gift si pas déjà présent
    await prisma.gift.upsert({
      where: { code },
      update: {},
      create: {
        code,
        chalet: md.chalet, planKey: md.planKey,
        amountCents,
        extrasCSV,
        fromName: md.fromName || "",
        toName: md.toName || "",
        buyerEmail: md.buyerEmail || null,
        toEmail: md.toEmail || null,
        message: md.message || null,
      }
    });

    // lien PDF
    const baseUrl = process.env.SITE_URL || "http://localhost:3000";
    const pdfUrl = new URL(`${baseUrl}/api/gift/pdf`);
    pdfUrl.searchParams.set("code", code);
    pdfUrl.searchParams.set("chaletLabel", chaletLabel);
    pdfUrl.searchParams.set("planLabel", planLabel);
    pdfUrl.searchParams.set("amountCents", String(amountCents));
    pdfUrl.searchParams.set("fromName", md.fromName || "");
    pdfUrl.searchParams.set("toName", md.toName || "");
    pdfUrl.searchParams.set("message", md.message || "");
    pdfUrl.searchParams.set("extrasCSV", extrasCSV);

    // envoi email
    const resend = new Resend(process.env.RESEND_API_KEY);
    const toList = [md.buyerEmail, md.toEmail].filter(Boolean);
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
        <h2>Merci pour votre achat – Chèque cadeau Ty-Koad</h2>
        <p><b>Code :</b> ${code}</p>
        <p><b>Chalet :</b> ${chaletLabel}<br/>
           <b>Séjour :</b> ${planLabel}<br/>
           <b>Montant :</b> ${(amountCents/100).toLocaleString("fr-FR",{style:"currency",currency:"EUR"})}<br/>
           ${extrasCSV ? `<b>Options :</b> ${extrasCSV}<br/>` : ""}
        </p>
        <p>➡️ <a href="${pdfUrl.toString()}">Télécharger le chèque cadeau (PDF)</a></p>
      </div>`;

    if (toList.length) {
      await resend.emails.send({
        from: process.env.RESEND_FROM,
        to: toList,
        subject: `Votre chèque cadeau Ty-Koad – code ${code}`,
        html,
      });
    }

    return new Response(JSON.stringify({ ok:true, code, downloadUrl: pdfUrl.toString() }), { status:200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
