import { NavLink, useLocation } from "react-router-dom";
import { BarChart3, Brain, Map, Upload, Shield, Activity, Zap } from "lucide-react";
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
		<aside className="w-64 min-h-screen bg-sidebar/80 backdrop-blur-2xl border-r border-[rgba(0,0,0,0.08)] flex flex-col relative z-50">
			<div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-primary/50 via-teal/50 to-transparent"></div>

			<div className="px-6 py-8 relative">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-teal flex items-center justify-center shadow-[0_0_20px_rgba(120,40,200,0.5)]">
						<Zap className="text-primary w-5 h-5 fill-primary/20" />
					</div>
					<h1 className="font-display text-xl font-bold tracking-tight text-foreground leading-tight">
						Accident
						<br />
						<span className="text-primary font-light">Insight Engine</span>
					</h1>
				</div>
			</div>

			<nav className="flex-1 px-4 py-4 space-y-1">
				{navItems.map((item) => {
					const isActive = location.pathname === item.to;
					return (
						<NavLink key={item.to} to={item.to} className="block relative">
							<motion.div
								className={`sidebar-nav-item overflow-hidden relative ${
									isActive ? "active" : ""
								}`}
								whileTap={{ scale: 0.95 }}
							>
								{isActive && (
									<motion.div
										layoutId="active-bg"
										className="absolute inset-0 bg-gradient-to-r from-primary/15 to-transparent z-0"
										initial={false}
										transition={{
											type: "spring",
											stiffness: 300,
											damping: 30,
										}}
									/>
								)}
								<item.icon className="w-[20px] h-[20px] z-10 relative drop-shadow-[0_0_8px_rgba(0,0,0,0.15)]" />
								<span className="z-10 relative">{item.label}</span>
							</motion.div>
						</NavLink>
					);
				})}
			</nav>

			<div className="mt-auto p-4 mb-4 relative z-10 w-full">
				<div className="p-4 rounded-xl border border-[rgba(0,0,0,0.05)] bg-[rgba(0,0,0,0.02)] backdrop-blur-md flex flex-col gap-2 relative overflow-hidden">
					<div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2"></div>
					<h3 className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
						<Activity className="w-4 h-4 text-primary" /> System Status
					</h3>
					<div className="flex items-center justify-between text-xs">
						<span className="text-muted-foreground font-medium">Core Engine</span>
						<span className="text-primary font-semibold flex items-center gap-1">
							<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
							Online
						</span>
					</div>
					<div className="flex items-center justify-between text-xs">
						<span className="text-muted-foreground font-medium">DBSCAN</span>
						<span className="text-primary font-semibold">Active</span>
					</div>
				</div>
			</div>
		</aside>
	);
}
