import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ResultCard from "../components/result/ResultCard";
import { getProfileDetails, type ProfileName } from "../data/profiles";
import { getQuizResult } from "../services/quizService";
import { useQuiz } from "../store/QuizContext";

export default function ResultPage() {
  const { participantId } = useQuiz();
  const [profile, setProfile] = useState<string | null>(null);
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
      <main className="page-shell-centered-safe">
        <p className="text-brand-purple-light">Loading your result...</p>
      </main>
    );
  }

  if (error || !profileDetails) {
    return (
      <main className="page-shell-centered-safe text-center">
        <div className="max-w-md space-y-4">
          <h1 className="page-title">Result unavailable</h1>
          <p className="page-subtitle">{error ?? "Profile not found."}</p>
          <Link to="/quiz" className="link-muted">
            Back to quiz
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell-centered-safe">
      <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6">
        <ResultCard
          profile={profileDetails}
          profileName={profile as ProfileName}
        />

        <Link to="/" className="btn-primary">
          Done
        </Link>
      </div>
    </main>
  );
}
