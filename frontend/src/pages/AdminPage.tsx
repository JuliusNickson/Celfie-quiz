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
    <main className="flex min-h-svh flex-col items-center justify-center bg-zinc-950 px-4 py-8 text-white sm:px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Admin
          </p>
          <h1 className="text-2xl font-semibold sm:text-3xl">Sign in</h1>
          <p className="text-sm text-zinc-400 sm:text-base">
            Enter the admin password to view the dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block space-y-2">
            <span className="text-sm text-zinc-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-base text-white outline-none focus:border-white"
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <p className="rounded-lg bg-red-950 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-12 rounded-full bg-white py-3 text-base font-medium text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
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
    { label: "Connector", value: stats.connector, color: "bg-blue-500" },
    { label: "Explorer", value: stats.explorer, color: "bg-violet-500" },
    { label: "Creator", value: stats.creator, color: "bg-pink-500" },
    {
      label: "Problem Solver",
      value: stats.problemSolver,
      color: "bg-emerald-500",
    },
  ];

  return (
    <main className="min-h-svh bg-zinc-950 px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 sm:text-sm">
              Admin
            </p>
            <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
              Activation dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onSignOut}
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Sign out
            </button>
            <Link
              to="/"
              className="text-sm text-zinc-400 transition hover:text-white"
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
            accent="text-zinc-200"
          />
          <Card
            label="Completion rate"
            value={
              stats.participants === 0
                ? 0
                : Math.round((completedQuizzes / stats.participants) * 100)
            }
            suffix="%"
            accent="text-zinc-200"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card
            label="Connector"
            value={stats.connector}
            accent="text-blue-400"
          />
          <Card
            label="Explorer"
            value={stats.explorer}
            accent="text-violet-400"
          />
          <Card label="Creator" value={stats.creator} accent="text-pink-400" />
          <Card
            label="Problem Solver"
            value={stats.problemSolver}
            accent="text-emerald-400"
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
      <main className="flex min-h-svh items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">Loading dashboard...</p>
      </main>
    );
  }

  if (error || !stats) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center bg-zinc-950 px-6 text-center text-white">
        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-semibold">Dashboard unavailable</h1>
          <p className="text-zinc-400">{error ?? "No stats found."}</p>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-sm text-white underline"
          >
            Sign out
          </button>
        </div>
      </main>
    );
  }

  return <AdminDashboard stats={stats} onSignOut={handleSignOut} />;
}
