import { Prisma } from "../../generated/prisma/client.js";
import type { RegisterParticipantInput } from "../types/participant.js";
import { participantRepository } from "../repositories/participantRepository.js";

export type RegisterParticipantResult = {
  id: string;
  name: string;
  surname: string;
  profession: string;
  email: string;
  createdAt: Date;
  quizCompleted: boolean;
  isReturning: boolean;
};

function toRegisterResult(
  participant: {
    id: string;
    name: string;
    surname: string;
    profession: string;
    email: string;
    createdAt: Date;
    quizResult: unknown | null;
  },
  isReturning: boolean,
): RegisterParticipantResult {
  return {
    id: participant.id,
    name: participant.name,
    surname: participant.surname,
    profession: participant.profession,
    email: participant.email,
    createdAt: participant.createdAt,
    quizCompleted: participant.quizResult !== null,
    isReturning,
  };
}

export class ParticipantService {
  constructor(private readonly repository = participantRepository) {}

  async register(input: RegisterParticipantInput): Promise<RegisterParticipantResult> {
    const email = input.email.trim().toLowerCase();
    const existing = await this.repository.findByEmail(email);

    if (existing) {
      return toRegisterResult(existing, true);
    }

    try {
      const participant = await this.repository.create({
        name: input.name.trim(),
        surname: input.surname.trim(),
        profession: input.profession.trim(),
        email,
        dataProcessingConsent: input.consentGiven,
      });

      return toRegisterResult({ ...participant, quizResult: null }, false);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        const participant = await this.repository.findByEmail(email);

        if (!participant) {
          throw new Error("EMAIL_ALREADY_REGISTERED");
        }

        return toRegisterResult(participant, true);
      }

      throw error;
    }
  }
}

export const participantService = new ParticipantService();
