import prisma from "../../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function chaletLabelFromId(chalet) {
  return chalet === "C2"
    ? "Ty-Koad Duo (spa privatif)"
    : "Ty-Koad — 2 chambres / 2 SDB";
}

// Si tu veux un texte plus joli que "c2_weekend"
const PLAN_LABELS = {
  c2_week: "1 nuit semaine (dim-jeu)",
  c2_weekend: "1 nuit week-end (ven-sam)",
  c1_2n: "2 nuits (pack)",
  c1_3n: "3 nuits (pack)",
  c1_4n: "4 nuits (pack)",
};

export async function GET(req) {
  try {
    const { searchParams, origin } = new URL(req.url);
    const code = (searchParams.get("code") || "").trim().toUpperCase();

    if (!code) {
      return new Response("code manquant", { status: 400 });
    }

    const gift = await prisma.gift.findUnique({ where: { code } });
    if (!gift) {
      return new Response("Bon cadeau introuvable", { status: 404 });
    }

    // Base URL du site (comme dans ton PDF)
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      origin;

    // On redirige vers ton endpoint PDF EXISTANT avec les bons paramètres
    const pdfUrl = new URL("/api/gift/pdf", baseUrl);

    pdfUrl.searchParams.set("code", gift.code);
    pdfUrl.searchParams.set("chaletLabel", chaletLabelFromId(gift.chalet));
    pdfUrl.searchParams.set(
      "planLabel",
      PLAN_LABELS[gift.planKey] || gift.planKey || "Séjour"
    );
    pdfUrl.searchParams.set("amountCents", String(gift.amountCents || 0));
    pdfUrl.searchParams.set("fromName", gift.fromName || "");
    pdfUrl.searchParams.set("toName", gift.toName || "");
    pdfUrl.searchParams.set("message", gift.message || "");
    pdfUrl.searchParams.set("extrasCSV", gift.extrasCSV || "");

    return Response.redirect(pdfUrl.toString(), 302);
  } catch (e) {
    console.error("pdf-by-code error:", e);
    return new Response(`Erreur: ${e.message}`, { status: 500 });
  }
}
