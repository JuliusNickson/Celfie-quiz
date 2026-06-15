import api from "./api";

export type AdminStats = {
  participants: number;
  connector: number;
  explorer: number;
  creator: number;
  problemSolver: number;
};

export async function getAdminStats() {
  const response = await api.get<AdminStats>("/admin/stats");
  return response.data;
}
