import { Prisma } from "../../generated/prisma/client.js";
import type { RegisterParticipantInput } from "../types/participant.js";
import { participantRepository } from "../repositories/participantRepository.js";

export type RegisterParticipantResult = {
  id: string;
  name: string;
  email: string;
  prizeDrawConsent: boolean;
  createdAt: Date;
  quizCompleted: boolean;
  isReturning: boolean;
};

export class ParticipantService {
  constructor(private readonly repository = participantRepository) {}

  async register(input: RegisterParticipantInput): Promise<RegisterParticipantResult> {
    const email = input.email.trim().toLowerCase();
    const existing = await this.repository.findByEmail(email);

    if (existing) {
      return {
        id: existing.id,
        name: existing.name,
        email: existing.email,
        prizeDrawConsent: existing.prizeDrawConsent,
        createdAt: existing.createdAt,
        quizCompleted: existing.quizResult !== null,
        isReturning: true,
      };
    }

    try {
      const participant = await this.repository.create({
        name: input.name.trim(),
        email,
        dataProcessingConsent: input.consentGiven,
        prizeDrawConsent: input.prizeDrawConsent,
      });

      return {
        id: participant.id,
        name: participant.name,
        email: participant.email,
        prizeDrawConsent: participant.prizeDrawConsent,
        createdAt: participant.createdAt,
        quizCompleted: false,
        isReturning: false,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        const participant = await this.repository.findByEmail(email);

        if (!participant) {
          throw new Error("EMAIL_ALREADY_REGISTERED");
        }

        return {
          id: participant.id,
          name: participant.name,
          email: participant.email,
          prizeDrawConsent: participant.prizeDrawConsent,
          createdAt: participant.createdAt,
          quizCompleted: participant.quizResult !== null,
          isReturning: true,
        };
      }

      throw error;
    }
  }
}

export const participantService = new ParticipantService();
