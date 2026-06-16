import axios from "axios";
import api from "./api";

const ADMIN_TOKEN_KEY = "admin-token";

export type AdminStats = {
  participants: number;
  connector: number;
  explorer: number;
  creator: number;
  problemSolver: number;
};

export function getAdminToken(): string | null {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

export async function loginAdmin(password: string) {
  try {
    const response = await api.post<{ token: string }>("/admin/login", {
      password,
    });
    setAdminToken(response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Invalid password");
      }

      if (error.response?.status === 503) {
        throw new Error("Admin access is not configured on the server");
      }
    }

    throw new Error("Login failed");
  }
}

export async function getAdminStats() {
  const token = getAdminToken();

  if (!token) {
    throw new Error("Not authenticated");
  }

  try {
    const response = await api.get<AdminStats>("/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearAdminToken();
      throw new Error("Session expired. Please sign in again.");
    }

    throw new Error("Failed to load admin stats");
  }
}
