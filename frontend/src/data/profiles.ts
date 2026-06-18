import connectorSticker from "../assets/Connector.png";
import creatorSticker from "../assets/Creator.png";
import explorerSticker from "../assets/Explorer.png";
import problemSolverSticker from "../assets/ProblemSolver.png";

export type ProfileName =
  | "Connector"
  | "Explorer"
  | "Creator"
  | "Problem Solver";

export type ProfileDetails = {
  title: string;
  description: string;
  image: string;
};

export const profiles: Record<ProfileName, ProfileDetails> = {
  Connector: {
    title: "The Connector",
    description:
      "Your digital superpower is connection. You use technology to stay close to people, share moments, build relationships, and keep conversations going. For you, digital life is about people first.",
    image: connectorSticker,
  },
  Explorer: {
    title: "The Explorer",
    description:
      "Your digital superpower is curiosity. You use technology to discover new ideas, learn new things, try new tools, and explore what is possible. You are always one step away from finding something interesting.",
    image: explorerSticker,
  },
  Creator: {
    title: "The Creator",
    description:
      "Your digital superpower is imagination. You use technology to create, design, post, write, edit, film, or express yourself. For you, the digital world is a place to turn ideas into something real.",
    image: creatorSticker,
  },
  "Problem Solver": {
    title: "The Problem Solver",
    description:
      "Your digital superpower is efficiency. You use technology to make life easier, faster, and more organized. You like tools that save time, simplify tasks, and help you get things done.",
    image: problemSolverSticker,
  },
};

export function getProfileDetails(profile: string): ProfileDetails | null {
  if (profile in profiles) {
    return profiles[profile as ProfileName];
  }

  return null;
}
