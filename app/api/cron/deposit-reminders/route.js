import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "../../../../lib/db";
import { Resend } from "resend";
import { CHALETS } from "../../../../lib/chalets";
import { Prisma } from "@prisma/client";

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

// YYYY-MM-DD en timezone Europe/Paris (fiable pour “arrive demain”)
function ymdParis(d) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

/**
 * Essaie de récupérer les bonnes valeurs ENUM pour “paid/confirmed”
 * sans faire planter Prisma si tes enums ne s’appellent pas exactement PAID/CONFIRMED.
 */
function pickActiveStatuses() {
  const enumValues = Prisma?.ReservationStatus
    ? Object.values(Prisma.ReservationStatus)
    : [];

  // On accepte les valeurs qui contiennent PAID ou CONFIRM
  const picked = enumValues.filter((v) => {
    const u = String(v).toUpperCase();
    return u.includes("PAID") || u.includes("CONFIRM");
  });

  return { enumValues, picked };
}

export async function GET(req) {
  if (!assertCron(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    mustEnv("RESEND_API_KEY");
    mustEnv("RESEND_FROM");
    mustEnv("APP_URL");

    const resend = new Resend(process.env.RESEND_API_KEY);

    const now = new Date();

    // ✅ on veut “arrive demain” (date Paris)
    const tomorrowKey = ymdParis(new Date(now.getTime() + 24 * 60 * 60 * 1000));

    // On récupère large (jusqu'à 72h) puis on filtre “demain” côté code
    const maxLookahead = new Date(now.getTime() + 72 * 60 * 60 * 1000);

    const { enumValues, picked } = pickActiveStatuses();

    // ✅ Si on trouve des statuts “actifs”, on filtre en DB
    // ✅ Sinon, on ne met PAS de filtre status (pour éviter le crash)
    const whereStatus = picked.length ? { in: picked } : undefined;

    const reservations = await prisma.reservation.findMany({
      where: {
        ci: { gte: now, lt: maxLookahead },
        email: { not: null },
        ...(whereStatus ? { status: whereStatus } : {}),
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
        CHALETS?.[r.chalet]?.deposit ?? (r.chalet === "C2" ? 300 : 150);

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
            },
          })
        : await prisma.depositHold.create({
            data: {
              reservationId: r.id,
              amountCents: depositEuros * 100,
              tokenHash,
              tokenExpiresAt,
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

      await prisma.depositHold.update({
        where: { id: hold.id },
        data: { emailSentAt: new Date() },
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
      // utile pour debug (endpoint protégé par CRON_SECRET)
      statusEnumValues: enumValues,
      statusPickedForQuery: picked,
    });
  } catch (e) {
    console.error("[deposit-reminders] ERROR:", e);
    return NextResponse.json(
      { ok: false, error: e?.message || "Internal Error" },
      { status: 500 }
    );
  }
}
