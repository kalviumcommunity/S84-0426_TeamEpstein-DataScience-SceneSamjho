import { useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const weatherOptions = ["Clear", "Rain", "Fog", "Snow", "Hail"];
const roadOptions = ["Highway", "Urban", "Rural"];
const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

function predictRisk(hour: number, weather: string, roadType: string): number {
  let base = 15;
  if (hour >= 22 || hour <= 5) base += 30;
  else if (hour >= 17 && hour <= 21) base += 15;
  else if (hour >= 7 && hour <= 9) base += 10;
  if (weather === "Rain") base += 20;
  else if (weather === "Fog") base += 25;
  else if (weather === "Snow") base += 30;
  else if (weather === "Hail") base += 15;
  if (roadType === "Highway") base += 15;
  else if (roadType === "Rural") base += 10;
  return Math.min(base, 95);
}

export default function PredictionForm() {
  const [hour, setHour] = useState(8);
  const [weather, setWeather] = useState("Clear");
  const [roadType, setRoadType] = useState("Urban");
  const [result, setResult] = useState<number | null>(null);

  return (
    <motion.div className="glass-card p-7" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="font-display text-lg font-semibold text-foreground mb-6 flex items-center gap-2.5">
        <Activity className="w-5 h-5 text-primary" />
        Risk Predictor
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {[
          { label: "Time of Day", value: hour, onChange: (v: string) => setHour(parseInt(v)), options: timeSlots.map((t, i) => ({ value: i, label: t })) },
          { label: "Weather", value: weather, onChange: setWeather, options: weatherOptions.map(w => ({ value: w, label: w })) },
          { label: "Road Type", value: roadType, onChange: setRoadType, options: roadOptions.map(r => ({ value: r, label: r })) },
        ].map((field) => (
          <div key={field.label}>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">{field.label}</label>
            <select
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            >
              {field.options.map(o => <option key={String(o.value)} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        ))}
      </div>

      <button
        onClick={() => setResult(predictRisk(hour, weather, roadType))}
        className="w-full bg-primary text-primary-foreground font-body text-sm font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity tracking-wide"
      >
        Calculate Risk
      </button>

      {result !== null && (
        <motion.div className="mt-8 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#ebe7e1" strokeWidth="7" />
              <motion.circle
                cx="60" cy="60" r="52" fill="none"
                stroke={result > 60 ? "#c0392b" : result > 35 ? "#e76f51" : "#2a9d8f"}
                strokeWidth="7" strokeLinecap="round"
                strokeDasharray={`${(result / 100) * 327} 327`}
                initial={{ strokeDasharray: "0 327" }}
                animate={{ strokeDasharray: `${(result / 100) * 327} 327` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-2xl font-bold text-foreground">{result}%</span>
            </div>
          </div>
          <p className="text-sm mt-4 text-muted-foreground font-light">
            {result > 60 ? "High risk — additional safety measures recommended" :
             result > 35 ? "Moderate risk — proceed with caution" :
             "Low risk — standard protocols sufficient"}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
