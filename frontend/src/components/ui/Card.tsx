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
  accent = "text-brand-purple",
}: CardProps) {
  return (
    <div className="surface-card">
      <p className="text-xs text-brand-purple-light sm:text-sm">{label}</p>
      <p className={`mt-2 text-3xl font-bold sm:text-4xl ${accent}`}>
        {value}
        {suffix}
      </p>
    </div>
  );
}
