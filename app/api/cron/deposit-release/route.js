// app/api/cron/deposit-release/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../../lib/db";

function assertCron(req) {
  const auth = req.headers.get("authorization") || "";
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  return !!process.env.CRON_SECRET && auth === expected;
}

export async function GET(req) {
  try {
    if (!assertCron(req)) return NextResponse.json({ ok: false }, { status: 401 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

    // ✅ libère l’empreinte 3 jours après le départ
    const now = new Date();
    const cutoff = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

    const holds = await prisma.depositHold.findMany({
      where: {
        status: "REQUIRES_CAPTURE",
        paymentIntentId: { not: null },
        reservation: { co: { lt: cutoff } },
      },
      include: { reservation: true },
      orderBy: { updatedAt: "asc" },
    });

    let canceled = 0;
    let failed = 0;

    for (const h of holds) {
      try {
        await stripe.paymentIntents.cancel(h.paymentIntentId);

        await prisma.depositHold.update({
          where: { id: h.id },
          data: { status: "CANCELED", canceledAt: new Date() },
        });

        canceled++;
      } catch (e) {
        failed++;
        console.error("deposit-release cancel error:", h.id, h.paymentIntentId, e?.message);
      }
    }

    return NextResponse.json({ ok: true, cutoff: cutoff.toISOString(), scanned: holds.length, canceled, failed });
  } catch (e) {
    console.error("deposit-release fatal:", e);
    return new NextResponse(null, { status: 500 });
  }
}
