import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type SadPathPoint = {
  label: string;
  value: number;
};

const data: SadPathPoint[] = [
  { label: "Unsupported Language", value: 35 },
  { label: "Identity Failed", value: 25 },
  { label: "Agent Silent", value: 20 },
  { label: "Customer Hangup", value: 20 },
];

const COLORS = ["#a78bfa", "#60a5fa", "#34d399", "#fbbf24"];

export function SadPathChart() {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Sad Path Analysis</h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} innerRadius={60} outerRadius={100} dataKey="value">
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
