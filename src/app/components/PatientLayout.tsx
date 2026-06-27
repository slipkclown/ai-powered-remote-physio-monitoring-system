import {
  Activity, Bell, BookOpen, Home, MessageSquare,
  Play, TrendingUp, User, ClipboardList,
} from "lucide-react";
import { useRehab } from "../context/RehabContext";
import { toast } from "sonner";

interface PatientLayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  activePage?: string;
}

const navItems = [
  { icon: <Home className="w-4 h-4" />, label: "Dashboard", page: "patient" },
  { icon: <Play className="w-4 h-4" />, label: "My Exercises", page: "monitor" },
  { icon: <TrendingUp className="w-4 h-4" />, label: "Progress History", page: "progress-history" },
  { icon: <BookOpen className="w-4 h-4" />, label: "Recovery Journal", page: "journal" },
  { icon: <Activity className="w-4 h-4" />, label: "Confidence Tracking", page: "confidence" },
  { icon: <ClipboardList className="w-4 h-4" />, label: "Weekly Check-In", page: "checkin" },
  { icon: <MessageSquare className="w-4 h-4" />, label: "Message Centre", page: "messages" },
  { icon: <User className="w-4 h-4" />, label: "My Profile", page: "patient-profile" },
];

export function PatientLayout({ children, onNavigate, activePage }: PatientLayoutProps) {
  const { unreadPatient, notifications, markNotificationRead, unreadConvCount } = useRehab();
  const unreadMessages = unreadConvCount("P-1042", "patient");

  const handleBell = () => {
    const unread = notifications.filter((n) => n.for === "patient" && !n.read);
    if (unread.length === 0) return;
    unread.forEach((n) => {
      toast.info(n.message, { duration: 4000 });
      markNotificationRead(n.id);
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e3a8a] flex flex-col flex-shrink-0 sticky top-0 h-screen">
        {/* Brand */}
        <div className="p-6 border-b border-sidebar-border">
          <button
            onClick={() => onNavigate("patient")}
            className="flex items-center gap-3 w-full text-left"
          >
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">Recovr</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activePage === item.page || (item.page === "patient" && activePage === "patient");
            const badge = item.page === "messages" ? unreadMessages : 0;
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-white/15 text-white font-medium"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
                {badge > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-cyan-400 flex items-center justify-center text-[#1e3a8a] font-semibold text-sm">
              MA
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm truncate">Muhammad Arif</div>
              <div className="text-blue-300 text-xs">ACL Rehab · Week 3</div>
            </div>
            {unreadPatient > 0 && (
              <button
                onClick={handleBell}
                className="relative flex-shrink-0 text-blue-300 hover:text-white transition-colors"
                title={`${unreadPatient} unread notification${unreadPatient > 1 ? "s" : ""}`}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-amber-400 text-[#1e3a8a] text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {unreadPatient}
                </span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
