import type { Metadata } from "next";

import {
  MarketingPageCanvas,
  MarketingPageHero,
  MarketingSoftCard,
} from "@/components/marketing/MarketingPageHero";
import { CtaSection } from "@/components/marketing/sections/CtaSection";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Data Processing Agreement",
  description: "Data Processing Agreement for Xkwisit" };

export default function LegalPage() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        eyebrow="Legal"
        title="Data Processing Agreement"
        description={
          "Last updated " +
          siteConfig.legal.privacyUpdated +
          ". Contact " +
          siteConfig.contact.email +
          " with questions."
        }
      />
      <Container className="px-4 pb-12 mobile-sm:px-5 tablet:px-8">
        <MarketingSoftCard className="max-w-3xl" tone="white">
          <div className="space-y-4 text-[0.95rem] leading-relaxed text-neutral-600">
            <p>
              This Data Processing Agreement applies to services operated by{" "}
              {siteConfig.legalName}. We process client data only to deliver consulting
              engagements, assessments, and related communications.
            </p>
            <p>
              For a signed DPA, email {siteConfig.contact.email}.
            </p>
          </div>
        </MarketingSoftCard>
      </Container>

      <CtaSection />
    </MarketingPageCanvas>
  );
}
