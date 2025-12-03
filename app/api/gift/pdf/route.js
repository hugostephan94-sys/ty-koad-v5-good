// app/api/gift/pdf/route.js
import PDFDocument from "pdfkit/js/pdfkit.standalone.js"; // version standalone

export const runtime = "nodejs"; // important : pas de runtime edge
export const dynamic = "force-dynamic"; // ⬅️ ajoute ça

// formatte un montant en centimes -> "110,00 €"
function eur(cents) {
  return (cents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
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

    // On découpe les options éventuelles en liste
    const extras = extrasCSV
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const doc = new PDFDocument({ size: "A4", margin: 40 });

    const chunks = [];
    doc.on("data", (c) => chunks.push(c));

    const done = new Promise((resolve, reject) => {
      doc.on("end", resolve);
      doc.on("error", reject);
    });

    const pageWidth  = doc.page.width;
    const pageHeight = doc.page.height;

    /* ───── Fond général ───── */
    doc
      .rect(0, 0, pageWidth, pageHeight)
      .fillColor("#f3f4f6")
      .fill();

    /* ───── Bandeau haut avec dégradé ───── */
    const headerHeight = 110;
    const headerGradient = doc
      .linearGradient(0, 0, pageWidth, 0)
      .stop(0, "#065f46")
      .stop(1, "#16a34a");

    doc
      .rect(0, 0, pageWidth, headerHeight)
      .fill(headerGradient);

    // Logo
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.SITE_URL ||
        "https://chalets-tykoad.fr";

      const logoUrl = `${baseUrl}/logo-tykoad.png`;
      const resLogo = await fetch(logoUrl);

      if (resLogo.ok) {
        const arrayBuffer = await resLogo.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // On met le logo en blanc sur le bandeau vert
        doc.image(buffer, 40, 25, { fit: [60, 60] });
      }
    } catch (e) {
      console.error("Erreur chargement logo PDF:", e);
      // on ignore, le PDF reste utilisable
    }

    // Titre + sous-titre dans le bandeau
    doc.font("Helvetica-Bold")
      .fillColor("#ffffff")
      .fontSize(22)
      .text("Les Chalets Ty-Koad", 120, 32);

    doc.font("Helvetica")
      .fontSize(11)
      .text("Carte cadeau séjour", 120, 58);

    // Date à droite
    doc
      .fontSize(11)
      .text(
        new Date().toLocaleDateString("fr-FR"),
        pageWidth - 150,
        40,
        { width: 110, align: "right" }
      );

    /* ───── Carte centrale ───── */
    const cardX = 50;
    const cardY = 140;
    const cardW = pageWidth - 100;
    const cardH = 500;

    // Ombre légère
    doc.save();
    doc
      .rect(cardX + 4, cardY + 6, cardW, cardH)
      .fillColor("#d1d5db")
      .fill();
    doc.restore();

    // Carte blanche
    doc
      .roundedRect(cardX, cardY, cardW, cardH, 18)
      .fillColor("#ffffff")
      .strokeColor("#e5e7eb")
      .lineWidth(1)
      .fillAndStroke();

    const innerX = cardX + 32;
    const innerY = cardY + 32;
    const innerW = cardW - 64;

    /* ───── Petit bandeau "Chèque cadeau" en haut de la carte ───── */
    const badgeW = 160;
    const badgeH = 26;
    doc
      .roundedRect(
        innerX,
        innerY,
        badgeW,
        badgeH,
        13
      )
      .fillColor("#ecfdf5")
      .strokeColor("#6ee7b7")
      .lineWidth(1)
      .fillAndStroke();

    doc
      .fillColor("#047857")
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("Chèque cadeau", innerX, innerY + 6, {
        width: badgeW,
        align: "center",
      });

    // Intitulé séjour
    let blockY = innerY + badgeH + 20;

    doc
      .fillColor("#6b7280")
      .font("Helvetica")
      .fontSize(10)
      .text("Pour une escapade à :", innerX, blockY);

    blockY += 14;

    doc
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .fontSize(16)
      .text(chaletLabel, innerX, blockY, {
        width: innerW,
      });

    blockY += 20;

    doc
      .fillColor("#6b7280")
      .font("Helvetica")
      .fontSize(10)
      .text(planLabel, innerX, blockY);

    blockY += 24;

    // Ligne séparatrice
    doc
      .moveTo(innerX, blockY)
      .lineTo(innerX + innerW, blockY)
      .strokeColor("#e5e7eb")
      .lineWidth(1)
      .stroke();

    blockY += 20;

    /* ───── Mise en page en 2 colonnes ───── */
    const colGap = 26;
    const colW = (innerW - colGap) / 2;

    const leftX = innerX;
    const rightX = innerX + colW + colGap;

    let leftY = blockY;
    let rightY = blockY;

    /* ───── Colonne gauche : bénéficiaire / expéditeur / message / options ───── */

    // Bénéficiaire
    doc
      .fillColor("#6b7280")
      .fontSize(10)
      .text("Bénéficiaire", leftX, leftY);

    leftY += 14;

    doc
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(toName || "—", leftX, leftY, {
        width: colW,
      });

    leftY += 24;

    // De la part de
    doc
      .font("Helvetica")
      .fillColor("#6b7280")
      .fontSize(10)
      .text("De la part de", leftX, leftY);

    leftY += 14;

    doc
      .fillColor("#111827")
      .fontSize(12)
      .text(fromName || "—", leftX, leftY, {
        width: colW,
      });

    leftY += 24;

    // Message personnel (si présent)
    if (message) {
      const msgText = `« ${message} »`;
      const msgWidth = colW - 18;
      const msgHeight = doc.heightOfString(msgText, {
        width: msgWidth,
        align: "left",
      }) + 22;

      doc
        .roundedRect(leftX, leftY, colW, msgHeight, 10)
        .fillColor("#ecfdf5")
        .strokeColor("#d1fae5")
        .lineWidth(1)
        .fillAndStroke();

      doc
        .fillColor("#065f46")
        .fontSize(11)
        .text(msgText, leftX + 9, leftY + 9, {
          width: msgWidth,
        });

      leftY += msgHeight + 18;
    }

    // Options (si présentes)
    if (extras.length > 0) {
      doc
        .fillColor("#6b7280")
        .fontSize(10)
        .text("Options choisies", leftX, leftY);

      leftY += 12;

      doc
        .fillColor("#111827")
        .fontSize(11);

      extras.forEach((opt) => {
        doc.text(`• ${opt}`, leftX, leftY, {
          width: colW,
        });
        leftY += 14;
      });
    }

    /* ───── Colonne droite : montant / code / rappel séjour ───── */

    // Montant
    doc
      .fillColor("#6b7280")
      .font("Helvetica")
      .fontSize(10)
      .text("Montant du bon", rightX, rightY);

    rightY += 16;

    doc
      .fillColor("#065f46")
      .font("Helvetica-Bold")
      .fontSize(24)
      .text(eur(amountCents), rightX, rightY, {
        width: colW,
      });

    rightY += 34;

    // Code cadeau
    doc
      .fillColor("#6b7280")
      .font("Helvetica")
      .fontSize(10)
      .text("Code cadeau", rightX, rightY);

    rightY += 14;

    const codeBoxH = 34;
    doc
      .roundedRect(rightX, rightY, colW, codeBoxH, 8)
      .fillColor("#111827")
      .strokeColor("#111827")
      .lineWidth(1)
      .fillAndStroke();

    doc
      .fillColor("#ffffff")
      .font("Courier-Bold")
      .fontSize(15)
      .text(code, rightX + 10, rightY + 9, {
        width: colW - 20,
        align: "center",
      });

    doc.font("Helvetica");
    rightY += codeBoxH + 26;

    // Rappel du séjour sur la droite
    doc
      .fillColor("#9ca3af")
      .fontSize(9)
      .text(
        "À utiliser lors d'une réservation\naux Chalets Ty-Koad.",
        rightX,
        rightY,
        { width: colW }
      );

    /* ───── Texte bas de carte (conditions / contact) ───── */
    const footerY = cardY + cardH - 70;

    doc
      .fillColor("#6b7280")
      .fontSize(9.5)
      .text(
        "Ce bon est utilisable lors de la réservation (directe ou via plateforme) conformément à nos CGV. " +
          "Il n’est ni échangeable, ni remboursable, sauf dispositions légales contraires. " +
          "Pour toute question : hello@ty-koad.fr",
        innerX,
        footerY,
        { width: innerW, align: "left" }
      );

    // Petits points décoratifs au bas de la carte
    const dotsY = cardY + cardH - 26;
    const centerX = cardX + cardW / 2;

    doc
      .circle(centerX - 14, dotsY, 2.2)
      .fillColor("#d1d5db")
      .fill();
    doc
      .circle(centerX, dotsY, 2.2)
      .fillColor("#9ca3af")
      .fill();
    doc
      .circle(centerX + 14, dotsY, 2.2)
      .fillColor("#d1d5db")
      .fill();

    // Fin du PDF
    doc.end();
    await done;

    return new Response(Buffer.concat(chunks), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="cheque-cadeau-tykoad.pdf"',
      },
    });
  } catch (e) {
    console.error("PDF error:", e);
    return new Response(`PDF error: ${e.message}`, { status: 500 });
  }
}
