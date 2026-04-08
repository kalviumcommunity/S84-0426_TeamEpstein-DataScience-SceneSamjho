import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PredictionForm from "@/components/PredictionForm";
import RecommendationCards from "@/components/RecommendationCards";
import { fetchRecommendations } from "@/data/api";
import { Loader2 } from "lucide-react";

export default function PredictionsPage() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const apiRecs = await fetchRecommendations();
        const formattedRecs = Array.isArray(apiRecs)
          ? apiRecs.map((text, i) => ({
              id: i.toString(),
              title: "AI Action Item",
              description: typeof text === "string" ? text : text.action || text.description || JSON.stringify(text),
              priority: "high" as const,
              category: "infrastructure" as const
            }))
          : [];
        setRecommendations(formattedRecs);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <motion.h2 className="font-display text-2xl font-bold gradient-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Predictive Analysis
        </motion.h2>
        <p className="text-sm text-muted-foreground mt-1">Estimate accident risk and get AI-powered recommendations based on live data</p>
      </div>

      <PredictionForm />

      <div>
        <h3 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <span>💡 AI Recommendations</span>
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
        </h3>
        {!isLoading && <RecommendationCards recommendations={recommendations} />}
      </div>
    </div>
  );
}
