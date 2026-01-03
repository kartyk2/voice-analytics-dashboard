interface AnalyticsCardProps {
  title: string;
  value: string;
}

export function AnalyticsCard({ title, value }: AnalyticsCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6 flex flex-col justify-center">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
