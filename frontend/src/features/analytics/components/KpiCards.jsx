const KPI_CONFIG = [
  { key: "total_accidents", label: "Total Accidents" },
  { key: "total_fatalities", label: "Total Fatalities" },
  { key: "top_hazard_weather", label: "Top Hazard Weather" },
  { key: "top_hazard_road", label: "Top Hazard Road" },
];

function formatValue(value) {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }
  return value;
}

export function KpiCards({ data = {}, isLoading = false, error = "" }) {
  if (isLoading) {
    return <div className="chart-state">Loading KPI snapshot…</div>;
  }

  if (error) {
    return <div className="chart-state chart-state--error">{error}</div>;
  }

  return (
    <div className="kpi-grid">
      {KPI_CONFIG.map((kpi) => (
        <article className="kpi-card" key={kpi.key}>
          <h3>{kpi.label}</h3>
          <p>{formatValue(data[kpi.key])}</p>
        </article>
      ))}
    </div>
  );
}
