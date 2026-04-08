import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  delay?: number;
  color?: string;
}

export default function StatCard({ title, value, subtitle, icon: Icon, trend, delay = 0, color = "var(--primary)" }: StatCardProps) {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[11px] font-body font-semibold text-muted-foreground uppercase tracking-widest">{title}</p>
          <p className="text-3xl font-display font-bold mt-2 text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1 font-light">{subtitle}</p>}
          {trend && (
            <p className={`text-xs mt-2.5 font-medium ${trend.positive ? 'text-sage' : 'text-wine'}`}>
              {trend.positive ? '↓' : '↑'} {Math.abs(trend.value)}%
              <span className="text-muted-foreground font-normal ml-1">vs prior period</span>
            </p>
          )}
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: `hsl(${color} / 0.08)` }}
        >
          <Icon className="w-[18px] h-[18px]" style={{ color: `hsl(${color})` }} />
        </div>
      </div>
    </motion.div>
  );
}
