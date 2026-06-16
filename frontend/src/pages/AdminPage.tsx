import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import ProfileChart from "../components/ui/ProfileChart";
import {
  clearAdminToken,
  getAdminStats,
  getAdminToken,
  loginAdmin,
  type AdminStats,
} from "../services/adminService";

function AdminLoginForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await loginAdmin(password);
      onSuccess();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Login failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-shell">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <p className="page-eyebrow">Admin</p>
          <h1 className="page-title">Sign in</h1>
          <p className="page-subtitle">
            Enter the admin password to view the dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block space-y-2">
            <span className="field-label">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="field-input"
              autoComplete="current-password"
              required
            />
          </label>

          {error && <p className="alert-error">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <Link to="/" className="link-muted">
          Back to home
        </Link>
      </div>
    </main>
  );
}

function AdminDashboard({
  stats,
  onSignOut,
}: {
  stats: AdminStats;
  onSignOut: () => void;
}) {
  const completedQuizzes =
    stats.connector +
    stats.explorer +
    stats.creator +
    stats.problemSolver;

  const chartData = [
    { label: "Connector", value: stats.connector, color: "bg-brand-magenta" },
    { label: "Explorer", value: stats.explorer, color: "bg-brand-purple" },
    { label: "Creator", value: stats.creator, color: "bg-brand-purple-light" },
    {
      label: "Problem Solver",
      value: stats.problemSolver,
      color: "bg-brand-red",
    },
  ];

  return (
    <main className="min-h-svh bg-white px-4 py-8 text-brand-purple sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="page-eyebrow sm:text-sm">Admin</p>
            <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Activation dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onSignOut}
              className="text-sm text-brand-purple-light transition hover:text-brand-magenta"
            >
              Sign out
            </button>
            <Link
              to="/"
              className="text-sm text-brand-purple-light transition hover:text-brand-magenta"
            >
              Back to home
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Card label="Total participants" value={stats.participants} />
          <Card
            label="Completed quizzes"
            value={completedQuizzes}
            accent="text-brand-purple-light"
          />
          <Card
            label="Completion rate"
            value={
              stats.participants === 0
                ? 0
                : Math.round((completedQuizzes / stats.participants) * 100)
            }
            suffix="%"
            accent="text-brand-coral"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card
            label="Connector"
            value={stats.connector}
            accent="text-brand-magenta"
          />
          <Card
            label="Explorer"
            value={stats.explorer}
            accent="text-brand-purple"
          />
          <Card
            label="Creator"
            value={stats.creator}
            accent="text-brand-purple-light"
          />
          <Card
            label="Problem Solver"
            value={stats.problemSolver}
            accent="text-brand-red"
          />
        </div>

        <ProfileChart data={chartData} />
      </div>
    </main>
  );
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getAdminToken()));
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(isAuthenticated);

  async function loadStats() {
    setError(null);
    setIsLoading(true);

    try {
      const data = await getAdminStats();
      setStats(data);
      setIsAuthenticated(true);
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "Failed to load admin stats";

      if (message.includes("Not authenticated") || message.includes("Session expired")) {
        clearAdminToken();
        setIsAuthenticated(false);
        setStats(null);
        setError(message.includes("Session expired") ? message : null);
        return;
      }

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    void loadStats();
  }, [isAuthenticated]);

  function handleSignOut() {
    clearAdminToken();
    setIsAuthenticated(false);
    setStats(null);
    setError(null);
  }

  if (!isAuthenticated) {
    return <AdminLoginForm onSuccess={() => setIsAuthenticated(true)} />;
  }

  if (isLoading) {
    return (
      <main className="page-shell-centered">
        <p className="text-brand-purple-light">Loading dashboard...</p>
      </main>
    );
  }

  if (error || !stats) {
    return (
      <main className="page-shell text-center">
        <div className="max-w-md space-y-4">
          <h1 className="page-title">Dashboard unavailable</h1>
          <p className="page-subtitle">{error ?? "No stats found."}</p>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-sm text-brand-magenta underline"
          >
            Sign out
          </button>
        </div>
      </main>
    );
  }

  return <AdminDashboard stats={stats} onSignOut={handleSignOut} />;
}
