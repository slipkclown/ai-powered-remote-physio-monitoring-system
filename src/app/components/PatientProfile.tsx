import { Camera, Lock, Save, User } from "lucide-react";
import { PatientLayout } from "./PatientLayout";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface PatientProfileProps {
  onNavigate: (page: string) => void;
}

export function PatientProfile({ onNavigate }: PatientProfileProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
    toast.success("Profile photo updated!");
  };

  return (
    <PatientLayout onNavigate={onNavigate} activePage="patient-profile">
      <div className="p-8 max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-foreground mb-0.5">My Profile</h1>
            <p className="text-muted-foreground text-sm">Update your personal details and account settings.</p>
          </div>
        </div>

        {/* Avatar */}
        <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-cyan-400 flex items-center justify-center text-[#1e3a8a] text-2xl font-bold">
              {avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : "MA"}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
              title="Change photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </div>
          <div>
            <div className="text-foreground font-semibold">Muhammad Arif bin Hassan</div>
            <div className="text-muted-foreground text-sm">ACL Rehabilitation · Week 3</div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => fileRef.current?.click()} className="text-primary text-xs hover:underline">Upload photo</button>
              {avatar && (
                <button onClick={() => { setAvatar(null); toast.success("Profile photo removed."); }} className="text-red-500 text-xs hover:underline">Remove</button>
              )}
            </div>
          </div>
        </div>

        {/* Personal details */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-foreground mb-5">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Full Name", value: "Muhammad Arif bin Hassan" },
              { label: "Email Address", value: "arif@email.com" },
              { label: "Phone Number", value: "+60 11-234 5678" },
              { label: "Date of Birth", value: "14 March 1998" },
              { label: "Current Rehabilitation Week", value: "Week 3" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">{field.label}</label>
                <input defaultValue={field.value}
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary" />
              </div>
            ))}
          </div>
        </div>

        {/* Rehab info (read-only) */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-foreground mb-5">Rehabilitation Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Assigned Physiotherapist", value: "Dr. Sarah Chen" },
              { label: "Rehabilitation Stage", value: "Week 3 of 8 — Strengthening Phase" },
              { label: "Diagnosis", value: "ACL Reconstruction (Right Knee)" },
              { label: "Programme Start Date", value: "1 June 2026" },
            ].map((field) => (
              <div key={field.label} className="bg-muted/50 rounded-xl p-3">
                <div className="text-muted-foreground text-xs mb-1">{field.label}</div>
                <div className="text-foreground text-sm font-medium">{field.value}</div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-xs mt-3">Rehabilitation details are managed by your physiotherapist.</p>
        </div>

        <button onClick={() => toast.success("Profile updated successfully!")}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors">
          <Save className="w-4 h-4" /> Save Changes
        </button>

        {/* Password */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-foreground">Change Password</h3>
          </div>
          <div className="space-y-3 max-w-sm">
            {["Current Password", "New Password", "Confirm New Password"].map((label) => (
              <div key={label}>
                <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">{label}</label>
                <input type="password" placeholder="••••••••"
                  className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:border-primary" />
              </div>
            ))}
          </div>
          <button onClick={() => toast.success("Password changed successfully!")}
            className="mt-4 px-6 py-2.5 border border-primary text-primary rounded-xl hover:bg-secondary transition-colors text-sm">
            Update Password
          </button>
        </div>
      </div>
    </PatientLayout>
  );
}
