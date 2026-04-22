import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

function getHazardData(data) {
  return [
    { name: "Stray Animals", value: data?.stray_animals_accidents ?? 0 },
    { name: "Wrong Way", value: data?.wrong_way_accidents ?? 0 },
    { name: "Potholes", value: data?.pothole_related ?? 0 },
  ];
}

function getWrongWaySeverityData(data) {
  const severity = data?.severity_distribution_wrong_way || {};
  return Object.keys(severity).map((key) => ({
    severity: key,
    count: severity[key],
  }));
}

export function IndianContextCharts({ data = {}, isLoading = false, error = "" }) {
  if (isLoading) {
    return <div className="chart-state">Loading context charts…</div>;
  }

  if (error) {
    return <div className="chart-state chart-state--error">{error}</div>;
  }

  const hazardData = getHazardData(data);
  const wrongWaySeverityData = getWrongWaySeverityData(data);

  return (
    <div className="analytics-grid__split">
      <div className="context-chart-panel" aria-label="Hazard distribution pie chart">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={hazardData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={82}
              label
            >
              {hazardData.map((entry, index) => (
                <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} incidents`, "Count"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="context-chart-panel" aria-label="Wrong-way severity bar chart">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={wrongWaySeverityData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="severity" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip formatter={(value) => [`${value} incidents`, "Count"]} />
            <Legend />
            <Bar dataKey="count" name="Wrong-way Cases" fill="#7c3aed" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
