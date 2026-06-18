import type { Question, QuizAnswer } from "../../data/questions";
import AnswerOption from "./AnswerOption";

type QuestionCardProps = {
  question: Question;
  selectedAnswer?: QuizAnswer;
  onSelect: (answer: QuizAnswer) => void;
};

export default function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
}: QuestionCardProps) {
  return (
    <section className="w-full space-y-5 sm:space-y-6">
      <div className="space-y-2 text-center">
        <p className="page-eyebrow">{question.title}</p>
        <h2 className="text-xl font-bold leading-tight text-brand-purple sm:text-2xl md:text-3xl">
          {question.text}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option) => (
          <AnswerOption
            key={option.value}
            label={option.label}
            value={option.value}
            selected={selectedAnswer === option.value}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
