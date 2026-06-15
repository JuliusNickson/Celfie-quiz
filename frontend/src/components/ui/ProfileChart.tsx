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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
      <h2 className="mb-4 text-base font-semibold text-white sm:mb-6 sm:text-lg">
        Profile breakdown
      </h2>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-zinc-300">{item.label}</span>
              <span className="shrink-0 font-medium text-white">{item.value}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-zinc-800 sm:h-3">
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
