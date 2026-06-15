import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import QuestionCard from "../components/quiz/QuestionCard";
import ProgressBar from "../components/ui/ProgressBar";
import { questions } from "../data/questions";
import { useQuiz } from "../store/QuizContext";

export default function QuizPage() {
  const navigate = useNavigate();
  const {
    participantId,
    answers,
    currentQuestionIndex,
    isComplete,
    setAnswer,
    goToQuestion,
    submitQuiz,
  } = useQuiz();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!participantId) {
    return <Navigate to="/register" replace />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <Navigate to="/register" replace />;
  }

  function handleSelect(answer: typeof currentQuestion.options[number]["value"]) {
    setAnswer(currentQuestion.id, answer);

    if (currentQuestionIndex < questions.length - 1) {
      goToQuestion(currentQuestionIndex + 1);
    }
  }

  async function handleSubmit() {
    setError(null);
    setIsSubmitting(true);

    try {
      await submitQuiz();
      navigate("/result", { replace: true });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to submit quiz",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const answeredCount = questions.filter((question) => answers[question.id]).length;

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-zinc-950 px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="w-full max-w-xl space-y-6 sm:space-y-8">
        <ProgressBar current={answeredCount} total={questions.length} />

        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={answers[currentQuestion.id]}
          onSelect={handleSelect}
        />

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            disabled={currentQuestionIndex === 0}
            onClick={() => goToQuestion(currentQuestionIndex - 1)}
            className="min-h-11 w-full rounded-full border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-500 disabled:opacity-40 sm:w-auto"
          >
            Back
          </button>

          {isComplete && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="min-h-11 w-full rounded-full bg-white px-6 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-50 sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>

        {error && (
          <p className="rounded-lg bg-red-950 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
