import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Database, Users, FileText, Settings, Loader2 } from "lucide-react";
import { fetchMapData } from "@/data/api";

export default function AdminPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const apiData = await fetchMapData();
        setData(apiData || []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  // Aggregate by road type instead of dummy 'zones'
  const getRoadDistribution = (records: any[]) => {
    const summary: Record<string, { total: number; severe: number }> = {};
    records.forEach(r => {
      const road = r.road_type || r.roadType || "Unknown";
      if (!summary[road]) {
        summary[road] = { total: 0, severe: 0 };
      }
      summary[road].total += 1;
      if (r.severity === 'Severe' || r.severity === 'Fatal') {
        summary[road].severe += 1;
      }
    });

    return Object.keys(summary).map(key => ({
      road: key,
      total: summary[key].total,
      severe: summary[key].severe,
    })).sort((a, b) => b.total - a.total);
  };

  const roadSummary = !isLoading ? getRoadDistribution(data) : [];

  return (
    <div className="space-y-8">
      <div>
        <motion.h2 className="font-display text-2xl font-bold gradient-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Admin Panel
        </motion.h2>
        <p className="text-sm text-muted-foreground mt-1">Manage ML Engine datasets and system configuration</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Database, label: "Datasets", value: "1 Active", desc: isLoading ? "Loading..." : `${data.length} live records loaded` },
          { icon: Users, label: "Users", value: "—", desc: "Auth not configured" },
          { icon: FileText, label: "Reports", value: "0", desc: "No exports yet" },
          { icon: Settings, label: "System", value: "Online", desc: "FastAPI running" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <item.icon className="w-5 h-5 text-primary mb-3" />
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="font-display text-lg font-bold text-foreground">{item.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center justify-between">
          <span>Road Type Distribution</span>
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
        </h3>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="py-2">Road Type</th>
              <th className="py-2">Total Accidents</th>
              <th className="py-2">Severe/Fatal</th>
              <th className="py-2">Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {roadSummary.map(r => (
              <tr key={r.road} className="border-b border-border/50">
                <td className="py-2 font-display text-primary">{r.road}</td>
                <td className="py-2">{r.total}</td>
                <td className="py-2">{r.severe}</td>
                <td className="py-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    r.severe / r.total > 0.15 ? 'bg-destructive/10 text-destructive' :
                    r.severe / r.total > 0.05 ? 'bg-[#ff9f43]/10 text-[#ff9f43]' :
                    'bg-teal/10 text-teal'
                  }`}>
                    {r.severe / r.total > 0.15 ? 'HIGH' : r.severe / r.total > 0.05 ? 'MEDIUM' : 'LOW'}
                  </span>
                </td>
              </tr>
            ))}
            {!isLoading && roadSummary.length === 0 && (
              <tr><td colSpan={4} className="py-4 text-center text-muted-foreground">No road data found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
