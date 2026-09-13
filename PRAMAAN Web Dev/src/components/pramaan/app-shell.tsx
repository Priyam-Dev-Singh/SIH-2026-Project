import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Activity, BarChart3, ClipboardList, FileSearch, Fingerprint, Gauge, Menu, Settings, ShieldAlert, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: Gauge },
  { to: "/verifications", label: "Verifications", icon: ClipboardList },
  { to: "/high-risk", label: "High-Risk Cases", icon: ShieldAlert },
  { to: "/identity-intelligence", label: "Identity Intelligence", icon: Fingerprint },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/audit-trail", label: "Audit Trail", icon: FileSearch },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function Brand() {
  return <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5"><div className="grid size-10 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"><ShieldCheck className="size-6" /></div><div><div className="font-display text-xl font-bold tracking-wide">PRAMAAN</div><div className="text-[10px] uppercase text-sidebar-muted">Identity Trust Engine</div></div></div>;
}

function NavContent({ close }: { close?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground"><Brand /><nav className="flex-1 space-y-1 p-3" aria-label="Main navigation">{nav.map((item) => { const Icon = item.icon; const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to); return <Link key={item.to} to={item.to} onClick={close} className={cn("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors", active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-muted hover:bg-sidebar-accent/60 hover:text-sidebar-foreground")}><Icon className="size-4" />{item.label}</Link>; })}</nav><div className="border-t border-sidebar-border p-4"><div className="mb-3 flex items-center gap-2 text-xs text-operational"><span className="size-2 rounded-full bg-operational" /> Prototype operational</div><div className="text-xs text-sidebar-muted">Logged in as</div><div className="mt-1 text-sm font-semibold">Supervisor Demo</div><div className="mt-1 text-xs leading-5 text-sidebar-muted">Authorized Verification Supervisor</div></div></div>;
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen bg-background lg:grid lg:grid-cols-[250px_minmax(0,1fr)]"><aside className="fixed inset-y-0 left-0 z-40 hidden w-[250px] lg:block"><NavContent /></aside><div className="min-w-0 lg:col-start-2"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6"><div className="flex items-center gap-3"><Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation"><Menu /></Button></SheetTrigger><SheetContent side="left" className="w-[280px] border-0 p-0"><SheetTitle className="sr-only">Navigation</SheetTitle><NavContent close={() => setOpen(false)} /></SheetContent></Sheet><div className="hidden items-center gap-2 text-sm font-medium text-muted-foreground sm:flex"><Activity className="size-4 text-operational" /> National verification network <span className="rounded-sm bg-info-soft px-2 py-1 text-[10px] font-bold uppercase text-info">Demo environment</span></div></div><div className="text-right"><div className="text-xs font-semibold">Smart India Hackathon 2026</div><div className="text-[10px] text-muted-foreground">Problem Statement 26188</div></div></header><main className="p-4 md:p-6 xl:p-8">{children}</main></div></div>;
}