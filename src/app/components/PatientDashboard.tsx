import {
  Activity, Bell, BookOpen, Calendar, ChevronRight, Clock,
  MessageSquare, Play, TrendingUp, Trophy, User, Zap, CheckCircle,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useRehab } from "../context/RehabContext";
import { toast } from "sonner";

interface PatientDashboardProps {
  onNavigate: (page: string) => void;
}

const progressData = [
  { day: "Mon", score: 68 },
  { day: "Tue", score: 74 },
  { day: "Wed", score: 71 },
  { day: "Thu", score: 82 },
  { day: "Fri", score: 85 },
  { day: "Sat", score: 90 },
  { day: "Sun", score: 88 },
];

const milestones = [
  { label: "First Week Completed", done: true },
  { label: "50 Repetitions Completed", done: true },
  { label: "Walking Independently", done: true },
  { label: "Full Knee Extension Achieved", done: false },
  { label: "Return to Jogging", done: false },
];

const navItems = [
  { icon: <Activity className="w-4 h-4" />, label: "Dashboard", page: "patient" },
  { icon: <Play className="w-4 h-4" />, label: "My Exercises", page: "monitor" },
  { icon: <TrendingUp className="w-4 h-4" />, label: "Progress History", page: "progress-history" },
  { icon: <BookOpen className="w-4 h-4" />, label: "Recovery Journal", page: "journal" },
  { icon: <MessageSquare className="w-4 h-4" />, label: "Message Centre", page: "messages" },
  { icon: <User className="w-4 h-4" />, label: "My Profile", page: "patient-profile" },
];

const recoveryFeatures = [
  { icon: <BookOpen className="w-5 h-5" />, label: "Recovery Journal", desc: "Log daily reflections", page: "journal", color: "text-violet-600", bg: "bg-violet-50" },
  { icon: <TrendingUp className="w-5 h-5" />, label: "Confidence Tracking", desc: "Weekly questionnaire", page: "confidence", color: "text-cyan-600", bg: "bg-cyan-50" },
  { icon: <Activity className="w-5 h-5" />, label: "Weekly Check-In", desc: "Pain · confidence · motivation", page: "checkin", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: <MessageSquare className="w-5 h-5" />, label: "Message Centre", desc: "Contact your physiotherapist", page: "messages", color: "text-primary", bg: "bg-secondary" },
];

export function PatientDashboard({ onNavigate }: PatientDashboardProps) {
  const { exercises, notifications, markNotificationRead, unreadPatient } = useRehab();
  const myExercises = exercises.filter((e) => e.patientId === "P-1042");
  const milestoneDone = milestones.filter((m) => m.done).length;
  const myNotifications = notifications.filter((n) => n.for === "patient");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e3a8a] flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">Recovr</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.label === "Dashboard" ? "bg-white/15 text-white" : "text-blue-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
              {item.page === "messages" && unreadPatient > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{unreadPatient}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-cyan-400 flex items-center justify-center text-[#1e3a8a] font-semibold">MA</div>
            <div>
              <div className="text-white text-sm">Muhammad Arif</div>
              <div className="text-blue-300 text-xs">ACL Rehabilitation · Week 3</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-foreground mb-1">Welcome back, Muhammad</h1>
              <p className="text-muted-foreground text-sm">Week 3 of ACL Rehabilitation · Dr. Sarah Chen · Recovr</p>
            </div>
            {/* Notification bell */}
            {myNotifications.filter((n) => !n.read).length > 0 && (
              <button
                onClick={() => {
                  myNotifications.filter((n) => !n.read).forEach((n) => {
                    toast.info(n.message);
                    markNotificationRead(n.id);
                  });
                }}
                className="relative flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm hover:bg-amber-100 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span>{myNotifications.filter((n) => !n.read).length} new notification{myNotifications.filter((n) => !n.read).length > 1 ? "s" : ""}</span>
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-5 mb-6">
            {[
              { icon: <Trophy className="w-5 h-5" />, label: "Overall Score", value: "88%", sub: "+6% this week", color: "text-primary", bg: "bg-secondary", page: "progress-history" },
              { icon: <Activity className="w-5 h-5" />, label: "Sessions Done", value: "14", sub: "of 20 total", color: "text-accent", bg: "bg-emerald-50", page: null },
              { icon: <TrendingUp className="w-5 h-5" />, label: "Avg Knee Angle", value: "86°", sub: "Target: 90°", color: "text-cyan-600", bg: "bg-cyan-50", page: "progress-history" },
              { icon: <Clock className="w-5 h-5" />, label: "Exercise Time", value: "6.2h", sub: "this week", color: "text-violet-600", bg: "bg-violet-50", page: null },
            ].map((stat) => (
              <div key={stat.label} onClick={() => stat.page && onNavigate(stat.page)}
                className={`bg-card border border-border rounded-2xl p-5 ${stat.page ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}>
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} mb-3`}>{stat.icon}</div>
                <div className="text-foreground text-xl font-semibold mb-0.5">{stat.value}</div>
                <div className="text-muted-foreground text-xs">{stat.label}</div>
                <div className={`text-xs mt-1 ${stat.color}`}>{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div className="bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-300" />
                <span className="text-white font-medium">Recovery Milestones</span>
              </div>
              <span className="text-blue-200 text-sm">{milestoneDone}/{milestones.length} achieved</span>
            </div>
            <div className="flex gap-2 flex-wrap mb-3">
              {milestones.map((m) => (
                <div key={m.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border ${
                  m.done ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-white/10 border-white/20 text-blue-300"
                }`}>
                  <CheckCircle className={`w-3.5 h-3.5 ${m.done ? "text-emerald-400" : "text-white/30"}`} />
                  {m.label}
                </div>
              ))}
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full" style={{ width: `${(milestoneDone / milestones.length) * 100}%` }} />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Chart */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-foreground">Weekly Performance</h3>
                  <button onClick={() => onNavigate("progress-history")} className="text-primary text-xs hover:underline flex items-center gap-1">
                    Full history <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(29,78,216,0.1)" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#4b6080" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#4b6080" }} axisLine={false} tickLine={false} domain={[50, 100]} />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(29,78,216,0.15)", borderRadius: 10, fontSize: 12 }} />
                    <Line type="monotone" dataKey="score" stroke="#1d4ed8" strokeWidth={2.5} dot={{ r: 4, fill: "#1d4ed8" }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Assigned Exercises from context */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-foreground">Assigned Exercises</h3>
                  <span className="text-xs text-muted-foreground">Assigned by Dr. Sarah Chen</span>
                </div>
                <div className="space-y-3">
                  {myExercises.map((ex) => (
                    <div key={ex.id} className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/30 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${
                          ex.status === "Completed" ? "bg-emerald-50 text-accent" :
                          ex.status === "In Progress" ? "bg-secondary text-primary" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {ex.status === "Completed" ? "✓" : "→"}
                        </div>
                        <div>
                          <div className="text-foreground text-sm font-medium">{ex.name}</div>
                          <div className="text-muted-foreground text-xs">
                            Assigned: {ex.weekAssigned} · {ex.sets} sets × {ex.reps} reps
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full ${
                          ex.status === "Completed" ? "bg-emerald-50 text-emerald-700" :
                          ex.status === "In Progress" ? "bg-blue-50 text-primary" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {ex.status}
                        </span>
                        {ex.status !== "Completed" && (
                          <button onClick={() => onNavigate("monitor")}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-xs">
                            <Play className="w-3 h-3" /> Start
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => onNavigate("monitor")}
                  className="mt-4 w-full py-3 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" /> Start Next Exercise
                </button>
              </div>

              {/* Recovery support grid */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-foreground mb-5">Human Centered Recovery Support</h3>
                <div className="grid grid-cols-2 gap-4">
                  {recoveryFeatures.map((f) => (
                    <button key={f.label} onClick={() => onNavigate(f.page)}
                      className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all text-left group">
                      <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center ${f.color} flex-shrink-0 group-hover:scale-105 transition-transform`}>{f.icon}</div>
                      <div>
                        <div className="text-foreground text-sm font-medium">{f.label}</div>
                        <div className="text-muted-foreground text-xs mt-0.5">{f.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right col */}
            <div className="space-y-6">
              {/* Notifications panel */}
              {myNotifications.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-foreground mb-4 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-primary" /> Notifications
                    {unreadPatient > 0 && <span className="ml-auto bg-primary text-white text-xs rounded-full px-2 py-0.5">{unreadPatient} new</span>}
                  </h3>
                  <div className="space-y-3">
                    {myNotifications.slice(0, 4).map((n) => (
                      <div key={n.id} className={`p-3 rounded-xl text-xs leading-relaxed border ${n.read ? "bg-muted/30 border-border text-muted-foreground" : "bg-blue-50 border-primary/20 text-foreground"}`}>
                        <div className="mb-0.5">{n.message}</div>
                        <div className="text-muted-foreground">{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming sessions */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-foreground mb-4">Upcoming Sessions</h3>
                <div className="space-y-3">
                  {[
                    { date: "Today, 14 Jun", time: "10:00 AM", exercise: "Terminal Knee Extension" },
                    { date: "Wed, 16 Jun", time: "10:00 AM", exercise: "Mini Squats" },
                    { date: "Fri, 18 Jun", time: "10:00 AM", exercise: "Step-Ups" },
                  ].map((s, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl bg-secondary/50 items-start">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-foreground text-xs font-medium">{s.exercise}</div>
                        <div className="text-muted-foreground text-xs">{s.date} · {s.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress summary */}
              <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] rounded-2xl p-6 text-white">
                <h3 className="text-white mb-3">Rehabilitation Progress</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-blue-200 mb-2">
                    <span>Week 3 of 8</span>
                    <span>38%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: "38%" }} />
                  </div>
                </div>
                <p className="text-blue-200 text-xs leading-relaxed">Your knee angle has improved by 12° since Week 1. Keep it up!</p>
                <button onClick={() => onNavigate("progress-history")}
                  className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm transition-colors">
                  View Detailed Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
