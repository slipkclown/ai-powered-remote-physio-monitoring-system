import { useState } from "react";
import { Toaster } from "sonner";
import { RehabProvider } from "./context/RehabContext";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { PatientDashboard } from "./components/PatientDashboard";
import { ExerciseMonitor } from "./components/ExerciseMonitor";
import { ResultsPage } from "./components/ResultsPage";
import { PhysioDashboard } from "./components/PhysioDashboard";
import { ArchitectureDiagram } from "./components/ArchitectureDiagram";
import { RecoveryJournal } from "./components/RecoveryJournal";
import { ConfidenceTracking } from "./components/ConfidenceTracking";
import { WeeklyCheckIn } from "./components/WeeklyCheckIn";
import { MessageCentre } from "./components/MessageCentre";
import { PatientProfile } from "./components/PatientProfile";
import { ProgressHistory } from "./components/ProgressHistory";

type Page =
  | "home" | "patient-login" | "physio-login"
  | "patient" | "monitor" | "results" | "physio" | "arch"
  | "journal" | "confidence" | "checkin" | "messages"
  | "patient-profile" | "progress-history";

function AppInner() {
  const [page, setPage] = useState<Page>("home");
  const navigate = (p: string) => setPage(p as Page);

  function renderPage() {
    switch (page) {
      case "home":             return <HomePage onNavigate={navigate} />;
      case "patient-login":   return <LoginPage role="patient" onLogin={() => navigate("patient")} onBack={() => navigate("home")} />;
      case "physio-login":    return <LoginPage role="physio" onLogin={() => navigate("physio")} onBack={() => navigate("home")} />;
      case "patient":         return <PatientDashboard onNavigate={navigate} />;
      case "monitor":         return <ExerciseMonitor onNavigate={navigate} />;
      case "results":         return <ResultsPage onNavigate={navigate} />;
      case "physio":          return <PhysioDashboard onNavigate={navigate} />;
      case "arch":            return <ArchitectureDiagram onNavigate={navigate} />;
      case "journal":         return <RecoveryJournal onNavigate={navigate} />;
      case "confidence":      return <ConfidenceTracking onNavigate={navigate} />;
      case "checkin":         return <WeeklyCheckIn onNavigate={navigate} />;
      case "messages":        return <MessageCentre onNavigate={navigate} role="patient" />;
      case "patient-profile": return <PatientProfile onNavigate={navigate} />;
      case "progress-history":return <ProgressHistory onNavigate={navigate} />;
      default:                return <HomePage onNavigate={navigate} />;
    }
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      {renderPage()}
    </>
  );
}

export default function App() {
  return (
    <RehabProvider>
      <AppInner />
    </RehabProvider>
  );
}
