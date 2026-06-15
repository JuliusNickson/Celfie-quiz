export type QuizAnswer = "A" | "B" | "C" | "D";

export type QuestionId = "q1" | "q2" | "q3" | "q4";

export type QuestionOption = {
  value: QuizAnswer;
  label: string;
};

export type Question = {
  id: QuestionId;
  text: string;
  options: QuestionOption[];
};

export const questions: Question[] = [
  {
    id: "q1",
    text: "What technology do you use the most?",
    options: [
      { value: "A", label: "Staying in touch with people" },
      { value: "B", label: "Discovering new things" },
      { value: "C", label: "Creating or sharing content" },
      { value: "D", label: "Making everyday tasks easier" },
    ],
  },
  {
    id: "q2",
    text: "What is the first thing you do when you open your phone?",
    options: [
      { value: "A", label: "Check messages or social media" },
      {
        value: "B",
        label: "Read, search, browse, or watch something new",
      },
      { value: "C", label: "Take a photo, post, edit, or create something" },
      {
        value: "D",
        label: "Check calendar, maps, banking, delivery, or useful apps",
      },
    ],
  },
  {
    id: "q3",
    text: "Which digital tool would you miss the most for one day?",
    options: [
      { value: "A", label: "Messaging and video calls" },
      { value: "B", label: "Search, maps, YouTube, or learning platforms" },
      { value: "C", label: "Camera, editing apps, music, or design tools" },
      {
        value: "D",
        label: "Banking, transport, delivery, calendar, or productivity apps",
      },
    ],
  },
  {
    id: "q4",
    text: "If technology gave you one superpower, what would you choose?",
    options: [
      { value: "A", label: "To connect instantly with anyone, anywhere" },
      { value: "B", label: "To discover answers and ideas faster" },
      { value: "C", label: "To turn any idea into content" },
      { value: "D", label: "To solve daily problems with one tap" },
    ],
  },
];
