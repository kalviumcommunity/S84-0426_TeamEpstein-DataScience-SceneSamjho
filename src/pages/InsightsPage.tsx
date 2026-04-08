import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import CsvUploader from "@/components/CsvUploader";
import InsightCards from "@/components/InsightCards";
import DashboardCharts from "@/components/DashboardCharts";
import { fetchMapData, fetchInsights } from "@/data/api";

export default function InsightsPage() {
  const [data, setData] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usingCustom, setUsingCustom] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [apiData, apiInsights] = await Promise.all([
          fetchMapData(),
          fetchInsights()
        ]);
        setData(apiData || []);
        
        const formattedInsights = Array.isArray(apiInsights) 
          ? apiInsights.map((text, i) => ({
              id: i.toString(),
              type: "pattern",
              description: typeof text === "string" ? text : text.message || text.description || JSON.stringify(text),
              severity: "medium" as const
            }))
          : [];
        setInsights(formattedInsights);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDataLoaded = (newData: any[]) => {
    setData(newData);
    setUsingCustom(true);
    // Realistically you should POST to backend and re-fetch insights here.
    // For now we just show the data and wipe the static insights.
    setInsights([{ id: "new", type: "pattern", description: "New custom data analyzed locally.", severity: "low" }]);
  };

  return (
    <div className="space-y-8">
      <div>
        <motion.h2 className="font-display text-2xl font-bold gradient-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          AI Insights Engine
        </motion.h2>
        <p className="text-sm text-muted-foreground mt-1">Upload your data or explore live NYC insights</p>
      </div>

      <CsvUploader onDataLoaded={handleDataLoaded} />

      {usingCustom && (
        <motion.p className="text-xs text-primary" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          ✓ Viewing your uploaded dataset ({data.length} records)
        </motion.p>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-teal mb-4" />
          <p className="text-muted-foreground font-medium">Crunching live analytics...</p>
        </div>
      ) : (
        <>
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground mb-4">Pattern Analysis</h3>
            <InsightCards insights={insights} />
          </div>

          <DashboardCharts data={data} />
        </>
      )}
    </div>
  );
}
