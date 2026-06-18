import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { QuestionId, QuizAnswer } from "../data/questions";
import { questions } from "../data/questions";
import { submitQuiz as submitQuizRequest } from "../services/quizService";

type QuizAnswers = Partial<Record<QuestionId, QuizAnswer>>;

type StoredParticipant = {
  id: string;
  name: string;
  surname: string;
  profession: string;
};

const PARTICIPANT_STORAGE_KEY = "digital-superpower-participant";

function readStoredParticipant(): StoredParticipant | null {
  try {
    const raw = sessionStorage.getItem(PARTICIPANT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredParticipant;
    if (!parsed.id || !parsed.name) return null;
    return {
      id: parsed.id,
      name: parsed.name,
      surname: parsed.surname ?? "",
      profession: parsed.profession ?? "",
    };
  } catch {
    return null;
  }
}

function writeStoredParticipant(participant: StoredParticipant) {
  sessionStorage.setItem(PARTICIPANT_STORAGE_KEY, JSON.stringify(participant));
}

type QuizContextValue = {
  participantId: string | null;
  participantName: string | null;
  answers: QuizAnswers;
  currentQuestionIndex: number;
  isComplete: boolean;
  setParticipant: (
    id: string,
    name: string,
    surname: string,
    profession: string,
  ) => void;
  setAnswer: (questionId: QuestionId, answer: QuizAnswer) => void;
  goToQuestion: (index: number) => void;
  submitQuiz: () => Promise<string>;
  resetQuiz: () => void;
};

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const storedParticipant = readStoredParticipant();

  const [participantId, setParticipantId] = useState<string | null>(
    storedParticipant?.id ?? null,
  );
  const [participantName, setParticipantName] = useState<string | null>(
    storedParticipant
      ? `${storedParticipant.name} ${storedParticipant.surname}`.trim()
      : null,
  );
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const isComplete = questions.every((question) => answers[question.id]);

  const value = useMemo<QuizContextValue>(
    () => ({
      participantId,
      participantName,
      answers,
      currentQuestionIndex,
      isComplete,
      setParticipant(id, name, surname, profession) {
        writeStoredParticipant({ id, name, surname, profession });
        setParticipantId(id);
        setParticipantName(`${name} ${surname}`.trim());
        setAnswers({});
        setCurrentQuestionIndex(0);
      },
      setAnswer(questionId, answer) {
        setAnswers((current) => ({ ...current, [questionId]: answer }));
      },
      goToQuestion(index) {
        setCurrentQuestionIndex(index);
      },
      async submitQuiz() {
        if (!participantId) {
          throw new Error("Participant not registered");
        }

        const payload = {
          participantId,
          q1: answers.q1!,
          q2: answers.q2!,
          q3: answers.q3!,
          q4: answers.q4!,
        };

        const result = await submitQuizRequest(payload);
        return result.profile;
      },
      resetQuiz() {
        setAnswers({});
        setCurrentQuestionIndex(0);
      },
    }),
    [participantId, participantName, answers, currentQuestionIndex, isComplete],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuiz must be used within QuizProvider");
  }

  return context;
}
