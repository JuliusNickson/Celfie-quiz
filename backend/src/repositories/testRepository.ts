import { prisma } from "../config/db.js";

export class TestRepository {
  async getStatus() {
    await prisma.$queryRaw`SELECT 1`;

    return {
      message: "API is working",
      database: "connected",
    };
  }

  async getSchemaStatus() {
    await prisma.$queryRaw`SELECT 1`;

    const participants = await prisma.participant.count();
    const quizResults = await prisma.quizResult.count();

    return {
      message: "Database schema is ready",
      participants,
      quizResults,
    };
  }
}

export const testRepository = new TestRepository();
