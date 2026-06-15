import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-zinc-950 px-4 py-10 text-center text-white sm:px-6">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Choose Your Digital Superpower
          </h1>
          <p className="mx-auto max-w-xl text-base text-zinc-300 sm:text-xl">
            Take the quiz. Discover your profile. Receive a souvenir.
          </p>
        </div>

        <Link
          to="/register"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-8 py-3 text-base font-medium text-zinc-950 transition hover:bg-zinc-200 sm:w-auto"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
