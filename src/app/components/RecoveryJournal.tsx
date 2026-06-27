import { BookOpen, Edit3, Plus, Save, Sparkles, Trash2, X } from "lucide-react";
import { PatientLayout } from "./PatientLayout";
import { useState } from "react";
import { toast } from "sonner";
import { useRehab } from "../context/RehabContext";
import type { JournalEntry } from "../context/RehabContext";

interface RecoveryJournalProps {
  onNavigate: (page: string) => void;
}

const moodConfig = {
  great: { label: "Great", emoji: "🌟", bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  good:  { label: "Good",  emoji: "😊", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  okay:  { label: "Okay",  emoji: "😐", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  tough: { label: "Tough", emoji: "😓", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

const MOTIVATIONAL = [
  "Consistency leads to recovery.",
  "Small progress is still progress.",
  "You are one step closer to returning stronger.",
  "Every entry is a reflection of your commitment.",
];

export function RecoveryJournal({ onNavigate }: RecoveryJournalProps) {
  const { journal, addJournalEntry, updateJournalEntry, deleteJournalEntry } = useRehab();
  const [showNew, setShowNew] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", body: "", mood: "good" as JournalEntry["mood"] });

  const handleSave = () => {
    if (!form.title.trim() || !form.body.trim()) {
      toast.error("Please fill in both title and entry.");
      return;
    }
    if (editId !== null) {
      updateJournalEntry(editId, { title: form.title, body: form.body, mood: form.mood });
      toast.success("Journal entry updated.");
      setEditId(null);
    } else {
      addJournalEntry({
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        title: form.title,
        body: form.body,
        mood: form.mood,
        patientName: "Muhammad Arif",
        reviewed: false,
      });
      toast.success("Journal entry saved!", { description: MOTIVATIONAL[Math.floor(Math.random() * MOTIVATIONAL.length)] });
    }
    setForm({ title: "", body: "", mood: "good" });
    setShowNew(false);
  };

  const handleEdit = (e: JournalEntry) => {
    setForm({ title: e.title, body: e.body, mood: e.mood });
    setEditId(e.id);
    setShowNew(true);
  };

  const handleDelete = (id: number) => {
    deleteJournalEntry(id);
    toast.success("Entry deleted.");
  };

  return (
    <PatientLayout onNavigate={onNavigate} activePage="journal">
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-foreground">Recovery Journal</h1>
              <p className="text-muted-foreground text-sm">Document experiences, concerns, and progress. Your physiotherapist can review your entries.</p>
            </div>
          </div>
          <button onClick={() => { setShowNew(true); setEditId(null); setForm({ title: "", body: "", mood: "good" }); }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors text-sm flex-shrink-0">
            <Plus className="w-4 h-4" /> New Entry
          </button>
        </div>
        <div className="mb-8">
          <h1 className="text-foreground mb-1">My Recovery Journal</h1>
          <p className="text-muted-foreground text-sm">Document your rehabilitation experiences, concerns, and progress. Your physiotherapist can review your entries.</p>
        </div>

        {showNew && (
          <div className="bg-card border border-primary/30 rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-foreground">{editId !== null ? "Edit Entry" : "New Journal Entry"}</h3>
              <button onClick={() => { setShowNew(false); setEditId(null); }} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Title</label>
                <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. A tough but rewarding session"
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-1.5">Entry</label>
                <textarea value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                  placeholder="Write about your recovery experience, concerns, daily reflections, or progress..."
                  rows={5}
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-background focus:outline-none focus:border-primary resize-none" />
              </div>
              <div>
                <label className="text-muted-foreground text-xs uppercase tracking-wider block mb-2">How are you feeling today?</label>
                <div className="flex gap-3">
                  {(Object.keys(moodConfig) as JournalEntry["mood"][]).map((mood) => {
                    const m = moodConfig[mood];
                    return (
                      <button key={mood} onClick={() => setForm((f) => ({ ...f, mood }))}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all ${
                          form.mood === mood ? `${m.bg} ${m.text} ${m.border} ring-2 ring-offset-1 ring-primary/30` : "bg-background border-border text-muted-foreground hover:bg-secondary"
                        }`}>
                        <span>{m.emoji}</span> {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <button onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors">
                <Save className="w-4 h-4" /> {editId !== null ? "Update Entry" : "Save Entry"}
              </button>
            </div>
          </div>
        )}

        {journal.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No journal entries yet. Start your first entry above.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {journal.map((entry) => {
              const m = moodConfig[entry.mood];
              return (
                <div key={entry.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-sm transition-shadow group">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-foreground">{entry.title}</h3>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border ${m.bg} ${m.text} ${m.border}`}>
                          {m.emoji} {m.label}
                        </span>
                        {entry.reviewed && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Reviewed by Dr. Chen</span>
                        )}
                      </div>
                      <span className="text-muted-foreground text-xs">{entry.date}</span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button onClick={() => handleEdit(entry)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(entry.id)} className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{entry.body}</p>
                  {entry.feedback && (
                    <div className="mt-4 border-t border-emerald-100 pt-4 bg-emerald-50/60 -mx-6 -mb-6 px-6 pb-6 rounded-b-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">SC</div>
                        <span className="text-emerald-700 text-xs font-semibold">{entry.feedback.physiotherapist}</span>
                        <span className="text-emerald-600 text-xs">· {entry.feedback.date}</span>
                      </div>
                      <p className="text-emerald-800 text-sm leading-relaxed italic">"{entry.feedback.text}"</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-10 bg-gradient-to-r from-[#1e3a8a] to-[#1d4ed8] rounded-2xl p-6 flex items-center gap-4">
          <Sparkles className="w-8 h-8 text-cyan-300 flex-shrink-0" />
          <div>
            <div className="text-white font-medium mb-1">Keep going, Muhammad</div>
            <p className="text-blue-200 text-sm">Your physiotherapist reviews your journal entries and may provide feedback before your next session.</p>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
