import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ResultCard from "../components/result/ResultCard";
import { getProfileDetails } from "../data/profiles";
import { getQuizResult } from "../services/quizService";
import { useQuiz } from "../store/QuizContext";

export default function ResultPage() {
  const { participantId } = useQuiz();
  const [profile, setProfile] = useState<string | null>(null);
  const [prizeDrawConsent, setPrizeDrawConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!participantId) {
      setIsLoading(false);
      return;
    }

    const id = participantId;
    let isMounted = true;

    async function loadResult() {
      try {
        const result = await getQuizResult(id);
        if (!isMounted) return;
        setProfile(result.profile);
        setPrizeDrawConsent(result.prizeDrawConsent);
      } catch (loadError) {
        if (!isMounted) return;
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load result",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadResult();

    return () => {
      isMounted = false;
    };
  }, [participantId]);

  if (!participantId) {
    return <Navigate to="/register" replace />;
  }

  const profileDetails = profile ? getProfileDetails(profile) : null;

  if (isLoading) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-zinc-950 px-4 text-white">
        <p className="text-zinc-400">Loading your result...</p>
      </main>
    );
  }

  if (error || !profileDetails) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center bg-zinc-950 px-4 py-8 text-center text-white sm:px-6">
        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-semibold">Result unavailable</h1>
          <p className="text-sm text-zinc-400 sm:text-base">
            {error ?? "Profile not found."}
          </p>
          <Link to="/quiz" className="text-sm text-white underline">
            Back to quiz
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-zinc-950 px-4 py-10 text-white sm:px-6">
      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        <ResultCard
          profile={profileDetails}
          prizeDrawConsent={prizeDrawConsent}
        />

        <Link
          to="/"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-8 py-3 font-medium text-zinc-950 transition hover:bg-zinc-200 sm:w-auto"
        >
          Done
        </Link>
      </div>
    </main>
  );
}
