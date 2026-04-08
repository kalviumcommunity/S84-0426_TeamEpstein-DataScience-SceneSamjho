import { motion } from "framer-motion";
import { BarChart3, AlertTriangle, Clock, CloudRain, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import DashboardCharts from "@/components/DashboardCharts";
import InsightCards from "@/components/InsightCards";
import RecommendationCards from "@/components/RecommendationCards";
import { fetchMapData, fetchInsights, fetchRecommendations } from "@/data/api";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [apiData, apiInsights, apiRecs] = await Promise.all([
          fetchMapData(),
          fetchInsights(),
          fetchRecommendations()
        ]);
        setData(apiData || []);
        
        // Convert API insights to the UI shape if needed
        // Assuming API returns string[] or objects with generic text
        const formattedInsights = Array.isArray(apiInsights) 
          ? apiInsights.map((text, i) => ({
              id: i.toString(),
              type: "pattern",
              description: typeof text === "string" ? text : text.message || text.description || JSON.stringify(text),
              severity: "medium" as const
            }))
          : [];
        setInsights(formattedInsights);

        const formattedRecs = Array.isArray(apiRecs)
          ? apiRecs.map((text, i) => ({
              id: i.toString(),
              title: "Action Item",
              description: typeof text === "string" ? text : text.action || text.description || JSON.stringify(text),
              priority: "high" as const,
              category: "infrastructure" as const
            }))
          : [];
        setRecommendations(formattedRecs);
      } catch (e) {
        console.error("Error loading dashboard data:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground font-medium text-lg">Loading real-time ML telemetrics...</span>
      </div>
    );
  }

  const totalAccidents = data.length || 0;
  // Calculate high risk based on severity
  const highRiskZones = data.filter(d => d.severity === 'Severe' || d.severity === 'Fatal').length;
  
  // Calculate peak hour
  const peakHour = (() => {
    if (!data.length) return ["12", 0];
    const c: Record<string, number> = {};
    data.forEach(d => { 
      // we might have 'time' string ("Morning") or 'hour' int depending on API
      const timeVal = d.time || "Morning"; 
      c[timeVal] = (c[timeVal] || 0) + 1; 
    });
    return Object.entries(c).sort((a, b) => b[1] - a[1])[0] || ["N/A", 0];
  })();
  
  const weatherImpact = data.length > 0 
    ? Math.round(data.filter(d => d.weather && d.weather !== 'Clear').length / data.length * 100)
    : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
    }
  };

  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible" 
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="relative z-10 flex flex-col gap-2">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] -z-10"></div>
        <h2 className="font-display text-4xl font-extrabold accent-gradient-text tracking-tight">System Overview</h2>
        <p className="text-base text-muted-foreground font-medium">Monitoring real-time accident telemetry and predictive insights.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Accidents" value={totalAccidents} icon={BarChart3} trend={{ value: 12, positive: true }} delay={0} />
        <StatCard title="High-Risk" value={highRiskZones} icon={AlertTriangle} subtitle="Severe or Fatal incidents" delay={0.1} color="var(--wine)" />
        <StatCard title="Peak Time" value={`${peakHour[0]}`} icon={Clock} subtitle={`${peakHour[1]} incidents`} delay={0.2} color="var(--copper)" />
        <StatCard title="Weather Risk" value={`${weatherImpact}%`} icon={CloudRain} subtitle="Non-clear conditions" delay={0.3} color="var(--teal)" />
      </motion.div>

      <motion.div variants={itemVariants} className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <motion.div variants={itemVariants}>
        <DashboardCharts data={data} />
      </motion.div>

      <motion.div variants={itemVariants} className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            <h3 className="font-display text-2xl font-bold text-foreground">AI Insights</h3>
          </div>
          <InsightCards insights={insights} />
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-teal rounded-full"></div>
             <h3 className="font-display text-2xl font-bold text-foreground">Actionable Directives</h3>
          </div>
          <RecommendationCards recommendations={recommendations} />
        </motion.div>
      </div>
    </motion.div>
  );
}
