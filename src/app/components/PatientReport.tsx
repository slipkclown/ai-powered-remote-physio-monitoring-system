import {
  Activity, ArrowLeft, Calendar, ChevronDown, ChevronUp,
  FileText, TrendingUp, BookOpen, ClipboardList,
} from "lucide-react";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, Legend,
} from "recharts";

/* ─── Types ──────────────────────────────────────────── */
export type PatientReportData = {
  patientId: string;
  patientName: string;
  age: number;
  diagnosis: string;
  physiotherapist: string;
  programmeStart: string;
  currentWeek: number;
  totalWeeks: number;
  overallScore: number;
  recoveryStatus: "On Track" | "Needs Attention" | "Review Required";
  weeks: WeekReport[];
};

type ExerciseSession = {
  date: string;
  exerciseName: string;
  targetKneeAngle: number;
  leftKneeAngle: number;
  rightKneeAngle: number;
  hipAngle: number;
  spineAngle: number;
  repsDone: number;
  repsTarget: number;
  setsCompleted: number;
  setsTarget: number;
  similarityScore: number;
  progressPct: number;
  durationMin: number;
  performanceScore: number;
  feedbackReceived: string[];
};

type WeekReport = {
  week: string;
  weekNum: number;
  dateRange: string;
  sessions: ExerciseSession[];
  avgPerformance: number;
  avgSimilarity: number;
  rehabStatus: "Completed" | "In Progress" | "Upcoming";
  confidenceScore: number;
  motivationScore: number;
  journalCount: number;
  checkInSubmitted: boolean;
};

/* ─── Static report data (Muhammad Arif) ─────────────── */
const ARIF_REPORT: PatientReportData = {
  patientId: "P-1042",
  patientName: "Muhammad Arif",
  age: 28,
  diagnosis: "ACL Reconstruction (Right Knee)",
  physiotherapist: "Dr. Sarah Chen",
  programmeStart: "1 June 2026",
  currentWeek: 3,
  totalWeeks: 8,
  overallScore: 88,
  recoveryStatus: "On Track",
  weeks: [
    {
      week: "Week 1", weekNum: 1, dateRange: "1 Jun – 7 Jun 2026",
      rehabStatus: "Completed", confidenceScore: 2, motivationScore: 6, journalCount: 1, checkInSubmitted: true,
      avgPerformance: 71, avgSimilarity: 83,
      sessions: [
        {
          date: "2 Jun 2026", exerciseName: "Straight Leg Raises",
          targetKneeAngle: 80, leftKneeAngle: 74, rightKneeAngle: 12, hipAngle: 88, spineAngle: 176,
          repsDone: 10, repsTarget: 12, setsCompleted: 3, setsTarget: 3,
          similarityScore: 82, progressPct: 83, durationMin: 8,
          performanceScore: 72,
          feedbackReceived: ["Keep your back straight.", "Good effort — aim for fuller extension.", "Maintain proper posture."],
        },
        {
          date: "4 Jun 2026", exerciseName: "Quad Sets",
          targetKneeAngle: 10, leftKneeAngle: 10, rightKneeAngle: 10, hipAngle: 90, spineAngle: 178,
          repsDone: 12, repsTarget: 12, setsCompleted: 3, setsTarget: 3,
          similarityScore: 85, progressPct: 100, durationMin: 6,
          performanceScore: 70,
          feedbackReceived: ["Good effort.", "Excellent repetition!", "Consistency leads to recovery."],
        },
        {
          date: "6 Jun 2026", exerciseName: "Straight Leg Raises",
          targetKneeAngle: 80, leftKneeAngle: 78, rightKneeAngle: 12, hipAngle: 90, spineAngle: 177,
          repsDone: 12, repsTarget: 12, setsCompleted: 3, setsTarget: 3,
          similarityScore: 86, progressPct: 100, durationMin: 9,
          performanceScore: 76,
          feedbackReceived: ["Excellent repetition!", "Good job!", "You are one step closer to returning stronger."],
        },
      ],
    },
    {
      week: "Week 2", weekNum: 2, dateRange: "8 Jun – 14 Jun 2026",
      rehabStatus: "Completed", confidenceScore: 3, motivationScore: 7, journalCount: 2, checkInSubmitted: true,
      avgPerformance: 79, avgSimilarity: 86,
      sessions: [
        {
          date: "9 Jun 2026", exerciseName: "Straight Leg Raises",
          targetKneeAngle: 85, leftKneeAngle: 80, rightKneeAngle: 12, hipAngle: 91, spineAngle: 178,
          repsDone: 12, repsTarget: 12, setsCompleted: 3, setsTarget: 3,
          similarityScore: 88, progressPct: 100, durationMin: 9,
          performanceScore: 82,
          feedbackReceived: ["Excellent repetition!", "Maintain an upright posture.", "Good job!"],
        },
        {
          date: "11 Jun 2026", exerciseName: "Terminal Knee Extension",
          targetKneeAngle: 90, leftKneeAngle: 82, rightKneeAngle: 14, hipAngle: 93, spineAngle: 177,
          repsDone: 10, repsTarget: 15, setsCompleted: 2, setsTarget: 3,
          similarityScore: 84, progressPct: 67, durationMin: 11,
          performanceScore: 76,
          feedbackReceived: ["Bend your knee further.", "Keep your back straight.", "Maintain proper posture."],
        },
        {
          date: "13 Jun 2026", exerciseName: "Terminal Knee Extension",
          targetKneeAngle: 90, leftKneeAngle: 86, rightKneeAngle: 14, hipAngle: 94, spineAngle: 178,
          repsDone: 13, repsTarget: 15, setsCompleted: 3, setsTarget: 3,
          similarityScore: 87, progressPct: 87, durationMin: 12,
          performanceScore: 80,
          feedbackReceived: ["Good job!", "Excellent repetition!", "Small progress is still progress."],
        },
      ],
    },
    {
      week: "Week 3", weekNum: 3, dateRange: "15 Jun – 21 Jun 2026",
      rehabStatus: "In Progress", confidenceScore: 4, motivationScore: 8, journalCount: 1, checkInSubmitted: true,
      avgPerformance: 88, avgSimilarity: 91,
      sessions: [
        {
          date: "15 Jun 2026", exerciseName: "Terminal Knee Extension",
          targetKneeAngle: 90, leftKneeAngle: 87, rightKneeAngle: 14, hipAngle: 95, spineAngle: 178,
          repsDone: 12, repsTarget: 15, setsCompleted: 3, setsTarget: 3,
          similarityScore: 91, progressPct: 80, durationMin: 13,
          performanceScore: 88,
          feedbackReceived: ["Excellent repetition!", "Knee angle: 87°. Target: 90°.", "You are one step closer to returning stronger."],
        },
        {
          date: "17 Jun 2026", exerciseName: "Mini Squats (0–30°)",
          targetKneeAngle: 90, leftKneeAngle: 88, rightKneeAngle: 15, hipAngle: 94, spineAngle: 179,
          repsDone: 8, repsTarget: 10, setsCompleted: 3, setsTarget: 3,
          similarityScore: 89, progressPct: 80, durationMin: 10,
          performanceScore: 85,
          feedbackReceived: ["Maintain an upright posture.", "Good job!", "Excellent repetition!"],
        },
        {
          date: "19 Jun 2026", exerciseName: "Step-Ups",
          targetKneeAngle: 90, leftKneeAngle: 85, rightKneeAngle: 14, hipAngle: 96, spineAngle: 177,
          repsDone: 6, repsTarget: 8, setsCompleted: 3, setsTarget: 3,
          similarityScore: 87, progressPct: 75, durationMin: 9,
          performanceScore: 90,
          feedbackReceived: ["Good job! Consistent form.", "Excellent repetition!", "Consistency leads to recovery."],
        },
      ],
    },
  ],
};

/* Patient map — in a real app this would come from context/API */
const PATIENT_REPORTS: Record<string, PatientReportData> = {
  "P-1042": ARIF_REPORT,
  "P-1039": {
    ...ARIF_REPORT,
    patientId: "P-1039",
    patientName: "Siti Aminah",
    age: 34,
    diagnosis: "Knee Osteoarthritis (Left Knee)",
    currentWeek: 6,
    totalWeeks: 12,
    overallScore: 74,
    recoveryStatus: "Needs Attention",
    weeks: ARIF_REPORT.weeks.map((w) => ({
      ...w,
      avgPerformance: Math.max(55, w.avgPerformance - 14),
      avgSimilarity: Math.max(70, w.avgSimilarity - 12),
      confidenceScore: Math.max(1, w.confidenceScore - 1),
    })),
  },
  "P-1035": {
    ...ARIF_REPORT,
    patientId: "P-1035",
    patientName: "Raj Kumar",
    age: 45,
    diagnosis: "Post Total Knee Replacement",
    currentWeek: 10,
    totalWeeks: 12,
    overallScore: 91,
    recoveryStatus: "On Track",
    weeks: ARIF_REPORT.weeks.map((w) => ({
      ...w,
      avgPerformance: Math.min(98, w.avgPerformance + 8),
      avgSimilarity: Math.min(98, w.avgSimilarity + 6),
      confidenceScore: Math.min(5, w.confidenceScore + 1),
    })),
  },
  "P-1028": {
    ...ARIF_REPORT,
    patientId: "P-1028",
    patientName: "Lee Mei Ling",
    age: 22,
    diagnosis: "ACL Reconstruction (Left Knee)",
    currentWeek: 1,
    totalWeeks: 8,
    overallScore: 65,
    recoveryStatus: "Needs Attention",
    weeks: [ARIF_REPORT.weeks[0]].map((w) => ({
      ...w,
      avgPerformance: 65,
      avgSimilarity: 72,
      confidenceScore: 2,
    })),
  },
  "P-1021": {
    ...ARIF_REPORT,
    patientId: "P-1021",
    patientName: "Ahmad Zaidi",
    age: 52,
    diagnosis: "Meniscus Repair",
    currentWeek: 14,
    totalWeeks: 16,
    overallScore: 95,
    recoveryStatus: "On Track",
    weeks: ARIF_REPORT.weeks.map((w) => ({
      ...w,
      avgPerformance: Math.min(98, w.avgPerformance + 12),
      avgSimilarity: Math.min(98, w.avgSimilarity + 8),
      confidenceScore: Math.min(5, w.confidenceScore + 2),
    })),
  },
};

export function getPatientReport(patientId: string): PatientReportData | null {
  return PATIENT_REPORTS[patientId] ?? null;
}

/* ─── Status config ─────────────────────────────────── */
const recoveryStatusCfg = {
  "On Track": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Needs Attention": "bg-amber-50 text-amber-700 border-amber-200",
  "Review Required": "bg-red-50 text-red-700 border-red-200",
} as const;

const weekStatusCfg = {
  Completed: "bg-emerald-50 text-emerald-700",
  "In Progress": "bg-blue-50 text-primary",
  Upcoming: "bg-muted text-muted-foreground",
} as const;

/* ─── Component ─────────────────────────────────────── */
interface PatientReportProps {
  patientId: string;
  onBack: () => void;
}

export function PatientReport({ patientId, onBack }: PatientReportProps) {
  const report = getPatientReport(patientId);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(
    report ? report.currentWeek : null
  );
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  if (!report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-40" />
          <p className="text-muted-foreground">No report data found for this patient.</p>
          <button onClick={onBack} className="mt-4 text-primary text-sm hover:underline">← Go back</button>
        </div>
      </div>
    );
  }

  /* Trend data for charts */
  const trendData = report.weeks.map((w) => ({
    week: w.week,
    performance: w.avgPerformance,
    similarity: w.avgSimilarity,
    confidence: w.confidenceScore * 20,
    motivation: w.motivationScore * 10,
  }));

  const radarData = [
    { metric: "Knee Flexion", score: report.overallScore },
    { metric: "Consistency", score: Math.min(98, report.overallScore - 3) },
    { metric: "Confidence", score: (report.weeks.at(-1)?.confidenceScore ?? 3) * 20 },
    { metric: "Motivation", score: (report.weeks.at(-1)?.motivationScore ?? 5) * 10 },
    { metric: "Completion", score: Math.round(report.currentWeek / report.totalWeeks * 100) },
    { metric: "DTW Score", score: report.weeks.at(-1)?.avgSimilarity ?? 88 },
  ];

  const initials = report.patientName.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const completionPct = Math.round((report.currentWeek / report.totalWeeks) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Sticky header ── */}
      <div className="bg-white border-b border-border sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Reports
          </button>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <span className="text-foreground font-semibold">{report.patientName}</span>
              <span className="text-muted-foreground text-sm ml-2">{report.patientId} · {report.diagnosis}</span>
            </div>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full border font-medium flex-shrink-0 ${recoveryStatusCfg[report.recoveryStatus]}`}>
            {report.recoveryStatus}
          </span>
          <button
            onClick={() => window.print?.()}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-muted-foreground hover:bg-secondary transition-colors text-sm flex-shrink-0"
          >
            <FileText className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* ── Patient summary banner ── */}
        <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] rounded-2xl p-6 text-white">
          <div className="grid md:grid-cols-4 gap-6 items-center">
            <div className="md:col-span-1">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white font-bold text-xl">
                  {initials}
                </div>
                <div>
                  <div className="font-semibold text-lg leading-tight">{report.patientName}</div>
                  <div className="text-blue-200 text-xs">Age {report.age} · {report.patientId}</div>
                  <div className="text-blue-200 text-xs mt-0.5">{report.physiotherapist}</div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="text-blue-200 text-xs uppercase tracking-wider mb-2">Rehabilitation Progress</div>
              <div className="flex items-center gap-3 mb-1.5">
                <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
                <span className="text-white font-semibold text-sm flex-shrink-0">{completionPct}%</span>
              </div>
              <div className="flex justify-between text-blue-200 text-xs">
                <span>Week {report.currentWeek} of {report.totalWeeks}</span>
                <span>Programme started {report.programmeStart}</span>
              </div>
            </div>
            <div className="md:col-span-1 grid grid-cols-2 gap-3">
              {[
                { label: "Overall Score", value: `${report.overallScore}%` },
                { label: "Current Week", value: `Wk ${report.currentWeek}` },
                { label: "Total Sessions", value: `${report.weeks.reduce((a, w) => a + w.sessions.length, 0)}` },
                { label: "Journal Entries", value: `${report.weeks.reduce((a, w) => a + w.journalCount, 0)}` },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-2.5 text-center">
                  <div className="text-cyan-300 text-xs mb-0.5">{s.label}</div>
                  <div className="text-white font-bold">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Performance trend charts ── */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main trend */}
          <div className="md:col-span-2 bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-foreground">Performance Trend Across Weeks</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(29,78,216,0.08)" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#4b6080" }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 10, fill: "#4b6080" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(29,78,216,0.15)", borderRadius: 10, fontSize: 12 }} />
                <Line key="performance" type="monotone" dataKey="performance" name="Performance %" stroke="#1d4ed8" strokeWidth={2.5} dot={{ r: 4, fill: "#1d4ed8" }} activeDot={{ r: 6 }} />
                <Line key="similarity" type="monotone" dataKey="similarity" name="Similarity %" stroke="#059669" strokeWidth={2} dot={{ r: 3, fill: "#059669" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-6 justify-center mt-2">
              {[["Performance %", "#1d4ed8"], ["Similarity %", "#059669"]].map(([label, color]) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-4 h-1.5 rounded" style={{ background: color }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Radar */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-foreground mb-4">Recovery Profile</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(29,78,216,0.12)" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: "#4b6080" }} />
                <Radar name="Score" dataKey="score" stroke="#1d4ed8" fill="#1d4ed8" fillOpacity={0.18} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Confidence + motivation bars ── */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Activity className="w-5 h-5 text-cyan-600" />
            <h3 className="text-foreground">Psychological Recovery Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={trendData} barGap={4} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(29,78,216,0.08)" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#4b6080" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#4b6080" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(29,78,216,0.15)", borderRadius: 10, fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="confidence" name="Confidence (×20)" fill="#0891b2" radius={[4, 4, 0, 0]} />
              <Bar dataKey="motivation" name="Motivation (×10)" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Week-by-week accordion ── */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Detailed Weekly Exercise Records</h3>
          </div>

          <div className="space-y-4">
            {report.weeks.map((week) => (
              <div key={week.weekNum} className="bg-card border border-border rounded-2xl overflow-hidden">
                {/* Week header */}
                <button
                  onClick={() => setExpandedWeek(expandedWeek === week.weekNum ? null : week.weekNum)}
                  className="w-full flex items-center justify-between px-6 py-5 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm ${
                      week.avgPerformance >= 85 ? "bg-emerald-50 text-accent" :
                      week.avgPerformance >= 70 ? "bg-secondary text-primary" :
                      "bg-amber-50 text-amber-700"
                    }`}>
                      {week.avgPerformance}%
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-3">
                        <span className="text-foreground font-semibold">{week.week}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${weekStatusCfg[week.rehabStatus]}`}>
                          {week.rehabStatus}
                        </span>
                      </div>
                      <div className="text-muted-foreground text-xs mt-0.5">{week.dateRange} · {week.sessions.length} session{week.sessions.length !== 1 ? "s" : ""}</div>
                    </div>
                  </div>

                  {/* Weekly summary pills */}
                  <div className="hidden md:flex items-center gap-3 mr-4">
                    <div className="text-center">
                      <div className="text-muted-foreground text-xs">Avg Similarity</div>
                      <div className="text-cyan-600 font-semibold text-sm">{week.avgSimilarity}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground text-xs">Confidence</div>
                      <div className="text-primary font-semibold text-sm">{week.confidenceScore}/5</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground text-xs">Motivation</div>
                      <div className="text-accent font-semibold text-sm">{week.motivationScore}/10</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground text-xs">Journal</div>
                      <div className="text-violet-600 font-semibold text-sm">{week.journalCount}</div>
                    </div>
                  </div>

                  {expandedWeek === week.weekNum
                    ? <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
                </button>

                {expandedWeek === week.weekNum && (
                  <div className="border-t border-border">
                    {/* Weekly summary row */}
                    <div className="px-6 py-4 bg-muted/20 grid grid-cols-2 md:grid-cols-6 gap-4 border-b border-border">
                      {[
                        { label: "Avg Performance", value: `${week.avgPerformance}%`, color: "text-primary" },
                        { label: "Avg DTW Similarity", value: `${week.avgSimilarity}%`, color: "text-cyan-600" },
                        { label: "Confidence Score", value: `${week.confidenceScore}/5`, color: "text-primary" },
                        { label: "Motivation Score", value: `${week.motivationScore}/10`, color: "text-accent" },
                        { label: "Journal Entries", value: `${week.journalCount}`, color: "text-violet-600" },
                        { label: "Check-In", value: week.checkInSubmitted ? "Submitted" : "Pending", color: week.checkInSubmitted ? "text-accent" : "text-amber-600" },
                      ].map((s) => (
                        <div key={s.label} className="text-center">
                          <div className="text-muted-foreground text-xs mb-0.5">{s.label}</div>
                          <div className={`font-semibold text-sm ${s.color}`}>{s.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Sessions */}
                    <div className="divide-y divide-border">
                      {week.sessions.map((session, si) => {
                        const sessionKey = `${week.weekNum}-${si}`;
                        const isExpanded = expandedSession === sessionKey;
                        return (
                          <div key={si}>
                            {/* Session row */}
                            <button
                              onClick={() => setExpandedSession(isExpanded ? null : sessionKey)}
                              className="w-full flex items-center justify-between px-6 py-4 hover:bg-secondary/20 transition-colors"
                            >
                              <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-primary text-xs font-semibold flex-shrink-0">
                                  S{si + 1}
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                  <div className="text-foreground text-sm font-medium">{session.exerciseName}</div>
                                  <div className="text-muted-foreground text-xs">{session.date} · {session.durationMin} min</div>
                                </div>
                              </div>
                              <div className="hidden md:flex items-center gap-6 mr-4">
                                <div className="text-center">
                                  <div className="text-muted-foreground text-xs">Reps</div>
                                  <div className="text-foreground text-sm font-semibold">{session.repsDone}/{session.repsTarget}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-muted-foreground text-xs">Knee Angle</div>
                                  <div className="text-foreground text-sm font-semibold">{session.leftKneeAngle}° <span className="text-muted-foreground font-normal text-xs">/ {session.targetKneeAngle}°</span></div>
                                </div>
                                <div className="text-center">
                                  <div className="text-muted-foreground text-xs">DTW Score</div>
                                  <div className="text-cyan-600 text-sm font-semibold">{session.similarityScore}%</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-muted-foreground text-xs">Score</div>
                                  <div className={`text-sm font-bold ${session.performanceScore >= 85 ? "text-accent" : session.performanceScore >= 70 ? "text-primary" : "text-amber-600"}`}>
                                    {session.performanceScore}%
                                  </div>
                                </div>
                              </div>
                              {isExpanded
                                ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                            </button>

                            {/* Session detail */}
                            {isExpanded && (
                              <div className="px-6 pb-6 bg-secondary/10 border-t border-border">
                                <div className="pt-5 grid md:grid-cols-3 gap-6">
                                  {/* Performance metrics */}
                                  <div>
                                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Performance Metrics</div>
                                    <div className="space-y-2.5">
                                      {[
                                        { label: "Repetitions Completed", value: `${session.repsDone} / ${session.repsTarget}`, color: "text-primary" },
                                        { label: "Sets Completed", value: `${session.setsCompleted} / ${session.setsTarget}`, color: "text-primary" },
                                        { label: "Session Duration", value: `${session.durationMin} minutes`, color: "text-foreground" },
                                        { label: "Exercise Progress", value: `${session.progressPct}%`, color: "text-accent" },
                                        { label: "DTW Similarity Score", value: `${session.similarityScore}%`, color: "text-cyan-600" },
                                        { label: "Overall Performance Score", value: `${session.performanceScore}%`, color: session.performanceScore >= 85 ? "text-accent" : "text-primary" },
                                      ].map((m) => (
                                        <div key={m.label} className="flex items-center justify-between">
                                          <span className="text-muted-foreground text-xs">{m.label}</span>
                                          <span className={`text-sm font-semibold ${m.color}`}>{m.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Joint angles */}
                                  <div>
                                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Joint Angle Measurements</div>
                                    <div className="space-y-3">
                                      {[
                                        { label: "Left Knee", angle: session.leftKneeAngle, target: session.targetKneeAngle, color: "bg-primary" },
                                        { label: "Right Knee", angle: session.rightKneeAngle, target: 15, color: "bg-cyan-500" },
                                        { label: "Hip Angle", angle: session.hipAngle, target: 90, color: "bg-emerald-500" },
                                        { label: "Spine Angle", angle: session.spineAngle, target: 180, color: "bg-violet-500" },
                                      ].map((j) => (
                                        <div key={j.label}>
                                          <div className="flex justify-between text-xs mb-1">
                                            <span className="text-muted-foreground">{j.label}</span>
                                            <span className="text-foreground font-mono font-semibold">{j.angle}° <span className="text-muted-foreground font-normal">/ {j.target}°</span></span>
                                          </div>
                                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                              className={`h-full ${j.color} rounded-full`}
                                              style={{ width: `${Math.min((j.angle / 180) * 100, 100)}%` }}
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Feedback */}
                                  <div>
                                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-3">AI Feedback Received</div>
                                    <div className="space-y-2">
                                      {session.feedbackReceived.map((fb, fi) => (
                                        <div key={fi} className={`flex items-start gap-2 px-3 py-2 rounded-lg text-xs ${
                                          fb.toLowerCase().includes("excellent") || fb.toLowerCase().includes("good")
                                            ? "bg-emerald-50 text-emerald-700"
                                            : fb.toLowerCase().includes("bend") || fb.toLowerCase().includes("keep") || fb.toLowerCase().includes("maintain")
                                            ? "bg-amber-50 text-amber-700"
                                            : "bg-blue-50 text-primary"
                                        }`}>
                                          <span className="flex-shrink-0 mt-0.5">
                                            {fb.toLowerCase().includes("excellent") || fb.toLowerCase().includes("good") ? "✓" : "→"}
                                          </span>
                                          {fb}
                                        </div>
                                      ))}
                                    </div>

                                    {/* Progress bar */}
                                    <div className="mt-4">
                                      <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Exercise Completion</span>
                                        <span className="text-foreground font-semibold">{session.progressPct}%</span>
                                      </div>
                                      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full"
                                          style={{ width: `${session.progressPct}%` }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Clinical notes footer ── */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-foreground">Programme Overview</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 text-sm">
              {[
                ["Patient Name", report.patientName],
                ["Patient ID", report.patientId],
                ["Age", String(report.age)],
                ["Diagnosis", report.diagnosis],
                ["Supervising Physiotherapist", report.physiotherapist],
                ["Programme Start Date", report.programmeStart],
                ["Current Week", `Week ${report.currentWeek} of ${report.totalWeeks}`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-1 border-b border-border/60 last:border-0">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-foreground font-medium text-right ml-4">{value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              {[
                ["Overall Performance Score", `${report.overallScore}%`],
                ["Recovery Status", report.recoveryStatus],
                ["Total Sessions Completed", String(report.weeks.reduce((a, w) => a + w.sessions.length, 0))],
                ["Total Journal Entries", String(report.weeks.reduce((a, w) => a + w.journalCount, 0))],
                ["Programme Completion", `${completionPct}%`],
                ["Report Generated", new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-1 border-b border-border/60 last:border-0">
                  <span className="text-muted-foreground">{label}</span>
                  <span className={`font-medium text-right ml-4 ${
                    label === "Recovery Status"
                      ? report.recoveryStatus === "On Track" ? "text-accent"
                      : report.recoveryStatus === "Needs Attention" ? "text-amber-600"
                      : "text-red-600"
                      : "text-foreground"
                  }`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-xs mt-5 pt-4 border-t border-border">
            This report is generated by Recovr — AI-Powered Remote Physiotherapy Monitoring System and is intended to support clinical decision-making. It does not replace professional medical diagnosis or treatment. All data is based on patient self-reported sessions and AI analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
