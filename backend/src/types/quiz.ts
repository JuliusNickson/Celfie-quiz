import { z } from "zod";

const quizAnswerSchema = z.enum(["A", "B", "C", "D"]);

export const submitQuizSchema = z.object({
  participantId: z.string().uuid("Invalid participant ID"),
  q1: quizAnswerSchema,
  q2: quizAnswerSchema,
  q3: quizAnswerSchema,
  q4: quizAnswerSchema,
});

export type SubmitQuizInput = z.infer<typeof submitQuizSchema>;
