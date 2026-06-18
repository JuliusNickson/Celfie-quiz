import axios from "axios";
import api from "./api";
import type { QuizAnswer } from "../data/questions";

export type SubmitQuizPayload = {
  participantId: string;
  q1: QuizAnswer;
  q2: QuizAnswer;
  q3: QuizAnswer;
  q4: QuizAnswer;
};

export type SubmitQuizResponse = {
  profile: string;
};

export type QuizResultResponse = {
  profile: string;
};

type ApiErrorResponse = {
  error: string;
  details?: Record<string, string[]>;
};

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error) && error.response?.data) {
    const data = error.response.data as ApiErrorResponse;

    if (data.details) {
      return Object.values(data.details).flat().join(" ");
    }

    if (typeof data.error === "string") {
      return data.error;
    }
  }

  return fallback;
}

export async function submitQuiz(payload: SubmitQuizPayload) {
  try {
    const response = await api.post<SubmitQuizResponse>("/quiz/submit", payload);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Quiz submission failed"));
  }
}

export async function getQuizResult(participantId: string) {
  try {
    const response = await api.get<QuizResultResponse>(
      `/quiz/result/${participantId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to load quiz result"));
  }
}
