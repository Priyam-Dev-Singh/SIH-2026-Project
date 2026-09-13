export type RiskLevel = "Low" | "Medium" | "High";
export type CaseStatus = "Cleared" | "Review" | "High Risk" | "Escalated";

export interface DocumentRecord {
  type: string;
  number: string;
  nationality: string;
  dob: string;
  mrzDob: string;
  gender: string;
  expiryDate: string;
  visaType: string;
  entryType: string;
  stayDuration: string;
}

export interface Identity {
  id: string;
  name: string;
  initials: string;
  history: { date: string; checkpoint: string; document: string; status: CaseStatus }[];
  patterns: string[];
}

export interface ValidationResult {
  id: string;
  label: string;
  status: "Pass" | "Warning";
  explanation: string;
}

export interface ForensicResult {
  region: "Photo Region" | "Text Region" | "Stamp Region";
  status: "High Anomaly" | "Medium Anomaly" | "Normal";
  detail: string;
}

export interface FaceVerification {
  score: number;
  status: string;
}

export interface RiskAssessment {
  score: number;
  level: RiskLevel;
  signals: { label: string; points: number; explanation: string }[];
  reasons: string[];
  recommendation: string;
}

export interface VerificationCase {
  id: string;
  time: string;
  checkpoint: string;
  identity: Identity;
  document: DocumentRecord;
  primarySignal: string;
  status: CaseStatus;
  face: FaceVerification;
  forensics: ForensicResult[];
  validations: ValidationResult[];
  risk: RiskAssessment;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  caseId: string;
  officer: string;
  action: string;
  checkpoint: string;
  status: CaseStatus;
  detail: string;
}

export interface Checkpoint {
  id: string;
  name: string;
  verifications: number;
  averageTime: string;
  highRisk: number;
  status: "Operational" | "Monitoring";
}