import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { initialAuditEvents, verificationCases } from "@/lib/pramaan-data";
import type { AuditEvent, CaseStatus, VerificationCase } from "@/lib/pramaan-types";

interface PramaanContextValue {
  cases: VerificationCase[];
  auditEvents: AuditEvent[];
  updateCaseStatus: (caseId: string, action: string, status: CaseStatus) => void;
}

const PramaanContext = createContext<PramaanContextValue | undefined>(undefined);

export function PramaanProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useState(verificationCases);
  const [auditEvents, setAuditEvents] = useState(initialAuditEvents);

  const updateCaseStatus = (caseId: string, action: string, status: CaseStatus) => {
    const current = cases.find((item) => item.id === caseId);
    if (!current) return;
    setCases((items) => items.map((item) => item.id === caseId ? { ...item, status } : item));
    setAuditEvents((events) => [{
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      caseId,
      officer: "Supervisor Demo",
      action,
      checkpoint: current.checkpoint,
      status,
      detail: `Supervisor Demo updated the case to ${status.toLowerCase()} after reviewing the simulated evidence.`,
    }, ...events]);
  };

  const value = useMemo(() => ({ cases, auditEvents, updateCaseStatus }), [cases, auditEvents]);
  return <PramaanContext.Provider value={value}>{children}</PramaanContext.Provider>;
}

export function usePramaan() {
  const value = useContext(PramaanContext);
  if (!value) throw new Error("usePramaan must be used within PramaanProvider");
  return value;
}