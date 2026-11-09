import type { Metadata } from "next";

import {
  MarketingPageCanvas,
  MarketingPageHero,
} from "@/components/marketing/MarketingPageHero";
import { CtaSection } from "@/components/marketing/sections/CtaSection";
import { ROUTES } from "@/config/site";

export const metadata: Metadata = { title: "Assessment submitted" };

export default function Page() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        eyebrow="Thank you"
        title="X-ray received."
        description="We will send a short note on the one problem to fix first."
        primaryHref={ROUTES.book}
        primaryLabel="Book a strategy call"
        secondaryHref={ROUTES.home}
        secondaryLabel="Home"
      />

      <CtaSection />
    </MarketingPageCanvas>
  );
}
