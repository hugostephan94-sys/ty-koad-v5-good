import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "../../../../lib/db";
import { Resend } from "resend";
import { CHALETS } from "../../../../lib/chalets";

function assertCron(req) {
  const auth = req.headers.get("authorization") || "";
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  return process.env.CRON_SECRET && auth === expected;
}

export async function GET(req) {
  if (!assertCron(req)) return NextResponse.json({ ok: false }, { status: 401 });

  const resend = new Resend(process.env.RESEND_API_KEY);

  const now = new Date();
  const start = new Date(now.getTime() + 23 * 60 * 60 * 1000);
  const end   = new Date(now.getTime() + 25 * 60 * 60 * 1000);

  const reservations = await prisma.reservation.findMany({
    where: {
      ci: { gte: start, lt: end },
      email: { not: null },
      status: { in: ["paid", "confirmed"] },
    },
    include: { depositHold: true },
  });

  let sent = 0;

  for (const r of reservations) {
    if (r.depositHold?.emailSentAt) continue;

    const depositEuros = CHALETS[r.chalet]?.deposit ?? (r.chalet === "C2" ? 300 : 150);

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const tokenExpiresAt = new Date(r.ci.getTime() + 48 * 60 * 60 * 1000);

    const hold = r.depositHold
      ? await prisma.depositHold.update({
          where: { id: r.depositHold.id },
          data: { amountCents: depositEuros * 100, tokenHash, tokenExpiresAt, emailSentAt: new Date() },
        })
      : await prisma.depositHold.create({
          data: { reservationId: r.id, amountCents: depositEuros * 100, tokenHash, tokenExpiresAt, emailSentAt: new Date() },
        });

    const link = `${process.env.APP_URL}/caution?token=${token}`;

    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: r.email,
      subject: `Caution (empreinte bancaire) – ${depositEuros}€`,
      text: [
        `Bonjour ${r.firstname || ""},`,
        "",
        `Voici le lien pour réaliser l’empreinte bancaire de caution (${depositEuros}€).`,
        "Aucun débit immédiat : c’est une empreinte bancaire.",
        "",
        link,
        "",
        "À très vite,",
        "Hugo & Nina",
      ].filter(Boolean).join("\n"),
    });

    sent++;
  }

  return NextResponse.json({ ok: true, sent });
}
