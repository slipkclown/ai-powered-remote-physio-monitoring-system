import { Activity, AlertCircle, CheckCircle, ChevronLeft, Clock, Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ExerciseMonitorProps {
  onNavigate: (page: string) => void;
}

const FEEDBACK_MESSAGES = [
  { type: "warning", msg: "Bend your knee further — target angle is 90°." },
  { type: "success", msg: "Excellent repetition! Perfect form." },
  { type: "info", msg: "Maintain an upright posture." },
  { type: "success", msg: "Good job! Keep that pace." },
  { type: "warning", msg: "Keep your back straight — avoid leaning forward." },
  { type: "success", msg: "Exercise completed successfully! Great session." },
];

export function ExerciseMonitor({ onNavigate }: ExerciseMonitorProps) {
  const [reps, setReps] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [feedbackIdx, setFeedbackIdx] = useState(0);
  const [kneeAngle, setKneeAngle] = useState(74);
  const [similarity, setSimilarity] = useState(81);
  const [skeletonAnimate, setSkeletonAnimate] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const repRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const TARGET_REPS = 12;

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
      repRef.current = setInterval(() => {
        setReps((r) => {
          if (r < TARGET_REPS) {
            setKneeAngle(Math.floor(75 + Math.random() * 18));
            setSimilarity(Math.floor(78 + Math.random() * 18));
            setFeedbackIdx((i) => (i + 1) % FEEDBACK_MESSAGES.length);
            setSkeletonAnimate((a) => a + 1);
            return r + 1;
          }
          return r;
        });
      }, 3500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (repRef.current) clearInterval(repRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (repRef.current) clearInterval(repRef.current);
    };
  }, [isRunning]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const progress = (reps / TARGET_REPS) * 100;
  const feedback = FEEDBACK_MESSAGES[feedbackIdx];

  const skewY = skeletonAnimate % 2 === 0 ? 0 : -8;

  return (
    <div className="min-h-screen bg-[#0d1f3c] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <button
          onClick={() => onNavigate("patient")}
          className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-cyan-400" />
          <span className="text-blue-300 font-semibold tracking-tight">Recovr</span>
          <span className="text-blue-500">·</span>
          <span className="text-white font-medium">Terminal Knee Extension</span>
          <span className="px-2.5 py-0.5 bg-green-500/20 border border-green-400/30 rounded-full text-green-400 text-xs">● LIVE</span>
        </div>
        <div className="text-blue-300 text-sm">Week 3 · Set 2 of 3</div>
      </div>

      {/* Main 3-panel layout */}
      <div className="flex flex-1 gap-0 overflow-hidden">
        {/* LEFT PANEL — Reference + Instructions */}
        <div className="w-72 bg-[#0d1f3c] border-r border-white/10 flex flex-col p-5 gap-5">
          <div>
            <div className="text-blue-300 text-xs uppercase tracking-wider mb-3">Reference Video</div>
            <div className="bg-black/40 rounded-xl aspect-video flex items-center justify-center border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
              <div className="relative flex items-center justify-center flex-col gap-2">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center border border-white/20 cursor-pointer hover:bg-white/20 transition-colors">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
                <span className="text-white/60 text-xs">Play Reference</span>
              </div>
              <div className="absolute bottom-2 right-2 text-white/50 text-xs">2:14</div>
            </div>
          </div>

          <div>
            <div className="text-blue-300 text-xs uppercase tracking-wider mb-3">Instructions</div>
            <div className="space-y-2.5">
              {[
                "Sit in a chair with both feet flat on the floor.",
                "Slowly straighten the affected knee until fully extended.",
                "Hold for 2 seconds at full extension.",
                "Lower the leg slowly — 4 seconds down.",
                "Complete 12 repetitions per set.",
              ].map((step, i) => (
                <div key={i} className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-primary/30 text-cyan-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-blue-200 text-xs leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-blue-300 text-xs uppercase tracking-wider mb-2">Target</div>
            <div className="text-white text-2xl font-semibold">{TARGET_REPS} Reps</div>
            <div className="text-blue-300 text-xs">× 3 Sets · 60s rest between</div>
            <div className="mt-3 flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-300 text-xs">Audio cues enabled</span>
            </div>
          </div>
        </div>

        {/* CENTER PANEL — Webcam + AI skeleton */}
        <div className="flex-1 bg-black flex flex-col items-center justify-center relative">
          {/* Webcam mockup with AI overlay */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Simulated camera background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f3c] to-[#070e1a] flex items-center justify-center">
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "linear-gradient(rgba(96,165,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }} />
            </div>

            {/* AI Skeleton overlay */}
            <svg
              viewBox="0 0 300 500"
              className="relative z-10 h-[70%] max-h-[420px] transition-all duration-500"
              style={{ transform: `skewY(${skewY}deg)` }}
            >
              {/* Body connections */}
              <line x1="150" y1="80" x2="150" y2="200" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
              <line x1="150" y1="120" x2="90" y2="170" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
              <line x1="90" y1="170" x2="70" y2="230" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
              <line x1="150" y1="120" x2="210" y2="170" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
              <line x1="210" y1="170" x2="230" y2="230" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
              {/* Hips */}
              <line x1="120" y1="200" x2="180" y2="200" stroke="#60a5fa" strokeWidth="3" />
              {/* Left leg */}
              <line x1="120" y1="200" x2="110" y2="310" stroke={skeletonAnimate % 2 === 0 ? "#34d399" : "#60a5fa"} strokeWidth="3.5" strokeLinecap="round" />
              <line x1="110" y1="310" x2="115" y2="420" stroke={skeletonAnimate % 2 === 0 ? "#34d399" : "#f59e0b"} strokeWidth="3.5" strokeLinecap="round" />
              {/* Right leg */}
              <line x1="180" y1="200" x2="190" y2="310" stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="190" y1="310" x2="185" y2="420" stroke="#60a5fa" strokeWidth="3.5" strokeLinecap="round" />

              {/* Keypoints */}
              {[
                [150, 60], [130, 80], [170, 80],   // head + ears
                [150, 120], [90, 170], [210, 170],  // shoulders
                [70, 230], [230, 230],               // elbows
                [120, 200], [180, 200],              // hips
                [110, 310], [190, 310],              // knees
                [115, 420], [185, 420],              // ankles
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r={i < 3 ? 7 : 6} fill="#60a5fa" opacity={0.9} />
              ))}

              {/* Knee angle arc indicator */}
              <path
                d={`M 100 310 A 30 30 0 0 1 120 280`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              <text x="80" y="298" fill="#f59e0b" fontSize="11" fontFamily="monospace">{kneeAngle}°</text>
            </svg>

            {/* Corner labels */}
            <div className="absolute top-4 left-4 text-xs text-blue-400 font-mono">MoveNet · 17kp</div>
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-mono">AI Active</span>
            </div>

            {/* Playback controls */}
            <div className="absolute bottom-6 flex items-center gap-4">
              <button
                onClick={() => { setReps(0); setTimer(0); setIsRunning(false); }}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsRunning((v) => !v)}
                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg"
              >
                {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <div className="text-white/60 text-sm font-mono w-10 text-center">{formatTime(timer)}</div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Metrics & Feedback */}
        <div className="w-72 bg-[#0d1f3c] border-l border-white/10 flex flex-col p-5 gap-4">
          {/* Feedback */}
          <div>
            <div className="text-blue-300 text-xs uppercase tracking-wider mb-3">AI Feedback</div>
            <div className={`p-4 rounded-xl border ${
              feedback.type === "success" ? "bg-emerald-500/10 border-emerald-400/30" :
              feedback.type === "warning" ? "bg-amber-500/10 border-amber-400/30" :
              "bg-blue-500/10 border-blue-400/30"
            }`}>
              <div className="flex gap-2.5 items-start">
                {feedback.type === "success" ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                )}
                <p className={`text-sm leading-relaxed ${
                  feedback.type === "success" ? "text-emerald-300" :
                  feedback.type === "warning" ? "text-amber-300" : "text-blue-300"
                }`}>
                  {feedback.msg}
                </p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-blue-300 text-xs mb-1">Knee Angle</div>
              <div className="text-white text-xl font-bold font-mono">{kneeAngle}°</div>
              <div className="text-blue-400 text-xs">Target: 90°</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-blue-300 text-xs mb-1">Repetitions</div>
              <div className="text-white text-xl font-bold font-mono">{reps}/{TARGET_REPS}</div>
              <div className="text-blue-400 text-xs">Set 2 of 3</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-blue-300 text-xs mb-1">Similarity</div>
              <div className="text-cyan-400 text-xl font-bold font-mono">{similarity}%</div>
              <div className="text-blue-400 text-xs">DTW Score</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-blue-300 text-xs mb-1">Timer</div>
              <div className="text-white text-xl font-bold font-mono">{formatTime(timer)}</div>
              <div className="text-blue-400 text-xs">Session</div>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-blue-300 text-xs">Exercise Progress</span>
              <span className="text-white text-xs font-mono">{Math.round(progress)}%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-blue-400 text-xs">0 reps</span>
              <span className="text-blue-400 text-xs">{TARGET_REPS} reps</span>
            </div>
          </div>

          {/* Joint angles breakdown */}
          <div>
            <div className="text-blue-300 text-xs uppercase tracking-wider mb-3">Joint Angles</div>
            <div className="space-y-2.5">
              {[
                { label: "Left Knee", angle: kneeAngle, target: 90, color: "bg-cyan-400" },
                { label: "Right Knee", angle: 12, target: 15, color: "bg-blue-400" },
                { label: "Left Hip", angle: 95, target: 90, color: "bg-emerald-400" },
                { label: "Spine", angle: 178, target: 180, color: "bg-violet-400" },
              ].map((joint) => (
                <div key={joint.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-blue-300">{joint.label}</span>
                    <span className="text-white font-mono">{joint.angle}°</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${joint.color} rounded-full`} style={{ width: `${Math.min((joint.angle / 180) * 100, 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Finish button */}
          <button
            onClick={() => onNavigate("results")}
            className="mt-auto py-3 bg-accent text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium"
          >
            Finish & View Results
          </button>
        </div>
      </div>
    </div>
  );
}
