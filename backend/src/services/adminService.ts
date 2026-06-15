import { adminRepository } from "../repositories/adminRepository.js";

export class AdminService {
  constructor(private readonly repository = adminRepository) {}

  getStats() {
    return this.repository.getStats();
  }
}

export const adminService = new AdminService();
