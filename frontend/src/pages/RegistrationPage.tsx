import { useState } from "react";
import { flushSync } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { registerParticipant } from "../services/participantService.ts";
import { API_BASE_URL, isApiConfigured } from "../services/api.ts";
import { useQuiz } from "../store/QuizContext";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { setParticipant } = useQuiz();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [prizeDrawConsent, setPrizeDrawConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const participant = await registerParticipant({
        name,
        email,
        consentGiven,
        prizeDrawConsent,
      });

      flushSync(() => {
        setParticipant(
          participant.id,
          participant.name,
          participant.prizeDrawConsent,
        );
      });

      if (participant.quizCompleted) {
        navigate("/result", { replace: true });
        return;
      }

      navigate("/quiz", { replace: true });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Registration failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-zinc-950 px-4 py-8 text-white sm:px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold sm:text-3xl">Register</h1>
          <p className="text-sm text-zinc-400 sm:text-base">
            Enter your details to join the activation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block space-y-2">
            <span className="text-sm text-zinc-300">Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-white outline-none focus:border-white"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-zinc-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-white outline-none focus:border-white"
              required
            />
          </label>

          <label className="flex min-h-11 items-start gap-3 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(event) => setConsentGiven(event.target.checked)}
              className="mt-1 size-4 shrink-0"
              required
            />
            <span>I consent to the processing of my personal data.</span>
          </label>

          <label className="flex min-h-11 items-start gap-3 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={prizeDrawConsent}
              onChange={(event) => setPrizeDrawConsent(event.target.checked)}
              className="mt-1 size-4 shrink-0"
            />
            <span>I would like to participate in the prize draw.</span>
          </label>

          {error && (
            <p className="rounded-lg bg-red-950 px-4 py-3 text-sm text-red-300">
              {error}
              {!import.meta.env.DEV && API_BASE_URL && (
                <span className="mt-2 block text-xs text-red-200/80">
                  API base: {API_BASE_URL}
                </span>
              )}
            </p>
          )}

          {!isApiConfigured && !import.meta.env.DEV && (
            <p className="rounded-lg bg-amber-950 px-4 py-3 text-sm text-amber-200">
              API is not configured. Set <code className="text-amber-100">VITE_API_URL</code> in Vercel to your Railway URL, then redeploy.
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !consentGiven}
            className="w-full min-h-12 rounded-full bg-white py-3 text-base font-medium text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-50"
          >
            {isSubmitting ? "Registering..." : "Start quiz"}
          </button>
        </form>

        <Link
          to="/"
          className="block text-center text-sm text-zinc-400 hover:text-white"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
