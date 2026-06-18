import { prisma } from "../config/db.js";

export class ParticipantRepository {
  create(data: {
    name: string;
    surname: string;
    profession: string;
    email: string;
    dataProcessingConsent: boolean;
  }) {
    return prisma.participant.create({
      data: { ...data, prizeDrawConsent: false },
    });
  }

  findById(id: string) {
    return prisma.participant.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return prisma.participant.findUnique({
      where: { email },
      include: { quizResult: true },
    });
  }
}

export const participantRepository = new ParticipantRepository();
