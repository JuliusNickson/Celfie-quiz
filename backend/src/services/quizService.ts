import { Prisma } from "../../generated/prisma/client.js";
import type { SubmitQuizInput } from "../types/quiz.js";
import { participantRepository } from "../repositories/participantRepository.js";
import { quizRepository } from "../repositories/quizRepository.js";
import {
  calculateProfile,
  PROFILE_TYPE_LABELS,
} from "../utils/profileCalculator.js";

export class QuizService {
  constructor(
    private readonly repository = quizRepository,
    private readonly participants = participantRepository,
  ) {}

  async submit(input: SubmitQuizInput) {
    const participant = await this.participants.findById(input.participantId);

    if (!participant) {
      throw new Error("PARTICIPANT_NOT_FOUND");
    }

    const existingResult = await this.repository.findByParticipantId(
      input.participantId,
    );

    if (existingResult) {
      throw new Error("QUIZ_ALREADY_SUBMITTED");
    }

    const answers = [input.q1, input.q2, input.q3, input.q4] as const;
    const result = calculateProfile([...answers]);

    try {
      await this.repository.create({
        participantId: input.participantId,
        profileType: result.profileType,
        scores: result.scores,
        answers: {
          q1: input.q1,
          q2: input.q2,
          q3: input.q3,
          q4: input.q4,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new Error("QUIZ_ALREADY_SUBMITTED");
      }

      throw error;
    }

    return {
      profile: result.profile,
    };
  }

  async getResult(participantId: string) {
    const quizResult = await this.repository.findByParticipantId(participantId);

    if (!quizResult) {
      throw new Error("QUIZ_RESULT_NOT_FOUND");
    }

    return {
      profile: PROFILE_TYPE_LABELS[quizResult.profileType],
      prizeDrawConsent: quizResult.participant.prizeDrawConsent,
    };
  }
}

export const quizService = new QuizService();
