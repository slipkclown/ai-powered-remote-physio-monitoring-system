import { CheckCircle, ClipboardList } from "lucide-react";
import { PatientLayout } from "./PatientLayout";
import { useState } from "react";
import { toast } from "sonner";
import { useRehab } from "../context/RehabContext";

interface WeeklyCheckInProps {
  onNavigate: (page: string) => void;
  afterExercise?: boolean;
}

const MOTIVATIONAL_MSGS = [
  "Excellent work today.",
  "Consistency leads to recovery.",
  "You are one step closer to returning stronger.",
  "Small progress is still progress.",
];

const sliderFields = [
  { key: "pain" as const, label: "Pain Level", description: "How much pain are you experiencing in your knee today?", lowLabel: "No pain", highLabel: "Severe pain", color: "#ef4444", activeClass: "text-red-600", bg: "bg-red-50" },
  { key: "confidence" as const, label: "Confidence Level", description: "How confident do you feel using your injured leg?", lowLabel: "Not confident", highLabel: "Very confident", color: "#1d4ed8", activeClass: "text-primary", bg: "bg-blue-50" },
  { key: "motivation" as const, label: "Motivation Level", description: "How motivated do you feel to continue your rehabilitation?", lowLabel: "Low motivation", highLabel: "Highly motivated", color: "#10b981", activeClass: "text-emerald-600", bg: "bg-emerald-50" },
];

export function WeeklyCheckIn({ onNavigate, afterExercise = false }: WeeklyCheckInProps) {
  const { addCheckIn } = useRehab();
  const [values, setValues] = useState({ pain: 3, confidence: 3, motivation: 3 });
  const [concerns, setConcerns] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    addCheckIn({ date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), patientName: "Muhammad Arif", ...values, concern: concerns });
    setSubmitted(true);
    const msg = MOTIVATIONAL_MSGS[Math.floor(Math.random() * MOTIVATIONAL_MSGS.length)];
    toast.success("Weekly check-in submitted!", { description: `${msg} Your responses have been sent to Dr. Sarah Chen.` });
  };

  return (
    <PatientLayout onNavigate={onNavigate} activePage="checkin">
      <div className="p-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ClipboardList className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-foreground">Weekly Check-In</h1>
            <p className="text-muted-foreground text-sm">Help your physiotherapist understand how you're doing beyond the exercises. This takes about 2 minutes.</p>
          </div>
          {afterExercise && <div className="ml-auto text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full flex-shrink-0">Step 3 of 3</div>}
        </div>
        {afterExercise && (
          <div className="bg-secondary border border-border rounded-xl p-4 mb-6 flex items-center gap-3">
            <ClipboardList className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-foreground text-sm">Almost done! Complete this final check-in to close your exercise session and send all data to your physiotherapist.</p>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-foreground mb-1">Weekly Check-In</h1>
          <p className="text-muted-foreground text-sm">Help your physiotherapist understand how you are doing beyond the exercises. This takes about 2 minutes.</p>
        </div>

        {!submitted ? (
          <div className="space-y-6">
            {sliderFields.map((field) => (
              <div key={field.key} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-foreground">{field.label}</h3>
                  <span className={`text-2xl font-bold ${field.activeClass}`}>
                    {values[field.key]}<span className="text-sm font-normal text-muted-foreground"> / 10</span>
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-5">{field.description}</p>
                <input type="range" min={1} max={10} value={values[field.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: parseInt(e.target.value) }))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, ${field.color} 0%, ${field.color} ${(values[field.key] - 1) / 9 * 100}%, #e8f0fd ${(values[field.key] - 1) / 9 * 100}%, #e8f0fd 100%)` }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>{field.lowLabel}</span>
                  <span>{field.highLabel}</span>
                </div>
              </div>
            ))}

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-foreground mb-2">Recovery Concerns</h3>
              <p className="text-muted-foreground text-sm mb-4">Share any concerns, questions, or difficulties you are experiencing with your rehabilitation.</p>
              <textarea value={concerns} onChange={(e) => setConcerns(e.target.value)}
                placeholder="e.g. My knee feels swollen after the step-up exercises..."
                rows={4} className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary resize-none" />
            </div>

            <div className="bg-secondary border border-border rounded-2xl p-5">
              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Summary Preview</div>
              <div className="grid grid-cols-3 gap-4">
                {sliderFields.map((f) => (
                  <div key={f.key} className="text-center">
                    <div className="text-muted-foreground text-xs mb-1">{f.label}</div>
                    <div className={`text-xl font-bold ${f.activeClass}`}>{values[f.key]}/10</div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handleSubmit}
              className="w-full py-3.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
              <ClipboardList className="w-5 h-5" />
              {afterExercise ? "Submit Check-In & Complete Session" : "Submit Weekly Check-In"}
            </button>
          </div>
        ) : (
          <div className="bg-card border border-emerald-200 rounded-2xl p-10 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-foreground mb-2">Check-In Submitted!</h2>
            <p className="text-muted-foreground text-sm mb-5 max-w-sm mx-auto">
              Your weekly check-in has been sent to Dr. Sarah Chen. She will review it before your next session.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6 max-w-xs mx-auto">
              {sliderFields.map((f) => (
                <div key={f.key} className={`${f.bg} rounded-xl p-3 text-center`}>
                  <div className="text-xs text-muted-foreground mb-1">{f.label}</div>
                  <div className={`font-bold ${f.activeClass}`}>{values[f.key]}/10</div>
                </div>
              ))}
            </div>
            <p className="text-primary text-sm italic mb-6">"Consistency leads to recovery."</p>
            <button onClick={() => onNavigate("patient")}
              className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors text-sm">
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </PatientLayout>
  );
}
