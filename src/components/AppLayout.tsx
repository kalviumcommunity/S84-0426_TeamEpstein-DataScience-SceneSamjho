import AppSidebar from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex bg-background relative overflow-hidden text-foreground">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal/10 rounded-full blur-[140px] pointer-events-none z-0"></div>

      <div className="z-20 shadow-[10px_0_30px_rgba(0,0,0,0.05)] flex">
        <AppSidebar />
      </div>
      
      <main className="flex-1 h-screen p-10 overflow-y-auto relative z-10 scroll-smooth">
        <div className="max-w-[1600px] w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
