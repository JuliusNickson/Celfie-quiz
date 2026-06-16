-- Repair production schema when init ran but align_with_logic did not.

DO $$ BEGIN
    CREATE TYPE "ProfileType" AS ENUM ('CONNECTOR', 'EXPLORER', 'CREATOR', 'PROBLEM_SOLVER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "Participant" ADD COLUMN IF NOT EXISTS "name" TEXT;
ALTER TABLE "Participant" ADD COLUMN IF NOT EXISTS "dataProcessingConsent" BOOLEAN;
ALTER TABLE "Participant" ADD COLUMN IF NOT EXISTS "prizeDrawConsent" BOOLEAN DEFAULT false;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'Participant'
          AND column_name = 'firstName'
    ) THEN
        UPDATE "Participant"
        SET "name" = TRIM(CONCAT("firstName", ' ', "lastName"))
        WHERE "name" IS NULL;

        ALTER TABLE "Participant" DROP COLUMN "firstName";
        ALTER TABLE "Participant" DROP COLUMN "lastName";
    END IF;
END $$;

UPDATE "Participant" SET "name" = 'Unknown' WHERE "name" IS NULL;
UPDATE "Participant" SET "dataProcessingConsent" = true WHERE "dataProcessingConsent" IS NULL;
UPDATE "Participant" SET "prizeDrawConsent" = false WHERE "prizeDrawConsent" IS NULL;

ALTER TABLE "Participant" ALTER COLUMN "name" SET NOT NULL;
ALTER TABLE "Participant" ALTER COLUMN "dataProcessingConsent" SET NOT NULL;
ALTER TABLE "Participant" ALTER COLUMN "prizeDrawConsent" SET NOT NULL;
ALTER TABLE "Participant" ALTER COLUMN "prizeDrawConsent" SET DEFAULT false;

CREATE INDEX IF NOT EXISTS "Participant_email_idx" ON "Participant"("email");

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'QuizResult'
          AND column_name = 'profileType'
          AND udt_name <> 'ProfileType'
    ) THEN
        ALTER TABLE "QuizResult" DROP COLUMN "profileType";
        ALTER TABLE "QuizResult" ADD COLUMN "profileType" "ProfileType" NOT NULL DEFAULT 'CONNECTOR';
        ALTER TABLE "QuizResult" ALTER COLUMN "profileType" DROP DEFAULT;
    ELSIF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'QuizResult'
          AND column_name = 'profileType'
    ) THEN
        ALTER TABLE "QuizResult" ADD COLUMN "profileType" "ProfileType" NOT NULL DEFAULT 'CONNECTOR';
        ALTER TABLE "QuizResult" ALTER COLUMN "profileType" DROP DEFAULT;
    END IF;
END $$;

DROP INDEX IF EXISTS "QuizResult_participantId_idx";
CREATE UNIQUE INDEX IF NOT EXISTS "QuizResult_participantId_key" ON "QuizResult"("participantId");
CREATE INDEX IF NOT EXISTS "QuizResult_profileType_idx" ON "QuizResult"("profileType");
CREATE INDEX IF NOT EXISTS "QuizResult_completedAt_idx" ON "QuizResult"("completedAt");
