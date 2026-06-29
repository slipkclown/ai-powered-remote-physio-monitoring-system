import { Activity, ArrowDown, ArrowRight, Brain, Camera, ChevronLeft, Database, Monitor, Users, Zap } from "lucide-react";

interface ArchitectureDiagramProps {
  onNavigate: (page: string) => void;
}

const workflow = [
  { step: "Physiotherapist Dashboard", desc: "Clinician creates rehab plan & assigns exercises", icon: <Monitor className="w-4 h-4" />, color: "bg-[#305066] text-white" },
  { step: "Assign Rehabilitation Plan", desc: "ACL / Knee exercise protocol selected", icon: <Activity className="w-4 h-4" />, color: "bg-primary text-white" },
  { step: "Generate Patient Access Code", desc: "Unique time-limited code issued to patient", icon: <Zap className="w-4 h-4" />, color: "bg-primary text-white" },
  { step: "Patient Login", desc: "Credentials or access code authentication", icon: <Users className="w-4 h-4" />, color: "bg-[#EDE7D3] text-[#305066]" },
  { step: "Patient Dashboard", desc: "Patient views assigned exercises & progress", icon: <Monitor className="w-4 h-4" />, color: "bg-[#EDE7D3] text-[#305066]" },
  { step: "Select Assigned Exercise", desc: "Patient picks exercise from their plan", icon: <Activity className="w-4 h-4" />, color: "bg-[#EDE7D3] text-[#305066]" },
  { step: "Reference Exercise Video", desc: "Certified demonstration video for guidance", icon: <Camera className="w-4 h-4" />, color: "bg-[#EDE7D3] text-white" },
  { step: "Webcam Capture", desc: "Live video stream via browser WebRTC API", icon: <Camera className="w-4 h-4" />, color: "bg-[#EDE7D3] text-white" },
  { step: "TensorFlow.js MoveNet", desc: "Lightning/Thunder model — 17 keypoints @ 30fps", icon: <Brain className="w-4 h-4" />, color: "bg-violet-600 text-white" },
  { step: "Body Keypoint Detection", desc: "Nose, shoulders, elbows, wrists, hips, knees, ankles", icon: <Brain className="w-4 h-4" />, color: "bg-violet-600 text-white" },
  { step: "Joint Angle Calculation", desc: "Trigonometric analysis of limb vectors", icon: <Brain className="w-4 h-4" />, color: "bg-violet-600 text-white" },
  { step: "Exercise Recognition & Rep Counting", desc: "Phase detection via angle thresholds", icon: <Brain className="w-4 h-4" />, color: "bg-violet-600 text-white" },
  { step: "Dynamic Time Warping (DTW)", desc: "Similarity score vs. reference motion sequence", icon: <Brain className="w-4 h-4" />, color: "bg-violet-700 text-white" },
  { step: "Real-Time Feedback Engine", desc: "Rule-based + ML corrective message generation", icon: <Zap className="w-4 h-4" />, color: "bg-amber-600 text-white" },
  { step: "Performance Evaluation", desc: "Score computation: angle, similarity, consistency", icon: <Activity className="w-4 h-4" />, color: "bg-amber-600 text-white" },
  { step: "Database Storage", desc: "MySQL / Firebase: patient records, sessions, angles", icon: <Database className="w-4 h-4" />, color: "bg-emerald-700 text-white" },
  { step: "Physiotherapist Dashboard", desc: "Reports, trend charts, error analysis, comparisons", icon: <Monitor className="w-4 h-4" />, color: "bg-[#305066] text-white" },
];

const aiTechs = [
  "TensorFlow.js", "MoveNet Pose Estimation", "Body Skeleton Tracking",
  "Joint Angle Calculation", "Exercise Recognition", "Repetition Counting",
  "Dynamic Time Warping (DTW)", "Real-Time Feedback Generation",
];

const feedbackMessages = [
  { type: "warning", msg: "Bend your knee further." },
  { type: "warning", msg: "Keep your back straight." },
  { type: "info", msg: "Maintain proper posture." },
  { type: "success", msg: "Excellent repetition." },
  { type: "success", msg: "Exercise completed successfully." },
];

const dbFields = [
  "Patient information", "Assigned exercises", "Session dates",
  "Repetition counts", "Joint angle measurements", "Similarity scores",
  "Exercise reports", "Progress history",
];

const physioOutputs = [
  "Patient list", "Weekly performance trends", "Rehabilitation progress charts",
  "Assigned exercise plans", "Common movement errors", "Exercise reports",
];

export function ArchitectureDiagram({ onNavigate }: ArchitectureDiagramProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium">System Architecture · Recovr Recovery</span>
          </div>
          <div className="text-muted-foreground text-sm">AI Powered Remote Physiotherapy</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-foreground mb-2">System Architecture</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            End-to-end workflow of the AI Powered Remote Physiotherapy Monitoring System — from clinical prescription to patient recovery.
          </p>
        </div>

        {/* User roles */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[
            {
              role: "Physiotherapist",
              color: "border-primary/30 bg-primary/5",
              headerBg: "bg-[#305066]",
              icon: <Monitor className="w-5 h-5 text-white" />,
              items: [
                "Registers and manages patients",
                "Creates personalised rehabilitation plans",
                "Assigns ACL or knee exercises",
                "Generates unique patient access codes",
                "Monitors patient progress remotely",
                "Reviews exercise reports and movement errors",
              ],
            },
            {
              role: "Patient",
              color: "border-[#EDE7D3]/30 bg-[#EDE7D3]/10",
              headerBg: "bg-[#EDE7D3]",
              icon: <Users className="w-5 h-5 text-white" />,
              items: [
                "Accesses via laptop or desktop browser",
                "Logs in with credentials or access code",
                "Views assigned rehabilitation exercises",
                "Watches reference videos before starting",
                "Performs exercises using webcam",
                "Receives immediate corrective feedback",
                "Views results and progress history",
              ],
            },
          ].map((role) => (
            <div key={role.role} className={`border rounded-2xl overflow-hidden ${role.color}`}>
              <div className={`${role.headerBg} px-5 py-3.5 flex items-center gap-2.5`}>
                {role.icon}
                <span className="text-white font-medium">{role.role}</span>
              </div>
              <ul className="p-5 space-y-2.5">
                {role.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Workflow */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <h2 className="text-foreground mb-8 text-center">AI Processing Workflow</h2>
          <div className="flex flex-col items-center gap-0">
            {workflow.map((node, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`${node.color} rounded-xl px-6 py-3 flex items-center gap-3 min-w-[340px] shadow-sm`}>
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    {node.icon}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{node.step}</div>
                    <div className="opacity-75 text-xs">{node.desc}</div>
                  </div>
                </div>
                {i < workflow.length - 1 && (
                  <div className="flex items-center justify-center h-7">
                    <ArrowDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3-column detail */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* AI Engine */}
          <div className="bg-card border border-violet-200 rounded-2xl overflow-hidden">
            <div className="bg-violet-600 px-5 py-3.5 flex items-center gap-2.5">
              <Brain className="w-5 h-5 text-white" />
              <span className="text-white font-medium">AI Engine</span>
            </div>
            <div className="p-5">
              <div className="space-y-2 mb-5">
                {aiTechs.map((tech) => (
                  <div key={tech} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    {tech}
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4">
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Sample Feedback</div>
                {feedbackMessages.map((fb, i) => (
                  <div key={i} className={`text-xs px-3 py-1.5 rounded-lg mb-1.5 ${
                    fb.type === "success" ? "bg-emerald-50 text-emerald-700" :
                    fb.type === "warning" ? "bg-amber-50 text-amber-700" :
                    "bg-blue-50 text-blue-700"
                  }`}>
                    "{fb.msg}"
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Database */}
          <div className="bg-card border border-emerald-200 rounded-2xl overflow-hidden">
            <div className="bg-emerald-700 px-5 py-3.5 flex items-center gap-2.5">
              <Database className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Database Storage</span>
            </div>
            <div className="p-5">
              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Stored Data Fields</div>
              <div className="space-y-2">
                {dbFields.map((field) => (
                  <div key={field} className="flex items-center gap-2.5 text-sm text-foreground bg-emerald-50 rounded-lg px-3 py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {field}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Physio outputs */}
          <div className="bg-card border border-blue-200 rounded-2xl overflow-hidden">
            <div className="bg-[#305066] px-5 py-3.5 flex items-center gap-2.5">
              <Monitor className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Physiotherapist Outputs</span>
            </div>
            <div className="p-5">
              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-3">Dashboard Features</div>
              <div className="space-y-2">
                {physioOutputs.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-foreground bg-secondary rounded-lg px-3 py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sitemap */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <h2 className="text-foreground mb-6 text-center">Website Sitemap</h2>
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-0">
              {/* Home */}
              <div className="bg-[#305066] text-white rounded-xl px-6 py-3 min-w-[180px] text-center font-medium text-sm">
                Home
              </div>
              <div className="flex h-8 items-center justify-center gap-48">
                <ArrowDown className="w-4 h-4 text-muted-foreground" />
                <ArrowDown className="w-4 h-4 text-muted-foreground" />
              </div>
              {/* Two branches */}
              <div className="flex gap-48 items-start">
                {/* Patient branch */}
                <div className="flex flex-col items-center gap-0">
                  <div className="bg-[#EDE7D3] text-[#305066] rounded-xl px-5 py-2.5 min-w-[160px] text-center text-sm font-medium">
                    Patient Login
                  </div>
                  <ArrowDown className="w-4 h-4 text-muted-foreground my-2" />
                  <div className="bg-[#EDE7D3] text-white rounded-xl px-5 py-2.5 min-w-[160px] text-center text-sm font-medium">
                    Patient Dashboard
                  </div>
                  <ArrowDown className="w-4 h-4 text-muted-foreground my-2" />
                  <div className="flex flex-col gap-2">
                    {["Assigned Exercises", "Exercise Monitoring", "Exercise Results", "Progress History"].map((item) => (
                      <div key={item} className="bg-cyan-50 border border-cyan-200 text-cyan-700 rounded-lg px-4 py-2 text-xs text-center min-w-[150px]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Physio branch */}
                <div className="flex flex-col items-center gap-0">
                  <div className="bg-primary text-white rounded-xl px-5 py-2.5 min-w-[160px] text-center text-sm font-medium">
                    Physio Login
                  </div>
                  <ArrowDown className="w-4 h-4 text-muted-foreground my-2" />
                  <div className="bg-[#305066] text-white rounded-xl px-5 py-2.5 min-w-[160px] text-center text-sm font-medium">
                    Physio Dashboard
                  </div>
                  <ArrowDown className="w-4 h-4 text-muted-foreground my-2" />
                  <div className="flex flex-col gap-2">
                    {["Patient Management", "Exercise Assignment", "Reports", "Progress Monitoring"].map((item) => (
                      <div key={item} className="bg-blue-50 border border-blue-200 text-primary rounded-lg px-4 py-2 text-xs text-center min-w-[150px]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
          <p className="text-amber-800 text-sm leading-relaxed max-w-3xl mx-auto">
            ⚠️ <strong>Disclaimer:</strong> This system is intended to support remote ACL and knee rehabilitation through AI-assisted exercise monitoring and should not replace professional medical diagnosis or treatment.
          </p>
          <p className="text-amber-600 text-xs mt-2">TTP University Technopreneurship Team Project · AI Powered Remote Physiotherapy Monitoring System</p>
        </div>
      </div>
    </div>
  );
}
