export type QuizAnswer = "A" | "B" | "C" | "D";

export type QuestionId = "q1" | "q2" | "q3" | "q4";

export type QuestionOption = {
  value: QuizAnswer;
  label: string;
};

export type Question = {
  id: QuestionId;
  title: string;
  text: string;
  options: QuestionOption[];
};

export const questions: Question[] = [
  {
    id: "q1",
    title: "Question 1",
    text: "What technology do you use the most?",
    options: [
      { value: "A", label: "A. Staying in touch with people" },
      { value: "B", label: "B. Discovering new things" },
      { value: "C", label: "C. Creating or sharing content" },
      { value: "D", label: "D. Making everyday tasks easier" },
    ],
  },
  {
    id: "q2",
    title: "Question 2",
    text: "What is the first thing you do when you open your phone?",
    options: [
      { value: "A", label: "A. Check messages or social media" },
      { value: "B", label: "B. Read, search, browse, or watch something new" },
      { value: "C", label: "C. Take a photo, post, edit, or create something" },
      {
        value: "D",
        label: "D. Check calendar, maps, banking, delivery, or useful apps",
      },
    ],
  },
  {
    id: "q3",
    title: "Question 3",
    text: "Which digital tool would you miss the most for one day?",
    options: [
      { value: "A", label: "A. Messaging and video calls" },
      { value: "B", label: "B. Search, maps, YouTube, or learning platforms" },
      { value: "C", label: "C. Camera, editing apps, music, or design tools" },
      {
        value: "D",
        label: "D. Banking, transport, delivery, calendar, or productivity apps",
      },
    ],
  },
  {
    id: "q4",
    title: "Question 4",
    text: "If technology gave you one superpower, what would you choose?",
    options: [
      { value: "A", label: "A. To connect instantly with anyone, anywhere" },
      { value: "B", label: "B. To discover answers and ideas faster" },
      { value: "C", label: "C. To turn any idea into content" },
      { value: "D", label: "D. To solve daily problems with one tap" },
    ],
  },
];
