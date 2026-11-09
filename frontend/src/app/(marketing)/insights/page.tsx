import type { Metadata } from "next";

import { MarketingPageCanvas } from "@/components/marketing/MarketingPageHero";
import { InsightsFrames } from "@/components/marketing/pages/insights/InsightsFrames";
import { InsightsPageBody } from "@/components/marketing/pages/insights/InsightsPageBody";
import { ROUTES } from "@/config/site";

export const metadata: Metadata = {
  title: "Insights",
  description: "Playbooks and field notes from Xkwisit growth engagements.",
};

const posts = [
  {
    slug: "diagnosis-before-spend",
    title: "Diagnosis before spend",
    category: "strategy",
    excerpt: "Why pouring budget into ads before the offer is clear burns quarters.",
  },
  {
    slug: "one-scoreboard-rule",
    title: "Look at one set of numbers",
    category: "ops",
    excerpt: "Creative, paid, CRM, and sales should argue about the same bottleneck.",
  },
  {
    slug: "african-growth-ops",
    title: "Growth ops for African brands",
    category: "market",
    excerpt: "What changes when your market buys on WhatsApp and closes offline.",
  },
] as const;

export default function InsightsPage() {
  return (
    <MarketingPageCanvas>
      <InsightsFrames
        posts={posts}
        primaryHref={ROUTES.book}
        primaryLabel="Book a strategy call"
        secondaryHref="/resources"
        secondaryLabel="Browse resources"
      />
      <InsightsPageBody />
    </MarketingPageCanvas>
  );
}
