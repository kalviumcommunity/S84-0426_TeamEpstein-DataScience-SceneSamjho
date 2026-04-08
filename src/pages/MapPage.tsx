import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AccidentMap from "@/components/AccidentMap";
import { Loader2 } from "lucide-react";
import { fetchMapData } from "@/data/api";

export default function MapPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMap() {
      try {
        const apiData = await fetchMapData();
        setData(apiData || []);
      } catch (e) {
        console.error("Error loading map data:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadMap();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <motion.h2 className="font-display text-2xl font-bold gradient-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Accident Map
        </motion.h2>
        <p className="text-sm text-muted-foreground mt-1">Interactive visualization of accident locations and severity on live NYC data</p>
      </div>

      <div className="flex flex-wrap gap-4 text-xs font-medium">
        {[
          { label: "Minor", color: "#10b981" },
          { label: "Moderate", color: "#f59e0b" },
          { label: "Severe", color: "#ef4444" },
          { label: "Fatal", color: "#dc2626" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 p-2 rounded-lg bg-[rgba(0,0,0,0.03)] border border-[rgba(0,0,0,0.05)]">
            <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
            <span className="text-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-[500px] glass-card">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
          <span className="text-muted-foreground font-medium text-lg">Plotting coordinate spatial data...</span>
        </div>
      ) : (
        <AccidentMap data={data} />
      )}
    </div>
  );
}
