import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/pramaan/dashboard-page";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Identity Trust Command Center | PRAMAAN" },
    { name: "description", content: "Monitor identity verification activity, risk signals, and checkpoint operations." },
    { property: "og:title", content: "Identity Trust Command Center | PRAMAAN" },
    { property: "og:description", content: "Explainable identity screening oversight for authorized personnel." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: DashboardPage,
});
