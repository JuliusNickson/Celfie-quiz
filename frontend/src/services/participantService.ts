import axios from "axios";
import api from "./api.ts";

export type RegisterParticipantPayload = {
  name: string;
  email: string;
  consentGiven: boolean;
  prizeDrawConsent: boolean;
};

export type RegisterParticipantResponse = {
  id: string;
  name: string;
  email: string;
  prizeDrawConsent: boolean;
  createdAt: string;
  quizCompleted: boolean;
};

type ValidationErrorResponse = {
  error: string;
  details?: Record<string, string[]>;
};

export async function registerParticipant(
  payload: RegisterParticipantPayload,
) {
  try {
    const response = await api.post<RegisterParticipantResponse>(
      "/participants/register",
      payload,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const data = error.response.data as ValidationErrorResponse;

      if (data.details) {
        const messages = Object.values(data.details).flat();
        throw new Error(messages.join(" "));
      }

      if (typeof data.error === "string") {
        throw new Error(data.error);
      }
    }

    throw new Error("Registration failed");
  }
}
