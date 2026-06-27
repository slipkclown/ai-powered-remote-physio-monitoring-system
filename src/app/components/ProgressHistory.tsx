import { ChevronDown, ChevronUp, TrendingUp } from "lucide-react";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PatientLayout } from "./PatientLayout";

interface ProgressHistoryProps {
  onNavigate: (page: string) => void;
}

const weeklyHistory = [
  {
    week: "Week 1",
    date: "1 Jun – 7 Jun 2026",
    overallScore: 71,
    sessions: [
      { exercise: "Straight Leg Raises", reps: 10, similarity: 82, kneeAngle: 74, feedback: "Keep your back straight.", score: 72 },
      { exercise: "Quad Sets", reps: 12, similarity: 85, kneeAngle: 78, feedback: "Good effort. Aim for fuller extension.", score: 70 },
    ],
  },
  {
    week: "Week 2",
    date: "8 Jun – 14 Jun 2026",
    overallScore: 79,
    sessions: [
      { exercise: "Straight Leg Raises", reps: 12, similarity: 88, kneeAngle: 80, feedback: "Excellent repetition!", score: 82 },
      { exercise: "Terminal Knee Extension", reps: 10, similarity: 84, kneeAngle: 82, feedback: "Bend your knee further.", score: 76 },
    ],
  },
  {
    week: "Week 3",
    date: "15 Jun – 21 Jun 2026",
    overallScore: 88,
    sessions: [
      { exercise: "Terminal Knee Extension", reps: 12, similarity: 91, kneeAngle: 87, feedback: "Excellent repetition!", score: 88 },
      { exercise: "Mini Squats (0–30°)", reps: 8, similarity: 89, kneeAngle: 88, feedback: "Maintain an upright posture.", score: 85 },
      { exercise: "Step-Ups", reps: 6, similarity: 87, kneeAngle: 85, feedback: "Good job! Consistent form.", score: 90 },
    ],
  },
];

const trendData = weeklyHistory.map((w) => ({ week: w.week, score: w.overallScore }));

export function ProgressHistory({ onNavigate }: ProgressHistoryProps) {
  const [expanded, setExpanded] = useState<string | null>("Week 3");

  return (
    <PatientLayout onNavigate={onNavigate} activePage="progress-history">
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-foreground">Progress History</h1>
            <p className="text-muted-foreground text-sm">Complete record of all completed exercises and performance across your rehabilitation programme.</p>
          </div>
        </div>
        <div className="mb-8">
          <h1 className="text-foreground mb-1">Rehabilitation History</h1>
          <p className="text-muted-foreground text-sm">Complete record of all completed exercises, performance scores, and progress trends across your rehabilitation programme.</p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Sessions Completed", value: "14", color: "text-primary", bg: "bg-secondary" },
            { label: "Total Repetitions", value: "328", color: "text-accent", bg: "bg-emerald-50" },
            { label: "Avg Similarity Score", value: "87%", color: "text-cyan-600", bg: "bg-cyan-50" },
            { label: "Best Knee Angle", value: "92°", color: "text-violet-600", bg: "bg-violet-50" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <div className={`text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
              <div className="text-muted-foreground text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trend chart */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h3 className="text-foreground mb-5">Overall Performance Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(29,78,216,0.08)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#4b6080" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#4b6080" }} axisLine={false} tickLine={false} domain={[50, 100]} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(29,78,216,0.15)", borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="score" stroke="#1d4ed8" fill="url(#histGrad)" strokeWidth={2.5} dot={{ r: 5, fill: "#1d4ed8" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly breakdown */}
        <div className="space-y-4">
          <h3 className="text-foreground">Weekly Exercise Reports</h3>
          {[...weeklyHistory].reverse().map((week) => (
            <div key={week.week} className="bg-card border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === week.week ? null : week.week)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    week.overallScore >= 85 ? "bg-emerald-50 text-accent" :
                    week.overallScore >= 75 ? "bg-secondary text-primary" :
                    "bg-amber-50 text-amber-700"
                  }`}>
                    {week.overallScore}%
                  </div>
                  <div className="text-left">
                    <div className="text-foreground font-medium">{week.week} Results</div>
                    <div className="text-muted-foreground text-xs">{week.date} · {week.sessions.length} sessions</div>
                  </div>
                </div>
                {expanded === week.week ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
              </button>

              {expanded === week.week && (
                <div className="border-t border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="px-6 py-3 text-left text-xs text-muted-foreground font-medium">Exercise</th>
                        <th className="px-4 py-3 text-center text-xs text-muted-foreground font-medium">Reps</th>
                        <th className="px-4 py-3 text-center text-xs text-muted-foreground font-medium">Similarity</th>
                        <th className="px-4 py-3 text-center text-xs text-muted-foreground font-medium">Knee Angle</th>
                        <th className="px-4 py-3 text-center text-xs text-muted-foreground font-medium">Score</th>
                        <th className="px-6 py-3 text-left text-xs text-muted-foreground font-medium">Feedback</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {week.sessions.map((s, i) => (
                        <tr key={i} className="hover:bg-secondary/20">
                          <td className="px-6 py-3 text-foreground font-medium">{s.exercise}</td>
                          <td className="px-4 py-3 text-center text-foreground">{s.reps}</td>
                          <td className="px-4 py-3 text-center text-cyan-600 font-semibold">{s.similarity}%</td>
                          <td className="px-4 py-3 text-center text-foreground">{s.kneeAngle}°</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`font-bold ${s.score >= 85 ? "text-accent" : s.score >= 75 ? "text-primary" : "text-amber-600"}`}>{s.score}%</span>
                          </td>
                          <td className="px-6 py-3 text-muted-foreground text-xs italic">"{s.feedback}"</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PatientLayout>
  );
}
