import { useEffect, useState } from "react";
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
  const [existingData, setExistingData] =
    useState<CallDurationPoint[] | null>(null);

  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  // --------------------------------------------------
  // Load last used email
  // --------------------------------------------------
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  // --------------------------------------------------
  // Fetch existing data once email is entered
  // --------------------------------------------------
  useEffect(() => {
    if (!email) return;

    const fetchExisting = async () => {
      const { data: row } = await supabase
        .from("user_chart_data")
        .select("chart_values")
        .eq("email", email)
        .maybeSingle();

      if (row?.chart_values?.callDuration) {
        setExistingData(row.chart_values.callDuration);
        setData(row.chart_values.callDuration); // show previous values
      } else {
        setExistingData(null);
        setData(initialData ?? DEFAULT_DATA); // dummy values
      }
    };

    fetchExisting();
  }, [email, initialData]);

  // --------------------------------------------------
  // Save handler with overwrite confirmation
  // --------------------------------------------------
  const handleSave = async () => {
    if (!email) {
      alert("Please enter your email first");
      return;
    }

    // Ask confirmation ONLY if data already exists
    if (existingData) {
      const ok = window.confirm(
        "We found previously saved values for this email.\nDo you want to overwrite them?"
      );
      if (!ok) return;
    }

    setLoading(true);

    await supabase.from("user_chart_data").upsert({
      email,
      chart_values: {
        callDuration: data,
      },
    });

    localStorage.setItem("email", email);
    onSave(data); // updates chart immediately
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#020617] p-6 rounded-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-3">
          Edit Call Duration
        </h2>

        <input
          type="email"
          placeholder="your@email.com"
          className="w-full mb-2 p-2 rounded bg-black/40 border border-white/10"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailTouched(true);
          }}
        />

        {existingData && (
          <p className="text-xs text-yellow-400 mb-3">
            Previously saved values loaded for this email
          </p>
        )}

        {!existingData && emailTouched && (
          <p className="text-xs text-blue-400 mb-3">
            These are default values. Saving will replace them with your custom data.
          </p>
        )}

        {data.map((point, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className="w-1/2 p-2 rounded bg-black/40 border border-white/10"
              value={point.time}
              onChange={(e) => {
                const copy = [...data];
                copy[i] = { ...copy[i], time: e.target.value };
                setData(copy);
              }}
            />
            <input
              type="number"
              className="w-1/2 p-2 rounded bg-black/40 border border-white/10"
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
            className="px-4 py-2 rounded bg-purple-600 text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
