import { useState } from "react";
import { motion } from "framer-motion";
import CsvUploader from "@/components/CsvUploader";

export default function UploadPage() {
  const [data, setData] = useState<any[]>([]);

  return (
    <div className="space-y-8">
      <div>
        <motion.h2 className="font-display text-2xl font-bold gradient-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Upload Dataset
        </motion.h2>
        <p className="text-sm text-muted-foreground mt-1">Import accident CSV data for live ML backend analysis</p>
      </div>

      <CsvUploader onDataLoaded={setData} />

      {data.length > 0 && (
        <motion.div className="glass-card p-4 overflow-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="font-display text-sm font-semibold text-foreground mb-3">Preview ({data.length} records)</h3>
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3">Weather</th>
                <th className="py-2 px-3">Road Type</th>
                <th className="py-2 px-3">Severity</th>
                <th className="py-2 px-3">Lat</th>
                <th className="py-2 px-3">Lon</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 20).map((row, idx) => (
                <tr key={row.id || idx} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-2 px-3">{row.time || "N/A"}</td>
                  <td className="py-2 px-3">{row.weather || "N/A"}</td>
                  <td className="py-2 px-3">{row.road_type || row.roadType || "N/A"}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      row.severity === 'Fatal' ? 'bg-destructive/20 text-destructive' :
                      row.severity === 'Severe' ? 'bg-[#ff9f43]/20 text-[#ff9f43]' :
                      row.severity === 'Moderate' ? 'bg-primary/20 text-primary' :
                      'bg-teal/20 text-teal'
                    }`}>
                      {row.severity || "N/A"}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono">{row.latitude?.toFixed(4) || "N/A"}</td>
                  <td className="py-2 px-3 font-mono">{row.longitude?.toFixed(4) || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
