import axios from "axios";

function normalizeApiBaseUrl(url: string): string {
  const trimmed = url.replace(/\/$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

export function getApiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_URL;

  if (configured) {
    return normalizeApiBaseUrl(configured);
  }

  if (import.meta.env.DEV) {
    return "http://localhost:3001/api";
  }

  return "";
}

export const API_BASE_URL = getApiBaseUrl();
export const isApiConfigured = Boolean(API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
