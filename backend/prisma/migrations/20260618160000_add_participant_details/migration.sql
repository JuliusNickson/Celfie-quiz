-- AlterTable
ALTER TABLE "Participant" ADD COLUMN IF NOT EXISTS "surname" TEXT;
ALTER TABLE "Participant" ADD COLUMN IF NOT EXISTS "profession" TEXT;

UPDATE "Participant" SET "surname" = '' WHERE "surname" IS NULL;
UPDATE "Participant" SET "profession" = '' WHERE "profession" IS NULL;

ALTER TABLE "Participant" ALTER COLUMN "surname" SET NOT NULL;
ALTER TABLE "Participant" ALTER COLUMN "profession" SET NOT NULL;
