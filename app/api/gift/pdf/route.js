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
    const contentX = 60;                         // marge gauche
    const contentWidth = pageWidth - 2 * 60;     // zone centrale

    /* ───── Fond crème ───── */
    doc
      .rect(0, 0, doc.page.width, doc.page.height)
      .fillColor("#fdf8f3")
      .fill();

    doc.fillColor("#374151"); // gris foncé global

    /* ───── Logo centré ───── */
    try {
      let logoBuffer = null;

      // 1) tentative via le système de fichiers
      try {
        const logoPath = path.join(process.cwd(), "public", "logo-tykoad.png");
        logoBuffer = fs.readFileSync(logoPath);
      } catch (e) {
        console.error("Erreur chargement logo via fs:", e);
      }

      // 2) fallback : via fetch sur l'URL publique
      if (!logoBuffer) {
        try {
          const baseUrl =
            process.env.NEXT_PUBLIC_SITE_URL ||
            process.env.SITE_URL ||
            "https://chalets-tykoad.fr";

          const resLogo = await fetch(`${baseUrl}/logo-tykoad.png`);
          if (resLogo.ok) {
            const arrayBuffer = await resLogo.arrayBuffer();
            logoBuffer = Buffer.from(arrayBuffer);
          } else {
            console.error("Erreur fetch logo PDF:", resLogo.status);
          }
        } catch (e) {
          console.error("Erreur chargement logo via fetch:", e);
        }
      }

      if (logoBuffer) {
        const logoWidth = 90;
        const logoX = (pageWidth - logoWidth) / 2;
        const logoY = 60;
        doc.image(logoBuffer, logoX, logoY, { fit: [logoWidth, logoWidth] });
      }
    } catch (e) {
      console.error("Erreur globale chargement logo PDF:", e);
    }

    let y = 170;

    /* ───── Titre principal ───── */
    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .fillColor("#374151")
      .text("CHÈQUE CADEAU", contentX, y, {
        align: "center",
        width: contentWidth,
      });

    y += 40;

    /* ───── Pour / Offert par ───── */
    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#4b5563")
      .text(`Pour : ${toName}`, contentX, y, {
        align: "center",
        width: contentWidth,
      });

    y += 22;

    doc
      .text(`Offert par : ${fromName}`, contentX, y, {
        align: "center",
        width: contentWidth,
      });

    y += 35;

    /* ───── Séjour offert / valeur ───── */
    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor("#374151")
      .text("Séjour offert :", contentX, y, {
        align: "center",
        width: contentWidth,
      });

    y += 22;

    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#4b5563")
      .text(planLabel, contentX, y, {
        align: "center",
        width: contentWidth,
      });

    y += 20;

    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#4b5563")
      .text(`Dans le ${chaletLabel}`, contentX, y, {
        align: "center",
        width: contentWidth,
      });

    y += 24;

    if (extras.length > 0) {
      doc
        .font("Helvetica")
        .fontSize(11.5)
        .fillColor("#4b5563")
        .text(
          extras.map((e) => `• ${e}`).join("\n"),
          contentX,
          y,
          {
            align: "center",
            width: contentWidth,
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
          contentX,
          y,
          {
            align: "center",
            width: contentWidth,
          }
        );
      y += 28;
    } else {
      y += 10;
    }

    /* ───── Message personnalisé (optionnel) ───── */
    if (message) {
      const boxWidth = contentWidth;
      const textWidth = boxWidth - 30;
      const msg = `« ${message} »`;

      const msgHeight = doc.heightOfString(msg, {
        width: textWidth,
        align: "center",
      }) + 20;

      const boxX = contentX;
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
      .text(`Code du chèque cadeau : ${code}`, contentX, y, {
        align: "center",
        width: contentWidth,
      });

    y += 40;

    /* ───── Comment utiliser ce bon ───── */
    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor("#374151")
      .text("Comment utiliser ce bon", contentX, y, {
        align: "center",
        width: contentWidth,
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
        contentX + 20,
        y,
        {
          align: "left",
          width: contentWidth - 40,
        }
      );

    y += instructions.length * 18 + 40;

    /* ───── Phrase de fin / signature ───── */
    doc
      .font("Helvetica")
      .fontSize(11.5)
      .fillColor("#374151")
      .text(
        "Nous avons hâte de vous accueillir aux Chalets Ty-Koad pour une parenthèse détente sous les arbres et les bulles du spa.",
        contentX,
        y,
        {
          align: "center",
          width: contentWidth,
        }
      );

    y += 40;

    doc
      .font("Helvetica-Oblique")
      .fontSize(11.5)
      .fillColor("#4b5563")
      .text("Hugo & Nina", contentX, y, {
        align: "center",
        width: contentWidth,
      });

    y += 20;

    doc
      .font("Helvetica")
      .fontSize(10.5)
      .fillColor("#9ca3af")
      .text("Les Chalets Ty-Koad – Laz", contentX, y, {
        align: "center",
        width: contentWidth,
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
