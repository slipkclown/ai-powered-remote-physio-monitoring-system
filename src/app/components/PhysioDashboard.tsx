import {
  Activity, AlertTriangle, BarChart2, Bell, Camera, Check, ChevronRight, ClipboardList,
  Home, Key, MessageSquare, Plus, Search, TrendingUp, UserCheck, Users, X, FileText, User, BookOpen
} from "lucide-react";
import { useRef, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { useRehab } from "../context/RehabContext";
import { PhysioMessages } from "./PhysioMessages";
import { PatientReport } from "./PatientReport";

interface PhysioDashboardProps {
  onNavigate: (page: string) => void;
}

const initialPatients = [
  { id: "P-1042", name: "Muhammad Arif", age: 28, diagnosis: "ACL Reconstruction", week: 3, score: 88, status: "Active", nextSession: "Today 10:00 AM", email: "arif@email.com" },
  { id: "P-1039", name: "Siti Aminah", age: 34, diagnosis: "Knee Osteoarthritis", week: 6, score: 74, status: "Active", nextSession: "Today 2:00 PM", email: "siti@email.com" },
  { id: "P-1035", name: "Raj Kumar", age: 45, diagnosis: "Post Total Knee Replacement", week: 10, score: 91, status: "Active", nextSession: "Wed 9:00 AM", email: "raj@email.com" },
  { id: "P-1028", name: "Lee Mei Ling", age: 22, diagnosis: "ACL Reconstruction", week: 1, score: 65, status: "New", nextSession: "Thu 11:00 AM", email: "meilin@email.com" },
  { id: "P-1021", name: "Ahmad Zaidi", age: 52, diagnosis: "Meniscus Repair", week: 14, score: 95, status: "Completing", nextSession: "Fri 10:00 AM", email: "zaidi@email.com" },
];

const weeklyData = [
  { week: "W1", arif: 62, siti: 55, raj: 80 },
  { week: "W2", arif: 70, siti: 63, raj: 84 },
  { week: "W3", arif: 88, siti: 74, raj: 91 },
];

const errorData = [
  { error: "Insufficient Knee Flexion", count: 18 },
  { error: "Forward Trunk Lean", count: 12 },
  { error: "Uneven Weight Dist.", count: 9 },
  { error: "Inadequate Hip Extension", count: 7 },
  { error: "Balance Issues", count: 5 },
];

type Tab = "Overview" | "Patients" | "Assign Exercises" | "Reports" | "Journal Review" | "Messages" | "Notifications" | "Confidence Monitoring" | "Profile";

// Total rehab programme weeks by diagnosis
const TOTAL_WEEKS: Record<string, number> = {
  "ACL Reconstruction": 8,
  "Knee Osteoarthritis": 12,
  "Post Total Knee Replacement": 16,
  "Meniscus Repair": 10,
  "Patellofemoral Pain Syndrome": 8,
};

function getTotal(diagnosis: string) {
  return TOTAL_WEEKS[diagnosis] ?? 8;
}

export function PhysioDashboard({ onNavigate }: PhysioDashboardProps) {
  const {
    addExercise, journal, markJournalReviewed, addJournalFeedback, checkIns,
    notifications, markNotificationRead, markAllPhysioRead, unreadPhysio,
    totalUnreadPhysioMessages, getRecoveryStatus,
  } = useRehab();

  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showPatientDetail, setShowPatientDetail] = useState<typeof initialPatients[0] | null>(null);
  const [generatedCode] = useState("ACL-7X4K-2026");
  const [patients, setPatients] = useState(initialPatients);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    email: "",
    diagnosis: "ACL Reconstruction",
    rehabWeek: "Week 1",
  });
  const [createdPatientCode, setCreatedPatientCode] = useState<string | null>(null);
  const [reportPatientId, setReportPatientId] = useState<string | null>(null);
  const [assigningToPatient, setAssigningToPatient] = useState<typeof initialPatients[0] | null>(null);
  const [assignForm, setAssignForm] = useState({
    exercise: "Straight Leg Raises",
    sets: "3",
    reps: "12",
    frequency: "Daily",
    week: "Week 1",
  });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const profilePhotoInputRef = useRef<HTMLInputElement>(null);
  const patientDetailPhotoInputRef = useRef<HTMLInputElement>(null);

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode).catch(() => {});
    toast.success("Access code copied!", { description: `${generatedCode} copied to clipboard.` });
  };

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.age || !newPatient.email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const newId = `P-${1000 + patients.length + 43}`;
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    const code = `ACL-2025-${suffix}`;
    setCreatedPatientCode(code);
    setPatients((prev) => [
      ...prev,
      {
        id: newId,
        name: newPatient.name,
        age: parseInt(newPatient.age),
        diagnosis: newPatient.diagnosis,
        week: parseInt(newPatient.rehabWeek.replace("Week ", "")),
        score: 0,
        status: "New",
        nextSession: "TBD",
        email: newPatient.email,
      },
    ]);
    setNewPatient({ name: "", age: "", email: "", diagnosis: "ACL Reconstruction", rehabWeek: "Week 1" });
    toast.success("Patient account created successfully.", { description: `ID: ${newId} · Access code: ${code}` });
  };

  const handleAssignExercise = () => {
    if (!assigningToPatient) return;
    const sets = parseInt(assignForm.sets);
    const reps = parseInt(assignForm.reps);
    addExercise({
      name: assignForm.exercise,
      sets,
      reps,
      frequency: assignForm.frequency,
      dateAssigned: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      weekAssigned: assignForm.week,
      status: "Pending",
      patientId: assigningToPatient.id,
    });
    toast.success("Exercise assigned successfully.", {
      description: `${assignForm.exercise} (${sets} × ${reps}, ${assignForm.week}) assigned to ${assigningToPatient.name}.`,
    });
    setAssigningToPatient(null);
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfilePhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const moodColors: Record<string, string> = {
    great: "bg-emerald-100 text-emerald-700",
    good: "bg-blue-100 text-blue-700",
    okay: "bg-amber-100 text-amber-700",
    tough: "bg-red-100 text-red-700",
  };

  const navItems: { icon: React.ReactNode; label: Tab | "home"; badge?: number }[] = [
    { icon: <Home className="w-4 h-4" />, label: "home" },
    { icon: <BarChart2 className="w-4 h-4" />, label: "Overview" },
    { icon: <Users className="w-4 h-4" />, label: "Patients" },
    { icon: <TrendingUp className="w-4 h-4" />, label: "Reports" },
    { icon: <BookOpen className="w-4 h-4" />, label: "Journal Review" },
    { icon: <MessageSquare className="w-4 h-4" />, label: "Messages", badge: totalUnreadPhysioMessages },
    { icon: <Bell className="w-4 h-4" />, label: "Notifications", badge: unreadPhysio },
    { icon: <Activity className="w-4 h-4" />, label: "Confidence Monitoring" },
    { icon: <User className="w-4 h-4" />, label: "Profile" },
  ];

  /* Full-page patient report takeover */
  if (reportPatientId) {
    return <PatientReport patientId={reportPatientId} onBack={() => setReportPatientId(null)} />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e3a8a] flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-white text-sm">Recovr</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isHome = item.label === "home";
            const isActive = !isHome && activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => {
                  if (isHome) {
                    onNavigate("home");
                  } else {
                    setActiveTab(item.label as Tab);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="flex-1 text-left">{isHome ? "Home" : item.label}</span>
                {(item.badge ?? 0) > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-400 flex items-center justify-center text-[#1e3a8a] font-semibold">
              SC
            </div>
            <div>
              <div className="text-white text-sm">Dr. Sarah Chen</div>
              <div className="text-blue-300 text-xs">Physiotherapist</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-foreground">Physiotherapist Dashboard</h2>
            <p className="text-muted-foreground text-xs">Saturday, 14 June 2026 · {patients.length} patients</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCodeModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-secondary transition-colors text-sm"
            >
              <Key className="w-4 h-4" /> Generate Access Code
            </button>
            <button
              onClick={() => setShowAddPatientModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" /> Add Patient
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* ── OVERVIEW TAB ── */}
          {activeTab === "Overview" && (
            <>
              <div className="grid grid-cols-4 gap-5 mb-8">
                {[
                  { label: "Active Patients", value: String(patients.length), icon: <Users className="w-5 h-5" />, color: "text-primary", bg: "bg-secondary", sub: "+1 this week", action: () => setActiveTab("Patients") },
                  { label: "Sessions Today", value: "3", icon: <UserCheck className="w-5 h-5" />, color: "text-accent", bg: "bg-emerald-50", sub: "2 completed", action: () => setActiveTab("Overview") },
                  { label: "Avg Performance", value: "82%", icon: <TrendingUp className="w-5 h-5" />, color: "text-cyan-600", bg: "bg-cyan-50", sub: "+5% from last week", action: () => setActiveTab("Reports") },
                  { label: "Reports Pending", value: "2", icon: <ClipboardList className="w-5 h-5" />, color: "text-amber-600", bg: "bg-amber-50", sub: "Review required", action: () => setActiveTab("Reports") },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-card border border-border rounded-2xl p-5 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={stat.action}
                  >
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} mb-3`}>
                      {stat.icon}
                    </div>
                    <div className="text-foreground text-xl font-semibold mb-0.5">{stat.value}</div>
                    <div className="text-muted-foreground text-xs">{stat.label}</div>
                    <div className={`text-xs mt-1 ${stat.color}`}>{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* Patient list */}
              <div className="bg-card border border-border rounded-2xl mb-6">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h3 className="text-foreground">Patient List</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search patients..."
                        className="pl-9 pr-4 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:border-primary w-48"
                      />
                    </div>
                    <button
                      onClick={() => setActiveTab("Patients")}
                      className="text-primary text-sm hover:underline flex items-center gap-1"
                    >
                      View all <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <PatientTable
                  patients={filtered.slice(0, 5)}
                  onView={(p) => setShowPatientDetail(p)}
                  onReport={(id) => setReportPatientId(id)}
                  onAssign={(p) => { setAssigningToPatient(p); setAssignForm((f) => ({ ...f, week: `Week ${p.week}` })); }}
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-foreground mb-5">Weekly Performance Trends</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="arifGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="sitiGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(29,78,216,0.08)" />
                      <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#4b6080" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#4b6080" }} axisLine={false} tickLine={false} domain={[40, 100]} />
                      <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(29,78,216,0.15)", borderRadius: 10, fontSize: 12 }} />
                      <Area type="monotone" dataKey="arif" name="M. Arif" stroke="#1d4ed8" fill="url(#arifGrad)" strokeWidth={2} />
                      <Area type="monotone" dataKey="siti" name="S. Aminah" stroke="#059669" fill="url(#sitiGrad)" strokeWidth={2} />
                      <Area type="monotone" dataKey="raj" name="R. Kumar" stroke="#0891b2" fill="none" strokeWidth={2} strokeDasharray="4 2" />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="flex gap-5 mt-2 justify-center">
                    {[["M. Arif", "#1d4ed8"], ["S. Aminah", "#059669"], ["R. Kumar", "#0891b2"]].map(([name, color]) => (
                      <div key={name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <div className="w-3 h-1.5 rounded" style={{ background: color }} />
                        {name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-foreground mb-5">Common Movement Errors</h3>
                  <div className="space-y-3">
                    {errorData.map((e, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-foreground">{e.error}</span>
                          <span className="text-muted-foreground font-mono text-xs">{e.count}×</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(e.count / 20) * 100}%`,
                              background: ["#1d4ed8", "#0891b2", "#059669", "#7c3aed", "#f59e0b"][i],
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── PATIENTS TAB ── */}
          {activeTab === "Patients" && (
            <div className="bg-card border border-border rounded-2xl">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-foreground">All Patients</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search patients..."
                      className="pl-9 pr-4 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:border-primary w-56"
                    />
                  </div>
                  <button
                    onClick={() => setShowAddPatientModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" /> Add Patient
                  </button>
                </div>
              </div>
              <PatientTable
                patients={filtered}
                onView={(p) => setShowPatientDetail(p)}
                onReport={(id) => setReportPatientId(id)}
                onAssign={(p) => { setAssigningToPatient(p); setAssignForm((f) => ({ ...f, week: `Week ${p.week}` })); }}
              />
            </div>
          )}


          {/* ── REPORTS TAB ── */}
          {activeTab === "Reports" && (
            <div className="space-y-6">
              {/* Compliance summary cards */}
              <div className="grid grid-cols-4 gap-5">
                {[
                  { label: "Overall Compliance", value: "82%", sub: "Sessions completed on schedule", color: "text-primary", bg: "bg-secondary" },
                  { label: "Avg Performance", value: "83%", sub: "Across all active patients", color: "text-accent", bg: "bg-emerald-50" },
                  { label: "Check-Ins Submitted", value: `${checkIns.length}/20`, sub: "Weekly check-ins this month", color: "text-cyan-600", bg: "bg-cyan-50" },
                  { label: "Journal Entries", value: String(journal.length), sub: "Entries written this month", color: "text-violet-600", bg: "bg-violet-50" },
                ].map((s) => (
                  <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
                    <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center ${s.color} mb-3`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="text-foreground text-xl font-semibold mb-0.5">{s.value}</div>
                    <div className="text-muted-foreground text-xs">{s.label}</div>
                    <div className={`text-xs mt-1 ${s.color}`}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Patient exercise reports */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-foreground mb-5">Exercise Reports</h3>
                <div className="space-y-3">
                  {patients.map((p) => {
                    const total = getTotal(p.diagnosis);
                    const pct = Math.min(Math.round((p.week / total) * 100), 100);
                    return (
                      <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-secondary/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                          {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-foreground text-sm font-medium">{p.name}</span>
                            <RecoveryStatusBadge score={p.score} patientId={p.id} />
                          </div>
                          <div className="text-muted-foreground text-xs mb-2">{p.diagnosis}</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground flex-shrink-0 font-mono">Week {p.week} of {total}</span>
                          </div>
                        </div>
                        <div className="text-center flex-shrink-0">
                          <div className="text-muted-foreground text-xs">Score</div>
                          <div className={`text-sm font-semibold ${p.score >= 85 ? "text-accent" : p.score >= 70 ? "text-primary" : "text-amber-600"}`}>
                            {p.score > 0 ? `${p.score}%` : "—"}
                          </div>
                        </div>
                        <button
                          onClick={() => setReportPatientId(p.id)}
                          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-sm"
                        >
                          <FileText className="w-3.5 h-3.5" /> View Report
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Weekly check-in responses from context */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-foreground mb-5">Latest Weekly Check-In Responses</h3>
                <div className="space-y-4">
                  {checkIns.length > 0 ? checkIns.map((r) => (
                    <div key={r.id} className="p-4 rounded-xl border border-border bg-muted/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-foreground text-sm font-medium">{r.patientName}</div>
                        <div className="flex gap-4">
                          {(
                            [
                              ["Pain", r.pain, "text-red-600"],
                              ["Confidence", r.confidence, "text-primary"],
                              ["Motivation", r.motivation, "text-accent"],
                            ] as [string, number, string][]
                          ).map(([label, val, color]) => (
                            <div key={label} className="text-center">
                              <div className="text-muted-foreground text-xs">{label}</div>
                              <div className={`font-semibold text-sm ${color}`}>{val}/10</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {r.concern && (
                        <p className="text-muted-foreground text-xs italic border-t border-border pt-2 mt-2">"{r.concern}"</p>
                      )}
                    </div>
                  )) : (
                    /* Fallback static data when context is empty */
                    [
                      { name: "Muhammad Arif", pain: 3, confidence: 4, motivation: 4, concern: "Some swelling after step-ups. Reduced reps as advised." },
                      { name: "Siti Aminah", pain: 5, confidence: 3, motivation: 3, concern: "Morning stiffness persists. Needs physiotherapy review." },
                      { name: "Raj Kumar", pain: 1, confidence: 5, motivation: 5, concern: "Feeling great — ready to progress to the next phase." },
                    ].map((r) => (
                      <div key={r.name} className="p-4 rounded-xl border border-border bg-muted/30">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-foreground text-sm font-medium">{r.name}</div>
                          <div className="flex gap-4">
                            {(
                              [
                                ["Pain", r.pain, "text-red-600"],
                                ["Confidence", r.confidence, "text-primary"],
                                ["Motivation", r.motivation, "text-accent"],
                              ] as [string, number, string][]
                            ).map(([label, val, color]) => (
                              <div key={label} className="text-center">
                                <div className="text-muted-foreground text-xs">{label}</div>
                                <div className={`font-semibold text-sm ${color}`}>{val}/10</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {r.concern && (
                          <p className="text-muted-foreground text-xs italic border-t border-border pt-2 mt-2">"{r.concern}"</p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Confidence tracking trends */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-foreground mb-5">Confidence Tracking Trends</h3>
                <div className="space-y-4">
                  {[
                    { name: "Muhammad Arif", scores: [2, 2, 3, 3, 4] },
                    { name: "Siti Aminah", scores: [1, 2, 2, 3, 3] },
                    { name: "Raj Kumar", scores: [3, 4, 4, 5, 5] },
                  ].map((p) => (
                    <div key={p.name}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground">{p.name}</span>
                        <span className="text-muted-foreground text-xs">Current: {p.scores[p.scores.length - 1]}/5</span>
                      </div>
                      <div className="flex gap-1">
                        {p.scores.map((score, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div className="h-8 bg-muted rounded-sm overflow-hidden w-full flex items-end">
                              <div
                                className="w-full bg-primary rounded-sm transition-all"
                                style={{ height: `${(score / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">W{i + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── JOURNAL REVIEW TAB ── */}
          {activeTab === "Journal Review" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-foreground">Patient Journal Entries</h3>
                <div className="text-muted-foreground text-sm">
                  {journal.filter((e) => !e.reviewed).length} unreviewed
                </div>
              </div>
              {journal.length === 0 ? (
                <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground">
                  No journal entries yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {journal.map((entry) => (
                    <div
                      key={entry.id}
                      className={`bg-card border rounded-2xl p-6 transition-colors ${
                        entry.reviewed ? "border-border" : "border-amber-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {!entry.reviewed && (
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                          )}
                          {entry.reviewed && (
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-foreground text-sm font-semibold">{entry.patientName}</span>
                              <span className="text-muted-foreground text-xs">·</span>
                              <span className="text-muted-foreground text-xs">{entry.date}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${moodColors[entry.mood] ?? "bg-muted text-muted-foreground"}`}>
                                {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                              </span>
                            </div>
                            <div className="text-foreground text-sm font-medium mb-1">{entry.title}</div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {entry.body.length > 120 ? entry.body.slice(0, 120) + "…" : entry.body}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          {!entry.reviewed && (
                            <button
                              onClick={() => { markJournalReviewed(entry.id); toast.success("Entry marked as reviewed."); }}
                              className="px-3 py-1.5 border border-primary text-primary rounded-xl hover:bg-secondary transition-colors text-xs flex items-center gap-1.5"
                            >
                              <Check className="w-3 h-3" /> Mark Reviewed
                            </button>
                          )}
                          <FeedbackButton entryId={entry.id} hasFeedback={!!entry.feedback} onFeedback={addJournalFeedback} />
                        </div>
                      </div>
                      {entry.feedback && (
                        <div className="mt-4 border-t border-emerald-100 pt-3 bg-emerald-50/60 -mx-6 -mb-6 px-6 pb-5 rounded-b-2xl">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-emerald-700 text-xs font-semibold">{entry.feedback.physiotherapist}</span>
                            <span className="text-emerald-600 text-xs">· {entry.feedback.date}</span>
                          </div>
                          <p className="text-emerald-800 text-sm italic">"{entry.feedback.text}"</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── MESSAGES TAB ── */}
          {activeTab === "Messages" && (
            <PhysioMessages onNavigate={onNavigate} />
          )}

          {/* ── NOTIFICATIONS TAB ── */}
          {activeTab === "Notifications" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-foreground">Notification Centre</h3>
                {unreadPhysio > 0 && (
                  <button onClick={markAllPhysioRead} className="text-xs text-primary hover:underline">Mark all as read</button>
                )}
              </div>
              <div className="space-y-2">
                {notifications.filter((n) => n.for === "physio").sort((a, b) => b.id - a.id).map((n) => {
                  const icons: Record<string, React.ReactNode> = {
                    exercise: <Activity className="w-4 h-4 text-primary" />,
                    journal: <BookOpen className="w-4 h-4 text-violet-600" />,
                    checkin: <ClipboardList className="w-4 h-4 text-emerald-600" />,
                    message: <MessageSquare className="w-4 h-4 text-cyan-600" />,
                    assignment: <ClipboardList className="w-4 h-4 text-amber-600" />,
                    feedback: <FileText className="w-4 h-4 text-pink-600" />,
                  };
                  return (
                    <div key={n.id} className={`flex items-start gap-4 p-4 rounded-2xl border transition-colors ${
                      !n.read ? "bg-blue-50 border-primary/20" : "bg-card border-border"
                    }`}>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        !n.read ? "bg-secondary" : "bg-muted"
                      }`}>
                        {icons[n.type] ?? <Bell className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!n.read ? "text-foreground font-medium" : "text-muted-foreground"}`}>{n.message}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && (
                        <button onClick={() => markNotificationRead(n.id)} className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" title="Mark read" />
                      )}
                    </div>
                  );
                })}
                {notifications.filter((n) => n.for === "physio").length === 0 && (
                  <div className="text-center py-12 text-muted-foreground text-sm">No notifications yet.</div>
                )}
              </div>
            </div>
          )}

          {/* ── CONFIDENCE MONITORING TAB ── */}
          {activeTab === "Confidence Monitoring" && (
            <ConfidenceMonitoringTab checkIns={checkIns} patients={patients} />
          )}

          {/* ── PROFILE TAB ── */}
          {activeTab === "Profile" && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-foreground mb-6">Manage Profile</h3>
                <div className="flex items-center gap-5 mb-8">
                  <div className="relative">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-emerald-400 flex items-center justify-center text-[#1e3a8a] text-2xl font-bold">
                        SC
                      </div>
                    )}
                    <button
                      onClick={() => profilePhotoInputRef.current?.click()}
                      className="absolute bottom-0 right-0 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md"
                      title="Upload photo"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                    <input
                      ref={profilePhotoInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePhotoChange}
                    />
                  </div>
                  <div>
                    <div className="text-foreground font-semibold">Dr. Sarah Chen</div>
                    <div className="text-muted-foreground text-sm">Physiotherapist · KL Rehabilitation Centre</div>
                    <div className="text-muted-foreground text-xs mt-1">sarah.chen@klrehab.com</div>
                    <div className="text-muted-foreground text-xs mt-0.5">Recovr Practitioner</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", value: "Dr. Sarah Chen" },
                    { label: "Registration No.", value: "MPT-2019-04521" },
                    { label: "Specialisation", value: "Orthopaedic Physiotherapy" },
                    { label: "Clinic / Hospital", value: "KL Rehabilitation Centre" },
                    { label: "Email Address", value: "sarah.chen@klrehab.com" },
                    { label: "Phone Number", value: "+60 12-345 6789" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">{field.label}</label>
                      <input
                        defaultValue={field.value}
                        className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => toast.success("Profile updated successfully!")}
                  className="mt-6 px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
                >
                  Save Changes
                </button>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-foreground mb-4">Change Password</h3>
                <div className="space-y-3 max-w-sm">
                  {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                    <div key={label}>
                      <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">{label}</label>
                      <input type="password" placeholder="••••••••" className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary" />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => toast.success("Password changed successfully!")}
                  className="mt-4 px-6 py-2.5 border border-primary text-primary rounded-xl hover:bg-secondary transition-colors text-sm"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── ACCESS CODE MODAL ── */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-secondary rounded-xl flex items-center justify-center">
                  <Key className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground">Patient Access Code</h3>
                  <p className="text-muted-foreground text-xs">Share this with your patient</p>
                </div>
              </div>
              <button onClick={() => setShowCodeModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-secondary border border-primary/20 rounded-xl p-5 text-center mb-6">
              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Generated Code</div>
              <div className="text-primary text-2xl font-bold font-mono tracking-widest">{generatedCode}</div>
              <div className="text-muted-foreground text-xs mt-2">Valid for 48 hours · One-time use</div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCopyCode}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
              >
                <Check className="w-4 h-4" /> Copy Code
              </button>
              <button onClick={() => setShowCodeModal(false)} className="flex-1 py-2.5 border border-border rounded-xl text-muted-foreground hover:bg-secondary transition-colors text-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD PATIENT MODAL ── */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-foreground">Add New Patient</h3>
              <button onClick={() => { setShowAddPatientModal(false); setCreatedPatientCode(null); }} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {createdPatientCode ? (
              /* Success state — show generated credentials */
              <div className="text-center">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-foreground mb-1">Patient account created successfully.</h3>
                <p className="text-muted-foreground text-sm mb-6">Share these credentials with the patient so they can log in.</p>
                <div className="bg-secondary border border-primary/20 rounded-xl p-5 text-left space-y-3 mb-6">
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">Patient ID</div>
                    <div className="text-foreground font-mono font-semibold">P-{1000 + patients.length + 42}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">Generated Access Code</div>
                    <div className="text-primary text-xl font-bold font-mono tracking-widest">{createdPatientCode}</div>
                  </div>
                  <div className="text-muted-foreground text-xs">Access code: ACL-2025-XXXX format · Valid 48 hours</div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(createdPatientCode).catch(() => {});
                      toast.success("Access code copied successfully.");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Check className="w-4 h-4" /> Copy Access Code
                  </button>
                  <button
                    onClick={() => { setShowAddPatientModal(false); setCreatedPatientCode(null); }}
                    className="flex-1 py-2.5 border border-border rounded-xl text-muted-foreground hover:bg-secondary transition-colors text-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Form state */
              <>
                <div className="space-y-4">
                  {[
                    { label: "Full Name *", key: "name", type: "text", placeholder: "e.g. Ahmad Faris" },
                    { label: "Age *", key: "age", type: "number", placeholder: "e.g. 32" },
                    { label: "Email Address *", key: "email", type: "email", placeholder: "patient@email.com" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={(newPatient as Record<string, string>)[field.key]}
                        onChange={(e) => setNewPatient((p) => ({ ...p, [field.key]: e.target.value }))}
                        className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Current Rehabilitation Week</label>
                    <select
                      value={newPatient.rehabWeek}
                      onChange={(e) => setNewPatient((p) => ({ ...p, rehabWeek: e.target.value }))}
                      className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary"
                    >
                      {["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"].map((w) => (
                        <option key={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Diagnosis</label>
                    <select
                      value={newPatient.diagnosis}
                      onChange={(e) => setNewPatient((p) => ({ ...p, diagnosis: e.target.value }))}
                      className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary"
                    >
                      {["ACL Reconstruction", "Knee Osteoarthritis", "Post Total Knee Replacement", "Meniscus Repair", "Patellofemoral Pain Syndrome"].map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div className="bg-secondary border border-primary/10 rounded-xl p-3 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Auto-generated on creation:</span> Patient ID · Access Code (ACL-2025-XXXX)
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleAddPatient}
                    className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Create Account &amp; Generate Code
                  </button>
                  <button onClick={() => setShowAddPatientModal(false)} className="flex-1 py-3 border border-border rounded-xl text-muted-foreground hover:bg-secondary transition-colors">
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── PATIENT DETAIL MODAL ── */}
      {showPatientDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-foreground">Patient Profile</h3>
              <button onClick={() => setShowPatientDetail(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-6 p-4 bg-secondary rounded-2xl">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                  {showPatientDetail.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <button
                  onClick={() => patientDetailPhotoInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md"
                  title="Upload photo"
                >
                  <Camera className="w-3 h-3" />
                </button>
                <input
                  ref={patientDetailPhotoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={() => toast.info("Photo upload coming soon.")}
                />
              </div>
              <div>
                <div className="text-foreground font-semibold">{showPatientDetail.name}</div>
                <div className="text-muted-foreground text-sm">{showPatientDetail.id} · Age {showPatientDetail.age}</div>
                <div className="text-muted-foreground text-xs">{showPatientDetail.email}</div>
              </div>
            </div>
            {/* Rehabilitation progress indicator */}
            {(() => {
              const total = getTotal(showPatientDetail.diagnosis);
              const pct = Math.min(Math.round((showPatientDetail.week / total) * 100), 100);
              return (
                <div className="bg-gradient-to-r from-[#1e3a8a]/5 to-[#1d4ed8]/10 border border-primary/20 rounded-xl p-4 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground text-sm font-medium">Rehabilitation Progress</span>
                    <span className="text-primary text-sm font-semibold">Week {showPatientDetail.week} of {total}</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden mb-1.5">
                    <div className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Week 1</span>
                    <span className="text-primary font-medium">{pct}% complete</span>
                    <span>Week {total}</span>
                  </div>
                </div>
              );
            })()}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: "Diagnosis", value: showPatientDetail.diagnosis },
                { label: "Status", value: showPatientDetail.status },
                { label: "Current Week", value: `Week ${showPatientDetail.week} of ${getTotal(showPatientDetail.diagnosis)}` },
                { label: "Performance Score", value: showPatientDetail.score > 0 ? `${showPatientDetail.score}%` : "No data" },
                { label: "Next Session", value: showPatientDetail.nextSession },
              ].map((f) => (
                <div key={f.label} className="p-3 bg-muted/50 rounded-xl">
                  <div className="text-muted-foreground text-xs mb-1">{f.label}</div>
                  <div className="text-foreground text-sm font-medium">{f.value}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setAssigningToPatient(showPatientDetail);
                  setAssignForm((f) => ({ ...f, week: `Week ${showPatientDetail.week}` }));
                  setShowPatientDetail(null);
                }}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
              >
                Assign Exercise
              </button>
              <button
                onClick={() => { setShowPatientDetail(null); setReportPatientId(showPatientDetail?.id ?? null); }}
                className="flex-1 py-2.5 border border-primary text-primary rounded-xl hover:bg-secondary transition-colors text-sm flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" /> View Full Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ASSIGN EXERCISE MODAL ── */}
      {assigningToPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                  {assigningToPatient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-foreground">Assign Exercise</h3>
                  <p className="text-muted-foreground text-xs">{assigningToPatient.name} · {assigningToPatient.id} · {assigningToPatient.diagnosis}</p>
                </div>
              </div>
              <button onClick={() => setAssigningToPatient(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rehab progress */}
            {(() => {
              const total = getTotal(assigningToPatient.diagnosis);
              const pct = Math.min(Math.round((assigningToPatient.week / total) * 100), 100);
              return (
                <div className="px-6 pt-5 pb-2">
                  <div className="bg-secondary border border-primary/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="text-foreground font-medium">Rehabilitation Progress</span>
                      <span className="text-primary font-semibold font-mono">Week {assigningToPatient.week} of {total}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 text-right">{pct}% complete</div>
                  </div>
                </div>
              );
            })()}

            {/* Form */}
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Exercise *</label>
                <select
                  value={assignForm.exercise}
                  onChange={(e) => setAssignForm((f) => ({ ...f, exercise: e.target.value }))}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary"
                >
                  {["Straight Leg Raises", "Terminal Knee Extension", "Mini Squats (0–30°)", "Step-Ups", "Wall Slides", "Quad Sets", "Hamstring Curls", "Calf Raises", "Balance Board", "Single-Leg Stance", "Lateral Band Walks"].map((ex) => (
                    <option key={ex}>{ex}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Sets</label>
                <select
                  value={assignForm.sets}
                  onChange={(e) => setAssignForm((f) => ({ ...f, sets: e.target.value }))}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary"
                >
                  {["1", "2", "3", "4", "5"].map((n) => <option key={n} value={n}>{n} sets</option>)}
                </select>
              </div>
              <div>
                <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Repetitions</label>
                <select
                  value={assignForm.reps}
                  onChange={(e) => setAssignForm((f) => ({ ...f, reps: e.target.value }))}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary"
                >
                  {["8", "10", "12", "15", "20"].map((n) => <option key={n} value={n}>{n} reps</option>)}
                </select>
              </div>
              <div>
                <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Rehabilitation Week</label>
                <select
                  value={assignForm.week}
                  onChange={(e) => setAssignForm((f) => ({ ...f, week: e.target.value }))}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary"
                >
                  {Array.from({ length: getTotal(assigningToPatient.diagnosis) }, (_, i) => `Week ${i + 1}`).map((w) => (
                    <option key={w} value={w}>{w}{w === `Week ${assigningToPatient.week}` ? " (current)" : ""}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Frequency</label>
                <select
                  value={assignForm.frequency}
                  onChange={(e) => setAssignForm((f) => ({ ...f, frequency: e.target.value }))}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary"
                >
                  {["Daily", "3× / week", "2× / week", "Every other day", "Once / week"].map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={handleAssignExercise}
                className="flex-1 py-3 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <ClipboardList className="w-4 h-4" /> Assign Exercise
              </button>
              <button
                onClick={() => setAssigningToPatient(null)}
                className="flex-1 py-3 border border-border text-muted-foreground rounded-xl hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RecoveryStatusBadge({ score, patientId }: { score: number; patientId: string }) {
  const { getRecoveryStatus } = useRehab();
  const status = getRecoveryStatus(score, patientId);
  const cfg = {
    "On Track": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Needs Attention": "bg-amber-50 text-amber-700 border-amber-200",
    "Review Required": "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg[status]}`}>{status}</span>
  );
}

function FeedbackButton({ entryId, hasFeedback, onFeedback }: {
  entryId: number;
  hasFeedback: boolean;
  onFeedback: (id: number, fb: { text: string; physiotherapist: string; date: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  if (hasFeedback) return (
    <span className="text-emerald-600 text-xs flex items-center gap-1"><Check className="w-3 h-3" /> Feedback sent</span>
  );
  if (!open) return (
    <button onClick={() => setOpen(true)} className="px-3 py-1.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors text-xs">
      Leave Feedback
    </button>
  );
  return (
    <div className="flex flex-col gap-2 mt-3 w-full">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write feedback visible to the patient..."
        rows={2}
        className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:border-primary resize-none"
      />
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (!text.trim()) return;
            onFeedback(entryId, {
              text: text.trim(),
              physiotherapist: "Dr. Sarah Chen",
              date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
            });
            toast.success("Feedback sent to patient.");
            setOpen(false);
          }}
          className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs hover:bg-blue-700 transition-colors"
        >
          Send Feedback
        </button>
        <button onClick={() => setOpen(false)} className="px-4 py-1.5 border border-border rounded-xl text-xs text-muted-foreground hover:bg-secondary transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

function ConfidenceMonitoringTab({ checkIns, patients }: { checkIns: any[]; patients: any[] }) {
  const patientConfidence = patients.map((p) => {
    const patientCheckIns = checkIns.filter((c) => c.patientName === p.name);
    const latest = patientCheckIns[0];
    return { ...p, latestCheckIn: latest, checkInCount: patientCheckIns.length };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-5">
        {[
          { label: "Avg Confidence Score", value: "3.6/5", color: "text-primary", bg: "bg-secondary", desc: "Across all active patients" },
          { label: "Avg Motivation Score", value: "3.8/10", color: "text-accent", bg: "bg-emerald-50", desc: "Weekly check-in average" },
          { label: "Patients On Track", value: "3/5", color: "text-cyan-600", bg: "bg-cyan-50", desc: "Confidence ≥ 4/5" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
            <div className={`text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-foreground text-sm font-medium">{s.label}</div>
            <div className="text-muted-foreground text-xs mt-0.5">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-foreground mb-5">Per-Patient Psychological Recovery</h3>
        <div className="space-y-5">
          {patientConfidence.map((p) => {
            const ci = p.latestCheckIn;
            return (
              <div key={p.id} className="border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white font-medium text-sm">
                      {p.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-foreground text-sm font-medium">{p.name}</div>
                      <div className="text-muted-foreground text-xs">Week {p.week} · {p.checkInCount} check-in{p.checkInCount !== 1 ? "s" : ""} submitted</div>
                    </div>
                  </div>
                  <RecoveryStatusBadge score={p.score} patientId={p.id} />
                </div>
                {ci ? (
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Pain", value: ci.pain, max: 10, color: "bg-red-400", textColor: "text-red-600" },
                      { label: "Confidence", value: ci.confidence, max: 10, color: "bg-primary", textColor: "text-primary" },
                      { label: "Motivation", value: ci.motivation, max: 10, color: "bg-emerald-500", textColor: "text-emerald-600" },
                    ].map((m) => (
                      <div key={m.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{m.label}</span>
                          <span className={`font-semibold ${m.textColor}`}>{m.value}/{m.max}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${m.color} rounded-full`} style={{ width: `${(m.value / m.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-xs">No check-in submitted yet.</p>
                )}
                {ci?.concern && (
                  <p className="text-muted-foreground text-xs italic mt-3 border-t border-border pt-2">"{ci.concern}"</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PatientTable({
  patients,
  onView,
  onReport,
  onAssign,
}: {
  patients: typeof initialPatients;
  onView: (p: typeof initialPatients[0]) => void;
  onReport: (patientId: string) => void;
  onAssign: (p: typeof initialPatients[0]) => void;
}) {
  return (
    <div className="divide-y divide-border">
      {patients.length === 0 && (
        <div className="px-6 py-10 text-center text-muted-foreground text-sm">No patients found.</div>
      )}
      {patients.map((p) => {
        const total = getTotal(p.diagnosis);
        const pct = Math.min(Math.round((p.week / total) * 100), 100);
        return (
          <div key={p.id} className="px-6 py-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
              {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>

            {/* Name + progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-foreground text-sm font-medium">{p.name}</span>
                <span className="text-muted-foreground text-xs">· {p.id} · Age {p.age}</span>
                <RecoveryStatusBadge score={p.score} patientId={p.id} />
              </div>
              <div className="text-muted-foreground text-xs mb-1.5">{p.diagnosis}</div>
              <div className="flex items-center gap-2">
                <div className="w-28 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-muted-foreground font-mono">Week {p.week} / {total}</span>
              </div>
            </div>

            {/* Score */}
            <div className="text-center flex-shrink-0 w-14">
              <div className="text-muted-foreground text-xs">Score</div>
              <div className={`text-sm font-semibold ${p.score >= 85 ? "text-accent" : p.score >= 70 ? "text-primary" : p.score === 0 ? "text-muted-foreground" : "text-amber-600"}`}>
                {p.score > 0 ? `${p.score}%` : "—"}
              </div>
            </div>

            {/* Status */}
            <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full ${
              p.status === "Active" ? "bg-blue-50 text-primary" :
              p.status === "New" ? "bg-amber-50 text-amber-700" :
              "bg-emerald-50 text-emerald-700"
            }`}>
              {p.status}
            </span>

            {/* Next session */}
            <div className="text-xs text-muted-foreground w-28 hidden lg:block flex-shrink-0">{p.nextSession}</div>

            {/* Actions */}
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => onAssign(p)}
                className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-xs flex items-center gap-1.5"
              >
                <ClipboardList className="w-3 h-3" /> Assign
              </button>
              <button onClick={() => onView(p)} className="px-3 py-1.5 bg-secondary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-xs">
                View
              </button>
              <button onClick={() => onReport(p.id)} className="px-3 py-1.5 border border-border text-muted-foreground rounded-lg hover:bg-secondary hover:text-primary transition-colors text-xs flex items-center gap-1">
                <FileText className="w-3 h-3" /> Report
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
