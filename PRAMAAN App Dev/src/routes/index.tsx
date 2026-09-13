import { createFileRoute } from "@tanstack/react-router";
import { PramaanApp } from "@/components/pramaan-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PRAMAAN — Identity Trust Engine" },
      { name: "description", content: "Mobile checkpoint workflow prototype for evidence-based identity and document screening." },
      { property: "og:title", content: "PRAMAAN — Identity Trust Engine" },
      { property: "og:description", content: "A mobile-first identity screening and officer decision-support prototype." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <PramaanApp />;
}
