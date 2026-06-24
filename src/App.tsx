import { Activity, Brain, Camera, ChevronRight, Heart, Monitor, Shield, Users, Zap } from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Pose Estimation",
      desc: "TensorFlow.js MoveNet tracks 17 body keypoints in real time with millisecond latency.",
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Webcam Monitoring",
      desc: "Patients exercise at home using any standard webcam — no wearables required.",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-Time Feedback",
      desc: "Instant corrective cues guide patients through each repetition safely and accurately.",
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Remote Dashboards",
      desc: "Physiotherapists review session reports, joint angles, and progress trends remotely.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "DTW Comparison",
      desc: "Dynamic Time Warping measures movement similarity against certified reference videos.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Access Codes",
      desc: "Clinicians generate unique codes so patients join the platform without friction.",
    },
  ];

  const steps = [
    { num: "01", title: "Physiotherapist Creates Plan", desc: "The clinician registers the patient, selects ACL or knee exercises, and generates a secure access code." },
    { num: "02", title: "Patient Logs In", desc: "The patient opens the website on a laptop, enters credentials or the access code, and views their assigned exercises." },
    { num: "03", title: "Watch Reference Video", desc: "A certified reference exercise video plays so the patient understands the correct movement before starting." },
    { num: "04", title: "AI Monitors Exercise", desc: "MoveNet captures the webcam feed, maps 17 body keypoints, calculates joint angles, and counts repetitions in real time." },
    { num: "05", title: "Corrective Feedback", desc: "The feedback engine compares movements using DTW and delivers instant audio-visual cues — 'Bend your knee further.''" },
    { num: "06", title: "Physiotherapist Reviews", desc: "Session data, similarity scores, and common errors sync to the dashboard so the clinician monitors recovery remotely." },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-foreground">PhysioAI</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate("arch")}
              className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Architecture
            </button>
            <button
              onClick={() => onNavigate("patient-login")}
              className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-secondary transition-colors"
            >
              Patient Login
            </button>
            <button
              onClick={() => onNavigate("physio-login")}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-700 transition-colors"
            >
              Physio Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#0891b2] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-1/4 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-cyan-400 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-blue-100">AI-Powered · ACL & Knee Rehab</span>
            </div>
            <h1 className="text-5xl leading-tight mb-6">
              AI Powered Remote<br />
              <span className="text-cyan-300">Physiotherapy</span><br />
              Monitoring System
            </h1>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-lg">
              Bringing clinical-grade ACL and knee rehabilitation into the home through real-time AI pose estimation, corrective feedback, and remote physiotherapist oversight.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => onNavigate("patient-login")}
                className="px-6 py-3 bg-white text-primary rounded-xl font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                Patient Portal <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("physio-login")}
                className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2"
              >
                Physiotherapist Login <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Visual mockup */}
          <div className="relative">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-blue-200 text-sm">Exercise Monitor</span>
              </div>
              <div className="bg-[#0d1f3c] rounded-xl aspect-video relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Skeleton figure */}
                  <svg viewBox="0 0 200 300" className="h-48 opacity-80">
                    <circle cx="100" cy="40" r="18" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                    <line x1="100" y1="58" x2="100" y2="150" stroke="#60a5fa" strokeWidth="2.5" />
                    <line x1="100" y1="80" x2="60" y2="120" stroke="#60a5fa" strokeWidth="2.5" />
                    <line x1="100" y1="80" x2="140" y2="120" stroke="#60a5fa" strokeWidth="2.5" />
                    <line x1="100" y1="150" x2="75" y2="220" stroke="#34d399" strokeWidth="2.5" />
                    <line x1="100" y1="150" x2="125" y2="220" stroke="#34d399" strokeWidth="2.5" />
                    <line x1="75" y1="220" x2="70" y2="270" stroke="#34d399" strokeWidth="2.5" />
                    <line x1="125" y1="220" x2="130" y2="270" stroke="#34d399" strokeWidth="2.5" />
                    {[40, 80, 120, 150, 60, 140, 75, 125, 70, 130, 220, 220, 270, 270].map((_, i) => null)}
                    {[[100,40],[100,80],[60,120],[140,120],[100,150],[75,220],[125,220],[70,270],[130,270]].map(([cx,cy],i) => (
                      <circle key={i} cx={cx} cy={cy} r="5" fill="#60a5fa" />
                    ))}
                    <circle cx="75" cy="220" r="5" fill="#f59e0b" />
                    <circle cx="125" cy="220" r="5" fill="#f59e0b" />
                  </svg>
                </div>
                <div className="absolute top-3 right-3 bg-green-500/20 border border-green-400/40 rounded-lg px-3 py-1.5">
                  <span className="text-green-300 text-xs">● LIVE</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-black/50 rounded-lg px-3 py-2">
                  <p className="text-cyan-300 text-xs">✓ Excellent repetition! Knee angle: 87°</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[["Reps", "8 / 12"], ["Knee Angle", "87°"], ["Score", "94%"]].map(([label, val]) => (
                  <div key={label} className="bg-white/10 rounded-lg p-2.5 text-center">
                    <div className="text-cyan-300 text-xs mb-0.5">{label}</div>
                    <div className="text-white text-sm font-semibold">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-foreground mb-3">Key Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete rehabilitation ecosystem connecting patients and physiotherapists through intelligent AI-assisted monitoring.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group">
              <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                {f.icon}
              </div>
              <h3 className="text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From clinical prescription to patient recovery — six seamless steps powered by AI.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="relative">
                <div className="text-5xl font-bold text-secondary text-primary/10 mb-3 leading-none">{s.num}</div>
                <h3 className="text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <Users className="w-12 h-12 mx-auto mb-6 text-cyan-300" />
          <h2 className="text-white mb-4">Ready to Begin Your Rehabilitation Journey?</h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            Patients can start immediately with their access code. Physiotherapists can register and manage their entire caseload from one dashboard.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => onNavigate("patient-login")} className="px-7 py-3 bg-white text-primary rounded-xl hover:bg-blue-50 transition-colors">
              Patient Login
            </button>
            <button onClick={() => onNavigate("physio-login")} className="px-7 py-3 bg-accent text-white rounded-xl hover:bg-emerald-600 transition-colors">
              Physiotherapist Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d1f3c] text-blue-300 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-blue-200">PhysioAI — TTP University Project</span>
          </div>
          <p className="text-xs text-blue-400 max-w-md text-center md:text-right">
            This system is intended to support remote ACL and knee rehabilitation through AI-assisted exercise monitoring and should not replace professional medical diagnosis or treatment.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;