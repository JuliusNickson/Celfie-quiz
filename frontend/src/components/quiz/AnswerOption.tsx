import clsx from "clsx";
import type { QuizAnswer } from "../../data/questions";

type AnswerOptionProps = {
  label: string;
  value: QuizAnswer;
  selected: boolean;
  onSelect: (value: QuizAnswer) => void;
};

export default function AnswerOption({
  label,
  value,
  selected,
  onSelect,
}: AnswerOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={clsx(
        "flex min-h-12 w-full items-center rounded-xl border px-4 py-3.5 text-left text-sm transition sm:min-h-14 sm:text-base",
        selected
          ? "border-brand-magenta bg-brand-magenta text-white"
          : "border-brand-purple-light/30 bg-white text-brand-purple hover:border-brand-magenta active:scale-[0.99]",
      )}
    >
      <span className="leading-snug">{label}</span>
    </button>
  );
}
