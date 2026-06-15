import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ProfileType } from "../../generated/prisma/client.js";
import {
  calculateProfile,
  countProfileScores,
  resolveProfileFromScores,
} from "./profileCalculator.js";

describe("profileCalculator", () => {
  it("returns Connector when A answers are the majority", () => {
    const result = calculateProfile(["A", "B", "A", "A"]);

    assert.equal(result.profile, "Connector");
    assert.equal(result.profileType, ProfileType.CONNECTOR);
    assert.deepEqual(result.scores, {
      [ProfileType.CONNECTOR]: 3,
      [ProfileType.EXPLORER]: 1,
      [ProfileType.CREATOR]: 0,
      [ProfileType.PROBLEM_SOLVER]: 0,
    });
  });

  it("returns Explorer when B answers are the majority", () => {
    const result = calculateProfile(["B", "B", "B", "A"]);

    assert.equal(result.profile, "Explorer");
    assert.equal(result.profileType, ProfileType.EXPLORER);
  });

  it("returns Creator when C answers are the majority", () => {
    const result = calculateProfile(["C", "C", "A", "C"]);

    assert.equal(result.profile, "Creator");
    assert.equal(result.profileType, ProfileType.CREATOR);
  });

  it("returns Problem Solver when D answers are the majority", () => {
    const result = calculateProfile(["D", "D", "D", "A"]);

    assert.equal(result.profile, "Problem Solver");
    assert.equal(result.profileType, ProfileType.PROBLEM_SOLVER);
  });

  it("uses question 4 as the tiebreaker when scores are tied", () => {
    const result = calculateProfile(["A", "B", "A", "B"]);

    assert.equal(result.profile, "Explorer");
    assert.equal(result.profileType, ProfileType.EXPLORER);
  });

  it("uses question 4 to pick Connector on an A/B tie", () => {
    const result = calculateProfile(["A", "B", "B", "A"]);

    assert.equal(result.profile, "Connector");
    assert.equal(result.profileType, ProfileType.CONNECTOR);
  });

  it("uses question 4 when all profiles are tied", () => {
    const result = calculateProfile(["A", "B", "C", "D"]);

    assert.equal(result.profile, "Problem Solver");
    assert.equal(result.profileType, ProfileType.PROBLEM_SOLVER);
  });

  it("counts profile scores correctly", () => {
    const scores = countProfileScores(["A", "B", "A", "A"]);

    assert.deepEqual(scores, {
      [ProfileType.CONNECTOR]: 3,
      [ProfileType.EXPLORER]: 1,
      [ProfileType.CREATOR]: 0,
      [ProfileType.PROBLEM_SOLVER]: 0,
    });
  });

  it("resolves a tie using the provided tiebreaker answer", () => {
    const scores = countProfileScores(["A", "B", "A", "B"]);
    const profileType = resolveProfileFromScores(scores, "B");

    assert.equal(profileType, ProfileType.EXPLORER);
  });

  it("rejects quizzes that do not have exactly 4 answers", () => {
    assert.throws(
      () => calculateProfile(["A", "B", "A"]),
      /exactly 4 answers/,
    );
  });
});
