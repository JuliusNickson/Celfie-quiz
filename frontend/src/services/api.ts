import axios from "axios";

function ensureAbsoluteUrl(url: string): string {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function normalizeApiBaseUrl(url: string): string {
  const absolute = ensureAbsoluteUrl(url);
  const trimmed = absolute.replace(/\/$/, "");
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
