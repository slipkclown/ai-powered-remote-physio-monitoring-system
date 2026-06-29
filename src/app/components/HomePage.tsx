import {
  Activity, ArrowRight, Brain, CheckCircle, Heart, Mail, MapPin,
  MessageSquare, Phone, Quote, Send, Shield, Star, TrendingUp, Users, Zap,
} from "lucide-react";
import { useRef, useState } from "react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const BRAND = "Recovr";
const TAGLINE = "Human-Centred AI Rehabilitation Support for ACL Recovery";
const MISSION = "Our mission is to extend physiotherapy beyond the clinic by helping patients feel supported throughout recovery while providing physiotherapists with meaningful recovery insights for better clinical decisions.";
const ENCOURAGEMENTS = [
  "Recovery is more than movement. It is confidence, reflection, and connection.",
  "Every session brings you one step closer to the activities you love.",
  "Small progress is still progress.",
];

/* ── Two-colour system ──────────────────────────────────
   CREAM  #FAF4E5  – background, cards, warm sections
   OCEAN  #305066  – nav, sidebar, text, buttons, footer
──────────────────────────────────────────────────────── */
const CREAM = "#FAF4E5";
const OCEAN = "#305066";
const OCEAN_MID = "#3d6480";   // lighter ocean for dividers/hover
const MUTED  = "#5a7485";      // muted text
const BORDER = "rgba(48,80,102,0.13)";

const SERIF = "'Cormorant Garamond', 'DM Serif Display', serif";

export function HomePage({ onNavigate }: HomePageProps) {
  const whyRef    = useRef<HTMLElement>(null);
  const howRef    = useRef<HTMLElement>(null);
  const plansRef  = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [heroEnc] = useState(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div style={{ background: CREAM, fontFamily: "'Manrope','Inter',sans-serif", color: OCEAN }}>

      {/* ── NAV (Deep Ocean) ── */}
      <nav style={{ background: OCEAN }} className="sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/20">
              <Activity className="w-4 h-4" style={{ color: CREAM }} />
            </div>
            <span className="font-bold text-lg" style={{ color: CREAM }}>{BRAND}</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {[["Why Recovr", () => scrollTo(whyRef)], ["How It Works", () => scrollTo(howRef)], ["Plans", () => scrollTo(plansRef)], ["Architecture", () => onNavigate("arch")], ["Contact", () => scrollTo(contactRef)]].map(([label, fn]) => (
              <button key={label as string} onClick={fn as () => void}
                className="px-4 py-2 text-sm rounded-lg transition-colors"
                style={{ color: "rgba(250,244,229,0.7)" }}
                onMouseEnter={e => (e.currentTarget.style.color = CREAM)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(250,244,229,0.7)")}>
                {label as string}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={() => onNavigate("patient-login")}
              className="px-4 py-2 text-sm rounded-xl border transition-colors"
              style={{ color: CREAM, borderColor: "rgba(250,244,229,0.3)" }}>
              Patient Login
            </button>
            <button onClick={() => onNavigate("physio-login")}
              className="px-4 py-2 text-sm font-semibold rounded-xl transition-all hover:opacity-90"
              style={{ background: CREAM, color: OCEAN }}>
              Physio Login
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO (Cream) ── */}
      <section style={{ background: CREAM }} className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest mb-8"
              style={{ borderColor: BORDER, color: MUTED }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: OCEAN }} />
              ACL Rehabilitation · Human-Centred AI
            </div>
            <h1 style={{ fontFamily: SERIF, color: OCEAN, fontSize: "3.6rem", lineHeight: "1.05", fontWeight: 500, letterSpacing: "-0.01em" }} className="mb-5">
              Recovery doesn't stop<br />
              <em>when you leave the clinic.</em>
            </h1>
            <p className="text-lg leading-relaxed mb-3 max-w-lg" style={{ color: MUTED }}>
              Recovr extends physiotherapy beyond clinical appointments through AI-powered rehabilitation monitoring, continuous recovery support, and meaningful collaboration between patients and physiotherapists.
            </p>
            <p className="text-sm italic mb-10 max-w-md" style={{ color: MUTED, opacity: 0.7 }}>{heroEnc}</p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => onNavigate("patient-login")}
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded-2xl transition-all hover:opacity-90"
                style={{ background: OCEAN, color: CREAM }}>
                Start Your Recovery <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => scrollTo(howRef)}
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-2xl border transition-colors"
                style={{ borderColor: BORDER, color: OCEAN }}>
                How It Works
              </button>
            </div>
          </div>
          {/* Hero card */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 shadow-lg z-10 flex items-center gap-3 border"
              style={{ background: CREAM, borderColor: BORDER }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${OCEAN}12` }}>
                <TrendingUp className="w-4 h-4" style={{ color: OCEAN }} />
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: OCEAN }}>Recovery Score</div>
                <div className="text-sm font-bold" style={{ color: OCEAN }}>88 / 100 · On Track</div>
              </div>
            </div>
            <div className="rounded-3xl p-5 shadow-md border" style={{ background: OCEAN, borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="rounded-2xl aspect-video relative overflow-hidden flex items-center justify-center mb-4"
                style={{ background: "#1a2e3a" }}>
                <svg viewBox="0 0 200 300" className="h-40">
                  <circle cx="100" cy="40" r="16" fill="none" stroke={CREAM} strokeWidth="2" opacity="0.6" />
                  <line x1="100" y1="56" x2="100" y2="145" stroke={CREAM} strokeWidth="2" opacity="0.6" />
                  <line x1="100" y1="80" x2="62" y2="118" stroke={CREAM} strokeWidth="2" opacity="0.6" />
                  <line x1="100" y1="80" x2="138" y2="118" stroke={CREAM} strokeWidth="2" opacity="0.6" />
                  <line x1="100" y1="145" x2="76" y2="215" stroke={CREAM} strokeWidth="2.5" opacity="0.9" />
                  <line x1="100" y1="145" x2="124" y2="215" stroke={CREAM} strokeWidth="2.5" opacity="0.9" />
                  <line x1="76" y1="215" x2="72" y2="268" stroke={CREAM} strokeWidth="2" opacity="0.7" />
                  <line x1="124" y1="215" x2="128" y2="268" stroke={CREAM} strokeWidth="2" opacity="0.7" />
                  {[[100,40],[100,80],[62,118],[138,118],[100,145],[76,215],[124,215],[72,268],[128,268]].map(([cx,cy],i) => (
                    <circle key={i} cx={cx} cy={cy} r={4} fill={CREAM} opacity="0.8" />
                  ))}
                </svg>
                <div className="absolute bottom-3 left-3 right-3 rounded-xl px-3 py-2" style={{ background: "rgba(250,244,229,0.08)", backdropFilter: "blur(4px)" }}>
                  <p className="text-xs" style={{ color: CREAM }}>✓ Excellent repetition — Knee angle: 87°</p>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "rgba(250,244,229,0.08)" }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: CREAM, opacity: 0.6 }} />
                  <span className="text-xs" style={{ color: CREAM, opacity: 0.6 }}>AI Active</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[["8 / 12","Reps"],["87°","Knee Angle"],["94%","Similarity"]].map(([val,label]) => (
                  <div key={label} className="rounded-xl p-3 text-center" style={{ background: "rgba(250,244,229,0.08)" }}>
                    <div className="font-bold text-sm" style={{ color: CREAM }}>{val}</div>
                    <div className="text-xs mt-0.5" style={{ color: CREAM, opacity: 0.55 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR (Deep Ocean) ── */}
      <div style={{ background: OCEAN }} className="py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-10 flex-wrap">
          {["TensorFlow.js MoveNet","ACL Rehabilitation","Human-Centred Design","UTP TTP Project","Real-Time AI Feedback"].map(item => (
            <span key={item} className="text-xs font-semibold uppercase tracking-widest" style={{ color: CREAM, opacity: 0.6 }}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── WHY RECOVR (Cream) ── */}
      <section ref={whyRef} className="py-24 scroll-mt-16" style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: MUTED }}>Why Recovr?</div>
            <h2 style={{ fontFamily: SERIF, color: OCEAN, fontSize: "3rem", fontWeight: 500, lineHeight: 1.1 }} className="mb-4">
              Recovery is more than movement.
            </h2>
            <p className="max-w-xl mx-auto leading-relaxed" style={{ color: MUTED }}>
              We built Recovr around one belief — patients heal better when they feel supported, understood, and connected throughout recovery.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Users className="w-6 h-6" />, title: "Never Recover Alone", desc: "Stay connected with your physiotherapist throughout every stage of your recovery, not just during clinic appointments." },
              { icon: <Heart className="w-6 h-6" />, title: "Recovery Beyond Movement", desc: "Monitor confidence, recovery reflections, adherence, and rehabilitation progress — not just exercises." },
              { icon: <Brain className="w-6 h-6" />, title: "AI That Supports You", desc: "Real-time AI movement feedback helps you perform every rehabilitation session correctly and safely at home." },
              { icon: <TrendingUp className="w-6 h-6" />, title: "Meaningful Recovery Insights", desc: "Give physiotherapists a complete understanding of each patient's physical, behavioural, and psychological recovery." },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl p-6 border hover:shadow-md transition-all group"
                style={{ background: CREAM, borderColor: BORDER }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors"
                  style={{ background: `${OCEAN}10`, color: OCEAN }}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: OCEAN }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (Deep Ocean) ── */}
      <section ref={howRef} className="py-24 scroll-mt-16" style={{ background: OCEAN }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: CREAM, opacity: 0.6 }}>How It Works</div>
            <h2 style={{ fontFamily: SERIF, color: CREAM, fontSize: "3rem", fontWeight: 500, lineHeight: 1.1 }} className="mb-4">
              Your recovery, step by step.
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: CREAM, opacity: 0.65 }}>A simple, guided journey from prescription to recovery — with support at every stage.</p>
          </div>
          <div className="space-y-0">
            {[
              { num: "01", title: "Begin your rehabilitation programme.", desc: "Your physiotherapist registers you on Recovr, creates a personalised rehabilitation plan, and generates your secure access code.", icon: <Shield className="w-5 h-5" /> },
              { num: "02", title: "Perform exercises with AI guidance.", desc: "Open Recovr on any laptop and receive real-time AI movement feedback from TensorFlow.js MoveNet as you exercise.", icon: <Brain className="w-5 h-5" /> },
              { num: "03", title: "Reflect on your recovery.", desc: "Log how you feel, answer guided reflection prompts, and submit your weekly pain, confidence, and motivation check-in.", icon: <Heart className="w-5 h-5" /> },
              { num: "04", title: "Physiotherapist reviews your Recovery Insights.", desc: "Your clinician sees exercise quality, confidence trends, journal reflections, and check-ins in one complete recovery picture.", icon: <TrendingUp className="w-5 h-5" /> },
              { num: "05", title: "Continue recovering with confidence.", desc: "Receive feedback, encouragement, and adjusted plans as your recovery progresses. Never face recovery alone.", icon: <Zap className="w-5 h-5" /> },
            ].map((step, i) => (
              <div key={step.num} className={`flex items-start gap-8 py-8 ${i > 0 ? "border-t" : ""}`}
                style={{ borderColor: "rgba(250,244,229,0.1)" }}>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center border border-white/20"
                    style={{ background: "rgba(250,244,229,0.1)", color: CREAM }}>
                    {step.icon}
                  </div>
                  {i < 4 && <div className="w-px mt-3 h-6" style={{ background: "rgba(250,244,229,0.15)" }} />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: CREAM, opacity: 0.45 }}>{step.num}</div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: CREAM }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed max-w-xl" style={{ color: CREAM, opacity: 0.65 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESIGNED FOR EVERYONE (Cream) ── */}
      <section className="py-24" style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: MUTED }}>Designed for Everyone</div>
            <h2 style={{ fontFamily: SERIF, color: OCEAN, fontSize: "3rem", fontWeight: 500, lineHeight: 1.1 }}>Supporting both sides of recovery.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { role: "For Patients", desc: "A recovery companion that guides, supports, and encourages you every day.",
                items: ["AI-guided rehabilitation exercises","Recovery Compass overview","Recovery Reflection journal","Confidence Check-ins","Recovery Journey timeline","Direct messaging with your physiotherapist"],
                cta: "Start Your Recovery", page: "patient-login" },
              { role: "For Physiotherapists", desc: "Complete Recovery Insights — beyond exercise data — for better clinical decisions.",
                items: ["Recovery Score and Status per patient","Exercise assignment by rehabilitation week","Confidence trends and psychological tracking","Recovery analytics and reporting","Secure patient communication","Journal review with written feedback"],
                cta: "Clinician Portal", page: "physio-login" },
            ].map((card) => (
              <div key={card.role} className="rounded-3xl p-8 border" style={{ background: `${OCEAN}08`, borderColor: BORDER }}>
                <h3 className="font-bold text-xl mb-2" style={{ color: OCEAN }}>{card.role}</h3>
                <p className="text-sm mb-6" style={{ color: MUTED }}>{card.desc}</p>
                <div className="space-y-3 mb-8">
                  {card.items.map(item => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: OCEAN }} />
                      <span className="text-sm" style={{ color: OCEAN }}>{item}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => onNavigate(card.page)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{ background: OCEAN, color: CREAM }}>
                  {card.cta} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECOVERY JOURNEY (Deep Ocean) ── */}
      <section className="py-24" style={{ background: OCEAN }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: CREAM, opacity: 0.55 }}>The Recovery Journey</div>
            <h2 style={{ fontFamily: SERIF, color: CREAM, fontSize: "3rem", fontWeight: 500, lineHeight: 1.1 }} className="mb-4">
              Rehabilitation is a journey,<br className="hidden md:block" /> not a series of exercises.
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: CREAM, opacity: 0.65 }}>Each week is a meaningful step forward. Recovr helps you see the full picture.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { week: "Week 1", title: "Building confidence.", desc: "Gentle range-of-motion exercises, establish your routine, start logging recovery reflections.", milestone: "First session completed" },
              { week: "Week 3", title: "Improving movement.", desc: "Introduce strengthening exercises, track knee angle improvement, check confidence levels.", milestone: "Knee flexion improving" },
              { week: "Week 6", title: "Increasing strength.", desc: "Progress to demanding exercises, monitor adherence, celebrate milestones.", milestone: "Walking independently" },
              { week: "Week 10", title: "Return to sport.", desc: "Sport-specific movements, final confidence assessment, and preparation for discharge.", milestone: "Return to jogging" },
            ].map((item, i) => (
              <div key={item.week} className="rounded-2xl p-6 border" style={{ background: "rgba(250,244,229,0.06)", borderColor: "rgba(250,244,229,0.1)" }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: CREAM, opacity: 0.45 }}>{item.week}</div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold mb-4 border border-white/20"
                  style={{ background: "rgba(250,244,229,0.1)", color: CREAM }}>{i + 1}</div>
                <h3 className="font-bold mb-2" style={{ color: CREAM }}>{item.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: CREAM, opacity: 0.65 }}>{item.desc}</p>
                <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: "rgba(250,244,229,0.1)" }}>
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: CREAM, opacity: 0.5 }} />
                  <span className="text-xs" style={{ color: CREAM, opacity: 0.5 }}>{item.milestone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (Cream) ── */}
      <section className="py-24" style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: MUTED }}>Recovery Stories</div>
            <h2 style={{ fontFamily: SERIF, color: OCEAN, fontSize: "3rem", fontWeight: 500 }}>What our users say.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Muhammad Arif", role: "Patient · ACL Reconstruction", quote: "Recovr helped me stay consistent during home rehabilitation. Knowing my physiotherapist could see my progress made me feel supported even when exercising alone.", stars: 5, week: "Week 6" },
              { name: "Dr. Sarah Chen", role: "Physiotherapist · KL Rehab Centre", quote: "The Recovery Insights dashboard gives me a complete picture of each patient — not just exercise performance, but their confidence and psychological recovery too.", stars: 5, week: "Clinical use" },
              { name: "Raj Kumar", role: "Patient · Post Total Knee Replacement", quote: "Being able to share my concerns with my physiotherapist through Recovr made a real difference. Recovery is about so much more than the exercises.", stars: 5, week: "Week 10" },
            ].map((t) => (
              <div key={t.name} className="rounded-3xl p-7 flex flex-col border" style={{ background: `${OCEAN}06`, borderColor: BORDER }}>
                <Quote className="w-6 h-6 mb-4" style={{ color: OCEAN, opacity: 0.4 }} />
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: MUTED }}>"{t.quote}"</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: OCEAN, opacity: 0.6 }} />)}
                </div>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: BORDER }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: OCEAN, color: CREAM }}>
                    {t.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: OCEAN }}>{t.name}</div>
                    <div className="text-xs" style={{ color: MUTED }}>{t.role}</div>
                  </div>
                  <div className="ml-auto text-xs px-2.5 py-1 rounded-full border" style={{ color: MUTED, borderColor: BORDER }}>{t.week}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTION PLANS (Deep Ocean) ── */}
      <section ref={plansRef} className="py-24 scroll-mt-16" style={{ background: OCEAN }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: CREAM, opacity: 0.55 }}>Subscription Plans</div>
            <h2 style={{ fontFamily: SERIF, color: CREAM, fontSize: "3rem", fontWeight: 500 }} className="mb-4">
              Choose your recovery plan.
            </h2>
            <p className="max-w-xl mx-auto text-sm" style={{ color: CREAM, opacity: 0.65 }}>
              Every plan includes the complete Recovr experience. Plans differ only by scale.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {[
              { emoji: "🌱", name: "Personal Recovery", audience: "Individual patients", price: "RM 39", period: "/month", highlight: false, capacity: ["1 active recovery journey", "1 physiotherapist connection"], cta: "Start Your Recovery", page: "patient-login" as const },
              { emoji: "🎓", name: "Campus Recovery", audience: "University sports centres", price: "RM 199", period: "/month", highlight: true, capacity: ["Up to 50 recovery journeys", "Up to 5 physiotherapists"], cta: "Start Campus Portal", page: "physio-login" as const },
              { emoji: "🩺", name: "Clinical Recovery", audience: "Physiotherapy clinics", price: "RM 399", period: "/month", highlight: false, capacity: ["Up to 200 recovery journeys", "Up to 15 physiotherapists"], cta: "Contact Us", page: "contact" as const },
            ].map((plan) => (
              <div key={plan.name} className="rounded-3xl flex flex-col"
                style={{
                  background: plan.highlight ? CREAM : "rgba(250,244,229,0.06)",
                  border: `1px solid ${plan.highlight ? "transparent" : "rgba(250,244,229,0.12)"}`,
                }}>
                {plan.highlight && (
                  <div className="px-8 pt-5">
                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                      style={{ background: OCEAN, color: CREAM }}>Most Popular</span>
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <div className="text-3xl mb-3">{plan.emoji}</div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: plan.highlight ? MUTED : "rgba(250,244,229,0.55)" }}>
                    {plan.audience}
                  </div>
                  <h3 className="text-2xl font-bold mb-4"
                    style={{ color: plan.highlight ? OCEAN : CREAM }}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-5 pb-5 border-b"
                    style={{ borderColor: plan.highlight ? BORDER : "rgba(250,244,229,0.12)" }}>
                    <span className="text-4xl font-extrabold" style={{ color: plan.highlight ? OCEAN : CREAM }}>{plan.price}</span>
                    <span className="text-sm" style={{ color: plan.highlight ? MUTED : "rgba(250,244,229,0.5)" }}>{plan.period}</span>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: plan.highlight ? MUTED : "rgba(250,244,229,0.5)" }}>Supports</div>
                  <div className="flex-1 space-y-2.5 mb-8">
                    {plan.capacity.map(c => (
                      <div key={c} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: plan.highlight ? OCEAN : "rgba(250,244,229,0.5)" }} />
                        <span className="text-sm font-medium"
                          style={{ color: plan.highlight ? OCEAN : CREAM }}>{c}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => plan.page === "contact" ? scrollTo(contactRef) : onNavigate(plan.page)}
                    className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all hover:opacity-90"
                    style={plan.highlight
                      ? { background: OCEAN, color: CREAM }
                      : { background: "rgba(250,244,229,0.12)", color: CREAM, border: "1px solid rgba(250,244,229,0.2)" }}>
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl p-5 text-center border"
            style={{ background: "rgba(250,244,229,0.06)", borderColor: "rgba(250,244,229,0.12)" }}>
            <p className="text-sm" style={{ color: CREAM, opacity: 0.75 }}>
              <span className="font-semibold">All plans include the complete Recovr experience</span> — AI Exercise Monitoring, Recovery Compass, Recovery Insights, Confidence Check, Recovery Reflection, and Adaptive Encouragement.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ (Cream) ── */}
      <section className="py-24" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: MUTED }}>FAQ</div>
            <h2 style={{ fontFamily: SERIF, color: OCEAN, fontSize: "3rem", fontWeight: 500 }}>Frequently Asked Questions</h2>
          </div>
          <FaqList ocean={OCEAN} cream={CREAM} border={BORDER} muted={MUTED} />
        </div>
      </section>

      {/* ── ABOUT/MISSION (Deep Ocean) ── */}
      <section className="py-24" style={{ background: OCEAN }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/15"
            style={{ background: "rgba(250,244,229,0.08)" }}>
            <Activity className="w-7 h-7" style={{ color: CREAM }} />
          </div>
          <h2 style={{ fontFamily: SERIF, color: CREAM, fontSize: "3rem", fontWeight: 500 }} className="mb-6">About {BRAND}</h2>
          <p style={{ fontFamily: SERIF, color: CREAM, opacity: 0.8, fontSize: "1.25rem", lineHeight: 1.7, fontStyle: "italic" }} className="max-w-2xl mx-auto mb-10">
            "{MISSION}"
          </p>
          <p className="text-sm italic mb-10" style={{ color: CREAM, opacity: 0.5 }}>{TAGLINE}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => onNavigate("patient-login")}
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{ background: CREAM, color: OCEAN }}>Patient Portal</button>
            <button onClick={() => onNavigate("physio-login")}
              className="px-6 py-3 rounded-xl font-bold text-sm border transition-colors"
              style={{ color: CREAM, borderColor: "rgba(250,244,229,0.35)" }}>
              Physiotherapist Portal</button>
          </div>
        </div>
      </section>

      {/* ── CONTACT (Cream) ── */}
      <section ref={contactRef} className="py-24 scroll-mt-16" style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: MUTED }}>Get In Touch</div>
            <h2 style={{ fontFamily: SERIF, color: OCEAN, fontSize: "3rem", fontWeight: 500 }} className="mb-3">Let's Get in Touch</h2>
            <p className="max-w-xl mx-auto text-sm" style={{ color: MUTED }}>Questions, partnership enquiries, or want to learn more about Recovr?</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-6">
              {[
                { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hello@recovr.health", sub: "We respond within 24 hours" },
                { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+60 3-1234 5678", sub: "Mon–Fri, 9 AM–5 PM MYT" },
                { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Universiti Teknologi PETRONAS", sub: "Seri Iskandar, Perak, Malaysia" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${OCEAN}10`, color: OCEAN }}>{item.icon}</div>
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-0.5 font-semibold" style={{ color: MUTED }}>{item.label}</div>
                    <div className="text-sm font-semibold" style={{ color: OCEAN }}>{item.value}</div>
                    <div className="text-xs" style={{ color: MUTED }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:col-span-3">
              {contactSent ? (
                <div className="rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center border"
                  style={{ background: `${OCEAN}06`, borderColor: BORDER }}>
                  <CheckCircle className="w-12 h-12 mx-auto mb-5" style={{ color: OCEAN }} />
                  <h3 className="font-bold text-xl mb-2" style={{ color: OCEAN }}>Message Sent!</h3>
                  <p className="text-sm max-w-xs" style={{ color: MUTED }}>Thank you for reaching out. We will get back to you within 24 hours.</p>
                  <button onClick={() => setContactSent(false)} className="mt-6 text-sm hover:underline" style={{ color: OCEAN }}>Send another message</button>
                </div>
              ) : (
                <div className="rounded-3xl p-8 border shadow-sm" style={{ background: `${OCEAN}05`, borderColor: BORDER }}>
                  <h3 className="font-semibold text-lg mb-6" style={{ color: OCEAN }}>Send us a message</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { key: "name", label: "Full Name", placeholder: "Your name", type: "text", full: false },
                      { key: "email", label: "Email Address", placeholder: "your@email.com", type: "email", full: false },
                      { key: "subject", label: "Subject", placeholder: "How can we help?", type: "text", full: true },
                    ].map((field) => (
                      <div key={field.key} className={field.full ? "md:col-span-2" : ""}>
                        <label className="text-xs uppercase tracking-wider block mb-1.5 font-semibold" style={{ color: MUTED }}>{field.label}</label>
                        <input type={field.type} placeholder={field.placeholder}
                          value={(contactForm as any)[field.key]}
                          onChange={(e) => setContactForm(f => ({ ...f, [field.key]: e.target.value }))}
                          className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none"
                          style={{ background: CREAM, borderColor: BORDER, color: OCEAN }} />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="text-xs uppercase tracking-wider block mb-1.5 font-semibold" style={{ color: MUTED }}>Message</label>
                      <textarea placeholder="Tell us about your question or partnership idea..."
                        rows={4} value={contactForm.message}
                        onChange={(e) => setContactForm(f => ({ ...f, message: e.target.value }))}
                        className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none resize-none"
                        style={{ background: CREAM, borderColor: BORDER, color: OCEAN }} />
                    </div>
                  </div>
                  <button onClick={() => { if (contactForm.name && contactForm.email) setContactSent(true); }}
                    className="mt-5 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: OCEAN, color: CREAM }}>
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-10 rounded-2xl h-36 flex items-center justify-center border"
            style={{ background: `${OCEAN}06`, borderColor: BORDER }}>
            <div className="text-center" style={{ color: MUTED }}>
              <MapPin className="w-6 h-6 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Universiti Teknologi PETRONAS, Seri Iskandar, Perak 32610, Malaysia</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER (Deep Ocean) ── */}
      <footer style={{ background: OCEAN }}>
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
          <div className="rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-5 mb-12"
            style={{ background: "rgba(250,244,229,0.06)", border: "1px solid rgba(250,244,229,0.1)" }}>
            <div>
              <div className="font-semibold mb-1" style={{ color: CREAM }}>Stay updated with {BRAND}</div>
              <div className="text-sm" style={{ color: CREAM, opacity: 0.55 }}>Latest in AI rehabilitation and recovery support.</div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input type="email" placeholder="Your email address"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl text-sm focus:outline-none"
                style={{ background: "rgba(250,244,229,0.08)", border: "1px solid rgba(250,244,229,0.12)", color: CREAM }} />
              <button className="px-4 py-2.5 rounded-xl text-sm font-semibold flex-shrink-0"
                style={{ background: CREAM, color: OCEAN }}>Subscribe</button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {[
              { heading: "Platform", links: ["How It Works","For Patients","For Physiotherapists","Architecture"] },
              { heading: "Company", links: ["About Recovr","Our Mission","UTP TTP Project","Partnership Enquiries"] },
              { heading: "Support", links: ["FAQ","Contact Us","Business Hours","Privacy Policy"] },
              { heading: "Legal", links: ["Terms & Conditions","Privacy Policy","Cookie Policy","Disclaimer"] },
            ].map(col => (
              <div key={col.heading}>
                <div className="text-sm font-bold mb-4" style={{ color: CREAM }}>{col.heading}</div>
                <div className="space-y-2.5">
                  {col.links.map(link => (
                    <button key={link} className="block text-sm transition-colors text-left hover:opacity-100"
                      style={{ color: CREAM, opacity: 0.5 }}>{link}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: "rgba(250,244,229,0.1)" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg border border-white/15 flex items-center justify-center"
                style={{ background: "rgba(250,244,229,0.08)" }}>
                <Activity className="w-4 h-4" style={{ color: CREAM }} />
              </div>
              <span className="font-bold" style={{ color: CREAM }}>{BRAND}</span>
              <span className="text-xs ml-1" style={{ color: CREAM, opacity: 0.4 }}>— TTP Project, Universiti Teknologi PETRONAS</span>
            </div>
            <p className="text-xs text-center" style={{ color: CREAM, opacity: 0.4 }}>
              © 2026 Recovr. This system supports rehabilitation and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FAQ_ITEMS = [
  { q: "What is Recovr?", a: "Recovr is a human-centred digital recovery platform that extends physiotherapy beyond the clinic, combining AI-powered exercise monitoring with confidence tracking, recovery journaling, and direct patient-physiotherapist communication." },
  { q: "Who is Recovr designed for?", a: "Recovr is designed for patients undergoing ACL and knee rehabilitation, physiotherapists wanting complete recovery insights, and university sports centres or physiotherapy clinics looking to scale digital rehabilitation care." },
  { q: "Is Recovr a replacement for physiotherapy?", a: "No. Recovr is designed to support professional physiotherapy, not replace it. All rehabilitation plans are created and supervised by a licensed physiotherapist." },
  { q: "Do I need special equipment?", a: "No wearables are required. Recovr works with any standard laptop webcam through your browser using TensorFlow.js MoveNet technology." },
  { q: "How do patients access Recovr?", a: "Patients receive login credentials and a unique access code from their physiotherapist. There is no public self-registration to ensure all patients are clinically supervised." },
  { q: "What is the Recovery Compass?", a: "The Recovery Compass is a holistic recovery overview combining movement quality, confidence, adherence, reflections, pain check-ins, and overall progress into a single visual summary." },
  { q: "What is the difference between the plans?", a: "All plans include the complete Recovr experience. Plans differ only by scale: Personal Recovery supports 1 patient, Campus Recovery up to 50, and Clinical Recovery up to 200 patients." },
];

function FaqList({ ocean, cream, border, muted }: { ocean: string; cream: string; border: string; muted: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border" style={{ borderColor: border, background: `${ocean}05` }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors hover:opacity-80">
            <span className="text-sm font-semibold pr-4" style={{ color: ocean }}>{item.q}</span>
            <span className="text-lg flex-shrink-0" style={{ color: muted }}>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div className="px-6 pb-5">
              <p className="text-sm leading-relaxed" style={{ color: muted }}>{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
