import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import ProfileChart from "../components/ui/ProfileChart";
import { getAdminStats, type AdminStats } from "../services/adminService";

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const data = await getAdminStats();
        if (!isMounted) return;
        setStats(data);
      } catch (loadError) {
        if (!isMounted) return;
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load admin stats",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

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
          <Link to="/" className="text-sm text-white underline">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

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
          <Link
            to="/"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Back to home
          </Link>
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
          <Card label="Connector" value={stats.connector} accent="text-blue-400" />
          <Card label="Explorer" value={stats.explorer} accent="text-violet-400" />
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
