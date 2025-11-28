-- CreateTable
CREATE TABLE "Gift" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "issuedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME,
    "usedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chalet" TEXT NOT NULL,
    "ci" DATETIME NOT NULL,
    "co" DATETIME NOT NULL,
    "firstname" TEXT,
    "email" TEXT,
    "adults" INTEGER NOT NULL DEFAULT 1,
    "children" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'confirmed',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Gift_code_key" ON "Gift"("code");
