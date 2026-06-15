import { prisma } from "../config/db.js";
import type { ProfileType } from "../../generated/prisma/client.js";

export class QuizRepository {
  findByParticipantId(participantId: string) {
    return prisma.quizResult.findUnique({
      where: { participantId },
      include: { participant: true },
    });
  }

  create(data: {
    participantId: string;
    profileType: ProfileType;
    scores: Record<ProfileType, number>;
    answers: { q1: string; q2: string; q3: string; q4: string };
  }) {
    return prisma.quizResult.create({ data });
  }
}

export const quizRepository = new QuizRepository();
