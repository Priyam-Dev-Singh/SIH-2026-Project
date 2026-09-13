# PRAMAAN Command Center Prototype

## Goal
Build a frontend-only, judge-ready command center that presents identity screening as explainable decision support. All records, results, filters, actions, and evidence will use realistic local mock data.

## Experience
- Create a responsive command-center shell with a collapsible left navigation and clear prototype labeling.
- Add distinct pages for Dashboard, Verification Queue, High-Risk Cases, Identity Intelligence, Analytics, Audit Trail, and Settings.
- Make the two complete demo cases easy to reach from the dashboard, queue, and high-risk view.
- Keep the interface dense, legible, and professional across desktop, laptop, and tablet widths.

## Investigation Workflow
- Build the detailed case screen as the centerpiece: document preview, original/forensic modes, annotated anomaly regions, face comparison, structured document data, OCR/MRZ discrepancy, expandable validation evidence, and explainable risk scoring.
- Support both the normal 18/100 case and high-risk 86/100 case with a prominent case switcher.
- Add working secondary-inspection, clear, and escalate actions with confirmation, status updates, and a simulated audit entry.

## Operational Views
- Dashboard KPIs, live activity, risk distribution, and checkpoint monitoring.
- Queue tabs and filters that update visible mock results.
- Identity verification history and observed evidence patterns without criminal-profiling language.
- Interactive analytics with date-range filtering and focused charts.
- Expandable audit events plus the required simulated-record notice.
- Practical prototype settings for thresholds and checkpoint display.

## Technical Details
- Use TanStack routes with unique metadata for each shareable page.
- Define reusable TypeScript models and structured mock records for cases, documents, identities, validation, forensics, face checks, risks, audit events, and checkpoints.
- Use shared application-shell, status, chart, table, evidence, and dialog components; keep state in React/local mock state only.
- Use semantic Tailwind v4 design tokens, existing interface controls, Lucide icons, and Recharts.
- Validate route navigation, filters, tabs, dialogs, case actions, desktop layout, and tablet collapse in the running preview.
