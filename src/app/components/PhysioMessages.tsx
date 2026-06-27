import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRehab } from "../context/RehabContext";

interface PhysioMessagesProps {
  onNavigate?: (page: string) => void;
}

const avatarColors: Record<string, string> = {
  "P-1042": "bg-cyan-500",
  "P-1039": "bg-violet-500",
  "P-1035": "bg-amber-500",
  "P-1028": "bg-rose-500",
  "P-1021": "bg-emerald-500",
};

const suggestions = [
  "Great progress! Keep it up.",
  "Please reduce reps if you feel pain.",
  "I've reviewed your latest session.",
  "Let's schedule a review next week.",
];

export function PhysioMessages({ onNavigate }: PhysioMessagesProps) {
  const { conversations, sendMessage, unreadConvCount } = useRehab();
  const [selectedId, setSelectedId] = useState<string>(conversations[0]?.patientId ?? "");
  const [input, setInput] = useState("");

  const selected = conversations.find((c) => c.patientId === selectedId);

  const handleSend = () => {
    const text = input.trim();
    if (!text || !selectedId) return;
    sendMessage(selectedId, "physio", text);
    setInput("");
    toast.success("Message sent!");
  };

  const getLatestMessage = (patientId: string) => {
    const conv = conversations.find((c) => c.patientId === patientId);
    if (!conv || conv.messages.length === 0) return { text: "No messages yet", time: "" };
    const last = conv.messages[conv.messages.length - 1];
    return { text: last.text.length > 45 ? last.text.slice(0, 45) + "…" : last.text, time: last.time };
  };

  return (
    <div className="flex h-[calc(100vh-73px)] bg-background">
      {/* Left: Conversation list */}
      <div className="w-80 border-r border-border bg-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h3 className="text-foreground font-medium">Patient Messages</h3>
          </div>
          <p className="text-muted-foreground text-xs">Select a patient to view their conversation thread.</p>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {conversations.map((conv) => {
            const unread = unreadConvCount(conv.patientId, "physio");
            const latest = getLatestMessage(conv.patientId);
            const isSelected = conv.patientId === selectedId;
            const initials = conv.patientName.split(" ").map((n) => n[0]).join("").slice(0, 2);
            const avatarBg = avatarColors[conv.patientId] ?? "bg-gray-400";
            return (
              <button
                key={conv.patientId}
                onClick={() => setSelectedId(conv.patientId)}
                className={`w-full flex items-start gap-3 p-4 text-left transition-colors ${
                  isSelected ? "bg-secondary" : "hover:bg-muted/40"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full ${avatarBg} flex items-center justify-center text-white font-semibold text-sm`}>
                    {initials}
                  </div>
                  {/* Online indicator */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                      {conv.patientName}
                    </span>
                    <span className="text-muted-foreground text-xs flex-shrink-0 ml-2">
                      {latest.time.split(",")[0] ?? ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-xs truncate flex-1">{latest.text}</p>
                    {unread > 0 && (
                      <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 font-semibold">
                        {unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Conversation thread */}
      <div className="flex-1 flex flex-col">
        {selected ? (
          <>
            {/* Thread header */}
            <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full ${avatarColors[selected.patientId] ?? "bg-gray-400"} flex items-center justify-center text-white font-semibold text-sm`}>
                {selected.patientName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div className="text-foreground font-medium">{selected.patientName}</div>
                <div className="text-muted-foreground text-xs flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Online · {selected.patientId}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background">
              {selected.messages.map((msg) => {
                const isSelf = msg.from === "physio";
                return (
                  <div key={msg.id} className={`flex gap-3 ${isSelf ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 ${
                      msg.from === "physio" ? "bg-emerald-500" : (avatarColors[selected.patientId] ?? "bg-cyan-500")
                    }`}>
                      {msg.from === "physio" ? "SC" : selected.patientName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className={`max-w-md flex flex-col gap-1 ${isSelf ? "items-end" : "items-start"}`}>
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        isSelf ? "bg-primary text-white rounded-tr-sm" : "bg-card border border-border text-foreground rounded-tl-sm"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-muted-foreground text-xs px-1">{msg.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick suggestions */}
            <div className="px-6 py-2 bg-background flex gap-2 flex-wrap border-t border-border">
              {suggestions.map((s) => (
                <button key={s} onClick={() => setInput(s)}
                  className="text-xs px-3 py-1.5 bg-card border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-border flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder={`Reply to ${selected.patientName}...`}
                className="flex-1 border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:border-primary"
              />
              <button onClick={handleSend} disabled={!input.trim()}
                className="px-5 py-3 bg-primary text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Select a patient to start a conversation.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
