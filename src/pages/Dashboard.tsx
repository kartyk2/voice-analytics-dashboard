import { useEffect, useState } from "react";

import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { CallDurationChart } from "../components/CallDurationChart";
import { CallVolumeChart } from "../components/CallVolumeChart";
import { SadPathChart } from "../components/SadPathChart";
import { AnalyticsCard } from "../components/AnalyticsCard";
import { EditCallDurationModal } from "../components/EditCallDurationModal";

import { supabase } from "../lib/supabase";
import type { CallDurationPoint } from "../types/charts";

export function Dashboard() {
  const [showEdit, setShowEdit] = useState(false);
  const [chartData, setChartData] = useState<CallDurationPoint[] | undefined>(
    undefined
  );

  // Load saved data (if email exists)
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    supabase
      .from("user_chart_data")
      .select("chart_values")
      .eq("email", email)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.chart_values?.callDuration) {
          setChartData(data.chart_values.callDuration);
        }
      });
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      <Hero />

      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        {/* Call Duration with Edit */}
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setShowEdit(true)}
              className="text-sm text-purple-400 hover:underline"
            >
              Edit
            </button>
          </div>

          <CallDurationChart data={chartData} />
        </div>

        <CallVolumeChart />
        <SadPathChart />
        <AnalyticsCard title="Avg Call Latency" value="1.8s" />
      </section>

      {showEdit && (
        <EditCallDurationModal
          initialData={chartData}
          onSave={(newData) => {
            setChartData(newData);
            localStorage.setItem("email", localStorage.getItem("email") ?? "");
          }}
          onClose={() => setShowEdit(false)}
        />
      )}
    </main>
  );
}
