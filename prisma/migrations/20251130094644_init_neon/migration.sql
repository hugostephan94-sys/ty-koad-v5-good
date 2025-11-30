-- CreateTable
CREATE TABLE "public"."Gift" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "chalet" TEXT NOT NULL,
    "planKey" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "extrasCSV" TEXT NOT NULL,
    "fromName" TEXT NOT NULL,
    "toName" TEXT NOT NULL,
    "buyerEmail" TEXT,
    "toEmail" TEXT,
    "message" TEXT,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reservation" (
    "id" SERIAL NOT NULL,
    "chalet" TEXT NOT NULL,
    "ci" TIMESTAMP(3) NOT NULL,
    "co" TIMESTAMP(3) NOT NULL,
    "firstname" TEXT,
    "email" TEXT,
    "adults" INTEGER NOT NULL DEFAULT 1,
    "children" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'confirmed',
    "paymentIntentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gift_code_key" ON "public"."Gift"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_paymentIntentId_key" ON "public"."Reservation"("paymentIntentId");
