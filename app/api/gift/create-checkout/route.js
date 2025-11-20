import Stripe from "stripe";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { chalet, planKey, extras = [], fromName, buyerEmail, toName, toEmail, message } = await req.json();

    const PLAN_PRICES = {
      c2_week: 13000, c2_weekend: 15000,
      c1_2n: 14000,  c1_3n: 21000,  c1_4n: 28000,
    };

    // ✅ Ajout des 2 extras
    const EXTRAS = {
      fruits:      { label: "Plateau fruits de mer",     unit_amount: 6500 },
      champagne:   { label: "Champagne",                 unit_amount: 4500 },
      petales:     { label: "Pétales de rose",           unit_amount: 1500 },
      charcuterie: { label: "Plateau charcuterie",       unit_amount: 3000 },
      petitdej2:   { label: "Petit déjeuner (2 pers.)",  unit_amount: 2400 },
    };

    const planAmount = PLAN_PRICES[planKey];
    if (!planAmount) return new Response(JSON.stringify({ error: "Plan inconnu" }), { status: 400 });

    const line_items = [
      {
        price_data: {
          currency: "eur",
          unit_amount: planAmount,
          product_data: {
            name: chalet === "C2"
              ? "Chèque cadeau — Ty-Koad Duo (spa privatif)"
              : "Chèque cadeau — Ty-Koad (2 ch / 2 SDB)",
            metadata: { planKey },
          },
        },
        quantity: 1,
      },
      ...extras.map((k) => ({
        price_data: {
          currency: "eur",
          unit_amount: EXTRAS[k]?.unit_amount || 0,
          product_data: { name: EXTRAS[k]?.label || k },
        },
        quantity: 1,
      })),
    ];

    const base = process.env.SITE_URL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: buyerEmail || undefined,
      payment_method_types: ["card"],
      line_items,
      success_url: `${base}/cadeau/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/cadeau`,
      metadata: {
        chalet, planKey,
        extrasCSV: (extras || []).join(","),
        fromName: fromName || "", buyerEmail: buyerEmail || "",
        toName: toName || "", toEmail: toEmail || "",
        message: message || "",
      },
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
