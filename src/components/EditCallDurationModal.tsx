import { useState } from "react";
import { supabase } from "../lib/supabase";
import type { CallDurationPoint } from "../types/charts";

interface EditChartModalProps {
  initialData?: CallDurationPoint[];
  onSave: (data: CallDurationPoint[]) => void;
  onClose: () => void;
}

const DEFAULT_DATA: CallDurationPoint[] = [
  { time: "0s", duration: 10 },
  { time: "30s", duration: 25 },
  { time: "60s", duration: 50 },
  { time: "90s", duration: 30 },
  { time: "120s", duration: 15 },
];

export function EditCallDurationModal({
  initialData,
  onSave,
  onClose,
}: EditChartModalProps) {
  const [email, setEmail] = useState("");
  const [data, setData] = useState<CallDurationPoint[]>(
    initialData ?? DEFAULT_DATA
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!email) {
      alert("Email is required");
      return;
    }

    setLoading(true);

    const { data: existing } = await supabase
      .from("user_chart_data")
      .select("chart_values")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      const ok = window.confirm(
        "We found previous values for this email. Overwrite them?"
      );
      if (!ok) {
        setLoading(false);
        return;
      }
    }

    await supabase.from("user_chart_data").upsert({
      email,
      chart_values: {
        callDuration: data,
      },
    });

    localStorage.setItem("email", email);
    onSave(data);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#020617] p-6 rounded-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          Edit Call Duration
        </h2>

        <input
          type="email"
          placeholder="your@email.com"
          className="w-full mb-4 p-2 rounded bg-black/40 border border-white/10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {data.map((point, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className="w-1/2 p-2 rounded bg-black/40"
              value={point.time}
              onChange={(e) => {
                const copy = [...data];
                copy[i] = { ...copy[i], time: e.target.value };
                setData(copy);
              }}
            />
            <input
              type="number"
              className="w-1/2 p-2 rounded bg-black/40"
              value={point.duration}
              onChange={(e) => {
                const copy = [...data];
                copy[i] = {
                  ...copy[i],
                  duration: Number(e.target.value),
                };
                setData(copy);
              }}
            />
          </div>
        ))}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 rounded bg-purple-600 text-sm font-medium"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
