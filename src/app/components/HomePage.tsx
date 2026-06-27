import { Activity, Brain, Camera, ChevronRight, Heart, Monitor, Shield, Users, Zap } from "lucide-react";
import { useRef } from "react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const BRAND = "Recovr";
const TAGLINE = "Human Centered AI Rehabilitation Support for ACL Recovery";
const PROJECT_TITLE = "Development of a Human Centered AI Powered Monitoring and Recovery Support System for Home Based ACL Rehabilitation of Injured Athletes";
const FOOTER = "Recovr – TTP Project by Universiti Teknologi PETRONAS";

export function HomePage({ onNavigate }: HomePageProps) {
  const featuresRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const scrollTo = (ref: React.RefObject<HTMLElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const features = [
    { icon: <Brain className="w-6 h-6" />, title: "AI Pose Estimation", desc: "TensorFlow.js MoveNet tracks 17 body keypoints in real time with millisecond latency." },
    { icon: <Camera className="w-6 h-6" />, title: "Webcam Monitoring", desc: "Patients exercise at home using any standard webcam — no wearables required." },
    { icon: <Activity className="w-6 h-6" />, title: "Real-Time Feedback", desc: "Instant corrective cues guide patients through each repetition safely and accurately." },
    { icon: <Monitor className="w-6 h-6" />, title: "Remote Dashboards", desc: "Physiotherapists review session reports, joint angles, and progress trends remotely." },
    { icon: <Zap className="w-6 h-6" />, title: "DTW Comparison", desc: "Dynamic Time Warping measures movement similarity against certified reference videos." },
    { icon: <Heart className="w-6 h-6" />, title: "Human Centered Support", desc: "Confidence tracking, recovery journal, weekly check-ins, and a direct messaging bridge." },
    { icon: <Shield className="w-6 h-6" />, title: "Secure Access Codes", desc: "Clinicians generate unique codes so patients join the platform without friction." },
    { icon: <Users className="w-6 h-6" />, title: "Recovery Milestones", desc: "Visual milestone tracker celebrates achievements from first week to return to jogging." },
  ];

  const steps = [
    { num: "01", title: "Physiotherapist Creates Plan", desc: "The clinician registers the patient, selects ACL exercises, and generates a secure access code." },
    { num: "02", title: "Patient Logs In", desc: "The patient opens Recovr in a browser, enters their credentials, and views assigned exercises." },
    { num: "03", title: "Watch Reference Video", desc: "A certified reference video plays so the patient understands the correct movement before starting." },
    { num: "04", title: "AI Monitors Exercise", desc: "MoveNet captures the webcam feed, maps 17 body keypoints, calculates joint angles, and counts repetitions." },
    { num: "05", title: "Corrective Feedback", desc: "The feedback engine compares movements using DTW and delivers instant cues — 'Bend your knee further.'" },
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
            <span className="font-bold text-foreground text-lg tracking-tight">{BRAND}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scrollTo(featuresRef)} className="px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors text-sm">Key Features</button>
            <button onClick={() => scrollTo(howItWorksRef)} className="px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors text-sm">How It Works</button>
            <button onClick={() => onNavigate("arch")} className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors text-sm">Architecture</button>
            <button onClick={() => onNavigate("patient-login")} className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-secondary transition-colors text-sm">Patient Login</button>
            <button onClick={() => onNavigate("physio-login")} className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-700 transition-colors text-sm">Physio Login</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#0891b2] text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-16 left-1/4 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-cyan-400 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-blue-100">AI Powered ACL Rehabilitation Human Centered</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-3 tracking-tight">{BRAND}</h1>
            <p className="text-cyan-200 text-lg font-medium mb-3">{TAGLINE}</p>
            <p className="text-blue-300 text-xs mb-8 leading-relaxed max-w-lg italic opacity-80">{PROJECT_TITLE}</p>
            <div className="flex gap-4 flex-wrap">
              <button onClick={() => onNavigate("patient-login")} className="px-6 py-3 bg-white text-primary rounded-xl font-medium hover:bg-blue-50 transition-colors flex items-center gap-2">
                Patient Portal <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate("physio-login")} className="px-6 py-3 bg-accent text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2">
                Physiotherapist Login <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-5 mt-5">
              <button onClick={() => scrollTo(featuresRef)} className="text-blue-300 text-sm hover:text-white transition-colors underline underline-offset-4">Key Features ↓</button>
              <button onClick={() => scrollTo(howItWorksRef)} className="text-blue-300 text-sm hover:text-white transition-colors underline underline-offset-4">How It Works ↓</button>
            </div>
          </div>
          {/* Live mockup card */}
          <div className="relative">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-blue-200 text-sm">{BRAND} · Exercise Monitor</span>
              </div>
              <div className="bg-[#0d1f3c] rounded-xl aspect-video relative overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 200 300" className="h-48 opacity-80">
                  <circle cx="100" cy="40" r="18" fill="none" stroke="#60a5fa" strokeWidth="2.5" />
                  <line x1="100" y1="58" x2="100" y2="150" stroke="#60a5fa" strokeWidth="2.5" />
                  <line x1="100" y1="80" x2="60" y2="120" stroke="#60a5fa" strokeWidth="2.5" />
                  <line x1="100" y1="80" x2="140" y2="120" stroke="#60a5fa" strokeWidth="2.5" />
                  <line x1="100" y1="150" x2="75" y2="220" stroke="#34d399" strokeWidth="2.5" />
                  <line x1="100" y1="150" x2="125" y2="220" stroke="#34d399" strokeWidth="2.5" />
                  <line x1="75" y1="220" x2="70" y2="270" stroke="#34d399" strokeWidth="2.5" />
                  <line x1="125" y1="220" x2="130" y2="270" stroke="#34d399" strokeWidth="2.5" />
                  {[[100,40],[100,80],[60,120],[140,120],[100,150],[75,220],[125,220],[70,270],[130,270]].map(([cx,cy],i) => (
                    <circle key={i} cx={cx} cy={cy} r="5" fill="#60a5fa" />
                  ))}
                </svg>
                <div className="absolute top-3 right-3 bg-green-500/20 border border-green-400/40 rounded-lg px-3 py-1.5">
                  <span className="text-green-300 text-xs">● LIVE</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-black/50 rounded-lg px-3 py-2">
                  <p className="text-cyan-300 text-xs">✓ Excellent repetition! Knee angle: 87°</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[["Reps","8 / 12"],["Knee Angle","87°"],["Score","94%"]].map(([label,val]) => (
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
      <section ref={featuresRef} id="features" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-16">
        <div className="text-center mb-14">
          <h2 className="text-foreground mb-3">Key Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A complete human centered rehabilitation ecosystem combining AI exercise monitoring with psychological recovery support.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:border-primary/30 transition-all group">
              <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">{f.icon}</div>
              <h3 className="text-foreground text-sm mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksRef} id="how-it-works" className="bg-white py-24 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From clinical prescription to patient recovery — six seamless steps powered by AI.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num}>
                <div className="text-5xl font-bold text-primary/10 mb-3 leading-none">{s.num}</div>
                <h3 className="text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Recovr */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-foreground mb-3">Why Recovr?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conventional rehabilitation systems track only physical movement. Recovr goes further — combining AI exercise monitoring with the human-centered psychological support athletes need to return stronger.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Traditional */}
          <div className="bg-muted/50 border border-border rounded-2xl p-8">
            <div className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium mb-5">Traditional Rehabilitation</div>
            <div className="space-y-3">
              {[
                "In-clinic exercises only — limited home accessibility",
                "No real-time movement correction",
                "Progress tracked manually by clinician",
                "No psychological support or confidence monitoring",
                "No patient–physiotherapist messaging between sessions",
                "No recovery journaling or milestone tracking",
                "One-size-fits-all exercise prescription",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5 text-muted-foreground text-xs">✗</div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          {/* Recovr */}
          <div className="bg-gradient-to-br from-[#1e3a8a]/5 to-[#1d4ed8]/10 border border-primary/20 rounded-2xl p-8">
            <div className="inline-block px-3 py-1 rounded-full bg-secondary text-primary text-xs font-bold mb-5">Recovr — Human-Centered AI Rehabilitation</div>
            <div className="space-y-3">
              {[
                { label: "AI Exercise Monitoring", desc: "TensorFlow.js MoveNet tracks 17 keypoints in real time" },
                { label: "Performance Assessment", desc: "DTW comparison scores every repetition objectively" },
                { label: "Confidence Tracking", desc: "Weekly questionnaire monitors psychological recovery" },
                { label: "Recovery Journaling", desc: "Patients document experiences; physios provide feedback" },
                { label: "Direct Communication", desc: "In-platform messaging between patient and physiotherapist" },
                { label: "Weekly Psychological Check-Ins", desc: "Pain, confidence, and motivation tracked continuously" },
                { label: "Motivational Support", desc: "Milestone tracker and encouragement throughout recovery" },
                { label: "Remote Physiotherapist Oversight", desc: "Full dashboard with trend charts and session reports" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-xs">✓</div>
                  <div>
                    <span className="text-foreground font-medium">{item.label}</span>
                    <span className="text-muted-foreground"> — {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <Users className="w-12 h-12 mx-auto mb-6 text-cyan-300" />
          <h2 className="text-white mb-2">{BRAND}</h2>
          <p className="text-cyan-200 text-sm italic mb-6 max-w-xl mx-auto">{TAGLINE}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => onNavigate("patient-login")} className="px-7 py-3 bg-white text-primary rounded-xl hover:bg-blue-50 transition-colors">Patient Login</button>
            <button onClick={() => onNavigate("physio-login")} className="px-7 py-3 bg-accent text-white rounded-xl hover:bg-emerald-600 transition-colors">Physiotherapist Login</button>
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
            <span className="text-blue-200">{FOOTER}</span>
          </div>
          <p className="text-xs text-blue-400 max-w-md text-center md:text-right">
            This system is intended to support remote ACL and knee rehabilitation through AI assisted exercise monitoring and should not replace professional medical diagnosis or treatment.
          </p>
        </div>
      </footer>
    </div>
  );
}
