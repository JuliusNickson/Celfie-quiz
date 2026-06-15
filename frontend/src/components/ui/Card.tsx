type CardProps = {
  label: string;
  value: number;
  suffix?: string;
  accent?: string;
};

export default function Card({
  label,
  value,
  suffix = "",
  accent = "text-white",
}: CardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
      <p className="text-xs text-zinc-400 sm:text-sm">{label}</p>
      <p className={`mt-2 text-3xl font-semibold sm:text-4xl ${accent}`}>
        {value}
        {suffix}
      </p>
    </div>
  );
}
