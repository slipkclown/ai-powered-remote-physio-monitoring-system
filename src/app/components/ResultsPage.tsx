import { Activity, AlertTriangle, ArrowLeft, CheckCircle, ChevronRight, Download, RotateCcw, Send, TrendingUp } from "lucide-react";
import { useState } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { toast } from "sonner";
import { useRehab } from "../context/RehabContext";

interface ResultsPageProps {
  onNavigate: (page: string) => void;
}

const radarData = [
  { metric: "Knee Flexion", score: 88 },
  { metric: "Posture", score: 92 },
  { metric: "Consistency", score: 85 },
  { metric: "Timing", score: 78 },
  { metric: "Range", score: 83 },
  { metric: "Balance", score: 90 },
];

const repData = [
  { rep: "R1", angle: 82, similarity: 87 },
  { rep: "R2", angle: 86, similarity: 90 },
  { rep: "R3", angle: 79, similarity: 82 },
  { rep: "R4", angle: 88, similarity: 93 },
  { rep: "R5", angle: 91, similarity: 96 },
  { rep: "R6", angle: 87, similarity: 91 },
  { rep: "R7", angle: 84, similarity: 88 },
  { rep: "R8", angle: 90, similarity: 94 },
  { rep: "R9", angle: 85, similarity: 89 },
  { rep: "R10", angle: 88, similarity: 92 },
  { rep: "R11", angle: 92, similarity: 97 },
  { rep: "R12", angle: 89, similarity: 95 },
];

const mistakes = [
  { issue: "Insufficient knee flexion (<80°)", frequency: 3, severity: "moderate" },
  { issue: "Forward trunk lean detected", frequency: 1, severity: "minor" },
  { issue: "Uneven weight distribution", frequency: 2, severity: "minor" },
];

const recommendations = [
  "Focus on achieving full 90° knee flexion in subsequent sessions.",
  "Practice in front of a mirror to monitor trunk alignment.",
  "Consider using a chair armrest for balance support initially.",
  "Increase hold duration at peak extension from 2s to 3s.",
];

type Step = "results" | "confidence" | "checkin";

export function ResultsPage({ onNavigate }: ResultsPageProps) {
  const { addNotification, completeExercise } = useRehab();
  const [step, setStep] = useState<Step>("results");
  const [confAnswers, setConfAnswers] = useState<Record<number, number>>({});
  const [confSubmitted, setConfSubmitted] = useState(false);
  const overallScore = 88;
  const similarityPct = 91;

  const handleSendToPhysio = () => {
    completeExercise(2); // mark Terminal Knee Extension complete
    addNotification({ for: "physio", message: "Muhammad Arif completed exercise: Terminal Knee Extension — Score 88%.", time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }), read: false });
    toast.success("Results sent to Dr. Sarah Chen!", { description: "Your performance data has been added to your rehabilitation record." });
  };

  const confQuestions = [
    "How confident do you feel using your injured leg during daily activities?",
    "How confident are you that your knee will not give way during exercise?",
    "How confident do you feel about your overall rehabilitation progress?",
  ];

  const scaleLabels: Record<number, string> = {
    1: "Not confident at all", 2: "Slightly confident", 3: "Moderately confident",
    4: "Quite confident", 5: "Very confident",
  };

  const avgConf = Object.keys(confAnswers).length > 0
    ? Math.round(Object.values(confAnswers).reduce((a, b) => a + b, 0) / Object.values(confAnswers).length)
    : null;

  if (step === "confidence") {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
            <button onClick={() => setStep("results")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Results
            </button>
            <span className="text-foreground font-medium">Confidence Check-In</span>
            <div className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">Step 2 of 3</div>
          </div>
          <div className="max-w-2xl mx-auto px-6 pb-3">
            <div className="flex gap-2">
              {(["Results", "Confidence", "Check-In"] as const).map((s, i) => (
                <div key={s} className={`flex-1 h-1 rounded-full ${i === 1 ? "bg-primary" : i < 1 ? "bg-emerald-400" : "bg-muted"}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-foreground text-sm">Step 2 of 3 — Rate your confidence after today's session to track your psychological recovery.</p>
          </div>
          <h1 className="text-foreground mb-2">Confidence Check-In</h1>
          <p className="text-muted-foreground text-sm mb-8">Rate how confident you feel on a scale of 1 to 5.</p>

          {!confSubmitted ? (
            <div className="space-y-8">
              {confQuestions.map((q, qi) => (
                <div key={qi} className="bg-card border border-border rounded-2xl p-6">
                  <p className="text-foreground text-sm font-medium mb-4">
                    <span className="text-primary font-semibold mr-2">Q{qi + 1}.</span>{q}
                  </p>
                  <div className="flex gap-3">
                    {[1,2,3,4,5].map((score) => (
                      <button key={score} onClick={() => setConfAnswers((a) => ({ ...a, [qi]: score }))}
                        className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                          confAnswers[qi] === score ? "border-primary bg-primary text-white shadow-md scale-105" : "border-border text-muted-foreground hover:border-primary/50 hover:bg-secondary"
                        }`}>
                        {score}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                    <span>Not Confident</span><span>Very Confident</span>
                  </div>
                  {confAnswers[qi] && <p className="text-primary text-xs mt-2 font-medium">→ {scaleLabels[confAnswers[qi]]}</p>}
                </div>
              ))}
              {avgConf !== null && (
                <div className="p-4 bg-secondary rounded-xl border border-primary/20">
                  <div className="text-muted-foreground text-xs mb-1">Average Score</div>
                  <div className="text-primary text-2xl font-bold">{avgConf} / 5</div>
                  <div className="text-foreground text-sm">{scaleLabels[avgConf]}</div>
                </div>
              )}
              <button
                onClick={() => {
                  if (Object.keys(confAnswers).length < confQuestions.length) { toast.error("Please answer all questions."); return; }
                  setConfSubmitted(true);
                  toast.success("Confidence check-in recorded!");
                }}
                className="w-full py-3 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                Submit & Continue to Check-In
              </button>
            </div>
          ) : (
            <div className="bg-card border border-emerald-200 rounded-2xl p-8 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-foreground mb-2">Confidence recorded!</h3>
              <p className="text-accent font-semibold mb-6">Score: {avgConf}/5 — {avgConf ? scaleLabels[avgConf] : ""}</p>
              <button onClick={() => setStep("checkin")}
                className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
                Continue to Weekly Check-In <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === "checkin") {
    return <WeeklyCheckInInline onDone={() => onNavigate("patient")} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => onNavigate("patient")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <div className="text-foreground font-medium">Exercise Results</div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-muted-foreground hover:bg-secondary transition-colors text-sm">
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button onClick={handleSendToPhysio}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Send className="w-4 h-4" /> Send to Physiotherapist
            </button>
          </div>
        </div>
        {/* Step indicator */}
        <div className="max-w-7xl mx-auto px-6 pb-3">
          <div className="flex gap-2 max-w-xs">
            {["Results", "Confidence", "Check-In"].map((s, i) => (
              <div key={s} className={`flex-1 h-1 rounded-full ${i === 0 ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
          <p className="text-muted-foreground text-xs mt-1">Step 1 of 3 — Review your results, then complete your confidence check-in and weekly check-in.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-foreground mb-1">Terminal Knee Extension · Session Results</h1>
          <p className="text-muted-foreground text-sm">Saturday, 14 June 2026 · 10:12 AM · Duration: 8 min 24 sec · Set 2 of 3</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {[
            { label: "Overall Score", value: `${overallScore}%`, color: "text-primary", bg: "bg-secondary", sub: "Excellent" },
            { label: "Similarity Score", value: `${similarityPct}%`, color: "text-cyan-600", bg: "bg-cyan-50", sub: "DTW Comparison" },
            { label: "Reps Completed", value: "12/12", color: "text-accent", bg: "bg-emerald-50", sub: "100% complete" },
            { label: "Avg Knee Angle", value: "87°", color: "text-violet-600", bg: "bg-violet-50", sub: "Target: 90°" },
          ].map((card) => (
            <div key={card.label} className="bg-card border border-border rounded-2xl p-5">
              <div className="text-foreground text-2xl font-bold mb-0.5">{card.value}</div>
              <div className="text-muted-foreground text-xs">{card.label}</div>
              <div className={`text-xs mt-1 font-medium ${card.color}`}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <h3 className="text-foreground mb-5">Per-Repetition Performance</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={repData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(29,78,216,0.08)" />
                <XAxis dataKey="rep" tick={{ fontSize: 10, fill: "#4b6080" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#4b6080" }} axisLine={false} tickLine={false} domain={[60, 100]} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(29,78,216,0.15)", borderRadius: 10, fontSize: 12 }} />
                <Bar key="angle" dataKey="angle" name="Knee Angle (°)" fill="#60a5fa" radius={[4,4,0,0]} />
                <Bar key="similarity" dataKey="similarity" name="Similarity (%)" fill="#34d399" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-foreground mb-5">Performance Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(29,78,216,0.15)" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fill: "#4b6080" }} />
                <Radar key="score" name="Score" dataKey="score" stroke="#1d4ed8" fill="#1d4ed8" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="text-foreground">Common Mistakes Detected</h3>
            </div>
            <div className="space-y-3">
              {mistakes.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-muted/60 border border-border">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${m.severity === "moderate" ? "bg-amber-400" : "bg-yellow-300"}`} />
                    <span className="text-foreground text-sm">{m.issue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${m.severity === "moderate" ? "bg-amber-50 text-amber-700" : "bg-yellow-50 text-yellow-700"}`}>{m.severity}</span>
                    <span className="text-muted-foreground text-xs">{m.frequency}×</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle className="w-5 h-5 text-accent" />
              <h3 className="text-foreground">Improvement Recommendations</h3>
            </div>
            <div className="space-y-3">
              {recommendations.map((r, i) => (
                <div key={i} className="flex gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">{i + 1}</span>
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Post-exercise flow CTA */}
        <div className="mt-8 bg-gradient-to-r from-[#3D4F5A] to-[#4e6370] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-medium mb-1">Complete Your Recovery Feedback Cycle</div>
            <p className="text-[#c8c4b8] text-sm">After reviewing results, complete your Confidence Check-In and Weekly Check-In to send all data to your physiotherapist.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button onClick={() => onNavigate("monitor")} className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors text-sm">
              <RotateCcw className="w-4 h-4" /> Repeat
            </button>
            <button onClick={() => setStep("confidence")}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-primary rounded-xl hover:bg-blue-50 transition-colors font-medium text-sm">
              Next: Confidence Check-In <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Inline Weekly Check-In used inside the Results flow */
function WeeklyCheckInInline({ onDone }: { onDone: () => void }) {
  const { addCheckIn } = useRehab();
  const [values, setValues] = useState({ pain: 3, confidence: 3, motivation: 3 });
  const [concerns, setConcerns] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const sliderFields = [
    { key: "pain" as const, label: "Pain Level", color: "#ef4444", activeClass: "text-red-600" },
    { key: "confidence" as const, label: "Confidence Level", color: "#1d4ed8", activeClass: "text-primary" },
    { key: "motivation" as const, label: "Motivation Level", color: "#10b981", activeClass: "text-emerald-600" },
  ];

  const handleSubmit = () => {
    addCheckIn({ date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), patientName: "Muhammad Arif", ...values, concern: concerns });
    setSubmitted(true);
    toast.success("Session complete! All data sent to Dr. Sarah Chen.", { description: "Excellent work today. Consistency leads to recovery." });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Step 3 of 3</span>
          <span className="text-foreground font-medium">Weekly Check-In</span>
          <div className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">Final Step</div>
        </div>
        <div className="max-w-2xl mx-auto px-6 pb-3">
          <div className="flex gap-2">
            {[0,1,2].map((i) => <div key={i} className={`flex-1 h-1 rounded-full ${i < 2 ? "bg-emerald-400" : "bg-primary"}`} />)}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
          <p className="text-emerald-800 text-sm">Final step! Submit your weekly check-in to complete today's session and send all data to your physiotherapist.</p>
        </div>
        <h1 className="text-foreground mb-6">Weekly Check-In</h1>

        {!submitted ? (
          <div className="space-y-5">
            {sliderFields.map((field) => (
              <div key={field.key} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-foreground text-base">{field.label}</h3>
                  <span className={`text-xl font-bold ${field.activeClass}`}>{values[field.key]}/10</span>
                </div>
                <input type="range" min={1} max={10} value={values[field.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: parseInt(e.target.value) }))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, ${field.color} 0%, ${field.color} ${(values[field.key] - 1) / 9 * 100}%, #e8f0fd ${(values[field.key] - 1) / 9 * 100}%, #e8f0fd 100%)` }}
                />
              </div>
            ))}
            <textarea value={concerns} onChange={(e) => setConcerns(e.target.value)}
              placeholder="Any concerns or questions for your physiotherapist?"
              rows={3} className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-card focus:outline-none focus:border-primary resize-none" />
            <button onClick={handleSubmit}
              className="w-full py-3.5 bg-accent text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" /> Complete Session & Send to Physiotherapist
            </button>
          </div>
        ) : (
          <div className="bg-card border border-emerald-200 rounded-2xl p-10 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-foreground mb-2">Session Complete!</h2>
            <p className="text-muted-foreground text-sm mb-2 max-w-sm mx-auto">All results, confidence scores, and check-in data have been sent to Dr. Sarah Chen.</p>
            <p className="text-primary text-sm italic mb-6">"Excellent work today. You are one step closer to returning stronger."</p>
            <button onClick={onDone} className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors text-sm">Return to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
}
