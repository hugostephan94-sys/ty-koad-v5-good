// app/api/gift/pdf/route.js
import PDFDocument from "pdfkit";

function eur(cents) {
  return (cents / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code        = searchParams.get("code") || "TKO-XXXX-XXXX";
    const chaletLabel = searchParams.get("chaletLabel") || "Ty-Koad";
    const planLabel   = searchParams.get("planLabel") || "Séjour";
    const amountCents = Number(searchParams.get("amountCents") || "0");
    const fromName    = searchParams.get("fromName") || "";
    const toName      = searchParams.get("toName") || "";
    const message     = searchParams.get("message") || "";
    const extrasCSV   = searchParams.get("extrasCSV") || "";

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks = []; doc.on("data", c => chunks.push(c));
    const done = new Promise(res => doc.on("end", res));

    // Bandeau haut (gradient simple)
    doc.rect(0, 0, doc.page.width, 90)
      .fillColor("#065f46").fill();
    doc.fillColor("#ffffff").fontSize(20).text("Les Chalets Ty-Koad", 50, 34);
    doc.fontSize(12).text(new Date().toLocaleDateString("fr-FR"), doc.page.width - 150, 38, { width: 100, align: "right" });

    // Carte
    doc.moveDown(2);
    const cardX = 50, cardY = 120, cardW = doc.page.width - 100, cardH = 520;
    doc.roundedRect(cardX, cardY, cardW, cardH, 16).fillColor("#ffffff").strokeColor("#e5e7eb").lineWidth(1).fillAndStroke();

    // Ruban "Chèque cadeau"
    doc.save();
    doc.translate(cardX + cardW - 40, cardY + 20).rotate(45);
    doc.rect(-120, -12, 180, 24).fillColor("#065f46").fill();
    doc.fillColor("#ffffff").fontSize(10).text("Chèque cadeau", -100, -9, { width: 140, align: "center" });
    doc.restore();

    // Contenu
    const left = cardX + 24;
    let y = cardY + 26;

    doc.fillColor("#065f46").fontSize(14).text(chaletLabel, left, y);
    y += 10; doc.fillColor("#6b7280").fontSize(10).text(planLabel, left, y);
    y += 30;

    doc.fillColor("#6b7280").fontSize(10).text("Bénéficiaire", left, y);
    y += 14; doc.fillColor("#111827").fontSize(16).text(toName || "—", left, y);
    y += 22;

    doc.fillColor("#6b7280").fontSize(10).text("De la part de", left, y);
    y += 14; doc.fillColor("#111827").fontSize(12).text(fromName || "—", left, y);
    y += 22;

    if (extrasCSV) {
      doc.fillColor("#6b7280").fontSize(10).text("Options", left, y);
      y += 14; doc.fillColor("#111827").fontSize(11).text(extrasCSV, left, y, { width: cardW - 48 });
      y += 22;
    }

    if (message) {
      doc.rect(left, y, cardW - 48, 60).fillColor("#ecfdf5").strokeColor("#d1fae5").lineWidth(1).fillAndStroke();
      doc.fillColor("#065f46").fontSize(11).text(`« ${message} »`, left + 8, y + 8, { width: cardW - 64 });
      y += 72;
    }

    // Montant + code
    doc.fillColor("#6b7280").fontSize(10).text("Montant", left, y);
    doc.fillColor("#065f46").fontSize(22).text(eur(amountCents), left, y + 14);
    doc.fillColor("#6b7280").fontSize(10).text("Code", left + 250, y);
    doc.rect(left + 250, y + 14, 180, 26).fillColor("#111827").fill();
    doc.fillColor("#ffffff").font("Courier-Bold").fontSize(14).text(code, left + 260, y + 19);
    doc.font("Helvetica");

    // Watermark discret
    doc.save();
    doc.rotate(-30, { origin: [doc.page.width / 2, doc.page.height / 2] });
    doc.fontSize(80).fillColor("#f3f4f6").text("TY-KOAD", doc.page.width / 2 - 180, doc.page.height / 2 - 60, { opacity: 0.5 });
    doc.restore();

    // Bas de carte
    doc.fillColor("#6b7280").fontSize(10).text(
      "Ce bon est utilisable lors de la réservation (directe ou via plateforme) conformément à nos CGV. " +
      "Pour toute question : hello@ty-koad.fr",
      left, cardY + cardH - 60, { width: cardW - 48 }
    );

    doc.end();
    await done;
    return new Response(Buffer.concat(chunks), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="cheque-cadeau-tykoad.pdf"`,
      },
    });
  } catch (e) {
    console.error(e);
    return new Response("PDF error", { status: 500 });
  }
}
