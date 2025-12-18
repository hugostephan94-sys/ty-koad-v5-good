import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../../../lib/db";

function assertCron(req) {
  const auth = req.headers.get("authorization") || "";
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  return process.env.CRON_SECRET && auth === expected;
}

export async function GET(req) {
  if (!assertCron(req)) return NextResponse.json({ ok: false }, { status: 401 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // marge après checkout (ex: 6h)
  const now = new Date();
  const cutoff = new Date(now.getTime() - 6 * 60 * 60 * 1000);

  const holds = await prisma.depositHold.findMany({
    where: {
      status: "requires_capture",
      paymentIntentId: { not: null },
      reservation: { co: { lt: cutoff } },
    },
    include: { reservation: true },
  });

  let canceled = 0;

  for (const h of holds) {
    try {
      await stripe.paymentIntents.cancel(h.paymentIntentId);
      await prisma.depositHold.update({
        where: { id: h.id },
        data: { status: "canceled", canceledAt: new Date() },
      });
      canceled++;
    } catch (e) {
      // on laisse pour le prochain cron
    }
  }

  return NextResponse.json({ ok: true, canceled });
}
