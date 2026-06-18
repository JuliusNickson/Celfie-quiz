import axios from "axios";
import api, { API_BASE_URL } from "./api.ts";

export type RegisterParticipantPayload = {
  name: string;
  surname: string;
  profession: string;
  email: string;
  consentGiven: boolean;
};

export type RegisterParticipantResponse = {
  id: string;
  name: string;
  surname: string;
  profession: string;
  email: string;
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
  if (!API_BASE_URL) {
    throw new Error(
      "API URL is not configured. Set VITE_API_URL to your Railway backend URL in Vercel, then redeploy.",
    );
  }

  try {
    const response = await api.post<RegisterParticipantResponse>(
      "/participants/register",
      payload,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404 || error.response?.status === 405) {
        throw new Error(
          `API request did not reach Railway. Set VITE_API_URL to your full backend URL with https:// (e.g. https://celfie-quiz-production.up.railway.app), then redeploy. Current base: ${API_BASE_URL}`,
        );
      }

      if (error.response?.data) {
        const data = error.response.data as ValidationErrorResponse;

        if (data.details) {
          const messages = Object.values(data.details).flat();
          throw new Error(messages.join(" "));
        }

        if (typeof data.error === "string") {
          throw new Error(data.error);
        }
      }
    }

    throw new Error("Registration failed");
  }
}
