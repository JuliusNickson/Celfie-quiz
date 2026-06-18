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
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const participant = await registerParticipant({
        name,
        surname,
        profession,
        email,
        consentGiven,
      });

      flushSync(() => {
        setParticipant(
          participant.id,
          participant.name,
          participant.surname,
          participant.profession,
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
    <main className="page-shell">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="page-title">Register</h1>
          <p className="page-subtitle">
            Enter your details to join the activation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block space-y-2">
            <span className="field-label">Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="field-input"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="field-label">Surname</span>
            <input
              type="text"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              className="field-input"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="field-label">Profession</span>
            <input
              type="text"
              value={profession}
              onChange={(event) => setProfession(event.target.value)}
              className="field-input"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="field-label">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="field-input"
              required
            />
          </label>

          <label className="flex min-h-11 items-start gap-3 text-sm text-brand-purple-light">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(event) => setConsentGiven(event.target.checked)}
              className="mt-1 size-4 shrink-0 accent-brand-magenta"
              required
            />
            <span>I consent to the processing of my personal data.</span>
          </label>

          {error && (
            <p className="alert-error">
              {error}
              {!import.meta.env.DEV && API_BASE_URL && (
                <span className="mt-2 block text-xs opacity-80">
                  API base: {API_BASE_URL}
                </span>
              )}
            </p>
          )}

          {!isApiConfigured && !import.meta.env.DEV && (
            <p className="alert-warning">
              API is not configured. Set{" "}
              <code className="text-brand-purple">VITE_API_URL</code> in Vercel
              to your Railway URL, then redeploy.
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !consentGiven}
            className="btn-primary w-full"
          >
            {isSubmitting ? "Registering..." : "Start quiz"}
          </button>
        </form>

        <Link to="/" className="link-muted">
          Back to home
        </Link>
      </div>
    </main>
  );
}
