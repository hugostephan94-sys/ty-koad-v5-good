// app/api/gift/claim/route.js
import Stripe from "stripe";
import { Resend } from "resend";
import prisma from "../../../../lib/db";

/* ============================================================
   HELPERS
   ============================================================ */

function formatEuro(cents) {
  return (cents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

// Évite qu'un nom ou message utilisateur injecte du HTML dans l'e-mail
function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ============================================================
   ROUTE
   ============================================================ */

export async function POST(req) {
  try {
    const { session_id } = await req.json();

    if (!session_id) {
      return new Response(
        JSON.stringify({
          error: "session_id manquant",
        }),
        {
          status: 400,
        }
      );
    }

    /* ========================================================
       RÉCUPÉRATION DU PAIEMENT STRIPE
       ======================================================== */

    const stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY
    );

    const session =
      await stripe.checkout.sessions.retrieve(
        session_id,
        {
          expand: ["line_items"],
        }
      );

    if (
      session.payment_status !== "paid"
    ) {
      return new Response(
        JSON.stringify({
          error: "Paiement non confirmé",
        }),
        {
          status: 400,
        }
      );
    }

    const md = session.metadata || {};

    const amountCents =
      session.amount_total || 0;

    /* ========================================================
       INFORMATIONS DU CADEAU
       ======================================================== */

    const chaletLabel =
      md.chalet === "C2"
        ? "Ty-Koad Duo (spa privatif)"
        : "Ty-Koad — 2 chambres / 2 SDB";

    const mainItem =
      session.line_items?.data?.[0];

    const planLabel =
      mainItem?.description || "Séjour";

    /* ========================================================
       MAPPING DES OPTIONS
       ======================================================== */

    const extrasCSV = (
      md.extrasCSV || ""
    )
      .split(",")
      .filter(Boolean)
      .map((s) => s.trim())
      .map((k) => {
        if (k === "fruits") {
          return "Plateau fruits de mer";
        }

        if (k === "champagne") {
          return "Champagne";
        }

        if (k === "petales") {
          return "Pétales de rose";
        }

        if (k === "charcuterie") {
          return "Plateau charcuterie";
        }

        if (k === "fromage") {
          return "Plateau fromage";
        }

        if (k === "mixte") {
          return "Plateau mixte charcuterie / fromage";
        }

        if (k === "petitdej2") {
          return "Petit déjeuner (2 pers.)";
        }

        return k;
      })
      .join(", ");

    /* ========================================================
       GÉNÉRATION DU CODE CADEAU
       ======================================================== */

    const base = (
      (md.fromName || "") +
      "-" +
      (md.toName || "") +
      "-" +
      new Date()
        .toISOString()
        .slice(0, 10)
    ).toUpperCase();

    let h = 0;

    for (
      let i = 0;
      i < base.length;
      i++
    ) {
      h =
        (h * 31 +
          base.charCodeAt(i)) >>>
        0;
    }

    const chunk = (
      h
        .toString(36)
        .toUpperCase() +
      "0000"
    ).slice(0, 8);

    const code =
      `TKO-${chunk.slice(
        0,
        4
      )}-${chunk.slice(4, 8)}`;

    /* ========================================================
       ENREGISTREMENT EN BASE
       ======================================================== */

    await prisma.gift.upsert({
      where: {
        code,
      },

      update: {},

      create: {
        code,

        chalet: md.chalet,

        planKey: md.planKey,

        amountCents,

        extrasCSV,

        fromName:
          md.fromName || "",

        toName:
          md.toName || "",

        buyerEmail:
          md.buyerEmail || null,

        toEmail:
          md.toEmail || null,

        message:
          md.message || null,
      },
    });

    /* ========================================================
       URL DU PDF
       ======================================================== */

    const { origin } =
      new URL(req.url);

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      origin;

    const pdfUrl =
      new URL(
        "/api/gift/pdf",
        baseUrl
      );

    pdfUrl.searchParams.set(
      "code",
      code
    );

    pdfUrl.searchParams.set(
      "chaletLabel",
      chaletLabel
    );

    pdfUrl.searchParams.set(
      "planLabel",
      planLabel
    );

    // Le montant n'est volontairement PAS envoyé au PDF.

    pdfUrl.searchParams.set(
      "fromName",
      md.fromName || ""
    );

    pdfUrl.searchParams.set(
      "toName",
      md.toName || ""
    );

    pdfUrl.searchParams.set(
      "message",
      md.message || ""
    );

    pdfUrl.searchParams.set(
      "extrasCSV",
      extrasCSV
    );

    /* ========================================================
       CONFIGURATION RESEND
       ======================================================== */

    const resendApiKey =
      process.env.RESEND_API_KEY;

    const resendFrom = (
      process.env.RESEND_FROM ||
      "Les Chalets Ty-Koad <hugo@chalets-tykoad.fr>"
    ).trim();

    const buyerEmail =
      typeof md.buyerEmail ===
      "string"
        ? md.buyerEmail.trim()
        : "";

    const beneficiaryEmail =
      typeof md.toEmail ===
      "string"
        ? md.toEmail.trim()
        : "";

    let emailError = null;

    /* ========================================================
       DONNÉES NETTOYÉES POUR LES E-MAILS
       ======================================================== */

    const safeFromName =
      escapeHtml(md.fromName);

    const safeToName =
      escapeHtml(md.toName);

    const safeChaletLabel =
      escapeHtml(chaletLabel);

    const safePlanLabel =
      escapeHtml(planLabel);

    const safeExtrasCSV =
      escapeHtml(extrasCSV);

    const safeMessage =
      escapeHtml(md.message);

    const pdfLink =
      pdfUrl.toString();

    /* ========================================================
       E-MAIL ACHETEUR
       LE PRIX EST VISIBLE
       ======================================================== */

    const buyerHtml = `
      <div
        style="
          font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
          line-height:1.6;
          color:#292524;
          max-width:620px;
          margin:0 auto;
        "
      >
        <div
          style="
            background:#064e3b;
            color:#ffffff;
            padding:24px;
            border-radius:16px 16px 0 0;
          "
        >
          <div
            style="
              font-size:12px;
              text-transform:uppercase;
              letter-spacing:1.5px;
              color:#a7f3d0;
            "
          >
            Les Chalets Ty-Koad
          </div>

          <h2
            style="
              margin:8px 0 0;
              font-size:24px;
            "
          >
            Merci pour votre achat 🎁
          </h2>
        </div>

        <div
          style="
            border:1px solid #e7e5e4;
            border-top:0;
            padding:24px;
            border-radius:0 0 16px 16px;
          "
        >
          <p>
            Bonjour${safeFromName ? ` ${safeFromName}` : ""},
          </p>

          <p>
            Votre chèque cadeau pour
            <strong>${safeToName || "le bénéficiaire"}</strong>
            est prêt.
          </p>

          <div
            style="
              background:#f5f5f4;
              border-radius:12px;
              padding:16px;
              margin:20px 0;
            "
          >
            <p style="margin:0 0 8px;">
              <strong>Code :</strong>
              ${code}
            </p>

            <p style="margin:0 0 8px;">
              <strong>Chalet :</strong>
              ${safeChaletLabel}
            </p>

            <p style="margin:0 0 8px;">
              <strong>Séjour :</strong>
              ${safePlanLabel}
            </p>

            ${
              safeExtrasCSV
                ? `
                  <p style="margin:0 0 8px;">
                    <strong>Options :</strong>
                    ${safeExtrasCSV}
                  </p>
                `
                : ""
            }

            <p style="margin:0;">
              <strong>Montant payé :</strong>
              ${formatEuro(amountCents)}
            </p>
          </div>

          <p
            style="
              margin:24px 0;
            "
          >
            <a
              href="${pdfLink}"
              style="
                display:inline-block;
                background:#047857;
                color:#ffffff;
                text-decoration:none;
                padding:12px 18px;
                border-radius:10px;
                font-weight:600;
              "
            >
              Télécharger le chèque cadeau
            </a>
          </p>

          <p
            style="
              font-size:13px;
              color:#78716c;
            "
          >
            Le montant payé n'apparaît pas sur le chèque cadeau destiné au
            bénéficiaire.
          </p>

          <p>
            À bientôt,<br/>
            <strong>Hugo & Nina</strong><br/>
            Les Chalets Ty-Koad
          </p>
        </div>
      </div>
    `;

    /* ========================================================
       E-MAIL BÉNÉFICIAIRE
       AUCUN PRIX
       ======================================================== */

    const beneficiaryHtml = `
      <div
        style="
          font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
          line-height:1.6;
          color:#292524;
          max-width:620px;
          margin:0 auto;
        "
      >
        <div
          style="
            background:#064e3b;
            color:#ffffff;
            padding:24px;
            border-radius:16px 16px 0 0;
          "
        >
          <div
            style="
              font-size:12px;
              text-transform:uppercase;
              letter-spacing:1.5px;
              color:#a7f3d0;
            "
          >
            Les Chalets Ty-Koad
          </div>

          <h2
            style="
              margin:8px 0 0;
              font-size:24px;
            "
          >
            Vous avez reçu un cadeau 🎁
          </h2>
        </div>

        <div
          style="
            border:1px solid #e7e5e4;
            border-top:0;
            padding:24px;
            border-radius:0 0 16px 16px;
          "
        >
          <p>
            Bonjour${safeToName ? ` ${safeToName}` : ""},
          </p>

          <p>
            <strong>${safeFromName || "Quelqu’un"}</strong>
            vous offre une parenthèse aux
            <strong>Chalets Ty-Koad</strong>.
          </p>

          <div
            style="
              background:#ecfdf5;
              border:1px solid #d1fae5;
              border-radius:12px;
              padding:16px;
              margin:20px 0;
            "
          >
            <p style="margin:0 0 8px;">
              <strong>Votre séjour :</strong>
              ${safePlanLabel}
            </p>

            <p style="margin:0 0 8px;">
              <strong>Chalet :</strong>
              ${safeChaletLabel}
            </p>

            ${
              safeExtrasCSV
                ? `
                  <p style="margin:0 0 8px;">
                    <strong>Options offertes :</strong>
                    ${safeExtrasCSV}
                  </p>
                `
                : ""
            }

            <p style="margin:0;">
              <strong>Code cadeau :</strong>
              ${code}
            </p>
          </div>

          ${
            safeMessage
              ? `
                <div
                  style="
                    background:#fffbeb;
                    border:1px solid #fde68a;
                    border-radius:12px;
                    padding:16px;
                    margin:20px 0;
                    font-style:italic;
                  "
                >
                  « ${safeMessage} »
                </div>
              `
              : ""
          }

          <p>
            Votre chèque cadeau est disponible ci-dessous.
          </p>

          <p
            style="
              margin:24px 0;
            "
          >
            <a
              href="${pdfLink}"
              style="
                display:inline-block;
                background:#047857;
                color:#ffffff;
                text-decoration:none;
                padding:12px 18px;
                border-radius:10px;
                font-weight:600;
              "
            >
              Découvrir mon chèque cadeau
            </a>
          </p>

          <p
            style="
              font-size:13px;
              color:#78716c;
            "
          >
            La réservation s'effectue selon les disponibilités des Chalets
            Ty-Koad.
          </p>

          <p>
            Au plaisir de vous accueillir,<br/>
            <strong>Hugo & Nina</strong><br/>
            Les Chalets Ty-Koad
          </p>
        </div>
      </div>
    `;

    /* ========================================================
       ENVOI DES E-MAILS
       ======================================================== */

    if (!resendApiKey) {
      emailError =
        "RESEND_API_KEY non configurée.";
    } else if (!resendFrom) {
      emailError =
        "RESEND_FROM non configuré.";
    } else if (
      !buyerEmail &&
      !beneficiaryEmail
    ) {
      emailError =
        "Aucune adresse e-mail valide fournie.";
    } else {
      try {
        const resend =
          new Resend(
            resendApiKey
          );

        const errors = [];

        /* ----------------------------------------------------
           EMAIL ACHETEUR
           ---------------------------------------------------- */

        if (buyerEmail) {
          try {
            const buyerResult =
              await resend.emails.send({
                from: resendFrom,

                to: [
                  buyerEmail,
                ],

                subject:
                  `Votre achat – Chèque cadeau Ty-Koad ${code}`,

                html:
                  buyerHtml,
              });

            console.log(
              "Gift claim – Buyer email result",
              buyerResult
            );
          } catch (e) {
            console.error(
              "Resend buyer error:",
              e
            );

            errors.push(
              "Erreur lors de l'envoi de l'e-mail à l'acheteur."
            );
          }
        }

        /* ----------------------------------------------------
           EMAIL BÉNÉFICIAIRE

           Si c'est la même adresse que l'acheteur,
           on n'envoie pas un deuxième e-mail.
           ---------------------------------------------------- */

        if (
          beneficiaryEmail &&
          beneficiaryEmail.toLowerCase() !==
            buyerEmail.toLowerCase()
        ) {
          try {
            const beneficiaryResult =
              await resend.emails.send({
                from: resendFrom,

                to: [
                  beneficiaryEmail,
                ],

                subject:
                  `${safeFromName || "Quelqu’un"} vous offre un séjour aux Chalets Ty-Koad 🎁`,

                html:
                  beneficiaryHtml,
              });

            console.log(
              "Gift claim – Beneficiary email result",
              beneficiaryResult
            );
          } catch (e) {
            console.error(
              "Resend beneficiary error:",
              e
            );

            errors.push(
              "Erreur lors de l'envoi de l'e-mail au bénéficiaire."
            );
          }
        }

        if (errors.length) {
          emailError =
            errors.join(" ");
        }
      } catch (e) {
        console.error(
          "Resend error:",
          e
        );

        emailError =
          (e && e.message) ||
          "Erreur d'envoi de l'e-mail via Resend.";
      }
    }

    /* ========================================================
       RÉPONSE
       ======================================================== */

    return new Response(
      JSON.stringify({
        ok: true,

        code,

        downloadUrl:
          pdfUrl.toString(),

        emailError,
      }),
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);

    return new Response(
      JSON.stringify({
        error: e.message,
      }),
      {
        status: 500,
      }
    );
  }
}
