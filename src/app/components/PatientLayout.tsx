import {
  Activity, Bell, BookOpen, ClipboardList, Heart, Home,
  MessageSquare, Play, TrendingUp, User,
} from "lucide-react";
import { useRehab } from "../context/RehabContext";
import { toast } from "sonner";

interface PatientLayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  activePage?: string;
}

const navItems = [
  { icon: <Home className="w-4 h-4" />, label: "Home", page: "patient" },
  { icon: <Play className="w-4 h-4" />, label: "Today's Recovery Plan", page: "monitor" },
  { icon: <TrendingUp className="w-4 h-4" />, label: "Recovery Journey", page: "progress-history" },
  { icon: <BookOpen className="w-4 h-4" />, label: "Recovery Reflection", page: "journal" },
  { icon: <Heart className="w-4 h-4" />, label: "Confidence Check", page: "confidence" },
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
      <aside className="w-64 bg-[#305066] flex flex-col flex-shrink-0 sticky top-0 h-screen">
        {/* Brand */}
        <div className="p-6 border-b border-white/10">
          <button
            onClick={() => onNavigate("patient")}
            className="flex items-center gap-3 w-full text-left"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(250,244,229,0.15)" }}>
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: "#FAF4E5" }}>Recovr</span>
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
                  isActive ? "bg-white/15 font-medium" : "hover:bg-white/8"
                }`}
                style={{ color: isActive ? "#FAF4E5" : "rgba(250,244,229,0.65)" }}
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
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" className="font-semibold text-sm" style={{ background: "rgba(250,244,229,0.2)", color: "#FAF4E5" }}>
              MA
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate" style={{ color: "#FAF4E5" }}>Muhammad Arif</div>
              <div className="text-xs" style={{ color: "rgba(250,244,229,0.6)" }}>ACL Rehab · Week 3</div>
            </div>
            {unreadPatient > 0 && (
              <button
                onClick={handleBell}
                className="relative flex-shrink-0 transition-colors" style={{ color: "rgba(250,244,229,0.6)" }}
                title={`${unreadPatient} unread notification${unreadPatient > 1 ? "s" : ""}`}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold" style={{ background: "rgba(250,244,229,0.2)", color: "#FAF4E5" }}>
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
