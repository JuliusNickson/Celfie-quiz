/**
 * Resolves the Postgres connection string.
 * Railway injects DATABASE_URL when the Postgres plugin is linked to this service.
 */
export function getDatabaseUrl(): string {
  const url =
    process.env.DIRECT_DATABASE_URL ??
    process.env.DATABASE_URL ??
    process.env.DATABASE_PRIVATE_URL;

  if (!url) {
    throw new Error(
      [
        "DATABASE_URL is not set.",
        "Local: add DATABASE_URL or DIRECT_DATABASE_URL to backend/.env",
        "Railway: open your backend service → Variables → add a reference to",
        "your Postgres service's DATABASE_URL (or use Connect on the Postgres plugin).",
      ].join(" "),
    );
  }

  return url;
}
