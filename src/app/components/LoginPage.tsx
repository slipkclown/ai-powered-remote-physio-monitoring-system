import { Activity, ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { signInUser, signUpUser } from "../context/supabaseClient";

interface LoginPageProps {
  role: "patient" | "physio";
  onLogin: () => void;
  onBack: () => void;
}

/* ─── Palette ───────────────────────────────────────── */
const OLIVE = "#305066";
const STONE = "#305066";
const SAGE = "#5a7485";
const MOSS = "rgba(48,80,102,0.15)";
const CREAM = "#FAF4E5";
const CHARCOAL = "#305066";

export function LoginPage({ role, onLogin, onBack }: LoginPageProps) {
  const [showPass, setShowPass] = useState(false);
  const [useCode, setUseCode] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const isPatient = role === "patient";

  const accent = isPatient ? OLIVE : STONE;

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    setErrorMsg("");
    setLoading(true);

    if (showRegister) {
      // Sign up
      const { error } = await signUpUser(email, password, role, fullName);
      setLoading(false);
      if (error) {
        setErrorMsg(error.message);
        return;
      }
      onLogin();
    } else {
      // Sign in
      const { error } = await signInUser(email, password);
      setLoading(false);
      if (error) {
        setErrorMsg(error.message);
        return;
      }
      onLogin();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "#305066", fontFamily: "'Manrope', 'Inter', sans-serif" }}
    >
      <button
        onClick={onBack}
        className="fixed top-6 left-6 flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Recovr
      </button>

      <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl" style={{ background: CREAM }}>
        <div className="px-8 pt-8 pb-6 text-center" style={{ background: accent }}>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Activity className="w-7 h-7 text-white" />
          </div>
          <div className="text-white text-xl font-bold tracking-tight">Recovr</div>
          <div className="text-white/75 text-sm mt-1">
            {isPatient ? "Patient Portal" : "Physiotherapist Portal"}
          </div>
          <div className="text-white/50 text-xs mt-1">Human-Centred AI Rehabilitation Support</div>
        </div>

        <div className="p-8">
          {isPatient && (
            <div className="flex rounded-xl overflow-hidden mb-6 border" style={{ borderColor: MOSS }}>
              {["Email & Password", "Access Code"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setUseCode(tab === "Access Code")}
                  className="flex-1 py-2.5 text-sm font-semibold transition-colors"
                  style={{
                    background: (tab === "Access Code") === useCode ? accent : CREAM,
                    color: (tab === "Access Code") === useCode ? "#ffffff" : SAGE,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          {!isPatient && (
            <div className="flex rounded-xl overflow-hidden mb-6 border" style={{ borderColor: MOSS }}>
              {["Sign In", "Create Account"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setShowRegister(tab === "Create Account")}
                  className="flex-1 py-2.5 text-sm font-semibold transition-colors"
                  style={{
                    background: (tab === "Create Account") === showRegister ? accent : CREAM,
                    color: (tab === "Create Account") === showRegister ? "#ffffff" : SAGE,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-4">
            {!useCode ? (
              <>
                {!isPatient && showRegister && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: SAGE }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Dr. Ahmad Fauzi"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none"
                      style={{ background: "#FAF4E5", borderColor: "rgba(48,80,102,0.2)", color: CHARCOAL }}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: SAGE }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: MOSS }} />
                    <input
                      type="email"
                      placeholder={isPatient ? "patient@email.com" : "dr.name@clinic.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border focus:outline-none transition-colors"
                      style={{ background: "#FAF4E5", borderColor: "rgba(48,80,102,0.2)", color: CHARCOAL }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: SAGE }}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: MOSS }} />
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl text-sm border focus:outline-none transition-colors"
                      style={{ background: "#FAF4E5", borderColor: "rgba(48,80,102,0.2)", color: CHARCOAL }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: MOSS }}
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: SAGE }}>
                  Access Code
                </label>
                <input
                  type="text"
                  placeholder="ACL-2025-XXXX"
                  className="w-full px-4 py-3 rounded-xl text-sm font-mono tracking-widest text-center uppercase border focus:outline-none"
                  style={{ background: "#FAF4E5", borderColor: "rgba(48,80,102,0.2)", color: CHARCOAL }}
                />
                <p className="text-xs mt-2" style={{ color: SAGE }}>
                  Access code provided by your physiotherapist.
                </p>
              </div>
            )}

            {errorMsg && (
              <p className="text-sm text-center" style={{ color: "#b91c1c" }}>
                {errorMsg}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 mt-2 disabled:opacity-60"
              style={{ background: accent }}
            >
              {loading ? "Please wait..." : useCode ? "Enter with Access Code" : showRegister ? "Create Account" : "Sign In"}
            </button>
          </div>

          <div className="mt-5 space-y-2 text-center">
            {!isPatient && !showRegister && (
              <p className="text-sm" style={{ color: SAGE }}>
                New to Recovr?{" "}
                <button onClick={() => setShowRegister(true)} className="font-semibold hover:underline" style={{ color: accent }}>
                  Create clinician account
                </button>
              </p>
            )}
            {!isPatient && showRegister && (
              <p className="text-sm" style={{ color: SAGE }}>
                Already have an account?{" "}
                <button onClick={() => setShowRegister(false)} className="font-semibold hover:underline" style={{ color: accent }}>
                  Sign in
                </button>
              </p>
            )}
            <button onClick={onBack} className="text-sm transition-colors hover:underline" style={{ color: MOSS }}>
              ← Back to Recovr
            </button>
          </div>
        </div>

        <div className="px-8 pb-6 text-center">
          <p className="text-xs" style={{ color: MOSS }}>
            Recovery doesn't stop when you leave the clinic.
          </p>
        </div>
      </div>
    </div>
  );
}
