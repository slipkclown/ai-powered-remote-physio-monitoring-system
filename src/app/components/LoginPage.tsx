import { Activity, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

interface LoginPageProps {
  role: "patient" | "physio";
  onLogin: () => void;
  onBack: () => void;
}

export function LoginPage({ role, onLogin, onBack }: LoginPageProps) {
  const [showPass, setShowPass] = useState(false);
  const [useCode, setUseCode] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const isPatient = role === "patient";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#0891b2] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className={`${isPatient ? "bg-cyan-600" : "bg-[#1e3a8a]"} p-8 text-center`}>
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Activity className="w-7 h-7 text-white" />
          </div>
          <div className="text-white text-xl font-bold mb-0.5">Recovr</div>
          <div className="text-white/80 text-sm">{isPatient ? "Patient Portal" : "Physiotherapist Portal"}</div>
          <div className="text-white/60 text-xs mt-1">Human Centered AI Rehabilitation Support for ACL Recovery</div>
        </div>

        {/* Form */}
        <div className="p-8">
          {/* Patient: tab toggle */}
          {isPatient && (
            <div className="flex rounded-xl border border-border overflow-hidden mb-6">
              {["Email & Password", "Access Code"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setUseCode(tab === "Access Code")}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                    (tab === "Access Code") === useCode
                      ? "bg-primary text-white"
                      : "bg-background text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          {/* Physio: register/login toggle */}
          {!isPatient && (
            <div className="flex rounded-xl border border-border overflow-hidden mb-6">
              {["Sign In", "Create Account"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setShowRegister(tab === "Create Account")}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                    (tab === "Create Account") === showRegister
                      ? "bg-[#1e3a8a] text-white"
                      : "bg-background text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-4">
            {!useCode ? (
              <>
                {/* Registration fields (physio only) */}
                {!isPatient && showRegister && (
                  <>
                    <div>
                      <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Full Name</label>
                      <input
                        type="text"
                        placeholder="Dr. Ahmad Fauzi"
                        className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Clinic / Hospital</label>
                      <input
                        type="text"
                        placeholder="KL Rehabilitation Centre"
                        className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                  </>
                )}

                {/* Email */}
                <div>
                  <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder={isPatient ? "patient@email.com" : "dr.name@clinic.com"}
                      className="w-full pl-9 pr-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-3 border border-border rounded-xl bg-background focus:outline-none focus:border-primary text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPass ? "Hide password" : "Show password"}
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm password (register) */}
                {!isPatient && showRegister && (
                  <div>
                    <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-3 border border-border rounded-xl bg-background focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Access code tab */
              <div>
                <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Access Code</label>
                <input
                  type="text"
                  placeholder="e.g. ACL-2025-7X4K"
                  className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:border-primary text-sm font-mono tracking-wider text-center uppercase"
                />
                <p className="text-muted-foreground text-xs mt-2">Access code provided by your physiotherapist. Format: ACL-2025-XXXX</p>
              </div>
            )}

            <button
              onClick={onLogin}
              className={`w-full py-3 rounded-xl text-white font-medium transition-colors ${isPatient ? "bg-cyan-600 hover:bg-cyan-700" : "bg-[#1e3a8a] hover:bg-blue-900"}`}
            >
              {useCode ? "Enter with Access Code" : showRegister ? "Create Account" : "Sign In"}
            </button>
          </div>

          {!isPatient && !showRegister && (
            <p className="mt-4 text-center text-muted-foreground text-sm">
              New physiotherapist?{" "}
              <button onClick={() => setShowRegister(true)} className="text-primary hover:underline font-medium">
                Create Account
              </button>
            </p>
          )}

          <div className="mt-4 text-center">
            <button onClick={onBack} className="text-muted-foreground text-sm hover:text-foreground transition-colors">
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
