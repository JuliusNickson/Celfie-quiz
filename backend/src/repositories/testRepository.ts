import { prisma } from "../config/db.js";

export class TestRepository {
  async getStatus() {
    await prisma.$queryRaw`SELECT 1`;

    return {
      message: "API is working",
      database: "connected",
    };
  }
}

export const testRepository = new TestRepository();
