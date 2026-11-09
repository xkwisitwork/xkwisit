import type { Metadata } from "next";

import { MarketingPageCanvas, MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { ResourcesPageBody } from "@/components/marketing/pages/resources/ResourcesPageBody";
import { StudioLedger } from "@/components/marketing/studio/Studio";
import { ROUTES } from "@/config/site";

export const metadata: Metadata = {
  title: "Resources",
  description: "Playbooks, templates, and guides from Xkwisit.",
};

const items = [
  {
    href: "/resources/playbooks",
    title: "Playbooks",
    desc: "Steps your team can run again next week.",
  },
  {
    href: "/resources/templates",
    title: "Templates",
    desc: "Briefs, Monday sheets, and teardown notes.",
  },
  {
    href: "/resources/guides",
    title: "Guides",
    desc: "Longer explainers for owners.",
  },
  {
    href: "/growth-assessment",
    title: "Growth Assessment",
    desc: "Free seven-area check.",
  },
] as const;

export default function ResourcesPage() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        imageSrc="/images/levers/demand-content.jpg"
        imageAlt="Content planning"
        eyebrow="Resources"
        title="Tools your team can run Monday."
        description="Practical assets from live work - not recycled thought leadership."
        primaryHref={ROUTES.growthAssessment}
        primaryLabel="Start free check"
        secondaryHref={ROUTES.book}
        secondaryLabel="Book a call"
      />
      <StudioLedger
        title="Tools your team can run Monday."
        items={items.map((item) => ({
          title: item.title,
          body: item.desc,
          href: item.href,
        }))}
      />
      <ResourcesPageBody />
    </MarketingPageCanvas>
  );
}
