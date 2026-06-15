import type { ProfileDetails } from "../../data/profiles";

type ResultCardProps = {
  profile: ProfileDetails;
  prizeDrawConsent: boolean;
};

export default function ResultCard({
  profile,
  prizeDrawConsent,
}: ResultCardProps) {
  return (
    <article className="w-full max-w-lg space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 text-center sm:p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 sm:text-sm">
        Your Digital Superpower is
      </p>

      <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950 p-6 sm:h-40 sm:w-40">
        <img
          src={profile.image}
          alt={profile.title}
          className="h-full w-full object-contain"
        />
      </div>

      <h1 className="text-3xl font-semibold sm:text-4xl">{profile.title}</h1>

      <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
        {profile.description}
      </p>

      {prizeDrawConsent ? (
        <p className="rounded-xl border border-emerald-900/50 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-200">
          You have joined the prize draw. Good luck!
        </p>
      ) : null}
    </article>
  );
}
