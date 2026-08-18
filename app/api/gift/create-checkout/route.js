import Stripe from "stripe";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const {
      chalet,
      planKey,
      extras = [],
      fromName,
      buyerEmail,
      toName,
      toEmail,
      message,
    } = await req.json();

    // 💶 Prix cohérents avec le front
    const PLAN_PRICES = {
      c2_week: 11000, // 110 €
      c2_weekend: 13000, // 130 €
      c1_2n: 14000, // 140 €
      c1_3n: 21000, // 210 €
      c1_4n: 28000, // 280 €
    };

    // 🎁 Options disponibles
    const EXTRAS = {
      fruits: {
        label: "Plateau fruits de mer",
        unit_amount: 6500, // 65 €
      },

      champagne: {
        label: "Champagne",
        unit_amount: 4500, // 45 €
      },

      petales: {
        label: "Pétales de rose",
        unit_amount: 1500, // 15 €
      },

      charcuterie: {
        label: "Plateau charcuterie",
        unit_amount: 3000, // 30 €
      },

      fromage: {
        label: "Plateau fromage",
        unit_amount: 2800, // 28 €
      },

      mixte: {
        label: "Plateau mixte charcuterie / fromage",
        unit_amount: 3500, // 35 €
      },

      petitdej2: {
        label: "Petit déjeuner (2 pers.)",
        unit_amount: 2400, // 24 €
      },
    };

    const planAmount = PLAN_PRICES[planKey];

    if (!planAmount) {
      return new Response(
        JSON.stringify({
          error: "Plan inconnu",
        }),
        {
          status: 400,
        }
      );
    }

    const line_items = [
      {
        price_data: {
          currency: "eur",

          unit_amount: planAmount,

          product_data: {
            name:
              chalet === "C2"
                ? "Chèque cadeau — Ty-Koad Duo (spa privatif)"
                : "Chèque cadeau — Ty-Koad (2 ch / 2 SDB)",

            metadata: {
              planKey,
            },
          },
        },

        quantity: 1,
      },

      ...extras.map((k) => ({
        price_data: {
          currency: "eur",

          unit_amount:
            EXTRAS[k]?.unit_amount || 0,

          product_data: {
            name:
              EXTRAS[k]?.label || k,
          },
        },

        quantity: 1,
      })),
    ];

    // 🔗 URL de base
    // En production :
    // https://www.chalets-tykoad.fr

    const { origin } =
      new URL(req.url);

    const baseUrl =
      origin ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    // 💳 Création de la session Stripe
    const session =
      await stripe.checkout.sessions.create({
        mode: "payment",

        customer_email:
          buyerEmail || undefined,

        payment_method_types: [
          "card",
        ],

        line_items,

        success_url:
          `${baseUrl}/cadeau/succes?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${baseUrl}/cadeau`,

        metadata: {
          chalet,

          planKey,

          extrasCSV:
            (extras || []).join(","),

          fromName:
            fromName || "",

          buyerEmail:
            buyerEmail || "",

          toName:
            toName || "",

          toEmail:
            toEmail || "",

          message:
            message || "",
        },
      });

    return new Response(
      JSON.stringify({
        url: session.url,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
      }
    );
  }
}
