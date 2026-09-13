import type { AuditEvent, Checkpoint, VerificationCase } from "./pramaan-types";

const arjunHistory = [
  { date: "Jan 12", checkpoint: "Delhi", document: "Passport", status: "Cleared" as const },
  { date: "Feb 03", checkpoint: "IGI", document: "Passport", status: "Cleared" as const },
  { date: "Mar 18", checkpoint: "IGI", document: "Passport", status: "Review" as const },
  { date: "Apr 02", checkpoint: "Demo Checkpoint", document: "Passport", status: "High Risk" as const },
];

export const verificationCases: VerificationCase[] = [
  {
    id: "PRM-2026-00142", time: "12:39", checkpoint: "IGI Demo", primarySignal: "Photo manipulation",
    status: "High Risk",
    identity: { id: "ID-ARJUN-4432", name: "ARJUN MEHRA", initials: "AM", history: arjunHistory, patterns: ["Multiple verification events", "Previous anomaly detected", "Document consistency issue"] },
    document: { type: "Passport", number: "N4827391", nationality: "INDIAN", dob: "14 Aug 1999", mrzDob: "14 Aug 1998", gender: "M", expiryDate: "21 Nov 2031", visaType: "Visitor", entryType: "Multiple", stayDuration: "30 days" },
    face: { score: 72.4, status: "BELOW CONFIGURED THRESHOLD" },
    forensics: [
      { region: "Photo Region", status: "High Anomaly", detail: "Pixel-level discontinuity is simulated around the portrait boundary." },
      { region: "Text Region", status: "Medium Anomaly", detail: "Character spacing differs from the reference document template." },
      { region: "Stamp Region", status: "Normal", detail: "No notable visual inconsistency in the stamp region." },
    ],
    validations: [
      { id: "format", label: "Document format", status: "Pass", explanation: "The visible document layout matches the expected passport template." },
      { id: "number", label: "Passport number", status: "Pass", explanation: "The passport number follows the configured structure." },
      { id: "expiry", label: "Expiry", status: "Pass", explanation: "The document is within its stated validity period." },
      { id: "mrz", label: "OCR ↔ MRZ consistency", status: "Warning", explanation: "The date of birth differs by one year between the two extracted sources." },
      { id: "fields", label: "Required fields", status: "Pass", explanation: "All required identity and travel fields are present." },
      { id: "travel", label: "Travel authorization", status: "Pass", explanation: "The presented travel authorization is present in this simulated record." },
    ],
    risk: { score: 86, level: "High", recommendation: "REFER FOR SECONDARY INSPECTION", signals: [
      { label: "Photo manipulation indicator", points: 30, explanation: "A simulated visual discontinuity appears around the document portrait." },
      { label: "OCR/MRZ inconsistency", points: 25, explanation: "Date of birth values differ across two document data sources." },
      { label: "Face mismatch", points: 20, explanation: "Similarity is below the configured demonstration threshold." },
      { label: "Other anomalies", points: 11, explanation: "Minor spacing and document-template deviations contributed to the assessment." },
    ], reasons: ["Potential photo manipulation detected", "Date of birth differs between OCR and MRZ", "Face similarity below configured threshold"] },
  },
  {
    id: "PRM-2026-00141", time: "12:41", checkpoint: "IGI Demo", primarySignal: "No significant anomaly",
    status: "Cleared",
    identity: { id: "ID-KAVYA-3810", name: "KAVYA SHARMA", initials: "KS", history: [{ date: "Apr 02", checkpoint: "IGI", document: "Passport", status: "Cleared" }], patterns: ["Consistent document evidence", "No prior anomaly observed"] },
    document: { type: "Passport", number: "P0934812", nationality: "INDIAN", dob: "03 Mar 1996", mrzDob: "03 Mar 1996", gender: "F", expiryDate: "08 Jul 2032", visaType: "Business", entryType: "Single", stayDuration: "14 days" },
    face: { score: 97.2, status: "HIGH CONFIDENCE MATCH" },
    forensics: [
      { region: "Photo Region", status: "Normal", detail: "No significant visual inconsistency in the portrait region." },
      { region: "Text Region", status: "Normal", detail: "Text placement is consistent with the reference template." },
      { region: "Stamp Region", status: "Normal", detail: "No notable visual inconsistency in the stamp region." },
    ],
    validations: [
      { id: "format", label: "Document format", status: "Pass", explanation: "The visible layout matches the expected passport template." },
      { id: "number", label: "Passport number", status: "Pass", explanation: "The passport number follows the configured structure." },
      { id: "expiry", label: "Expiry", status: "Pass", explanation: "The document is within its stated validity period." },
      { id: "mrz", label: "OCR ↔ MRZ consistency", status: "Pass", explanation: "All compared OCR and MRZ values are consistent." },
      { id: "fields", label: "Required fields", status: "Pass", explanation: "All required identity and travel fields are present." },
      { id: "travel", label: "Travel authorization", status: "Pass", explanation: "The presented travel authorization is present in this simulated record." },
    ],
    risk: { score: 18, level: "Low", recommendation: "CLEAR", signals: [
      { label: "Document quality variance", points: 8, explanation: "Minor capture-quality variance with no material inconsistency." },
      { label: "Template variance", points: 6, explanation: "Small alignment variation within configured tolerance." },
      { label: "Other observations", points: 4, explanation: "Routine low-weight screening observations." },
    ], reasons: ["No significant document anomaly", "Identity fields are consistent", "Face similarity exceeds configured threshold"] },
  },
  {
    id: "PRM-2026-00140", time: "12:37", checkpoint: "Delhi Demo", primarySignal: "MRZ inconsistency", status: "Review",
    identity: { id: "ID-SAMEER-1902", name: "SAMEER KHAN", initials: "SK", history: [], patterns: ["First observed verification"] },
    document: { type: "Visa", number: "V6102938", nationality: "INDIAN", dob: "22 Jan 1992", mrzDob: "22 Jan 1992", gender: "M", expiryDate: "12 Dec 2027", visaType: "Work", entryType: "Multiple", stayDuration: "180 days" },
    face: { score: 91.8, status: "MATCH" }, forensics: [], validations: [],
    risk: { score: 42, level: "Medium", recommendation: "MANUAL REVIEW", signals: [{ label: "Field inconsistency", points: 42, explanation: "One field requires human review." }], reasons: ["One source field requires review"] },
  },
];

export const checkpoints: Checkpoint[] = [
  { id: "igi", name: "IGI Airport", verifications: 127, averageTime: "18 sec", highRisk: 4, status: "Operational" },
  { id: "attari", name: "Attari Land Checkpoint", verifications: 83, averageTime: "21 sec", highRisk: 2, status: "Operational" },
  { id: "demo-b", name: "Demo Checkpoint B", verifications: 64, averageTime: "19 sec", highRisk: 1, status: "Operational" },
  { id: "demo-c", name: "Demo Checkpoint C", verifications: 41, averageTime: "24 sec", highRisk: 1, status: "Monitoring" },
];

export const initialAuditEvents: AuditEvent[] = [
  { id: "AUD-1042", timestamp: "12:42", caseId: "PRM-2026-00142", officer: "Supervisor Demo", action: "Case opened for investigation", checkpoint: "IGI Demo", status: "Review", detail: "Supervisor reviewed the combined document, identity, and risk evidence." },
  { id: "AUD-1041", timestamp: "12:41", caseId: "PRM-2026-00142", officer: "Officer 042", action: "Verification completed", checkpoint: "IGI Demo", status: "High Risk", detail: "Checkpoint screening completed and routed for supervisor review." },
  { id: "AUD-1040", timestamp: "12:39", caseId: "PRM-2026-00141", officer: "Officer 018", action: "Case cleared", checkpoint: "IGI Demo", status: "Cleared", detail: "Evidence was consistent with configured screening thresholds." },
  { id: "AUD-1039", timestamp: "12:37", caseId: "PRM-2026-00140", officer: "Officer 027", action: "Manual review requested", checkpoint: "Delhi Demo", status: "Review", detail: "A source-field inconsistency requires an authorized review." },
];

export const volumeData = [
  { name: "08:00", verifications: 42 }, { name: "09:00", verifications: 68 }, { name: "10:00", verifications: 91 },
  { name: "11:00", verifications: 108 }, { name: "12:00", verifications: 127 }, { name: "13:00", verifications: 102 },
];

export const anomalyData = [
  { name: "Document Tampering", value: 18 }, { name: "OCR/MRZ Inconsistency", value: 14 },
  { name: "Face Mismatch", value: 11 }, { name: "Expired Document", value: 7 }, { name: "Invalid Format", value: 5 },
];