import {
  Activity, ArrowRight, Brain, CheckCircle, Heart, Mail, MapPin,
  MessageSquare, Phone, Send, Shield, TrendingUp, Users, Zap,
} from "lucide-react";
import { useRef, useState } from "react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const BRAND = "Recovr";
const TAGLINE = "Human Centered AI Rehabilitation Support for ACL Recovery";
const MISSION = "Our mission is to extend physiotherapy beyond the clinic by helping patients feel supported throughout recovery while providing physiotherapists with meaningful recovery insights for better clinical decisions.";

const ENCOURAGEMENTS = [
  "Recovery is more than movement. It's confidence, reflection, and connection.",
  "Every session brings you one step closer to returning to the activities you love.",
  "Small progress is still progress.",
];

export function HomePage({ onNavigate }: HomePageProps) {
  const whyRef = useRef<HTMLElement>(null);
  const howRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [heroEnc] = useState(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-[#f8fbff]" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground text-lg">{BRAND}</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <button onClick={() => scrollTo(whyRef)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">Why Recovr</button>
            <button onClick={() => scrollTo(howRef)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">How It Works</button>
            <button onClick={() => onNavigate("arch")} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">Architecture</button>
            <button onClick={() => scrollTo(contactRef)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">Contact</button>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={() => onNavigate("patient-login")} className="px-4 py-2 text-sm border border-primary/30 text-primary rounded-xl hover:bg-secondary transition-colors">Patient Login</button>
            <button onClick={() => onNavigate("physio-login")} className="px-4 py-2 text-sm bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors">Physio Login</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#eff6ff] via-[#f8fbff] to-[#ecfdf5]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-blue-100/60 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-emerald-50/80 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 mb-8 text-primary text-xs font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              ACL Rehabilitation · Human-Centred AI
            </div>
            <h1 className="text-[2.75rem] leading-[1.15] font-extrabold text-foreground mb-5 tracking-tight">
              Recovery doesn't stop<br />
              <span className="text-primary">when you leave the clinic.</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-3 max-w-lg">
              Recovr extends physiotherapy beyond clinical appointments through AI-powered rehabilitation monitoring, continuous recovery support, and meaningful collaboration between patients and physiotherapists.
            </p>
            <p className="text-muted-foreground/70 text-sm italic mb-10 max-w-md">{heroEnc}</p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => onNavigate("patient-login")} className="flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                Start Your Recovery <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => scrollTo(howRef)} className="flex items-center gap-2 px-6 py-3.5 bg-white border border-border text-foreground rounded-2xl font-medium hover:bg-secondary transition-colors">
                Watch Demo
              </button>
            </div>
            <div className="flex items-center gap-6 mt-10">
              {[["Patients", "→ Start here"], ["Physiotherapists", "→ Clinic portal"]].map(([role, sub]) => (
                <button key={role} onClick={() => onNavigate(role === "Patients" ? "patient-login" : "physio-login")}
                  className="text-left hover:opacity-80 transition-opacity">
                  <div className="text-foreground text-sm font-semibold">{role}</div>
                  <div className="text-primary text-xs">{sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Hero card */}
          <div className="relative">
            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-white border border-border rounded-2xl px-4 py-3 shadow-lg z-10 flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-foreground text-xs font-semibold">Recovery Score</div>
                <div className="text-emerald-600 text-sm font-bold">88 / 100</div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white border border-border rounded-2xl px-4 py-3 shadow-lg z-10 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-foreground text-xs font-semibold">Confidence</div>
                <div className="text-primary text-sm font-bold">4 / 5 — Quite confident</div>
              </div>
            </div>

            {/* Main card */}
            <div className="bg-white border border-border rounded-3xl p-6 shadow-md">
              <div className="bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] rounded-2xl aspect-video relative overflow-hidden flex items-center justify-center mb-5">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(96,165,250,0.6), transparent 60%)" }} />
                {/* AI skeleton */}
                <svg viewBox="0 0 200 300" className="h-44 relative z-10">
                  <circle cx="100" cy="40" r="17" fill="none" stroke="#93c5fd" strokeWidth="2.5" />
                  <line x1="100" y1="57" x2="100" y2="145" stroke="#93c5fd" strokeWidth="2.5" />
                  <line x1="100" y1="80" x2="62" y2="118" stroke="#93c5fd" strokeWidth="2.5" />
                  <line x1="100" y1="80" x2="138" y2="118" stroke="#93c5fd" strokeWidth="2.5" />
                  <line x1="100" y1="145" x2="76" y2="215" stroke="#6ee7b7" strokeWidth="3" />
                  <line x1="100" y1="145" x2="124" y2="215" stroke="#6ee7b7" strokeWidth="3" />
                  <line x1="76" y1="215" x2="72" y2="268" stroke="#6ee7b7" strokeWidth="2.5" />
                  <line x1="124" y1="215" x2="128" y2="268" stroke="#6ee7b7" strokeWidth="2.5" />
                  {[[100,40],[100,80],[62,118],[138,118],[100,145],[76,215],[124,215],[72,268],[128,268]].map(([cx,cy],i) => (
                    <circle key={i} cx={cx} cy={cy} r={5} fill="#93c5fd" />
                  ))}
                </svg>
                <div className="absolute bottom-3 left-3 right-3 bg-black/30 backdrop-blur-sm rounded-xl px-3 py-2">
                  <p className="text-cyan-200 text-xs">✓ Excellent repetition! Knee angle: 87°</p>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/10 rounded-full px-2.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-xs">AI Active</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[["8 / 12", "Reps"], ["87°", "Knee Angle"], ["94%", "Similarity"]].map(([val, label]) => (
                  <div key={label} className="bg-[#f8fbff] rounded-xl p-3 text-center">
                    <div className="text-primary font-bold text-sm">{val}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY RECOVR ── */}
      <section ref={whyRef} className="py-24 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Why Recovr?</div>
            <h2 className="text-foreground text-3xl font-bold mb-4">Recovery is more than movement.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We built Recovr around one belief — patients heal better when they feel supported, understood, and connected to their care.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Users className="w-6 h-6" />, title: "Never Recover Alone", desc: "Stay connected with your physiotherapist throughout every stage of your recovery journey, not just during clinic appointments.", color: "bg-blue-50 text-primary" },
              { icon: <Heart className="w-6 h-6" />, title: "Recovery Beyond Movement", desc: "Monitor confidence, recovery reflections, adherence, and rehabilitation progress — not just exercises and repetition counts.", color: "bg-emerald-50 text-emerald-600" },
              { icon: <Brain className="w-6 h-6" />, title: "AI That Supports You", desc: "Receive intelligent exercise guidance and real-time movement feedback that helps you perform every rehabilitation session correctly.", color: "bg-violet-50 text-violet-600" },
              { icon: <TrendingUp className="w-6 h-6" />, title: "Meaningful Recovery Insights", desc: "Give physiotherapists a complete understanding of each patient's rehabilitation journey — exercise quality, confidence, and wellbeing.", color: "bg-amber-50 text-amber-600" },
            ].map((card) => (
              <div key={card.title} className="bg-[#f8fbff] border border-border rounded-2xl p-6 hover:shadow-md transition-shadow group">
                <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                  {card.icon}
                </div>
                <h3 className="text-foreground font-semibold text-base mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section ref={howRef} className="py-24 scroll-mt-16 bg-gradient-to-b from-[#f8fbff] to-[#eff6ff]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">How It Works</div>
            <h2 className="text-foreground text-3xl font-bold mb-4">Your recovery, step by step.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A simple, guided journey from prescription to recovery — with support at every stage.</p>
          </div>
          <div className="space-y-0">
            {[
              { num: "01", title: "Begin your rehabilitation programme.", desc: "Your physiotherapist registers you on Recovr, creates a personalised rehabilitation plan, and generates your secure access code.", icon: <Shield className="w-5 h-5" />, side: "left" },
              { num: "02", title: "Perform exercises with AI guidance.", desc: "Open Recovr on any laptop, start your session, and receive real-time AI feedback from TensorFlow.js MoveNet as you exercise.", icon: <Brain className="w-5 h-5" />, side: "right" },
              { num: "03", title: "Reflect on your recovery and complete weekly check-ins.", desc: "Log how you feel, answer guided reflection prompts, and submit your weekly pain, confidence, and motivation check-in.", icon: <Heart className="w-5 h-5" />, side: "left" },
              { num: "04", title: "Physiotherapist reviews your recovery insights.", desc: "Your clinician sees your exercise quality, confidence trends, journal reflections, and check-in responses in one complete view.", icon: <TrendingUp className="w-5 h-5" />, side: "right" },
              { num: "05", title: "Continue recovering with confidence.", desc: "Receive feedback, encouragement, and adjusted rehabilitation plans as your recovery progresses. Never face recovery alone.", icon: <Zap className="w-5 h-5" />, side: "left" },
            ].map((step, i) => (
              <div key={step.num} className={`flex items-start gap-8 py-8 ${i > 0 ? "border-t border-border" : ""}`}>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                  {i < 4 && <div className="w-px flex-1 bg-primary/20 mt-3 h-8" />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="text-primary text-xs font-bold uppercase tracking-widest mb-2">{step.num}</div>
                  <h3 className="text-foreground font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESIGNED FOR EVERYONE ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Designed for Everyone</div>
            <h2 className="text-foreground text-3xl font-bold">Supporting both sides of recovery.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Patients */}
            <div className="bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] border border-primary/15 rounded-3xl p-8">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-foreground font-bold text-xl mb-2">For Patients</h3>
              <p className="text-muted-foreground text-sm mb-6">A recovery companion that guides, supports, and encourages you every day.</p>
              <div className="space-y-3">
                {["AI-guided rehabilitation exercises", "Recovery reflection journal", "Confidence check-ins", "Recovery journey timeline", "Direct messaging with your physiotherapist"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => onNavigate("patient-login")} className="mt-8 flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
                Start Your Recovery <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Physiotherapists */}
            <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] border border-emerald-200/60 rounded-3xl p-8">
              <div className="w-12 h-12 bg-[#0ea472] rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-foreground font-bold text-xl mb-2">For Physiotherapists</h3>
              <p className="text-muted-foreground text-sm mb-6">Complete recovery insights — beyond exercise data — to make better clinical decisions.</p>
              <div className="space-y-3">
                {["Recovery Score and Status per patient", "Exercise assignment by rehabilitation week", "Confidence trends and psychological tracking", "Recovery analytics and reporting", "Secure patient communication"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#0ea472] flex-shrink-0" />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => onNavigate("physio-login")} className="mt-8 flex items-center gap-2 px-5 py-3 bg-[#0ea472] text-white rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-colors">
                Clinician Portal <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECOVERY JOURNEY TIMELINE ── */}
      <section className="py-24 bg-gradient-to-b from-[#f8fbff] to-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">The Recovery Journey</div>
            <h2 className="text-foreground text-3xl font-bold mb-4">Rehabilitation is a journey, not a series of exercises.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Each week is a meaningful step forward. Recovr helps you see the full picture.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/15 -translate-x-1/2 hidden md:block" />
            <div className="space-y-10">
              {[
                { week: "Week 1", title: "Building confidence.", desc: "Begin gentle range-of-motion exercises, establish your routine, and start logging your recovery reflections.", side: "left", milestone: "First session completed" },
                { week: "Week 3", title: "Improving movement quality.", desc: "Introduce strengthening exercises, track knee angle improvement, and check in on confidence levels.", side: "right", milestone: "Knee flexion target reached" },
                { week: "Week 6", title: "Increasing strength.", desc: "Progress to more demanding exercises, monitor adherence, and celebrate meaningful milestones with your physiotherapist.", side: "left", milestone: "Walking independently" },
                { week: "Week 10", title: "Preparing to return to sport.", desc: "Final phase — sport-specific movements, final confidence assessment, and preparation for discharge.", side: "right", milestone: "Return to jogging" },
              ].map((item, i) => (
                <div key={item.week} className={`md:flex items-center gap-8 ${item.side === "right" ? "md:flex-row-reverse" : ""}`}>
                  <div className={`flex-1 ${item.side === "right" ? "md:text-right" : ""}`}>
                    <div className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-primary text-xs font-bold uppercase tracking-widest mb-2">{item.week}</div>
                      <h3 className="text-foreground font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="text-emerald-700 text-xs">{item.milestone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-primary border-4 border-[#f8fbff] flex-shrink-0 items-center justify-center text-white text-xs font-bold z-10">
                    {i + 1}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BEYOND EXERCISE MONITORING ── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Beyond Exercise Monitoring</div>
            <h2 className="text-foreground text-3xl font-bold mb-4">A new standard for rehabilitation support.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Traditional platforms track movement. Recovr supports the complete recovery journey.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#f8fbff] border border-border rounded-2xl p-8">
              <div className="text-muted-foreground text-xs font-semibold uppercase tracking-widest mb-5">Traditional Rehabilitation Platforms</div>
              <div className="space-y-3">
                {["Exercise monitoring", "Movement assessment", "Progress tracking"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-muted-foreground text-sm">
                    <div className="w-5 h-5 rounded-full border border-muted flex items-center justify-center text-xs flex-shrink-0">—</div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] border border-primary/20 rounded-2xl p-8">
              <div className="text-primary text-xs font-semibold uppercase tracking-widest mb-5">Recovr — Human-Centred Recovery</div>
              <div className="space-y-3">
                {[
                  "Exercise monitoring & AI movement feedback",
                  "Confidence tracking & psychological recovery",
                  "Recovery reflections & journal prompts",
                  "Weekly check-ins — pain, confidence, motivation",
                  "Patient engagement & milestone tracking",
                  "Physiotherapist recovery insights",
                  "Human-centred recovery support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-foreground text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT / MISSION ── */}
      <section className="py-24 bg-gradient-to-br from-[#1e3a8a] to-[#2563eb]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Activity className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-white text-3xl font-bold mb-6">About {BRAND}</h2>
          <p className="text-blue-100 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            "{MISSION}"
          </p>
          <p className="text-blue-300 text-sm italic mb-10">{TAGLINE}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => onNavigate("patient-login")} className="px-6 py-3 bg-white text-primary rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors">
              Patient Portal
            </button>
            <button onClick={() => onNavigate("physio-login")} className="px-6 py-3 bg-[#0ea472] text-white rounded-xl font-semibold text-sm hover:bg-emerald-600 transition-colors">
              Physiotherapist Portal
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section ref={contactRef} className="py-24 bg-[#f8fbff] scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</div>
            <h2 className="text-foreground text-3xl font-bold mb-3">Let's Get in Touch</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Have questions, partnership enquiries, or want to learn more about Recovr? We'd love to hear from you.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact info */}
            <div className="md:col-span-2 space-y-6">
              {[
                { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hello@recovr.health", sub: "We respond within 24 hours" },
                { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+60 3-1234 5678", sub: "Mon–Fri, 9 AM–5 PM MYT" },
                { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Universiti Teknologi PETRONAS", sub: "Seri Iskandar, Perak, Malaysia" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-foreground text-sm font-medium">{item.value}</div>
                    <div className="text-muted-foreground text-xs">{item.sub}</div>
                  </div>
                </div>
              ))}

              <div className="bg-secondary border border-primary/15 rounded-2xl p-5">
                <div className="text-foreground text-sm font-semibold mb-2">Business Hours</div>
                <div className="text-muted-foreground text-xs space-y-1">
                  <div>Monday – Friday: 9:00 AM – 5:00 PM</div>
                  <div>Saturday: 9:00 AM – 1:00 PM</div>
                  <div>Sunday & Public Holidays: Closed</div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                <div className="text-emerald-800 text-sm font-semibold mb-1">Partnership Enquiries</div>
                <div className="text-emerald-700 text-xs leading-relaxed">Interested in integrating Recovr into your clinic or healthcare network? Email us at partnerships@recovr.health</div>
              </div>

              <div className="flex gap-3">
                {["𝕏", "in", "f", "📧"].map((icon) => (
                  <button key={icon} className="w-9 h-9 bg-white border border-border rounded-xl text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-center">
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="md:col-span-3">
              {contactSent ? (
                <div className="bg-white border border-emerald-200 rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-foreground font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setContactSent(false)} className="mt-6 text-primary text-sm hover:underline">Send another message</button>
                </div>
              ) : (
                <div className="bg-white border border-border rounded-3xl p-8 shadow-sm">
                  <h3 className="text-foreground font-semibold text-lg mb-6">Send us a message</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { key: "name", label: "Full Name", placeholder: "Your name", type: "text", full: false },
                      { key: "email", label: "Email Address", placeholder: "your@email.com", type: "email", full: false },
                      { key: "subject", label: "Subject", placeholder: "How can we help?", type: "text", full: true },
                    ].map((field) => (
                      <div key={field.key} className={field.full ? "md:col-span-2" : ""}>
                        <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={(contactForm as any)[field.key]}
                          onChange={(e) => setContactForm((f) => ({ ...f, [field.key]: e.target.value }))}
                          className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-[#f8fbff] focus:outline-none focus:border-primary"
                        />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Message</label>
                      <textarea
                        placeholder="Tell us about your project, question, or partnership idea..."
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-[#f8fbff] focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (contactForm.name && contactForm.email) setContactSent(true);
                    }}
                    className="mt-5 flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-10 bg-secondary border border-border rounded-2xl h-40 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-primary/40" />
              <p className="text-sm">Universiti Teknologi PETRONAS, Seri Iskandar, Perak 32610, Malaysia</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0d1f3c] text-blue-200">
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
          {/* Newsletter */}
          <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-5 mb-12">
            <div>
              <div className="text-white font-semibold mb-1">Stay updated with Recovr</div>
              <div className="text-blue-300 text-sm">Get the latest in AI rehabilitation and recovery support.</div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input type="email" placeholder="Your email address" className="flex-1 md:w-64 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-400 text-sm focus:outline-none focus:border-white/40" />
              <button className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex-shrink-0">Subscribe</button>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {[
              { heading: "Platform", links: ["How It Works", "For Patients", "For Physiotherapists", "Architecture"] },
              { heading: "Company", links: ["About Recovr", "Our Mission", "TTP Project", "Partnership Enquiries"] },
              { heading: "Support", links: ["FAQ", "Contact Us", "Business Hours", "Privacy Policy"] },
              { heading: "Legal", links: ["Terms & Conditions", "Privacy Policy", "Cookie Policy", "Disclaimer"] },
            ].map((col) => (
              <div key={col.heading}>
                <div className="text-white text-sm font-semibold mb-4">{col.heading}</div>
                <div className="space-y-2.5">
                  {col.links.map((link) => (
                    <button key={link} className="block text-blue-300 text-sm hover:text-white transition-colors text-left">{link}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-blue-200 font-semibold">Recovr</span>
              <span className="text-blue-400 text-xs">— TTP Project, Universiti Teknologi PETRONAS</span>
            </div>
            <p className="text-blue-400 text-xs text-center">
              © 2026 Recovr. This system supports rehabilitation and should not replace professional medical advice.
            </p>
            <div className="flex gap-3">
              {["𝕏", "in", "f"].map((icon) => (
                <button key={icon} className="w-7 h-7 rounded-lg bg-white/10 text-blue-300 hover:text-white hover:bg-white/20 transition-colors flex items-center justify-center text-xs">
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
