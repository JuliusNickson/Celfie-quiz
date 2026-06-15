import { ProfileType } from "../../generated/prisma/client.js";
import { prisma } from "../config/db.js";

export class AdminRepository {
  async getStats() {
    const [participants, connector, explorer, creator, problemSolver] =
      await Promise.all([
        prisma.participant.count(),
        prisma.quizResult.count({
          where: { profileType: ProfileType.CONNECTOR },
        }),
        prisma.quizResult.count({
          where: { profileType: ProfileType.EXPLORER },
        }),
        prisma.quizResult.count({
          where: { profileType: ProfileType.CREATOR },
        }),
        prisma.quizResult.count({
          where: { profileType: ProfileType.PROBLEM_SOLVER },
        }),
      ]);

    return {
      participants,
      connector,
      explorer,
      creator,
      problemSolver,
    };
  }
}

export const adminRepository = new AdminRepository();
