import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { CallDurationChart } from "../components/CallDurationChart";
import { CallVolumeChart } from "../components/CallVolumeChart";
import { SadPathChart } from "../components/SadPathChart";
import { AnalyticsCard } from "../components/AnalyticsCard";

export function Dashboard() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <Hero />

      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        <CallDurationChart />
        <CallVolumeChart />
        <SadPathChart />
        <AnalyticsCard title="Avg Call Latency" value="1.8s" />
      </section>
    </main>
  );
}
