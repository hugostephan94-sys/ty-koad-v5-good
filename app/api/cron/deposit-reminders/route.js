import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "../../../../lib/db";
import { Resend } from "resend";
import { CHALETS } from "../../../../lib/chalets";

function assertCron(req) {
  const auth = req.headers.get("authorization") || "";
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  return !!process.env.CRON_SECRET && auth === expected;
}

// YYYY-MM-DD en timezone Europe/Paris (fiable pour “arrive demain”)
function ymdParis(d) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d); // => 2026-01-04
}

export async function GET(req) {
  if (!assertCron(req)) return NextResponse.json({ ok: false }, { status: 401 });

  const resend = new Resend(process.env.RESEND_API_KEY);

  const now = new Date();
  const tomorrowKey = ymdParis(new Date(now.getTime() + 24 * 60 * 60 * 1000));

  // On récupère large (3 jours) puis on filtre “demain” côté code (évite les problèmes d’heure/UTC)
  const maxLookahead = new Date(now.getTime() + 72 * 60 * 60 * 1000);

  const reservations = await prisma.reservation.findMany({
    where: {
      ci: { gte: now, lt: maxLookahead },
      email: { not: null },
      status: { in: ["paid", "confirmed"] },
    },
    include: { depositHold: true },
    orderBy: { ci: "asc" },
  });

  let sent = 0;
  let scanned = 0;

  for (const r of reservations) {
    scanned++;

    // ✅ Seulement celles dont l'arrivée est DEMAIN (date Paris)
    if (ymdParis(r.ci) !== tomorrowKey) continue;

    // ✅ déjà envoyé
    if (r.depositHold?.emailSentAt) continue;

    const depositEuros =
      CHALETS?.[r.chalet]?.deposit ?? (r.chalet === "C2" ? 300 : 150);

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    // expire 48h après l'heure "ci" stockée (ok)
    const tokenExpiresAt = new Date(r.ci.getTime() + 48 * 60 * 60 * 1000);

    if (r.depositHold) {
      await prisma.depositHold.update({
        where: { id: r.depositHold.id },
        data: {
          amountCents: depositEuros * 100,
          tokenHash,
          tokenExpiresAt,
          emailSentAt: new Date(),
        },
      });
    } else {
      await prisma.depositHold.create({
        data: {
          reservationId: r.id,
          amountCents: depositEuros * 100,
          tokenHash,
          tokenExpiresAt,
          emailSentAt: new Date(),
        },
      });
    }

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
      ]
        .filter(Boolean)
        .join("\n"),
    });

    sent++;
  }

  return NextResponse.json({
    ok: true,
    tomorrowKey,
    scanned,
    sent,
  });
}
