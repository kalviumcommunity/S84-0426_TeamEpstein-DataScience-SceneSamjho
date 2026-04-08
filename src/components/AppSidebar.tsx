import { NavLink, useLocation } from "react-router-dom";
import { BarChart3, Brain, Map, Upload, Shield, Activity } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", icon: BarChart3, label: "Dashboard" },
  { to: "/insights", icon: Brain, label: "AI Insights" },
  { to: "/map", icon: Map, label: "Map View" },
  { to: "/upload", icon: Upload, label: "Upload Data" },
  { to: "/predictions", icon: Activity, label: "Predictions" },
  { to: "/admin", icon: Shield, label: "Admin" },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-56 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="px-6 py-7 border-b border-sidebar-border">
        <h1 className="font-display text-lg font-bold text-foreground leading-tight">Accident<br/>Insight Engine</h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink key={item.to} to={item.to}>
              <motion.div className={`sidebar-nav-item ${isActive ? "active" : ""}`} whileTap={{ scale: 0.97 }}>
                <item.icon className="w-[18px] h-[18px]" />
                <span>{item.label}</span>
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      <div className="px-6 py-5 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="pulse-dot" />
          <span className="text-xs text-muted-foreground">All systems online</span>
        </div>
      </div>
    </aside>
  );
}
