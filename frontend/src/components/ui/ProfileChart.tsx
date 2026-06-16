type ProfileBar = {
  label: string;
  value: number;
  color: string;
};

type ProfileChartProps = {
  data: ProfileBar[];
};

export default function ProfileChart({ data }: ProfileChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="surface-card">
      <h2 className="mb-4 text-base font-bold text-brand-purple sm:mb-6 sm:text-lg">
        Profile breakdown
      </h2>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-brand-purple-light">{item.label}</span>
              <span className="shrink-0 font-medium text-brand-purple">
                {item.value}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-brand-purple-light/20 sm:h-3">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
