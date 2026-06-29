import { MessageSquare, Send, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRehab } from "../context/RehabContext";

interface PhysioMessagesProps {
  onNavigate?: (page: string) => void;
}

const OCEAN = "#305066";
const CREAM = "#FAF4E5";
const BORDER = "rgba(48,80,102,0.13)";
const MUTED = "#5a7485";

const AVATAR_HUES: Record<string, string> = {
  "P-1042": "#305066",
  "P-1039": "#5a4f8e",
  "P-1035": "#6b4e35",
  "P-1028": "#7a4050",
  "P-1021": "#3a6b5a",
};

const suggestions = [
  "Great progress! Keep it up.",
  "Please reduce reps if you feel pain.",
  "I've reviewed your latest session.",
  "Let's schedule a review next week.",
  "Your confidence score has improved significantly.",
  "Try to complete your check-in this week.",
];

export function PhysioMessages({ onNavigate }: PhysioMessagesProps) {
  const { conversations, sendMessage, unreadConvCount } = useRehab();
  const [selectedId, setSelectedId] = useState<string>(conversations[0]?.patientId ?? "");
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const selected = conversations.find((c) => c.patientId === selectedId);

  const filteredConvs = conversations.filter((c) =>
    c.patientName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = () => {
    const text = input.trim();
    if (!text || !selectedId) return;
    sendMessage(selectedId, "physio", text);
    setInput("");
    toast.success("Message sent!");
  };

  const getLatestMessage = (patientId: string) => {
    const conv = conversations.find((c) => c.patientId === patientId);
    if (!conv || conv.messages.length === 0) return { text: "No messages yet", time: "", from: "physio" };
    const last = conv.messages[conv.messages.length - 1];
    return { text: last.text.length > 48 ? last.text.slice(0, 48) + "…" : last.text, time: last.time, from: last.from };
  };

  return (
    <div className="flex h-[calc(100vh-73px)]" style={{ background: CREAM }}>
      {/* ── Left: conversation list ── */}
      <div className="w-80 flex flex-col flex-shrink-0 border-r" style={{ background: CREAM, borderColor: BORDER }}>
        {/* Header */}
        <div className="p-5 border-b" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4" style={{ color: OCEAN }} />
            <h3 className="font-semibold text-sm" style={{ color: OCEAN }}>Patient Messages</h3>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: MUTED }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patients…"
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border focus:outline-none"
              style={{ background: "rgba(48,80,102,0.05)", borderColor: BORDER, color: OCEAN }}
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filteredConvs.map((conv) => {
            const unread = unreadConvCount(conv.patientId, "physio");
            const latest = getLatestMessage(conv.patientId);
            const isSelected = conv.patientId === selectedId;
            const initials = conv.patientName.split(" ").map((n) => n[0]).join("").slice(0, 2);
            const avatarBg = AVATAR_HUES[conv.patientId] ?? OCEAN;
            return (
              <button
                key={conv.patientId}
                onClick={() => setSelectedId(conv.patientId)}
                className="w-full flex items-start gap-3 p-4 text-left transition-all border-b"
                style={{
                  background: isSelected ? `${OCEAN}08` : "transparent",
                  borderColor: BORDER,
                  borderLeft: isSelected ? `3px solid ${OCEAN}` : "3px solid transparent",
                }}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ background: avatarBg }}>
                    {initials}
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                    style={{ background: "#4ade80", borderColor: CREAM }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-semibold truncate" style={{ color: isSelected ? OCEAN : OCEAN }}>
                      {conv.patientName}
                    </span>
                    <span className="text-xs flex-shrink-0 ml-2" style={{ color: MUTED }}>
                      {latest.time.split(",")[0] ?? ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs truncate flex-1" style={{ color: MUTED }}>
                      {latest.from === "physio" ? "You: " : ""}{latest.text}
                    </p>
                    {unread > 0 && (
                      <span className="text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 font-bold text-white"
                        style={{ background: OCEAN }}>
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

      {/* ── Right: conversation thread ── */}
      <div className="flex-1 flex flex-col" style={{ background: CREAM }}>
        {selected ? (
          <>
            {/* Thread header */}
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ background: CREAM, borderColor: BORDER }}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ background: AVATAR_HUES[selected.patientId] ?? OCEAN }}>
                  {selected.patientName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: OCEAN }}>{selected.patientName}</div>
                  <div className="text-xs flex items-center gap-1.5" style={{ color: MUTED }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ade80" }} />
                    Online · {selected.patientId}
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {selected.messages.map((msg) => {
                const isSelf = msg.from === "physio";
                return (
                  <div key={msg.id} className={`flex gap-3 ${isSelf ? "flex-row-reverse" : "flex-row"}`}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
                      style={{ background: isSelf ? OCEAN : (AVATAR_HUES[selected.patientId] ?? OCEAN) }}>
                      {isSelf ? "SC" : selected.patientName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className={`max-w-md flex flex-col gap-1 ${isSelf ? "items-end" : "items-start"}`}>
                      <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                        style={isSelf
                          ? { background: OCEAN, color: CREAM, borderRadius: "1rem 0.25rem 1rem 1rem" }
                          : { background: "#fff", color: OCEAN, border: `1px solid ${BORDER}`, borderRadius: "0.25rem 1rem 1rem 1rem" }}>
                        {msg.text}
                      </div>
                      <span className="text-xs px-1" style={{ color: MUTED }}>{msg.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick suggestions */}
            <div className="px-6 py-3 border-t flex gap-2 flex-wrap" style={{ borderColor: BORDER, background: CREAM }}>
              {suggestions.map((s) => (
                <button key={s} onClick={() => setInput(s)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:opacity-80"
                  style={{ borderColor: BORDER, color: MUTED, background: `${OCEAN}06` }}>
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t flex gap-3" style={{ borderColor: BORDER, background: CREAM }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder={`Reply to ${selected.patientName}…`}
                className="flex-1 rounded-2xl px-4 py-3 text-sm border focus:outline-none"
                style={{ background: "#fff", borderColor: BORDER, color: OCEAN }}
              />
              <button onClick={handleSend} disabled={!input.trim()}
                className="px-5 py-3 rounded-2xl transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: OCEAN, color: CREAM }}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center" style={{ color: MUTED }}>
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" style={{ color: OCEAN }} />
              <p className="text-sm">Select a patient to view their conversation.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
