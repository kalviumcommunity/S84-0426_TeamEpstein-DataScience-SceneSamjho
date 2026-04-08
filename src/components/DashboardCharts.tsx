import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { AccidentRecord, getTimeDistribution, getWeatherDistribution, getRoadTypeDistribution } from "@/data/sampleData";

const COLORS = ["#2a9d8f", "#e76f51", "#264653", "#e9c46a", "#8a5cf5"];

const tooltipStyle = {
  backgroundColor: "#fdfcfa",
  border: "1px solid #e8e4de",
  borderRadius: "8px",
  color: "#2c2e3a",
  fontSize: "12px",
  fontFamily: "'Source Sans 3', sans-serif",
  boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
};

export default function DashboardCharts({ data }: { data: AccidentRecord[] }) {
  const timeData = getTimeDistribution(data);
  const weatherData = getWeatherDistribution(data);
  const roadData = getRoadTypeDistribution(data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
      <motion.div className="chart-container lg:col-span-2 xl:col-span-2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h3 className="font-display text-base font-semibold text-foreground mb-5">Accidents by Hour</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ebe7e1" />
            <XAxis dataKey="hour" tick={{ fill: "#8a8a8a", fontSize: 11, fontFamily: "'Source Sans 3'" }} interval={2} />
            <YAxis tick={{ fill: "#8a8a8a", fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="accidents" stroke="#2a9d8f" strokeWidth={2.5} dot={{ fill: "#2a9d8f", r: 3, strokeWidth: 0 }} activeDot={{ r: 5, stroke: "#2a9d8f", strokeWidth: 2, fill: "#fff" }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div className="chart-container" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <h3 className="font-display text-base font-semibold text-foreground mb-5">By Road Type</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={roadData} cx="50%" cy="50%" innerRadius={58} outerRadius={92} paddingAngle={3} dataKey="count" nameKey="roadType" strokeWidth={0}>
              {roadData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "12px", fontFamily: "'Source Sans 3'" }} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div className="chart-container lg:col-span-2 xl:col-span-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <h3 className="font-display text-base font-semibold text-foreground mb-5">Weather Conditions</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weatherData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ebe7e1" />
            <XAxis dataKey="weather" tick={{ fill: "#8a8a8a", fontSize: 11 }} />
            <YAxis tick={{ fill: "#8a8a8a", fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="count" radius={[5, 5, 0, 0]}>
              {weatherData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
