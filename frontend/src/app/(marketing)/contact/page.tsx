import type { Metadata } from "next";

import { MarketingPageCanvas, MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import { ContactPageBody } from "@/components/marketing/pages/contact/ContactPageBody";
import { ROUTES, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${siteConfig.name} - strategy calls, partnerships, and press.`,
};

export default function ContactPage() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        imageSrc="/images/people/method-owner.jpg"
        imageAlt="Working session"
        eyebrow="Contact"
        title={
          <>
            Talk to us.{" "}
            <span className="font-semibold text-neutral-600">
              We answer owners first.
            </span>
          </>
        }
        description="Book a strategy call, email the team, or call the Lagos line. Prefer async? Start with the free Growth Assessment or Business X-Ray."
        primaryHref={ROUTES.book}
        primaryLabel="Book a strategy call"
        secondaryHref={ROUTES.growthAssessment}
        secondaryLabel="Start free check"
        stats={[
          { value: "1 day", label: "Typical reply window" },
          { value: "Lagos", label: "Home base" },
          { value: "Free", label: "Checks available" },
        ]}
      />
      <ContactPageBody />
    </MarketingPageCanvas>
  );
}
