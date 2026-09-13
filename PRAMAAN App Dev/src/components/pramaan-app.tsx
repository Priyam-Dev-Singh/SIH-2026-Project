import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  FileCheck2,
  FileClock,
  FileScan,
  Fingerprint,
  History,
  Home,
  IdCard,
  Info,
  LockKeyhole,
  LogOut,
  Menu,
  RefreshCcw,
  ScanFace,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import normalPortrait from "@/assets/arjun-demo-portrait.jpg";
import highRiskPortrait from "@/assets/highrisk-demo-portrait.jpg";

type MainView = "home" | "verify" | "history" | "profile";
type Scenario = "normal" | "high";
type Status = "cleared" | "review" | "high" | "escalated";
type Decision = "Clear" | "Refer for secondary review" | "Escalate";

type HistoryRecord = {
  id: string;
  time: string;
  document: string;
  score: number;
  status: Status;
  name: string;
  passport: string;
};

const INITIAL_RECORDS: HistoryRecord[] = [
  { id: "PRM-260913-1241", time: "12:41", document: "Passport", score: 18, status: "cleared", name: "ARJUN MEHRA", passport: "P1234567" },
  { id: "PRM-260913-1237", time: "12:37", document: "Passport", score: 86, status: "high", name: "KABIR SETHI", passport: "N7842091" },
  { id: "PRM-260913-1234", time: "12:34", document: "Visa", score: 12, status: "cleared", name: "MEERA DAS", passport: "V5093421" },
  { id: "PRM-260913-1228", time: "12:28", document: "Passport", score: 54, status: "review", name: "ROHAN GUPTA", passport: "M6381045" },
];

const STEPS = ["Capture", "Extract", "Validate", "Compare", "Assess"];
const WORKFLOW_TITLES = [
  "Capture Document",
  "Document Quality",
  "Extracted Information",
  "Document Validation",
  "Document Forensics",
  "Verify Identity",
  "Face Verification",
  "Verification Assessment",
  "Officer Decision",
  "Audit Record",
];

const scenarioData = {
  normal: {
    name: "ARJUN MEHRA",
    passport: "P1234567",
    nationality: "INDIAN",
    dob: "14 Aug 1999",
    gender: "M",
    expiry: "22 Nov 2030",
    mrz: ["P<INDMEHRA<<ARJUN<<<<<<<<<<<<<<<<<<<<<<<<", "P1234567<4IND9908143M3011227<<<<<<<<<<<<<<08"],
    score: 18,
    match: "97.2%",
    status: "LOW RISK",
    recommendation: "CLEAR FOR NORMAL PROCESSING",
    portrait: normalPortrait,
  },
  high: {
    name: "KABIR SETHI",
    passport: "N7842091",
    nationality: "INDIAN",
    dob: "03 Feb 1992",
    gender: "M",
    expiry: "16 May 2029",
    mrz: ["P<INDSETHI<<KABIR<<<<<<<<<<<<<<<<<<<<<<<<", "N7842091<7IND9202035M2905162<<<<<<<<<<<<<<04"],
    score: 86,
    match: "62.4%",
    status: "HIGH RISK",
    recommendation: "REFER FOR SECONDARY INSPECTION",
    portrait: highRiskPortrait,
  },
};

function StatusBadge({ status, label }: { status: Status | "low"; label?: string }) {
  const styles = {
    cleared: "bg-success-soft text-success border-success/20",
    low: "bg-success-soft text-success border-success/20",
    review: "bg-warning-soft text-warning border-warning/20",
    high: "bg-danger-soft text-danger border-danger/20",
    escalated: "bg-danger-soft text-danger border-danger/20",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold", styles[status])}>
      <span className="size-1.5 rounded-full bg-current" />
      {label ?? status.toUpperCase()}
    </span>
  );
}

function AppHeader({ title, subtitle, onBack, right }: { title: string; subtitle?: string; onBack?: () => void; right?: ReactNode }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-4xl items-center gap-3 px-4 md:px-6">
        {onBack ? (
          <Button variant="ghost" size="icon" onClick={onBack} aria-label="Go back" className="-ml-2 size-11">
            <ArrowLeft />
          </Button>
        ) : (
          <div className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <Fingerprint className="size-5" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold leading-tight text-foreground">{title}</p>
          {subtitle && <p className="mt-0.5 truncate text-xs font-medium text-muted-foreground">{subtitle}</p>}
        </div>
        {right}
      </div>
    </header>
  );
}

function BottomNav({ value, onChange }: { value: MainView; onChange: (value: MainView) => void }) {
  const items = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "verify" as const, label: "Verify", icon: FileScan },
    { id: "history" as const, label: "History", icon: History },
    { id: "profile" as const, label: "Profile", icon: CircleUserRound },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid h-18 max-w-xl grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          const active = value === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onChange(item.id)}
              className={cn("h-full flex-col gap-1 rounded-none text-xs", active ? "text-primary" : "text-muted-foreground")}
              aria-label={item.label}
            >
              <span className={cn("grid size-8 place-items-center rounded-md", active && "bg-accent")}><Icon className="size-5" /></span>
              {item.label}
            </Button>
          );
        })}
      </div>
    </nav>
  );
}

function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return <div className="mb-3 flex items-center justify-between"><h2 className="text-xs font-extrabold uppercase text-muted-foreground">{children}</h2>{action}</div>;
}

function VerificationRow({ label, state = "pass", detail }: { label: string; state?: "pass" | "warn" | "fail"; detail?: string }) {
  const Icon = state === "pass" ? CheckCircle2 : state === "warn" ? AlertTriangle : XCircle;
  return (
    <div className="flex items-start gap-3 border-b border-border py-3.5 last:border-0">
      <Icon className={cn("mt-0.5 size-5 shrink-0", state === "pass" ? "text-success" : state === "warn" ? "text-warning" : "text-danger")} />
      <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-foreground">{label}</p>{detail && <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{detail}</p>}</div>
    </div>
  );
}

function MetricCard({ value, label, tone = "default" }: { value: string | number; label: string; tone?: "default" | "success" | "warning" | "danger" }) {
  const toneClass = { default: "text-foreground", success: "text-success", warning: "text-warning", danger: "text-danger" }[tone];
  return <div className="rounded-lg border border-border bg-card p-4 shadow-card"><p className={cn("text-2xl font-extrabold", toneClass)}>{value}</p><p className="mt-1 text-xs font-semibold text-muted-foreground">{label}</p></div>;
}

function HomeScreen({ onStart, onHistory }: { onStart: () => void; onHistory: () => void }) {
  return (
    <>
      <AppHeader title="PRAMAAN" subtitle="AI-Powered Identity Trust Engine" right={<Button variant="ghost" size="icon" aria-label="Menu" className="size-11"><Menu /></Button>} />
      <main className="mx-auto w-full max-w-4xl px-4 pb-28 pt-5 md:px-6">
        <section className="overflow-hidden rounded-lg bg-primary text-primary-foreground shadow-elevated">
          <div className="border-b border-primary-foreground/15 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-xs font-bold"><span className="size-2 rounded-full bg-session" /> Officer Session Active</span>
              <ShieldCheck className="size-6 opacity-80" />
            </div>
            <p className="text-xs font-semibold text-primary-foreground/70">CHECKPOINT</p>
            <h1 className="mt-1 text-xl font-bold">IGI Airport — Demo Checkpoint</h1>
            <p className="mt-1 text-sm text-primary-foreground/70">Officer 042 · Border Verification Officer</p>
          </div>
          <div className="p-4">
            <Button onClick={onStart} className="h-14 w-full bg-background text-primary shadow-none hover:bg-accent text-base font-bold">
              <FileScan className="size-5" /> Start Verification <ArrowRight className="ml-auto size-5" />
            </Button>
          </div>
        </section>

        <section className="mt-7">
          <SectionTitle>Today&apos;s Activity</SectionTitle>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <MetricCard value={127} label="Verifications" />
            <MetricCard value={113} label="Cleared" tone="success" />
            <MetricCard value={10} label="Review Required" tone="warning" />
            <MetricCard value={4} label="High Risk" tone="danger" />
          </div>
        </section>

        <section className="mt-7">
          <SectionTitle action={<Button variant="ghost" className="h-auto p-1 text-xs text-primary" onClick={onHistory}>View all <ChevronRight /></Button>}>Recent Verifications</SectionTitle>
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
            {INITIAL_RECORDS.slice(0, 3).map((record, index) => (
              <button key={record.id} onClick={onHistory} className={cn("flex min-h-18 w-full items-center gap-3 px-4 text-left transition-colors hover:bg-muted", index > 0 && "border-t border-border")}>
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent text-primary"><IdCard className="size-5" /></span>
                <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-foreground">{record.document}</span><span className="mt-0.5 block text-xs text-muted-foreground">{record.score} / 100 risk · {index === 0 ? "2" : index === 1 ? "5" : "8"} min ago</span></span>
                <StatusBadge status={record.status} label={record.status === "cleared" ? "CLEARED" : record.status === "review" ? "REVIEW" : "HIGH RISK"} />
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function ProgressStepper({ stage }: { stage: number }) {
  const activeIndex = stage <= 1 ? 0 : stage <= 2 ? 1 : stage <= 4 ? 2 : stage <= 6 ? 3 : 4;
  return (
    <div className="border-b border-border bg-background px-4 py-4">
      <div className="mx-auto flex max-w-xl items-start">
        {STEPS.map((label, index) => (
          <div key={label} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <span className={cn("h-0.5 flex-1", index === 0 ? "bg-transparent" : index <= activeIndex ? "bg-primary" : "bg-border")} />
              <span className={cn("grid size-7 shrink-0 place-items-center rounded-full border text-xs font-bold", index < activeIndex ? "border-primary bg-primary text-primary-foreground" : index === activeIndex ? "border-primary bg-background text-primary ring-4 ring-accent" : "border-border bg-background text-muted-foreground")}>
                {index < activeIndex ? <Check className="size-4" /> : index + 1}
              </span>
              <span className={cn("h-0.5 flex-1", index === STEPS.length - 1 ? "bg-transparent" : index < activeIndex ? "bg-primary" : "bg-border")} />
            </div>
            <span className={cn("mt-2 text-center text-[10px] font-bold", index === activeIndex ? "text-primary" : "text-muted-foreground")}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScenarioSelector({ value, onChange }: { value: Scenario; onChange: (s: Scenario) => void }) {
  return (
    <div className="grid grid-cols-2 rounded-lg border border-border bg-muted p-1" aria-label="Demo scenario selector">
      <Button variant="ghost" onClick={() => onChange("normal")} className={cn("h-10 text-xs", value === "normal" && "bg-background text-success shadow-sm hover:bg-background")}>Normal Document</Button>
      <Button variant="ghost" onClick={() => onChange("high")} className={cn("h-10 text-xs", value === "high" && "bg-background text-danger shadow-sm hover:bg-background")}>High-Risk Document</Button>
    </div>
  );
}

function DocumentPreview({ scenario, forensic = false }: { scenario: Scenario; forensic?: boolean }) {
  const data = scenarioData[scenario];
  return (
    <div className="relative mx-auto aspect-[1.42/1] w-full max-w-lg overflow-hidden rounded-lg border border-doc-border bg-doc shadow-card">
      <div className="flex h-full flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between border-b border-doc-border pb-2">
          <div><p className="text-[9px] font-bold uppercase text-primary/60">Republic of India · Demo</p><p className="text-sm font-extrabold text-primary">PASSPORT</p></div>
          <div className="grid size-8 place-items-center rounded-full border border-doc-border text-primary"><span className="text-xs font-black">IN</span></div>
        </div>
        <div className="mt-3 flex min-h-0 flex-1 gap-3">
          <div className="relative w-24 shrink-0 overflow-hidden rounded-sm border border-doc-border bg-muted sm:w-32">
            <img src={data.portrait} alt={`Synthetic demo portrait for ${data.name}`} width={768} height={960} className="h-full w-full object-cover" />
            {forensic && scenario === "high" && <span className="absolute inset-1 border-2 border-danger bg-danger/10"><span className="absolute -right-1 -top-1 rounded-sm bg-danger px-1 py-0.5 text-[8px] font-bold text-danger-foreground">FLAG</span></span>}
          </div>
          <div className="min-w-0 flex-1 space-y-1.5 text-[9px] sm:text-[11px]">
            <FieldMini label="Surname / Given names" value={data.name} flagged={forensic && scenario === "high"} />
            <div className="grid grid-cols-2 gap-2"><FieldMini label="Passport no." value={data.passport} /><FieldMini label="Nationality" value="IND" /></div>
            <div className="grid grid-cols-2 gap-2"><FieldMini label="Date of birth" value={data.dob} /><FieldMini label="Expiry" value={data.expiry} /></div>
          </div>
        </div>
        <div className={cn("mt-2 overflow-hidden border-t border-doc-border pt-2 font-mono text-[8px] leading-tight text-primary sm:text-[10px]", forensic && scenario === "high" && "bg-danger-soft text-danger")}>{data.mrz.map((line) => <p key={line} className="truncate">{line}</p>)}</div>
      </div>
      <span className="absolute bottom-2 right-2 rounded-sm bg-background/90 px-1.5 py-0.5 text-[8px] font-extrabold uppercase text-muted-foreground">Synthetic demo</span>
    </div>
  );
}

function FieldMini({ label, value, flagged }: { label: string; value: string; flagged?: boolean }) {
  return <div className={cn("min-w-0", flagged && "rounded-sm bg-danger-soft px-1 py-0.5 text-danger")}><p className="truncate uppercase text-muted-foreground">{label}</p><p className="truncate font-bold">{value}</p></div>;
}

function ProcessingPanel({ label }: { label: string }) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center text-center">
      <span className="relative grid size-20 place-items-center rounded-full bg-accent text-primary"><RefreshCcw className="size-8 animate-spin" /><span className="absolute inset-0 rounded-full border border-primary/20" /></span>
      <h2 className="mt-6 text-xl font-bold text-foreground">{label}</h2>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">Using simulated analysis for this prototype demonstration.</p>
      <div className="mt-6 h-1.5 w-44 overflow-hidden rounded-full bg-muted"><div className="h-full w-2/3 animate-pulse rounded-full bg-primary" /></div>
    </div>
  );
}

function CaptureFrame({ type, scenario }: { type: "document" | "face"; scenario: Scenario }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = window.setTimeout(() => setReady(true), 450); return () => window.clearTimeout(t); }, [type, scenario]);
  if (type === "face") {
    return (
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg bg-camera">
        <img src={scenarioData[scenario].portrait} alt="Synthetic demo face in capture view" width={768} height={960} className="h-full w-full object-cover opacity-90" />
        <div className="absolute inset-[12%] rounded-[48%] border-2 border-primary-foreground shadow-guide" />
        <div className="absolute inset-x-4 bottom-4 rounded-md bg-camera/85 p-3 text-primary-foreground backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold"><span><Check className="mx-auto mb-1 size-4 text-session" />Face detected</span><span><Check className="mx-auto mb-1 size-4 text-session" />Lighting good</span><span><Check className="mx-auto mb-1 size-4 text-session" />Position good</span></div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-lg bg-camera p-6">
      <div className="absolute inset-0 opacity-20 scan-grid" />
      <div className="relative flex h-full items-center justify-center">
        <div className="relative aspect-[1.42/1] w-full border border-dashed border-primary-foreground/60">
          {["left-0 top-0 border-l-4 border-t-4", "right-0 top-0 border-r-4 border-t-4", "bottom-0 left-0 border-b-4 border-l-4", "bottom-0 right-0 border-b-4 border-r-4"].map((classes) => <span key={classes} className={cn("absolute size-8 border-session", classes)} />)}
          <div className="absolute inset-x-3 top-1/2 h-px animate-scan bg-session shadow-scan" />
          <div className="grid h-full place-items-center text-center text-primary-foreground/70"><div><FileScan className="mx-auto size-10" /><p className="mt-2 text-xs font-semibold">{ready ? "Document detected" : "Locating document..."}</p></div></div>
        </div>
      </div>
    </div>
  );
}

function RiskCard({ scenario }: { scenario: Scenario }) {
  const data = scenarioData[scenario]; const high = scenario === "high";
  return (
    <div className={cn("rounded-lg border p-5 text-center", high ? "border-danger/25 bg-danger-soft" : "border-success/25 bg-success-soft")}>
      <div className="relative mx-auto grid size-36 place-items-center rounded-full bg-background shadow-card">
        <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="7" className="text-border" /><circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeDasharray={`${data.score * 2.76} 276`} className={high ? "text-danger" : "text-success"} /></svg>
        <div><p className={cn("text-4xl font-black", high ? "text-danger" : "text-success")}>{data.score}</p><p className="text-xs font-bold text-muted-foreground">/ 100</p></div>
      </div>
      <div className="mt-4"><StatusBadge status={high ? "high" : "low"} label={data.status} /></div>
    </div>
  );
}

function Workflow({ onExit, onRecorded }: { onExit: () => void; onRecorded: (record: HistoryRecord) => void }) {
  const [stage, setStage] = useState(0);
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [processing, setProcessing] = useState<string | null>(null);
  const [forensic, setForensic] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);
  const [pendingDecision, setPendingDecision] = useState<Decision | null>(null);
  const data = scenarioData[scenario];

  const advanceWithProcessing = (label: string, next = stage + 1) => {
    setProcessing(label);
    window.setTimeout(() => { setProcessing(null); setStage(next); window.scrollTo({ top: 0, behavior: "smooth" }); }, 700);
  };
  const back = () => stage === 0 ? onExit() : setStage((v) => Math.max(0, v - 1));
  const changeScenario = (value: Scenario) => { setScenario(value); setForensic(false); setShowEvidence(false); };
  const recordDecision = () => {
    if (!pendingDecision) return;
    const status: Status = pendingDecision === "Clear" ? "cleared" : pendingDecision === "Escalate" ? "escalated" : "review";
    onRecorded({ id: `PRM-260913-${Date.now().toString().slice(-4)}`, time: "12:47", document: "Passport", score: data.score, status, name: data.name, passport: data.passport });
    setPendingDecision(null); setStage(9);
  };

  return (
    <div className="min-h-screen bg-surface-subtle pb-8">
      <AppHeader title={WORKFLOW_TITLES[stage] ?? "Verification"} subtitle={`Step ${Math.min(stage < 2 ? 1 : stage < 4 ? 2 : stage < 5 ? 3 : stage < 7 ? 4 : 5)} of 5 · Demo verification`} onBack={back} right={<span className="rounded-md bg-muted px-2 py-1 text-[10px] font-extrabold text-muted-foreground">SIMULATION</span>} />
      <ProgressStepper stage={stage} />
      <main className="mx-auto w-full max-w-2xl px-4 py-5 md:px-6">
        {stage < 9 && <div className="mb-5"><p className="mb-2 text-[10px] font-extrabold uppercase text-muted-foreground">Demo Scenario</p><ScenarioSelector value={scenario} onChange={changeScenario} /></div>}
        {processing ? <ProcessingPanel label={processing} /> : (
          <>
            {stage === 0 && <CaptureDocument scenario={scenario} onContinue={() => advanceWithProcessing("Processing document...")} />}
            {stage === 1 && <Quality onContinue={() => setStage(2)} onRetake={() => setStage(0)} />}
            {stage === 2 && <Extracted scenario={scenario} onContinue={() => advanceWithProcessing("Running validation checks...")} />}
            {stage === 3 && <Validation scenario={scenario} onContinue={() => advanceWithProcessing("Analysing document integrity...")} />}
            {stage === 4 && <Forensics scenario={scenario} forensic={forensic} setForensic={setForensic} onContinue={() => setStage(5)} />}
            {stage === 5 && <FaceCapture scenario={scenario} onContinue={() => advanceWithProcessing("Comparing identity...")} />}
            {stage === 6 && <FaceVerification scenario={scenario} onContinue={() => advanceWithProcessing("Generating assessment...")} />}
            {stage === 7 && <Assessment scenario={scenario} showEvidence={showEvidence} setShowEvidence={setShowEvidence} onContinue={() => setStage(8)} />}
            {stage === 8 && <OfficerDecision scenario={scenario} onDecision={setPendingDecision} onReview={() => setStage(7)} />}
            {stage === 9 && <AuditRecord scenario={scenario} onDone={onExit} />}
          </>
        )}
      </main>
      <Dialog open={pendingDecision !== null} onOpenChange={(open) => !open && setPendingDecision(null)}>
        <DialogContent className="w-[calc(100%-2rem)] rounded-lg p-0 sm:max-w-md">
          <div className="p-6">
            <span className="mb-4 grid size-12 place-items-center rounded-full bg-accent text-primary"><FileCheck2 className="size-6" /></span>
            <DialogHeader className="text-left"><DialogTitle>Record this verification decision?</DialogTitle><DialogDescription className="pt-2 leading-relaxed">Decision: <strong className="text-foreground">{pendingDecision}</strong>. This creates a simulated audit record for case {data.passport}.</DialogDescription></DialogHeader>
          </div>
          <DialogFooter className="grid grid-cols-2 gap-3 border-t border-border p-4 sm:grid-cols-2 sm:space-x-0"><Button variant="outline" onClick={() => setPendingDecision(null)} className="h-12">Cancel</Button><Button onClick={recordDecision} className="h-12">Confirm & record</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CaptureDocument({ scenario, onContinue }: { scenario: Scenario; onContinue: () => void }) {
  return <section><h1 className="text-2xl font-extrabold">Capture Document</h1><p className="mt-2 text-sm text-muted-foreground">Align the document inside the frame.</p><div className="mt-5"><CaptureFrame type="document" scenario={scenario} /></div><div className="mt-5 grid gap-3"><Button onClick={onContinue} className="h-14 text-base"><Camera className="size-5" /> Capture Document</Button><Button variant="outline" onClick={onContinue} className="h-12"><FileCheck2 /> Use Demo Document</Button></div><p className="mt-5 text-center text-xs font-medium text-muted-foreground">Supported: Passport · Visa · ID · Driving Licence</p></section>;
}

function Quality({ onContinue, onRetake }: { onContinue: () => void; onRetake: () => void }) {
  return <section><div className="mb-5 flex items-center gap-3 rounded-lg border border-success/20 bg-success-soft p-4"><span className="grid size-11 place-items-center rounded-full bg-success text-success-foreground"><Check className="size-6" /></span><div><h1 className="text-lg font-bold">Image quality acceptable</h1><p className="text-xs text-muted-foreground">Ready for information extraction</p></div></div><div className="rounded-lg border border-border bg-card px-4 shadow-card"><VerificationRow label="Document fully visible" /><VerificationRow label="Perspective corrected" /><VerificationRow label="Glare within acceptable range" /><VerificationRow label="Text resolution sufficient" /></div><div className="mt-6 grid gap-3"><Button onClick={onContinue} className="h-14 text-base">Continue <ArrowRight /></Button><Button variant="ghost" onClick={onRetake} className="h-12 text-muted-foreground"><RefreshCcw /> Retake document</Button></div></section>;
}

function Extracted({ scenario, onContinue }: { scenario: Scenario; onContinue: () => void }) {
  const data = scenarioData[scenario]; const fields = [["Full Name", data.name], ["Passport No.", data.passport], ["Nationality", data.nationality], ["Date of Birth", data.dob], ["Gender", data.gender], ["Expiry", data.expiry]];
  return <section><DocumentPreview scenario={scenario} /><div className="mt-5 rounded-lg border border-border bg-card p-4 shadow-card"><div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-bold text-muted-foreground">DOCUMENT TYPE</p><p className="mt-1 font-bold">Passport</p></div><StatusBadge status="cleared" label="EXTRACTED" /></div><div className="grid grid-cols-2 gap-x-5 gap-y-4">{fields.map(([label, value], i) => <div key={label} className={i === 0 ? "col-span-2" : ""}><p className="text-xs font-semibold text-muted-foreground">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>)}</div></div><div className="mt-4 rounded-lg border border-border bg-card p-4 shadow-card"><SectionTitle>Machine-Readable Zone</SectionTitle><div className="overflow-hidden rounded-md bg-camera p-3 font-mono text-[10px] leading-relaxed text-primary-foreground">{data.mrz.map(line => <p key={line} className="truncate">{line}</p>)}</div><div className={cn("mt-4 flex items-center gap-3 rounded-md p-3", scenario === "normal" ? "bg-success-soft" : "bg-warning-soft")}><span className={cn("grid size-9 place-items-center rounded-full", scenario === "normal" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground")}>{scenario === "normal" ? <Check /> : <AlertTriangle />}</span><div><p className="text-xs font-extrabold">OCR ↔ MRZ CONSISTENCY</p><p className={cn("text-sm font-bold", scenario === "normal" ? "text-success" : "text-warning")}>{scenario === "normal" ? "MATCHED" : "MISMATCH DETECTED"}</p></div></div><p className="mt-3 text-xs leading-relaxed text-muted-foreground">{scenario === "normal" ? "Extracted fields are consistent with the machine-readable zone." : "The extracted name differs from one MRZ character sequence. Review as supporting evidence."}</p></div><Button onClick={onContinue} className="mt-6 h-14 w-full text-base">Continue to Validation <ArrowRight /></Button></section>;
}

function Validation({ scenario, onContinue }: { scenario: Scenario; onContinue: () => void }) {
  const checks = ["Passport number format", "Date of birth format", "Expiry date", "Nationality code", "MRZ checksum", "Required fields present"];
  return <section><div className="rounded-lg border border-border bg-card px-4 shadow-card"><SectionTitle>Document Validation</SectionTitle>{checks.map((check, i) => <VerificationRow key={check} label={check} state={scenario === "high" && i === 4 ? "warn" : "pass"} {...(scenario === "high" && i === 4 ? { detail: "Checksum differs from extracted field sequence" } : {})} />)}</div><div className={cn("mt-4 rounded-lg border p-4 text-center", scenario === "normal" ? "border-success/20 bg-success-soft" : "border-warning/20 bg-warning-soft")}><p className={cn("text-2xl font-extrabold", scenario === "normal" ? "text-success" : "text-warning")}>{scenario === "normal" ? "6 / 6" : "5 / 6"}</p><p className="mt-1 text-xs font-bold text-muted-foreground">CHECKS PASSED</p></div><Button onClick={onContinue} className="mt-6 h-14 w-full text-base">Continue <ArrowRight /></Button></section>;
}

function Forensics({ scenario, forensic, setForensic, onContinue }: { scenario: Scenario; forensic: boolean; setForensic: (v: boolean) => void; onContinue: () => void }) {
  const high = scenario === "high";
  return <section><div className="mb-4 grid grid-cols-2 rounded-lg border border-border bg-muted p-1"><Button variant="ghost" className={cn("h-10", !forensic && "bg-background shadow-sm hover:bg-background")} onClick={() => setForensic(false)}>Original View</Button><Button variant="ghost" className={cn("h-10", forensic && "bg-background text-primary shadow-sm hover:bg-background")} onClick={() => setForensic(true)}><Search /> Forensic View</Button></div><DocumentPreview scenario={scenario} forensic={forensic} /><div className="mt-5 rounded-lg border border-border bg-card px-4 shadow-card"><SectionTitle>Tampering Analysis</SectionTitle><VerificationRow label="Photo Region" state={high ? "warn" : "pass"} detail={high ? "Boundary and compression artifacts require review" : "No anomaly detected"} /><VerificationRow label="Text Region" state={high ? "warn" : "pass"} detail={high ? "Manipulation indicator near holder name" : "No anomaly detected"} /><VerificationRow label="Stamp Region" detail="No anomaly detected" /><VerificationRow label="Metadata" state={high ? "warn" : "pass"} detail={high ? "Inconsistent processing history; this alone does not prove forgery" : "Processing history appears consistent"} /></div><div className={cn("mt-4 flex gap-3 rounded-lg border p-4", high ? "border-warning/25 bg-warning-soft" : "border-success/25 bg-success-soft")}><span className={cn("mt-0.5", high ? "text-warning" : "text-success")}>{high ? <AlertTriangle /> : <ShieldCheck />}</span><div><p className="text-sm font-bold">{high ? "Manipulation indicators detected" : "No significant manipulation indicators detected"}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{high ? "Review highlighted regions alongside identity and validation results." : "No major visual or structural integrity concerns were found."}</p></div></div><Button onClick={onContinue} className="mt-6 h-14 w-full text-base">Continue to Face Verification <ArrowRight /></Button></section>;
}

function FaceCapture({ scenario, onContinue }: { scenario: Scenario; onContinue: () => void }) {
  return <section><h1 className="text-2xl font-extrabold">Verify Identity</h1><p className="mt-2 text-sm text-muted-foreground">Position the person&apos;s face inside the frame.</p><div className="mt-5"><CaptureFrame type="face" scenario={scenario} /></div><div className="mt-5 grid gap-3"><Button onClick={onContinue} className="h-14 text-base"><Camera /> Capture Face</Button><Button variant="outline" onClick={onContinue} className="h-12"><ScanFace /> Use Demo Face</Button></div></section>;
}

function FaceVerification({ scenario, onContinue }: { scenario: Scenario; onContinue: () => void }) {
  const data = scenarioData[scenario]; const high = scenario === "high";
  return <section><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3"><PortraitCard label="Document Photo" src={data.portrait} /><div className="flex flex-col items-center gap-1 text-muted-foreground"><ArrowRight className="size-5 rotate-90" /><span className="text-[9px] font-bold">COMPARE</span><ArrowLeft className="size-5 rotate-90" /></div><PortraitCard label="Live Face" src={high ? normalPortrait : data.portrait} /></div><div className={cn("mt-5 rounded-lg border p-5 text-center", high ? "border-danger/25 bg-danger-soft" : "border-success/25 bg-success-soft")}><p className="text-xs font-bold text-muted-foreground">FACE MATCH RESULT</p><p className={cn("mt-2 text-4xl font-black", high ? "text-danger" : "text-success")}>{data.match}</p><p className={cn("mt-2 text-sm font-extrabold", high ? "text-danger" : "text-success")}>{high ? "BELOW MATCH THRESHOLD" : "HIGH CONFIDENCE MATCH"}</p><div className="mt-4 border-t border-current/10 pt-4 text-left"><p className="flex items-start gap-2 text-sm font-semibold"><span className={high ? "text-danger" : "text-success"}>{high ? <AlertTriangle className="size-5" /> : <CheckCircle2 className="size-5" />}</span>{high ? "Identity consistency requires officer review" : "Identity consistency confirmed"}</p><p className="mt-2 text-xs leading-relaxed text-muted-foreground">The presented face is {high ? "not sufficiently consistent" : "consistent"} with the photograph on the document.</p></div></div><Button onClick={onContinue} className="mt-6 h-14 w-full text-base">Continue to Risk Assessment <ArrowRight /></Button></section>;
}

function PortraitCard({ label, src }: { label: string; src: string }) {
  return <div><p className="mb-2 text-center text-[10px] font-extrabold uppercase text-muted-foreground">{label}</p><div className="aspect-[3/4] overflow-hidden rounded-lg border border-border bg-card shadow-card"><img src={src} alt={`Synthetic ${label.toLowerCase()}`} width={768} height={960} className="h-full w-full object-cover" /></div></div>;
}

function Assessment({ scenario, showEvidence, setShowEvidence, onContinue }: { scenario: Scenario; showEvidence: boolean; setShowEvidence: (v: boolean) => void; onContinue: () => void }) {
  const high = scenario === "high"; const data = scenarioData[scenario];
  const normalEvidence = ["Document authenticity signals", "OCR ↔ MRZ consistency", "Valid expiry", "Face verification passed", "No major tamper indicators"];
  const highEvidence = ["Photo manipulation indicator", "OCR ↔ MRZ inconsistency", "Face verification below configured threshold"];
  return <section><RiskCard scenario={scenario} /><div className="mt-5 rounded-lg border border-border bg-card px-4 shadow-card"><SectionTitle>Contributing Evidence</SectionTitle>{(high ? highEvidence : normalEvidence).map((e) => <VerificationRow key={e} label={e} state={high ? "warn" : "pass"} />)}<Button variant="ghost" className="mb-2 h-11 w-full border-t border-border text-primary" onClick={() => setShowEvidence(!showEvidence)}>{showEvidence ? "Hide evidence detail" : "Review evidence detail"}<ChevronRight className={cn("transition-transform", showEvidence && "rotate-90")} /></Button>{showEvidence && <div className="mb-4 rounded-md bg-muted p-4 text-xs leading-relaxed text-muted-foreground"><p><strong className="text-foreground">Assessment basis:</strong> Combined document structure, field consistency, forensic indicators, and face comparison confidence.</p><p className="mt-2">Individual signals are contextual. No single metadata or visual indicator is treated as proof of forgery.</p></div>}</div><div className={cn("mt-4 rounded-lg border p-5", high ? "border-danger/25 bg-danger-soft" : "border-success/25 bg-success-soft")}><p className="text-[10px] font-extrabold text-muted-foreground">RECOMMENDATION</p><p className={cn("mt-2 text-lg font-extrabold", high ? "text-danger" : "text-success")}>{data.recommendation}</p></div><div className="mt-4 flex gap-3 rounded-lg border border-info/20 bg-info-soft p-4"><Info className="size-5 shrink-0 text-info" /><p className="text-xs leading-relaxed text-muted-foreground"><strong className="text-foreground">Decision support only.</strong> Final action remains with the authorized officer.</p></div><Button onClick={onContinue} className="mt-6 h-14 w-full text-base">Proceed to Officer Decision <ArrowRight /></Button></section>;
}

function OfficerDecision({ scenario, onDecision, onReview }: { scenario: Scenario; onDecision: (d: Decision) => void; onReview: () => void }) {
  const data = scenarioData[scenario]; const high = scenario === "high";
  return <section><div className="rounded-lg border border-border bg-card p-4 shadow-card"><div className="flex items-center gap-4"><div className={cn("grid size-14 place-items-center rounded-full", high ? "bg-danger-soft text-danger" : "bg-success-soft text-success")}><ShieldAlert className="size-7" /></div><div><p className="text-xs font-bold text-muted-foreground">CASE SUMMARY</p><p className="mt-1 text-lg font-extrabold">{data.name}</p><p className="text-xs text-muted-foreground">Passport {data.passport} · Risk {data.score}/100</p></div></div><div className="mt-4 border-t border-border pt-4"><p className="text-sm font-bold">System recommendation</p><p className={cn("mt-1 text-sm font-extrabold", high ? "text-danger" : "text-success")}>{data.recommendation}</p></div></div><div className="mt-5"><SectionTitle>Record Final Action</SectionTitle><div className="grid gap-3"><Button onClick={() => onDecision("Clear")} className="h-14 justify-start bg-success text-success-foreground hover:bg-success/90"><CheckCircle2 className="size-5" /> Clear <ArrowRight className="ml-auto" /></Button><Button onClick={() => onDecision("Refer for secondary review")} className="h-14 justify-start bg-warning text-warning-foreground hover:bg-warning/90"><FileClock className="size-5" /> Refer for Secondary Review <ArrowRight className="ml-auto" /></Button><Button onClick={() => onDecision("Escalate")} variant="outline" className="h-14 justify-start border-danger/30 text-danger hover:bg-danger-soft"><ShieldAlert className="size-5" /> Escalate <ArrowRight className="ml-auto" /></Button></div></div><Button variant="ghost" onClick={onReview} className="mt-4 h-11 w-full text-primary"><Search /> Review all evidence</Button><p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">Your decision is recorded as the authorized officer action. PRAMAAN does not make autonomous border decisions.</p></section>;
}

function AuditRecord({ scenario, onDone }: { scenario: Scenario; onDone: () => void }) {
  const data = scenarioData[scenario];
  return <section className="py-6 text-center"><span className="mx-auto grid size-20 place-items-center rounded-full bg-success-soft text-success"><BadgeCheck className="size-10" /></span><h1 className="mt-5 text-2xl font-extrabold">Verification event recorded securely</h1><p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">The simulated decision and supporting evidence have been added to the checkpoint audit history.</p><div className="mt-6 rounded-lg border border-border bg-card p-5 text-left shadow-card"><div className="flex items-center justify-between"><div><p className="text-xs font-bold text-muted-foreground">AUDIT REFERENCE</p><p className="mt-1 font-mono text-sm font-bold">PRM-260913-DEMO</p></div><LockKeyhole className="size-5 text-primary" /></div><div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm"><div><p className="text-xs text-muted-foreground">Officer</p><p className="mt-1 font-bold">Officer 042</p></div><div><p className="text-xs text-muted-foreground">Risk score</p><p className="mt-1 font-bold">{data.score} / 100</p></div><div><p className="text-xs text-muted-foreground">Document</p><p className="mt-1 font-bold">{data.passport}</p></div><div><p className="text-xs text-muted-foreground">Recorded</p><p className="mt-1 font-bold">13 Sep · 12:47</p></div></div></div><Button onClick={onDone} className="mt-6 h-14 w-full text-base">Return to Home <Home /></Button></section>;
}

function HistoryScreen({ records }: { records: HistoryRecord[] }) {
  const [filter, setFilter] = useState<"all" | Status>("all"); const [selected, setSelected] = useState<HistoryRecord | null>(null);
  const visible = useMemo(() => filter === "all" ? records : records.filter(r => r.status === filter || (filter === "high" && r.status === "escalated")), [filter, records]);
  return <><AppHeader title="Verification History" subtitle="Demo Checkpoint · 13 September 2026" /><main className="mx-auto w-full max-w-4xl px-4 pb-28 pt-5 md:px-6"><div className="flex gap-2 overflow-x-auto pb-2">{(["all", "cleared", "review", "high"] as const).map(item => <Button key={item} variant={filter === item ? "default" : "outline"} onClick={() => setFilter(item)} className="h-10 shrink-0 capitalize">{item === "high" ? "High Risk" : item}</Button>)}</div><div className="mt-4 overflow-hidden rounded-lg border border-border bg-card shadow-card">{visible.map((record, i) => <button key={record.id} onClick={() => setSelected(record)} className={cn("flex min-h-20 w-full items-center gap-3 px-4 text-left hover:bg-muted", i > 0 && "border-t border-border")}><span className="w-12 shrink-0 text-sm font-extrabold">{record.time}</span><span className="grid size-10 place-items-center rounded-md bg-accent text-primary"><IdCard className="size-5" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-bold">{record.document}</span><span className="block text-xs text-muted-foreground">{record.score} / 100 · {record.name}</span></span><StatusBadge status={record.status} label={record.status === "high" ? "HIGH RISK" : record.status.toUpperCase()} /><ChevronRight className="size-4 text-muted-foreground" /></button>)}</div></main><Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}><DialogContent className="w-[calc(100%-2rem)] rounded-lg sm:max-w-md">{selected && <><DialogHeader className="text-left"><DialogTitle>Verification Summary</DialogTitle><DialogDescription>{selected.id}</DialogDescription></DialogHeader><div className="rounded-lg bg-muted p-4"><div className="flex items-center justify-between"><div><p className="text-xs text-muted-foreground">Traveller</p><p className="font-bold">{selected.name}</p></div><StatusBadge status={selected.status} label={selected.status === "high" ? "HIGH RISK" : selected.status.toUpperCase()} /></div><div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm"><div><p className="text-xs text-muted-foreground">Document</p><p className="font-bold">{selected.passport}</p></div><div><p className="text-xs text-muted-foreground">Risk score</p><p className="font-bold">{selected.score} / 100</p></div><div><p className="text-xs text-muted-foreground">Time</p><p className="font-bold">{selected.time}</p></div><div><p className="text-xs text-muted-foreground">Officer</p><p className="font-bold">Officer 042</p></div></div></div><p className="text-xs leading-relaxed text-muted-foreground">This prototype record contains simulated evidence and no personal or government-system data.</p><Button onClick={() => setSelected(null)} className="h-12">Close summary</Button></>}</DialogContent></Dialog></>;
}

function ProfileScreen() {
  return <><AppHeader title="Officer Profile" subtitle="Demo checkpoint session" /><main className="mx-auto w-full max-w-2xl px-4 pb-28 pt-5 md:px-6"><div className="rounded-lg border border-border bg-card p-5 shadow-card"><div className="flex items-center gap-4"><span className="grid size-16 place-items-center rounded-full bg-accent text-primary"><UserRound className="size-8" /></span><div><h1 className="text-xl font-extrabold">Officer 042</h1><p className="mt-1 text-sm text-muted-foreground">Border Verification Officer</p><StatusBadge status="cleared" label="SESSION ACTIVE" /></div></div></div><section className="mt-6"><SectionTitle>Assignment</SectionTitle><div className="overflow-hidden rounded-lg border border-border bg-card shadow-card"><ProfileRow label="Checkpoint" value="IGI Airport — Demo Checkpoint" /><ProfileRow label="Role" value="Border Verification Officer" /><ProfileRow label="Officer ID" value="Officer 042" /><ProfileRow label="App version" value="PRAMAAN Prototype v0.1" /></div></section><section className="mt-6"><SectionTitle>Security</SectionTitle><div className="rounded-lg border border-success/20 bg-success-soft p-4"><div className="flex items-center gap-3"><LockKeyhole className="size-5 text-success" /><div><p className="text-sm font-bold">Session Active</p><p className="mt-0.5 text-xs text-muted-foreground">Local demonstration mode · No real authentication</p></div></div></div></section><Button variant="outline" disabled className="mt-6 h-12 w-full text-muted-foreground"><LogOut /> End demo session</Button></main></>;
}
function ProfileRow({ label, value }: { label: string; value: string }) { return <div className="flex min-h-16 items-center justify-between gap-4 border-b border-border px-4 last:border-0"><span className="text-sm text-muted-foreground">{label}</span><span className="text-right text-sm font-bold">{value}</span></div>; }

export function PramaanApp() {
  const [view, setView] = useState<MainView>("home");
  const [inWorkflow, setInWorkflow] = useState(false);
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const navigate = (next: MainView) => { setInWorkflow(false); setView(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const start = () => { setView("verify"); setInWorkflow(true); window.scrollTo({ top: 0 }); };
  if (inWorkflow) return <Workflow onExit={() => navigate("home")} onRecorded={(record) => setRecords((current) => [record, ...current])} />;
  return <div className="min-h-screen bg-surface-subtle">{view === "home" && <HomeScreen onStart={start} onHistory={() => navigate("history")} />}{view === "verify" && <><AppHeader title="New Verification" subtitle="Start an identity screening case" /><main className="mx-auto w-full max-w-xl px-4 pb-28 pt-8 text-center"><span className="mx-auto grid size-20 place-items-center rounded-full bg-accent text-primary"><FileScan className="size-9" /></span><h1 className="mt-5 text-2xl font-extrabold">Ready to verify</h1><p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">Begin a guided document and face verification using synthetic demo data.</p><Button onClick={start} className="mt-7 h-14 w-full text-base">Start Verification <ArrowRight /></Button><div className="mt-5 flex gap-3 rounded-lg border border-info/20 bg-info-soft p-4 text-left"><Info className="size-5 shrink-0 text-info" /><p className="text-xs leading-relaxed text-muted-foreground">Prototype mode simulates every result. No data leaves this device.</p></div></main></>}{view === "history" && <HistoryScreen records={records} />}{view === "profile" && <ProfileScreen />}<BottomNav value={view} onChange={navigate} /></div>;
}
