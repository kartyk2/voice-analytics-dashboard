import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { CallDurationPoint } from "../types/charts";

interface CallDurationChartProps {
  data?: CallDurationPoint[];
}

const defaultData: CallDurationPoint[] = [
  { time: "0s", duration: 10 },
  { time: "30s", duration: 25 },
  { time: "60s", duration: 50 },
  { time: "90s", duration: 30 },
  { time: "120s", duration: 15 },
];

export function CallDurationChart({
  data = defaultData,
}: CallDurationChartProps) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">
        Call Duration Analysis
      </h3>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <XAxis dataKey="time" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="duration"
            stroke="#a78bfa"
            fill="#a78bfa"
            fillOpacity={0.25}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
