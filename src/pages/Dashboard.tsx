import { motion } from "framer-motion";
import { BarChart3, AlertTriangle, Clock, CloudRain } from "lucide-react";
import StatCard from "@/components/StatCard";
import DashboardCharts from "@/components/DashboardCharts";
import InsightCards from "@/components/InsightCards";
import RecommendationCards from "@/components/RecommendationCards";
import { sampleAccidents, generateInsights, generateRecommendations } from "@/data/sampleData";

export default function Dashboard() {
  const data = sampleAccidents;
  const insights = generateInsights(data);
  const recommendations = generateRecommendations(data);

  const totalAccidents = data.length;
  const highRiskZones = new Set(data.filter(d => d.severity === 'Severe' || d.severity === 'Fatal').map(d => d.zone)).size;
  const peakHour = (() => {
    const c: Record<number, number> = {};
    data.forEach(d => { c[d.hour] = (c[d.hour] || 0) + 1; });
    return Object.entries(c).sort((a, b) => b[1] - a[1])[0];
  })();
  const weatherImpact = Math.round(data.filter(d => d.weather !== 'Clear').length / data.length * 100);

  return (
    <div className="space-y-7">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="font-display text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1 font-light">Real-time accident analytics and prevention insights</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Accidents" value={totalAccidents} icon={BarChart3} trend={{ value: 12, positive: true }} delay={0} />
        <StatCard title="High-Risk Zones" value={highRiskZones} icon={AlertTriangle} subtitle="Active danger areas" delay={0.06} color="var(--wine)" />
        <StatCard title="Peak Hour" value={`${peakHour[0].padStart(2, '0')}:00`} icon={Clock} subtitle={`${peakHour[1]} incidents`} delay={0.12} color="var(--copper)" />
        <StatCard title="Weather Impact" value={`${weatherImpact}%`} icon={CloudRain} subtitle="Non-clear conditions" delay={0.18} color="var(--navy)" />
      </div>

      <div className="divider" />

      <DashboardCharts data={data} />

      <div className="divider" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Insights</h3>
          <InsightCards insights={insights} />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Recommendations</h3>
          <RecommendationCards recommendations={recommendations} />
        </div>
      </div>
    </div>
  );
}
