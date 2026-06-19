import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ResultCard from "../components/result/ResultCard";
import { getProfileDetails, type ProfileName } from "../data/profiles";
import { getQuizResult } from "../services/quizService";
import { useQuiz } from "../store/QuizContext";

export default function ResultPage() {
  const navigate = useNavigate();
  const { participantId, signOut } = useQuiz();
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

  function handleSignOut() {
    signOut();
    navigate("/", { replace: true });
  }

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

        <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link to="/" className="btn-primary">
            Done
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="btn-secondary"
          >
            Sign out
          </button>
        </div>
      </div>
    </main>
  );
}
