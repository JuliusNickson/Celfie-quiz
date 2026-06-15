-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('CONNECTOR', 'EXPLORER', 'CREATOR', 'PROBLEM_SOLVER');

-- DropIndex
DROP INDEX "QuizResult_participantId_idx";

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "dataProcessingConsent" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "prizeDrawConsent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "QuizResult" DROP COLUMN "profileType",
ADD COLUMN     "profileType" "ProfileType" NOT NULL;

-- CreateIndex
CREATE INDEX "Participant_email_idx" ON "Participant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "QuizResult_participantId_key" ON "QuizResult"("participantId");

-- CreateIndex
CREATE INDEX "QuizResult_profileType_idx" ON "QuizResult"("profileType");

-- CreateIndex
CREATE INDEX "QuizResult_completedAt_idx" ON "QuizResult"("completedAt");
