import type { ProfileDetails, ProfileName } from "../../data/profiles";
import { profileBrandClasses } from "../../theme/brand";

type ResultCardProps = {
  profile: ProfileDetails;
  profileName: ProfileName;
};

export default function ResultCard({
  profile,
  profileName,
}: ResultCardProps) {
  const brand = profileBrandClasses[profileName];

  return (
    <article
      className={`w-full max-w-lg space-y-6 rounded-3xl border bg-white p-6 text-center shadow-[0_16px_48px_rgba(71,47,146,0.1)] sm:p-8 ${brand.border}`}
    >
      <p className="page-eyebrow">Your Digital Superpower is</p>

      <div className="mx-auto w-full max-w-xs sm:max-w-sm">
        <img
          src={profile.image}
          alt={profile.title}
          className="mx-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(71,47,146,0.15)]"
        />
      </div>

      <h1 className={`text-3xl font-bold sm:text-4xl ${brand.text}`}>
        {profile.title}
      </h1>

      <p className="text-base leading-relaxed text-brand-purple-light sm:text-lg">
        {profile.description}
      </p>
    </article>
  );
}
