-- CreateTable
CREATE TABLE "public"."DepositHold" (
    "id" SERIAL NOT NULL,
    "reservationId" INTEGER NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "tokenExpiresAt" TIMESTAMP(3) NOT NULL,
    "emailSentAt" TIMESTAMP(3),
    "paymentIntentId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "authorizedAt" TIMESTAMP(3),
    "capturedAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DepositHold_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DepositHold_reservationId_key" ON "public"."DepositHold"("reservationId");

-- CreateIndex
CREATE UNIQUE INDEX "DepositHold_tokenHash_key" ON "public"."DepositHold"("tokenHash");

-- CreateIndex
CREATE UNIQUE INDEX "DepositHold_paymentIntentId_key" ON "public"."DepositHold"("paymentIntentId");

-- AddForeignKey
ALTER TABLE "public"."DepositHold" ADD CONSTRAINT "DepositHold_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "public"."Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
