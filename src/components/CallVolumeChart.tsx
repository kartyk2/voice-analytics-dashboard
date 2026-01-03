// components/CallVolumeChart.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const defaultData = [
  { time: "10:00", dropRate: 2 },
  { time: "10:10", dropRate: 5 },
  { time: "10:20", dropRate: 3 },
  { time: "10:30", dropRate: 8 }
];

export function CallVolumeChart({ data = defaultData }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6">
      <h3 className="text-white mb-4 font-semibold">
        Call Drop Rate (%)
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="dropRate"
            stroke="#a78bfa"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
