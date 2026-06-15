import axios from "axios";

function normalizeApiBaseUrl(url: string): string {
  const trimmed = url.replace(/\/$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

function getApiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_URL;

  if (configured) {
    return normalizeApiBaseUrl(configured);
  }

  if (import.meta.env.DEV) {
    return "http://localhost:3001/api";
  }

  // Production must not fall back to localhost (blocked as mixed content on HTTPS).
  console.error(
    "VITE_API_URL is not set. Add your Railway API URL in Vercel → Settings → Environment Variables, then redeploy.",
  );

  return "";
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
});

export default api;
