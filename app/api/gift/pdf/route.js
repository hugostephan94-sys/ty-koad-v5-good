// app/api/gift/pdf/route.js
import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";          // pas de runtime edge
export const dynamic = "force-dynamic";   // route 100% dynamique

// formatte un montant en centimes -> "110,00 €"
function eur(cents) {
  return (cents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

// (optionnel) on retire les emojis pour éviter les caractères bizarres
function stripEmojis(str) {
  if (!str) return "";
  // enlève la plupart des emojis modernes
  return str.replace(/[\u{1F000}-\u{1FAFF}]/gu, "");
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const code        = searchParams.get("code") || "TKO-XXXX-XXXX";
    const chaletLabel = searchParams.get("chaletLabel") || "Chalets Ty-Koad";
    const planLabel   = searchParams.get("planLabel") || "Séjour";
    const amountCents = Number(searchParams.get("amountCents") || "0");
    const fromName    = searchParams.get("fromName") || "…";
    const toName      = searchParams.get("toName") || "…";
    let   message     = searchParams.get("message") || "";
    const extrasCSV   = searchParams.get("extrasCSV") || "";

    // Nettoyage éventuel du message perso (pour éviter les emojis cassés)
    message = stripEmojis(message);

    const extras = extrasCSV
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const doc = new PDFDocument({ size: "A4", margin: 60 });

    const chunks = [];
    doc.on("data", (c) => chunks.push(c));
    const done = new Promise((resolve, reject) => {
      doc.on("end", resolve);
      doc.on("error", reject);
    });

    const pageWidth = doc.page.width;

    /* ───── Fond crème ───── */
    doc
      .rect(0, 0, doc.page.width, doc.page.height)
      .fillColor("#fdf8f3")
      .fill();

    doc.fillColor("#374151"); // gris foncé global

    /* ───── Logo centré ───── */
    try {
      const logoPath = path.join(process.cwd(), "public", "logo-tykoad.png");
      const logoBuffer = fs.readFileSync(logoPath);
      const logoWidth = 90;
      const logoX = (pageWidth - logoWidth) / 2;
      const logoY = 60;

      doc.image(logoBuffer, logoX, logoY, { fit: [logoWidth, logoWidth] });
    } catch (e) {
      console.error("Erreur chargement logo PDF:", e);
      // on ignore, le PDF reste utilisable
    }

    let y = 170;

    /* ───── Titre principal ───── */
    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .fillColor("#374151")
      .text("CHÈQUE CADEAU", 0, y, {
        align: "center",
      });

    y += 40;

    /* ───── Pour / Offert par ───── */
    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#4b5563")
      .text(`Pour : ${toName}`, 100, y, {
        align: "center",
        width: pageWidth - 200,
      });

    y += 22;

    doc
      .text(`Offert par : ${fromName}`, 100, y, {
        align: "center",
        width: pageWidth - 200,
      });

    y += 35;

    /* ───── Séjour offert / valeur ───── */
    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor("#374151")
      .text("Séjour offert :", 100, y, {
        align: "center",
        width: pageWidth - 200,
      });

    y += 22;

    // Description du séjour (planLabel + chaletLabel)
    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#4b5563")
      .text(planLabel, 100, y, {
        align: "center",
        width: pageWidth - 200,
      });

    y += 20;

    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#4b5563")
      .text(`Dans le ${chaletLabel}`, 100, y, {
        align: "center",
        width: pageWidth - 200,
      });

    y += 24;

    if (extras.length > 0) {
      doc
        .font("Helvetica")
        .fontSize(11.5)
        .fillColor("#4b5563")
        .text(
          extras.map((e) => `• ${e}`).join("\n"),
          100,
          y,
          {
            align: "center",
            width: pageWidth - 200,
          }
        );

      y += 18 * extras.length + 8;
    }

    if (amountCents > 0) {
      doc
        .font("Helvetica-Oblique")
        .fontSize(11.5)
        .fillColor("#6b7280")
        .text(
          `Valeur du chèque cadeau : ${eur(amountCents)}`,
          100,
          y,
          {
            align: "center",
            width: pageWidth - 200,
          }
        );
      y += 28;
    } else {
      y += 10;
    }

    /* ───── Message personnalisé (optionnel) ───── */
    if (message) {
      const boxWidth = pageWidth - 200;
      const textWidth = boxWidth - 30;
      const msg = `« ${message} »`;

      const msgHeight = doc.heightOfString(msg, {
        width: textWidth,
        align: "center",
      }) + 20;

      const boxX = (pageWidth - boxWidth) / 2;
      const boxY = y;

      doc
        .roundedRect(boxX, boxY, boxWidth, msgHeight, 12)
        .fillColor("#fef3c7")
        .strokeColor("#fde68a")
        .lineWidth(1)
        .fillAndStroke();

      doc
        .font("Helvetica-Oblique")
        .fontSize(11)
        .fillColor("#92400e")
        .text(msg, boxX + 15, boxY + 10, {
          width: textWidth,
          align: "center",
        });

      y += msgHeight + 30;
    }

    /* ───── Code cadeau ───── */
    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#374151")
      .text(`Code du chèque cadeau : ${code}`, 100, y, {
        align: "center",
        width: pageWidth - 200,
      });

    y += 40;

    /* ───── Comment utiliser ce bon (sans emoji) ───── */
    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor("#374151")
      .text("Comment utiliser ce bon", 100, y, {
        align: "center",
        width: pageWidth - 200,
      });

    y += 28;

    const instructions = [
      "Réservation obligatoire à l’avance, selon disponibilités",
      "Valable pour une nuit ou un séjour selon les conditions indiquées lors de l’achat",
      "À mentionner lors de la réservation (site, téléphone ou message)",
    ];

    doc
      .font("Helvetica")
      .fontSize(11.5)
      .fillColor("#4b5563")
      .text(
        instructions.map((s) => `• ${s}`).join("\n"),
        120,
        y,
        {
          align: "left",
          width: pageWidth - 240,
        }
      );

    y += instructions.length * 18 + 40;

    /* ───── Phrase de fin / signature (sans emoji) ───── */
    doc
      .font("Helvetica")
      .fontSize(11.5)
      .fillColor("#374151")
      .text(
        "Nous avons hâte de vous accueillir aux Chalets Ty-Koad pour une parenthèse détente sous les arbres et les bulles du spa.",
        80,
        y,
        {
          align: "center",
          width: pageWidth - 160,
        }
      );

    y += 40;

    doc
      .font("Helvetica-Oblique")
      .fontSize(11.5)
      .fillColor("#4b5563")
      .text("Hugo & Nina", 0, y, {
        align: "center",
      });

    y += 20;

    doc
      .font("Helvetica")
      .fontSize(10.5)
      .fillColor("#9ca3af")
      .text("Les Chalets Ty-Koad – Laz", 0, y, {
        align: "center",
      });

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
