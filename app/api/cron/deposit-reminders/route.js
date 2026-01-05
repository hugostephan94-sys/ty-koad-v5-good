// app/api/cron/deposit-reminders/route.js
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

// YYYY-MM-DD en timezone Europe/Paris
function ymdParis(d) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export async function GET(req) {
  if (!assertCron(req)) return NextResponse.json({ ok: false }, { status: 401 });

  const resend = new Resend(process.env.RESEND_API_KEY);

  const now = new Date();
  const todayKey = ymdParis(now);
  const tomorrowKey = ymdParis(new Date(now.getTime() + 24 * 60 * 60 * 1000));

  // On récupère large puis on filtre “aujourd’hui/demain” côté code.
  // Lookback pour éviter les soucis si CI est stocké à 00:00.
  const minLookback = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const maxLookahead = new Date(now.getTime() + 72 * 60 * 60 * 1000);

  const reservations = await prisma.reservation.findMany({
    where: {
      ci: { gte: minLookback, lt: maxLookahead },
      email: { not: null },
      // ✅ on accepte MAJUSCULES + minuscules (au cas où tu as déjà des anciennes lignes)
      OR: [
        { status: { in: ["PAID", "CONFIRMED"] } },
        { status: { in: ["paid", "confirmed"] } },
      ],
    },
    include: { depositHold: true },
    orderBy: { ci: "asc" },
  });

  let sent = 0;
  let scanned = 0;
  let matched = 0;
  let skippedAlreadySent = 0;

  for (const r of reservations) {
    scanned++;

    const ciKey = ymdParis(r.ci);

    // ✅ On envoie pour les arrivées AUJOURD’HUI ou DEMAIN (heure Paris)
    if (ciKey !== todayKey && ciKey !== tomorrowKey) continue;
    matched++;

    // ✅ déjà envoyé
    if (r.depositHold?.emailSentAt) {
      skippedAlreadySent++;
      continue;
    }

    const depositEuros =
      CHALETS?.[r.chalet]?.deposit ?? (r.chalet === "C2" ? 300 : 150);

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    // Expire 48h après l'heure "ci" stockée (ok)
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
    todayKey,
    tomorrowKey,
    scanned,
    matched,
    skippedAlreadySent,
    sent,
  });
}
