import { Activity, TrendingUp } from "lucide-react";
import { PatientLayout } from "./PatientLayout";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart,
} from "recharts";
import { toast } from "sonner";

interface ConfidenceTrackingProps {
  onNavigate: (page: string) => void;
}

const historyData = [
  { week: "Wk 1", score: 2 },
  { week: "Wk 2", score: 2 },
  { week: "Wk 3", score: 3 },
  { week: "Wk 4", score: 3 },
  { week: "Wk 5", score: 4 },
  { week: "Wk 6", score: 4 },
  { week: "Now", score: null },
];

const scaleLabels: Record<number, string> = {
  1: "Not confident at all",
  2: "Slightly confident",
  3: "Moderately confident",
  4: "Quite confident",
  5: "Very confident",
};

const questions = [
  "How confident do you feel using your injured leg during daily activities?",
  "How confident are you that your knee will not give way during exercise?",
  "How confident do you feel about your overall rehabilitation progress?",
];

export function ConfidenceTracking({ onNavigate }: ConfidenceTrackingProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [chartData, setChartData] = useState(historyData);

  const avgScore =
    Object.keys(answers).length > 0
      ? Math.round(Object.values(answers).reduce((a, b) => a + b, 0) / Object.values(answers).length)
      : null;

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }
    const avg = Math.round(Object.values(answers).reduce((a, b) => a + b, 0) / Object.values(answers).length);
    setChartData((prev) => prev.map((d) => (d.week === "Now" ? { ...d, score: avg } : d)));
    setSubmitted(true);
    toast.success("Confidence check-in submitted!", {
      description: `Your score: ${avg}/5 — ${scaleLabels[avg]}. Excellent work today.`,
    });
  };

  return (
    <PatientLayout onNavigate={onNavigate} activePage="confidence">
      <div className="p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-foreground">Confidence Tracking</h1>
            <p className="text-muted-foreground text-sm">Rate your confidence level to help your physiotherapist understand your psychological recovery progress.</p>
          </div>
        </div>
        <div className="mb-8">
          <h1 className="text-foreground mb-1">Weekly Confidence Check-In</h1>
          <p className="text-muted-foreground text-sm">Rate your confidence level to help your physiotherapist understand your psychological recovery progress.</p>
        </div>

        {/* Trend chart */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-foreground">Confidence Trend</h3>
            <span className="text-xs text-muted-foreground">Week 1 → Week 6</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData.filter((d) => d.score !== null)}>
              <defs>
                <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(29,78,216,0.08)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#4b6080" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 11, fill: "#4b6080" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid rgba(29,78,216,0.15)", borderRadius: 10, fontSize: 12 }}
                formatter={(v: number) => [`${v}/5 — ${scaleLabels[v] || ""}`, "Confidence"]}
              />
              <ReferenceLine y={3} stroke="#059669" strokeDasharray="4 2" strokeOpacity={0.5} label={{ value: "Target", fontSize: 10, fill: "#059669" }} />
              <Area type="monotone" dataKey="score" stroke="#1d4ed8" fill="url(#confGrad)" strokeWidth={2.5} dot={{ r: 5, fill: "#1d4ed8" }} activeDot={{ r: 7 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-3 h-0.5 bg-emerald-500 border-dashed" style={{ borderTop: "2px dashed #059669" }} />
            <span className="text-xs text-muted-foreground">Green dashed = target level (3+)</span>
          </div>
        </div>

        {/* Questionnaire */}
        {!submitted ? (
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-foreground mb-6">This Week's Assessment</h3>
            <div className="space-y-8">
              {questions.map((q, qi) => (
                <div key={qi}>
                  <p className="text-foreground text-sm font-medium mb-4">
                    <span className="text-primary font-semibold mr-2">Q{qi + 1}.</span>{q}
                  </p>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        onClick={() => setAnswers((a) => ({ ...a, [qi]: score }))}
                        className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                          answers[qi] === score
                            ? "border-primary bg-primary text-white shadow-md scale-105"
                            : "border-border text-muted-foreground hover:border-primary/50 hover:bg-secondary"
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-muted-foreground text-xs">Not Confident</span>
                    <span className="text-muted-foreground text-xs">Very Confident</span>
                  </div>
                  {answers[qi] && (
                    <p className="text-primary text-xs mt-2 font-medium">
                      → {scaleLabels[answers[qi]]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {avgScore !== null && (
              <div className="mt-6 p-4 bg-secondary rounded-xl border border-primary/20">
                <div className="text-muted-foreground text-xs mb-1">Current Average Score</div>
                <div className="text-primary text-2xl font-bold">{avgScore} / 5</div>
                <div className="text-foreground text-sm">{scaleLabels[avgScore]}</div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="mt-6 w-full py-3 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Confidence Check-In
            </button>
          </div>
        ) : (
          <div className="bg-card border border-emerald-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-foreground mb-2">Check-In Complete!</h3>
            <p className="text-muted-foreground text-sm mb-2">Your confidence score has been recorded and shared with Dr. Sarah Chen.</p>
            <p className="text-accent font-medium">Score: {avgScore}/5 — {avgScore !== null ? scaleLabels[avgScore] : ""}</p>
            <p className="text-primary text-sm mt-4 italic">"You are one step closer to returning stronger."</p>
            <button
              onClick={() => { setSubmitted(false); setAnswers({}); }}
              className="mt-6 px-6 py-2.5 border border-border rounded-xl text-muted-foreground hover:bg-secondary transition-colors text-sm"
            >
              Take Again Next Week
            </button>
          </div>
        )}
      </div>
    </PatientLayout>
  );
}
