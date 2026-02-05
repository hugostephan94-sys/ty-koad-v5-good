import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "../../../../lib/db";
import { Resend } from "resend";
import { CHALETS } from "../../../../lib/chalets";

export const dynamic = "force-dynamic";

function assertCron(req) {
  const auth = req.headers.get("authorization") || "";
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  return !!process.env.CRON_SECRET && auth === expected;
}

function mustEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
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

// ✅ STATUTS AUTORISÉS (ton enum Prisma est en MAJUSCULE)
const ALLOWED_STATUSES = ["PAID", "CONFIRMED"];

export async function GET(req) {
  if (!assertCron(req)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    mustEnv("RESEND_API_KEY");
    mustEnv("RESEND_FROM");
    mustEnv("APP_URL");

    const resend = new Resend(process.env.RESEND_API_KEY);

    const now = new Date();
    const tomorrowKey = ymdParis(new Date(now.getTime() + 24 * 60 * 60 * 1000));
    const maxLookahead = new Date(now.getTime() + 72 * 60 * 60 * 1000);

    // ✅ IMPORTANT : on filtre EN BASE uniquement PAID/CONFIRMED
    const reservations = await prisma.reservation.findMany({
      where: {
        ci: { gte: now, lt: maxLookahead },
        email: { not: null },
        status: { in: ALLOWED_STATUSES },
        // bonus: si tu veux être ultra strict, exige un PI (paiement ou pseudo PI gratuit)
        paymentIntentId: { not: null },
      },
      include: { depositHold: true },
      orderBy: { ci: "asc" },
    });

    let scanned = 0;
    let sent = 0;
    let skippedNotTomorrow = 0;
    let skippedAlreadySent = 0;

    for (const r of reservations) {
      scanned++;

      // ✅ Seulement “arrive demain” (date Paris)
      if (ymdParis(r.ci) !== tomorrowKey) {
        skippedNotTomorrow++;
        continue;
      }

      // ✅ déjà envoyé
      if (r.depositHold?.emailSentAt) {
        skippedAlreadySent++;
        continue;
      }

      const depositEuros =
        Number(CHALETS?.[r.chalet]?.deposit) || (r.chalet === "C2" ? 300 : 150);

      const token = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
      const tokenExpiresAt = new Date(r.ci.getTime() + 48 * 60 * 60 * 1000);

      const hold = r.depositHold
        ? await prisma.depositHold.update({
            where: { id: r.depositHold.id },
            data: {
              amountCents: depositEuros * 100,
              tokenHash,
              tokenExpiresAt,
              emailSentAt: new Date(),
            },
          })
        : await prisma.depositHold.create({
            data: {
              reservationId: r.id,
              amountCents: depositEuros * 100,
              tokenHash,
              tokenExpiresAt,
              emailSentAt: new Date(),
            },
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
      skippedNotTomorrow,
      skippedAlreadySent,
      allowedStatuses: ALLOWED_STATUSES,
    });
  } catch (e) {
    console.error("[deposit-reminders] ERROR:", e);
    return NextResponse.json(
      { ok: false, error: e?.message || "Internal Error" },
      { status: 500 }
    );
  }
}
