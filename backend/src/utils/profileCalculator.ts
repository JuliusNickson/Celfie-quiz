import { ProfileType } from "../../generated/prisma/client.js";

export type QuizAnswer = "A" | "B" | "C" | "D";

export const ANSWER_TO_PROFILE_TYPE: Record<QuizAnswer, ProfileType> = {
  A: ProfileType.CONNECTOR,
  B: ProfileType.EXPLORER,
  C: ProfileType.CREATOR,
  D: ProfileType.PROBLEM_SOLVER,
};

export const PROFILE_TYPE_LABELS: Record<ProfileType, string> = {
  [ProfileType.CONNECTOR]: "Connector",
  [ProfileType.EXPLORER]: "Explorer",
  [ProfileType.CREATOR]: "Creator",
  [ProfileType.PROBLEM_SOLVER]: "Problem Solver",
};

export type ProfileScores = Record<ProfileType, number>;

export type ProfileCalculationResult = {
  profile: string;
  profileType: ProfileType;
  scores: ProfileScores;
};

const PROFILE_TYPES = Object.values(ProfileType);

function createEmptyScores(): ProfileScores {
  return {
    [ProfileType.CONNECTOR]: 0,
    [ProfileType.EXPLORER]: 0,
    [ProfileType.CREATOR]: 0,
    [ProfileType.PROBLEM_SOLVER]: 0,
  };
}

export function countProfileScores(answers: QuizAnswer[]): ProfileScores {
  const scores = createEmptyScores();

  for (const answer of answers) {
    scores[ANSWER_TO_PROFILE_TYPE[answer]] += 1;
  }

  return scores;
}

export function resolveProfileFromScores(
  scores: ProfileScores,
  tieBreakerAnswer: QuizAnswer,
): ProfileType {
  const maxScore = Math.max(...PROFILE_TYPES.map((profile) => scores[profile]));
  const tiedProfiles = PROFILE_TYPES.filter(
    (profile) => scores[profile] === maxScore,
  );

  if (tiedProfiles.length === 1) {
    return tiedProfiles[0]!;
  }

  return ANSWER_TO_PROFILE_TYPE[tieBreakerAnswer];
}

export function calculateProfile(answers: QuizAnswer[]): ProfileCalculationResult {
  if (answers.length !== 4) {
    throw new Error("Quiz must contain exactly 4 answers");
  }

  const scores = countProfileScores(answers);
  const tieBreakerAnswer = answers[3]!;
  const profileType = resolveProfileFromScores(scores, tieBreakerAnswer);

  return {
    profile: PROFILE_TYPE_LABELS[profileType],
    profileType,
    scores,
  };
}
