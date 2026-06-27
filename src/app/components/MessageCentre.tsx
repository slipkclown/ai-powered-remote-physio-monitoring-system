import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRehab } from "../context/RehabContext";
import { PatientLayout } from "./PatientLayout";

interface MessageCentreProps {
  onNavigate: (page: string) => void;
  role?: "patient" | "physio";
}

const suggestions = [
  "I have a question about my exercises.",
  "I'm experiencing pain during my sessions.",
  "I would like to report a difficulty.",
  "Can we adjust my rehabilitation plan?",
];

export function MessageCentre({ onNavigate, role = "patient" }: MessageCentreProps) {
  const { conversations, sendMessage } = useRehab();
  const [input, setInput] = useState("");
  const isPatient = role === "patient";
  // Patient always talks to physio via P-1042 conversation
  const conv = conversations.find((c) => c.patientId === "P-1042");
  const messages = conv?.messages ?? [];

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    sendMessage("P-1042", isPatient ? "patient" : "physio", text);
    setInput("");
    toast.success("Message sent!");
  };

  const chatUI = (
    <div className="flex flex-col gap-4 h-full">
      {/* Contact info */}
      <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center font-semibold text-white">SC</div>
        <div>
          <div className="text-foreground font-medium">Dr. Sarah Chen</div>
          <div className="text-muted-foreground text-xs">Your Physiotherapist · KL Rehabilitation Centre</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-card border border-border rounded-2xl p-5 overflow-y-auto space-y-4 min-h-[380px]">
        {messages.map((msg) => {
          const isSelf = (isPatient && msg.from === "patient") || (!isPatient && msg.from === "physio");
          return (
            <div key={msg.id} className={`flex gap-3 ${isSelf ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 ${msg.from === "physio" ? "bg-emerald-500" : "bg-cyan-500"}`}>
                {msg.from === "physio" ? "SC" : "MA"}
              </div>
              <div className={`max-w-xs lg:max-w-md flex flex-col gap-1 ${isSelf ? "items-end" : "items-start"}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  isSelf ? "bg-primary text-white rounded-tr-sm" : "bg-secondary text-foreground rounded-tl-sm"
                }`}>
                  {msg.text}
                </div>
                <span className="text-muted-foreground text-xs px-1">{msg.time}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggestions */}
      {isPatient && (
        <div className="flex gap-2 flex-wrap">
          {suggestions.map((s) => (
            <button key={s} onClick={() => setInput(s)}
              className="text-xs px-3 py-1.5 bg-secondary border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Ask a question or report a concern..."
          className="flex-1 border border-border rounded-xl px-4 py-3 text-sm bg-card focus:outline-none focus:border-primary"
        />
        <button onClick={handleSend} disabled={!input.trim()}
          className="px-5 py-3 bg-primary text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  if (isPatient) {
    return (
      <PatientLayout onNavigate={onNavigate} activePage="messages">
        <div className="p-8 max-w-3xl mx-auto flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-foreground">Message Centre</h1>
              <p className="text-muted-foreground text-sm">Communicate directly with your physiotherapist.</p>
            </div>
          </div>
          {chatUI}
        </div>
      </PatientLayout>
    );
  }

  // Physio single-patient view (fallback — physio uses PhysioMessages instead)
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-8 max-w-3xl mx-auto w-full flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h1 className="text-foreground">Message Centre</h1>
        </div>
        {chatUI}
      </div>
    </div>
  );
}
