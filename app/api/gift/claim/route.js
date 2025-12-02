// app/api/gift/claim/route.js
import Stripe from "stripe";
import { Resend } from "resend";
import prisma from "../../../../lib/db";

export async function POST(req) {
  try {
    const { session_id } = await req.json();
    if (!session_id) {
      return new Response(
        JSON.stringify({ error: "session_id manquant" }),
        { status: 400 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items"],
    });

    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ error: "Paiement non confirmé" }),
        { status: 400 }
      );
    }

    const md = session.metadata || {};
    const amountCents = session.amount_total || 0;

    const chaletLabel =
      md.chalet === "C2"
        ? "Ty-Koad Duo (spa privatif)"
        : "Ty-Koad — 2 chambres / 2 SDB";

    const mainItem = session.line_items?.data?.[0];
    const planLabel = mainItem?.description || "Séjour";

    // Extras lisibles
    const extrasCSV = (md.extrasCSV || "")
      .split(",")
      .filter(Boolean)
      .map((s) => s.trim())
      .map((k) => {
        if (k === "fruits") return "Plateau fruits de mer";
        if (k === "champagne") return "Champagne";
        if (k === "petales") return "Pétales de rose";
        if (k === "charcuterie") return "Plateau charcuterie";
        if (k === "petitdej2") return "Petit déjeuner (2 pers.)";
        return k;
      })
      .join(", ");

    // Code “joli”
    const base = (
      (md.fromName || "") +
      "-" +
      (md.toName || "") +
      "-" +
      new Date().toISOString().slice(0, 10)
    ).toUpperCase();

    let h = 0;
    for (let i = 0; i < base.length; i++) {
      h = (h * 31 + base.charCodeAt(i)) >>> 0;
    }
    const chunk = (h.toString(36).toUpperCase() + "0000").slice(0, 8);
    const code = `TKO-${chunk.slice(0, 4)}-${chunk.slice(4, 8)}`;

    // Enregistre / upsert le Gift
    await prisma.gift.upsert({
      where: { code },
      update: {},
      create: {
        code,
        chalet: md.chalet,
        planKey: md.planKey,
        amountCents,
        extrasCSV,
        fromName: md.fromName || "",
        toName: md.toName || "",
        buyerEmail: md.buyerEmail || null,
        toEmail: md.toEmail || null,
        message: md.message || null,
      },
    });

    // URL PDF basée sur l'origin réel de la requête
    const { origin } = new URL(req.url); // ex: https://chalets-tykoad.fr
    const pdfUrl = new URL("/api/gift/pdf", origin);
    pdfUrl.searchParams.set("code", code);
    pdfUrl.searchParams.set("chaletLabel", chaletLabel);
    pdfUrl.searchParams.set("planLabel", planLabel);
    pdfUrl.searchParams.set("amountCents", String(amountCents));
    pdfUrl.searchParams.set("fromName", md.fromName || "");
    pdfUrl.searchParams.set("toName", md.toName || "");
    pdfUrl.searchParams.set("message", md.message || "");
    pdfUrl.searchParams.set("extrasCSV", extrasCSV);

    /* ─────────  Envoi email via Resend  ───────── */

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom =
      process.env.RESEND_FROM ||
      "Les Chalets Ty-Koad <onboarding@resend.dev>";

    let emailError = null;

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
        <h2>Merci pour votre achat – Chèque cadeau Ty-Koad</h2>
        <p><b>Code :</b> ${code}</p>
        <p>
          <b>Chalet :</b> ${chaletLabel}<br/>
          <b>Séjour :</b> ${planLabel}<br/>
          <b>Montant :</b> ${(amountCents / 100).toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
          })}<br/>
          ${extrasCSV ? `<b>Options :</b> ${extrasCSV}<br/>` : ""}
        </p>
        <p>➡️ <a href="${pdfUrl.toString()}">Télécharger le chèque cadeau (PDF)</a></p>
      </div>
    `;

    if (!resendApiKey) {
      emailError = "RESEND_API_KEY non configurée.";
      console.error(emailError);
    } else {
      try {
        const resend = new Resend(resendApiKey);
        const toList = [md.buyerEmail, md.toEmail].filter(Boolean);

        console.log("Gift email toList:", toList, "from:", resendFrom);

        if (toList.length) {
          await resend.emails.send({
            from: resendFrom,
            to: toList,
            subject: `Votre chèque cadeau Ty-Koad – code ${code}`,
            html,
          });
        } else {
          emailError = "Aucun destinataire (buyerEmail / toEmail manquants).";
          console.error(emailError);
        }
      } catch (e) {
        console.error("Resend error:", e);
        emailError =
          e instanceof Error
            ? e.message
            : "Erreur d'envoi de l'e-mail.";
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        code,
        downloadUrl: pdfUrl.toString(),
        emailError,
      }),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: e.message }),
      { status: 500 }
    );
  }
}
