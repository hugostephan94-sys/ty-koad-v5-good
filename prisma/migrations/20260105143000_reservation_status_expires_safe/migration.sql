-- 1) Enums (si déjà existants, on ignore)
DO $$ BEGIN
  CREATE TYPE "ReservationStatus" AS ENUM ('PENDING','PAID','CONFIRMED','FAILED','CANCELED','EXPIRED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "DepositStatus" AS ENUM ('PENDING','REQUIRES_CAPTURE','CAPTURED','CANCELED','FAILED');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 2) Reservation: ajout colonnes non destructif
ALTER TABLE "Reservation"
  ADD COLUMN IF NOT EXISTS "expiresAt" TIMESTAMP(3);

-- updatedAt : NOT NULL + default pour remplir les anciennes lignes
ALTER TABLE "Reservation"
  ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- 3) Reservation: conversion status (String -> Enum) sans perte
ALTER TABLE "Reservation"
  ADD COLUMN IF NOT EXISTS "status_new" "ReservationStatus" NOT NULL DEFAULT 'CONFIRMED';

UPDATE "Reservation"
SET "status_new" = CASE
  WHEN LOWER(COALESCE("status",'confirmed')) IN ('pending') THEN 'PENDING'::"ReservationStatus"
  WHEN LOWER(COALESCE("status",'confirmed')) IN ('paid') THEN 'PAID'::"ReservationStatus"
  WHEN LOWER(COALESCE("status",'confirmed')) IN ('confirmed') THEN 'CONFIRMED'::"ReservationStatus"
  WHEN LOWER(COALESCE("status",'confirmed')) IN ('failed') THEN 'FAILED'::"ReservationStatus"
  WHEN LOWER(COALESCE("status",'confirmed')) IN ('canceled','cancelled') THEN 'CANCELED'::"ReservationStatus"
  WHEN LOWER(COALESCE("status",'confirmed')) IN ('expired','expire','expiré') THEN 'EXPIRED'::"ReservationStatus"
  ELSE 'CONFIRMED'::"ReservationStatus"
END;

ALTER TABLE "Reservation" DROP COLUMN "status";
ALTER TABLE "Reservation" RENAME COLUMN "status_new" TO "status";

-- 4) DepositHold: conversion status (String -> Enum) sans perte
ALTER TABLE "DepositHold"
  ADD COLUMN IF NOT EXISTS "status_new" "DepositStatus" NOT NULL DEFAULT 'PENDING';

UPDATE "DepositHold"
SET "status_new" = CASE
  WHEN LOWER(COALESCE("status",'pending')) IN ('pending') THEN 'PENDING'::"DepositStatus"
  WHEN LOWER(COALESCE("status",'pending')) IN ('requires_capture','requires-capture','requirescapture') THEN 'REQUIRES_CAPTURE'::"DepositStatus"
  WHEN LOWER(COALESCE("status",'pending')) IN ('captured') THEN 'CAPTURED'::"DepositStatus"
  WHEN LOWER(COALESCE("status",'pending')) IN ('canceled','cancelled') THEN 'CANCELED'::"DepositStatus"
  WHEN LOWER(COALESCE("status",'pending')) IN ('failed') THEN 'FAILED'::"DepositStatus"
  ELSE 'PENDING'::"DepositStatus"
END;

ALTER TABLE "DepositHold" DROP COLUMN "status";
ALTER TABLE "DepositHold" RENAME COLUMN "status_new" TO "status";
