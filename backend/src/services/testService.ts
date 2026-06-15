import { testRepository } from "../repositories/testRepository.js";

export class TestService {
  constructor(private readonly repository = testRepository) {}

  getStatus() {
    return this.repository.getStatus();
  }
}

export const testService = new TestService();
