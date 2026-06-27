import { createContext, useContext, useState, ReactNode } from "react";

export type AssignedExercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  frequency: string;
  dateAssigned: string;
  weekAssigned: string;
  status: "Pending" | "In Progress" | "Completed";
  patientId: string;
};

export type Notification = {
  id: number;
  for: "patient" | "physio";
  message: string;
  time: string;
  read: boolean;
  type: "exercise" | "journal" | "checkin" | "message" | "feedback" | "assignment";
};

export type PhysioFeedback = {
  text: string;
  physiotherapist: string;
  date: string;
};

export type JournalEntry = {
  id: number;
  date: string;
  title: string;
  body: string;
  mood: "great" | "good" | "okay" | "tough";
  patientName: string;
  reviewed: boolean;
  feedback?: PhysioFeedback;
};

export type CheckInResponse = {
  id: number;
  date: string;
  patientName: string;
  pain: number;
  confidence: number;
  motivation: number;
  concern: string;
};

export type ChatMessage = {
  id: number;
  from: "patient" | "physio";
  text: string;
  time: string;
  read: boolean;
};

export type PatientConversation = {
  patientId: string;
  patientName: string;
  messages: ChatMessage[];
};

export type RecoveryStatus = "On Track" | "Needs Attention" | "Review Required";

const defaultExercises: AssignedExercise[] = [
  { id: 1, name: "Straight Leg Raises", sets: 3, reps: 12, frequency: "Daily", dateAssigned: "1 Jun 2026", weekAssigned: "Week 1", status: "Completed", patientId: "P-1042" },
  { id: 2, name: "Terminal Knee Extension", sets: 3, reps: 15, frequency: "Daily", dateAssigned: "8 Jun 2026", weekAssigned: "Week 3", status: "In Progress", patientId: "P-1042" },
  { id: 3, name: "Mini Squats (0–30°)", sets: 3, reps: 10, frequency: "Daily", dateAssigned: "8 Jun 2026", weekAssigned: "Week 3", status: "Pending", patientId: "P-1042" },
  { id: 4, name: "Step-Ups", sets: 3, reps: 8, frequency: "3× / week", dateAssigned: "8 Jun 2026", weekAssigned: "Week 5", status: "Pending", patientId: "P-1042" },
  { id: 5, name: "Wall Slides", sets: 2, reps: 10, frequency: "Daily", dateAssigned: "1 Jun 2026", weekAssigned: "Week 2", status: "Completed", patientId: "P-1039" },
  { id: 6, name: "Quad Sets", sets: 3, reps: 12, frequency: "Daily", dateAssigned: "8 Jun 2026", weekAssigned: "Week 4", status: "In Progress", patientId: "P-1039" },
];

const defaultNotifications: Notification[] = [
  { id: 1, for: "patient", message: "Dr. Sarah Chen replied to your message.", time: "14 Jun, 8:32 AM", read: false, type: "message" },
  { id: 2, for: "patient", message: "New exercise assigned: Terminal Knee Extension (Week 3).", time: "8 Jun, 9:00 AM", read: true, type: "assignment" },
  { id: 3, for: "patient", message: "Dr. Sarah Chen reviewed your journal entry and left feedback.", time: "11 Jun, 2:00 PM", read: true, type: "feedback" },
  { id: 4, for: "physio", message: "Muhammad Arif submitted a new journal entry: 'First week complete'.", time: "12 Jun, 10:05 AM", read: false, type: "journal" },
  { id: 5, for: "physio", message: "Muhammad Arif completed Terminal Knee Extension — Score 88%.", time: "14 Jun, 10:18 AM", read: false, type: "exercise" },
  { id: 6, for: "physio", message: "Siti Aminah submitted a weekly check-in. Pain: 5/10.", time: "14 Jun, 9:45 AM", read: false, type: "checkin" },
  { id: 7, for: "physio", message: "Lee Mei Ling completed her first exercise session.", time: "14 Jun, 8:00 AM", read: true, type: "exercise" },
];

const defaultJournal: JournalEntry[] = [
  {
    id: 1, date: "12 Jun 2026",
    title: "First week complete — cautiously optimistic",
    body: "Completed all three prescribed exercises today without stopping. The knee felt more stable than last week. Still some discomfort during step-ups but much better than the first session.",
    mood: "good", patientName: "Muhammad Arif", reviewed: false,
  },
  {
    id: 2, date: "10 Jun 2026",
    title: "Tough session — but I pushed through",
    body: "The terminal knee extension sets felt harder today. My knee was a bit swollen after yesterday's long walk. I applied ice afterward. Feeling frustrated that progress feels slow but I know consistency matters.",
    mood: "tough", patientName: "Muhammad Arif", reviewed: true,
    feedback: { text: "The swelling is a normal response — you're doing well to apply ice. Keep monitoring it. Your persistence is exactly what drives recovery. Well done.", physiotherapist: "Dr. Sarah Chen", date: "11 Jun 2026" },
  },
  {
    id: 3, date: "8 Jun 2026",
    title: "Milestone: full knee extension",
    body: "Achieved full 90° flexion for the first time during the mini squat exercise. The AI feedback said 'Excellent repetition!' three times in a row. That felt amazing.",
    mood: "great", patientName: "Muhammad Arif", reviewed: true,
    feedback: { text: "This is a significant milestone — 90° at Week 3 is excellent. Keep the momentum going!", physiotherapist: "Dr. Sarah Chen", date: "9 Jun 2026" },
  },
];

const defaultCheckIns: CheckInResponse[] = [
  { id: 1, date: "14 Jun 2026", patientName: "Muhammad Arif", pain: 3, confidence: 4, motivation: 4, concern: "Some swelling after step-ups. Reduced reps as advised." },
  { id: 2, date: "7 Jun 2026", patientName: "Muhammad Arif", pain: 4, confidence: 3, motivation: 3, concern: "Morning stiffness persists. Unsure if I am doing the exercises correctly." },
  { id: 3, date: "14 Jun 2026", patientName: "Siti Aminah", pain: 5, confidence: 3, motivation: 3, concern: "Morning stiffness persists. Needs physiotherapy review." },
  { id: 4, date: "14 Jun 2026", patientName: "Raj Kumar", pain: 1, confidence: 5, motivation: 5, concern: "Feeling great — ready to progress to the next phase." },
];

const defaultConversations: PatientConversation[] = [
  {
    patientId: "P-1042", patientName: "Muhammad Arif",
    messages: [
      { id: 1, from: "physio", text: "Hi Muhammad! I reviewed your latest session results. Your knee angle has improved significantly — well done!", time: "12 Jun, 9:14 AM", read: true },
      { id: 2, from: "patient", text: "Thank you Dr. Chen! My knee still feels stiff in the mornings. Is that normal?", time: "12 Jun, 10:02 AM", read: true },
      { id: 3, from: "physio", text: "Morning stiffness is completely normal at Week 3. Try gentle ankle circles before getting up — it warms the joint. Keep it up!", time: "12 Jun, 11:30 AM", read: true },
      { id: 4, from: "patient", text: "I noticed swelling after the step-up exercises yesterday. Should I reduce the reps?", time: "13 Jun, 7:55 PM", read: true },
      { id: 5, from: "physio", text: "Apply ice for 15 min after sessions if you notice swelling. Let's reduce step-ups to 6 reps this week. I've updated your plan.", time: "14 Jun, 8:30 AM", read: false },
    ],
  },
  {
    patientId: "P-1039", patientName: "Siti Aminah",
    messages: [
      { id: 10, from: "physio", text: "Hi Siti, how are you feeling after this week's sessions?", time: "10 Jun, 10:00 AM", read: true },
      { id: 11, from: "patient", text: "The quad sets are getting easier. Still some stiffness in the morning though.", time: "10 Jun, 11:15 AM", read: true },
      { id: 12, from: "patient", text: "Should I do more repetitions than assigned, or stick to the plan?", time: "13 Jun, 8:30 PM", read: false },
    ],
  },
  {
    patientId: "P-1035", patientName: "Raj Kumar",
    messages: [
      { id: 20, from: "patient", text: "Dr. Chen, I feel ready to progress to the next phase. My knee feels very stable.", time: "14 Jun, 9:00 AM", read: false },
    ],
  },
  {
    patientId: "P-1028", patientName: "Lee Mei Ling",
    messages: [
      { id: 30, from: "physio", text: "Welcome to Recovr, Lee Mei Ling! I've assigned your Week 1 exercises. Let me know if you have any questions.", time: "14 Jun, 8:00 AM", read: true },
    ],
  },
  {
    patientId: "P-1021", patientName: "Ahmad Zaidi",
    messages: [
      { id: 40, from: "patient", text: "I completed all my exercises this week without pain. When can we start the return-to-sport protocol?", time: "12 Jun, 3:00 PM", read: true },
      { id: 41, from: "physio", text: "Excellent progress Ahmad! Let's schedule a formal assessment next week before we transition. Keep up the great work.", time: "12 Jun, 4:30 PM", read: true },
    ],
  },
];

type RehabContextType = {
  exercises: AssignedExercise[];
  addExercise: (ex: Omit<AssignedExercise, "id">) => void;
  completeExercise: (id: number) => void;
  notifications: Notification[];
  addNotification: (n: Omit<Notification, "id">) => void;
  markNotificationRead: (id: number) => void;
  markAllPhysioRead: () => void;
  unreadPatient: number;
  unreadPhysio: number;
  journal: JournalEntry[];
  addJournalEntry: (e: Omit<JournalEntry, "id">) => void;
  updateJournalEntry: (id: number, e: Partial<JournalEntry>) => void;
  deleteJournalEntry: (id: number) => void;
  markJournalReviewed: (id: number) => void;
  addJournalFeedback: (id: number, feedback: PhysioFeedback) => void;
  checkIns: CheckInResponse[];
  addCheckIn: (c: Omit<CheckInResponse, "id">) => void;
  conversations: PatientConversation[];
  sendMessage: (patientId: string, from: "patient" | "physio", text: string) => void;
  unreadConvCount: (patientId: string, forRole: "patient" | "physio") => number;
  totalUnreadPhysioMessages: number;
  getRecoveryStatus: (score: number, patientId: string) => RecoveryStatus;
};

const RehabContext = createContext<RehabContextType | null>(null);

export function RehabProvider({ children }: { children: ReactNode }) {
  const [exercises, setExercises] = useState<AssignedExercise[]>(defaultExercises);
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);
  const [journal, setJournal] = useState<JournalEntry[]>(defaultJournal);
  const [checkIns, setCheckIns] = useState<CheckInResponse[]>(defaultCheckIns);
  const [conversations, setConversations] = useState<PatientConversation[]>(defaultConversations);

  const addExercise = (ex: Omit<AssignedExercise, "id">) => {
    const newEx = { ...ex, id: Date.now() };
    setExercises((prev) => [...prev, newEx]);
    setNotifications((prev) => [...prev, {
      id: Date.now() + 1, for: "patient" as const,
      message: `New exercise assigned: ${ex.name} (${ex.weekAssigned}) by your physiotherapist.`,
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      read: false, type: "assignment" as const,
    }]);
  };

  const completeExercise = (id: number) => {
    const ex = exercises.find((e) => e.id === id);
    setExercises((prev) => prev.map((e) => e.id === id ? { ...e, status: "Completed" } : e));
    if (ex) {
      setNotifications((prev) => [...prev, {
        id: Date.now(), for: "physio" as const,
        message: `Muhammad Arif completed ${ex.name} — Session recorded.`,
        time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
        read: false, type: "exercise" as const,
      }]);
    }
  };

  const addNotification = (n: Omit<Notification, "id">) =>
    setNotifications((prev) => [...prev, { ...n, id: Date.now() }]);

  const markNotificationRead = (id: number) =>
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const markAllPhysioRead = () =>
    setNotifications((prev) => prev.map((n) => n.for === "physio" ? { ...n, read: true } : n));

  const addJournalEntry = (e: Omit<JournalEntry, "id">) => {
    const entry = { ...e, id: Date.now() };
    setJournal((prev) => [entry, ...prev]);
    setNotifications((prev) => [...prev, {
      id: Date.now() + 1, for: "physio" as const,
      message: `${e.patientName} submitted a new journal entry: "${e.title}"`,
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      read: false, type: "journal" as const,
    }]);
  };

  const updateJournalEntry = (id: number, e: Partial<JournalEntry>) =>
    setJournal((prev) => prev.map((j) => j.id === id ? { ...j, ...e } : j));

  const deleteJournalEntry = (id: number) =>
    setJournal((prev) => prev.filter((j) => j.id !== id));

  const markJournalReviewed = (id: number) =>
    setJournal((prev) => prev.map((j) => j.id === id ? { ...j, reviewed: true } : j));

  const addJournalFeedback = (id: number, feedback: PhysioFeedback) => {
    setJournal((prev) => prev.map((j) => j.id === id ? { ...j, reviewed: true, feedback } : j));
    setNotifications((prev) => [...prev, {
      id: Date.now(), for: "patient" as const,
      message: `Dr. Sarah Chen reviewed your journal entry and left feedback.`,
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      read: false, type: "feedback" as const,
    }]);
  };

  const addCheckIn = (c: Omit<CheckInResponse, "id">) => {
    setCheckIns((prev) => [{ ...c, id: Date.now() }, ...prev]);
    setNotifications((prev) => [...prev, {
      id: Date.now() + 1, for: "physio" as const,
      message: `${c.patientName} submitted a weekly check-in. Pain: ${c.pain}/10, Confidence: ${c.confidence}/10.`,
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      read: false, type: "checkin" as const,
    }]);
  };

  const sendMessage = (patientId: string, from: "patient" | "physio", text: string) => {
    const now = new Date();
    const timeStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) + ", " +
      now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const newMsg: ChatMessage = { id: Date.now(), from, text, time: timeStr, read: false };
    setConversations((prev) => prev.map((c) =>
      c.patientId === patientId ? { ...c, messages: [...c.messages, newMsg] } : c
    ));
    const conv = conversations.find((c) => c.patientId === patientId);
    const notifFor = from === "patient" ? "physio" : "patient";
    setNotifications((prev) => [...prev, {
      id: Date.now() + 1, for: notifFor,
      message: from === "patient"
        ? `${conv?.patientName ?? "Patient"} sent you a new message.`
        : `Dr. Sarah Chen replied to your message.`,
      time: timeStr, read: false, type: "message" as const,
    }]);
  };

  const unreadConvCount = (patientId: string, forRole: "patient" | "physio") => {
    const conv = conversations.find((c) => c.patientId === patientId);
    if (!conv) return 0;
    return conv.messages.filter((m) => !m.read && m.from !== forRole).length;
  };

  const totalUnreadPhysioMessages = conversations.reduce(
    (acc, conv) => acc + conv.messages.filter((m) => !m.read && m.from === "patient").length, 0
  );

  const getRecoveryStatus = (score: number, patientId: string): RecoveryStatus => {
    const conv = conversations.find((c) => c.patientId === patientId);
    const latestCheckIn = checkIns.find((c) => conv && c.patientName === conv.patientName);
    if (score >= 85 && (!latestCheckIn || latestCheckIn.pain <= 4)) return "On Track";
    if (score >= 60) return "Needs Attention";
    return "Review Required";
  };

  const unreadPatient = notifications.filter((n) => n.for === "patient" && !n.read).length;
  const unreadPhysio = notifications.filter((n) => n.for === "physio" && !n.read).length;

  return (
    <RehabContext.Provider value={{
      exercises, addExercise, completeExercise,
      notifications, addNotification, markNotificationRead, markAllPhysioRead,
      unreadPatient, unreadPhysio,
      journal, addJournalEntry, updateJournalEntry, deleteJournalEntry,
      markJournalReviewed, addJournalFeedback,
      checkIns, addCheckIn,
      conversations, sendMessage, unreadConvCount, totalUnreadPhysioMessages,
      getRecoveryStatus,
    }}>
      {children}
    </RehabContext.Provider>
  );
}

export function useRehab() {
  const ctx = useContext(RehabContext);
  if (!ctx) throw new Error("useRehab must be inside RehabProvider");
  return ctx;
}
