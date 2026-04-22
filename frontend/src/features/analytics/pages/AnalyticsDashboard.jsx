import { useEffect, useState } from "react";
import "../styles/analytics.css";
import { AnalyticsSection } from "../components/AnalyticsSection";
import { TimeSeriesTrendChart } from "../components/TimeSeriesTrendChart";
import { KpiCards } from "../components/KpiCards";
import { IndianContextCharts } from "../components/IndianContextCharts";

const API_BASE_URL = "http://localhost:8000/api/v1";
const POLLING_MS = 60000;

export function AnalyticsDashboard() {
  const [kpis, setKpis] = useState({});
  const [trendData, setTrendData] = useState([]);
  const [contextData, setContextData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function fetchAnalyticsData() {
      try {
        if (isActive) {
          setError("");
        }

        const [kpisRes, trendsRes, contextRes] = await Promise.all([
          fetch(`${API_BASE_URL}/analytics/kpis/`),
          fetch(`${API_BASE_URL}/analytics/trends/`),
          fetch(`${API_BASE_URL}/analytics/indian-context/`),
        ]);

        if (!kpisRes.ok || !trendsRes.ok || !contextRes.ok) {
          throw new Error("Failed to fetch analytics endpoints");
        }

        const [kpisPayload, trendsPayload, contextPayload] = await Promise.all([
          kpisRes.json(),
          trendsRes.json(),
          contextRes.json(),
        ]);

        if (!isActive) {
          return;
        }

        setKpis(kpisPayload || {});
        setTrendData(Array.isArray(trendsPayload) ? trendsPayload : []);
        setContextData(contextPayload || {});
      } catch (err) {
        if (isActive) {
          setError("Analytics API unavailable. Showing fallback trend data.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    fetchAnalyticsData();
    const intervalId = setInterval(fetchAnalyticsData, POLLING_MS);

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <main className="analytics-page" aria-label="Analytics dashboard">
      <header className="analytics-page__header">
        <h1>Traffic Analytics Dashboard</h1>
        <p>
          Business intelligence overview for accidents, risk signals, and
          localized road-context trends.
        </p>
      </header>

      <section className="analytics-grid" aria-label="Analytics visualization grid">
        <AnalyticsSection
          className="analytics-section--kpi"
          title="KPI Snapshot"
          description="Top-level cards for accident totals and hazard highlights"
        >
          <KpiCards data={kpis} isLoading={isLoading} error={error} />
        </AnalyticsSection>

        <AnalyticsSection
          className="analytics-section--trend"
          title="Accident Trend by Time"
          description="Line chart area for morning, afternoon, evening, and night trends"
        >
          <TimeSeriesTrendChart data={trendData} isLoading={isLoading} error={error} />
        </AnalyticsSection>

        <AnalyticsSection
          className="analytics-section--context"
          title="Indian Context Correlations"
          description="Pie and bar charts for wrong-way, potholes, and severity context"
        >
          <IndianContextCharts data={contextData} isLoading={isLoading} error={error} />
        </AnalyticsSection>
      </section>
    </main>
  );
}
