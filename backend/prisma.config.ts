import "dotenv/config";
import { defineConfig } from "prisma/config";

// prisma generate only parses this URL; it does not connect.
// Railway provides DATABASE_URL at runtime for migrate deploy and the app.
const PLACEHOLDER_DATABASE_URL =
  "postgresql://build:build@localhost:5432/build?schema=public";

function getDatabaseUrl(): string {
  return (
    process.env.DIRECT_DATABASE_URL ??
    process.env.DATABASE_URL ??
    process.env.DATABASE_PRIVATE_URL ??
    PLACEHOLDER_DATABASE_URL
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: getDatabaseUrl(),
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  },
});
