import type { Metadata } from "next";

import { MarketingPageCanvas, MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { PricingPageBody } from "@/components/marketing/pages/pricing/PricingPageBody";
import { ROUTES } from "@/config/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Xkwisit growth packages - from diagnostic Foundation to full Growth Partner.",
};

export default function PricingPage() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        imageSrc="/images/desks/intelligence.jpg"
        imageAlt="Numbers and scoreboard"
        eyebrow="Pricing"
        title={
          <>
            Packages you can read.{" "}
            <span className="font-semibold text-neutral-600">
              Custom when you need it.
            </span>
          </>
        }
        description="Start by finding what is stuck, or have us do the work. Every package points brand, ads, sales, and content at the same numbers."
        primaryHref={ROUTES.book}
        primaryLabel="Book a strategy call"
        secondaryHref={ROUTES.growthAssessment}
        secondaryLabel="Start free check"
        stats={[
          { value: "NGN", label: "Prices in naira" },
          { value: "90 days", label: "Typical block" },
          { value: "Free", label: "X-Ray first" },
        ]}
      />
      <PricingPageBody />
    </MarketingPageCanvas>
  );
}
