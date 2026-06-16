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
    <main className="page-shell">
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
            className="btn-secondary"
          >
            Back
          </button>

          {isComplete && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>

        {error && <p className="alert-error">{error}</p>}
      </div>
    </main>
  );
}
