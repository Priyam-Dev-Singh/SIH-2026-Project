import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock3, ShieldAlert, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { CaseStatus, RiskLevel, VerificationCase } from "@/lib/pramaan-types";
import { cn } from "@/lib/utils";

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) {
  return <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">{title}</h1><p className="mt-1 text-sm text-muted-foreground">{subtitle}</p></div>{actions}</div>;
}

export function Panel({ title, description, action, children, className }: { title?: string; description?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={cn("border border-border bg-card", className)}>{title && <div className="flex items-start justify-between gap-4 border-b px-4 py-3.5"><div><h2 className="text-xs font-bold uppercase text-foreground">{title}</h2>{description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}</div>{action}</div>}<div className="p-4">{children}</div></section>;
}

export function StatusBadge({ status }: { status: CaseStatus | "Operational" | "Monitoring" }) {
  const styles = status === "Cleared" || status === "Operational" ? "border-success/30 bg-success-soft text-success" : status === "Review" || status === "Monitoring" ? "border-warning/30 bg-warning-soft text-warning" : "border-destructive/30 bg-destructive-soft text-destructive";
  return <Badge variant="outline" className={cn("gap-1.5 whitespace-nowrap", styles)}>{status === "Cleared" || status === "Operational" ? <CheckCircle2 className="size-3" /> : status === "Review" || status === "Monitoring" ? <Clock3 className="size-3" /> : <ShieldAlert className="size-3" />}{status}</Badge>;
}

export function RiskPill({ score, level }: { score: number; level?: RiskLevel }) {
  const risk = level ?? (score >= 70 ? "High" : score >= 35 ? "Medium" : "Low");
  return <span className={cn("inline-flex min-w-12 items-center justify-center rounded-sm border px-2 py-1 text-xs font-bold", risk === "Low" ? "border-success/25 bg-success-soft text-success" : risk === "Medium" ? "border-warning/25 bg-warning-soft text-warning" : "border-destructive/25 bg-destructive-soft text-destructive")}>{score}</span>;
}

export function CaseTable({ cases, compact = false }: { cases: VerificationCase[]; compact?: boolean }) {
  return <Table><TableHeader><TableRow><TableHead>{compact ? "Time" : "Case ID"}</TableHead>{!compact && <TableHead>Time</TableHead>}<TableHead>Checkpoint</TableHead><TableHead>Document</TableHead><TableHead>Risk</TableHead>{!compact && <TableHead>Primary Signal</TableHead>}<TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader><TableBody>{cases.map((item) => <TableRow key={item.id}><TableCell className="font-mono text-xs font-semibold">{compact ? item.time : item.id}</TableCell>{!compact && <TableCell>{item.time}</TableCell>}<TableCell>{item.checkpoint}</TableCell><TableCell>{item.document.type}</TableCell><TableCell><RiskPill score={item.risk.score} level={item.risk.level} /></TableCell>{!compact && <TableCell className="max-w-48 truncate">{item.primarySignal}</TableCell>}<TableCell><StatusBadge status={item.status} /></TableCell><TableCell className="text-right"><Button asChild variant={item.risk.level === "High" ? "default" : "ghost"} size="sm"><Link to="/cases/$caseId" params={{ caseId: item.id }}>{item.risk.level === "High" ? "Investigate" : "View"}<ArrowRight /></Link></Button></TableCell></TableRow>)}</TableBody></Table>;
}

export function MetricCard({ label, value, note, tone = "default" }: { label: string; value: string | number; note?: string; tone?: "default" | "success" | "warning" | "danger" }) {
  return <div className={cn("border border-border bg-card p-4", tone === "success" && "border-l-4 border-l-success", tone === "warning" && "border-l-4 border-l-warning", tone === "danger" && "border-l-4 border-l-destructive")}><div className="text-[11px] font-bold uppercase text-muted-foreground">{label}</div><div className="mt-2 font-display text-3xl font-bold tabular-nums">{value}</div>{note && <div className="mt-1 text-xs text-muted-foreground">{note}</div>}</div>;
}

export function DecisionSupportNote() {
  return <div className="flex gap-3 border border-info/25 bg-info-soft p-3 text-xs leading-5 text-info"><TriangleAlert className="mt-0.5 size-4 shrink-0" /><span>Risk score is decision support and does not automatically determine the final outcome.</span></div>;
}