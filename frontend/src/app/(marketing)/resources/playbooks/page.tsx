import type { Metadata } from "next";

import { MarketingPageCanvas, MarketingPageHero, MarketingSoftCard } from "@/components/marketing/MarketingPageHero";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";

export const metadata: Metadata = {
  title: "Playbooks",
  description: "Operating plays for Brand, Demand, Sales, and Content." };

export default function Page() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        imageSrc="/images/levers/demand-content.jpg"
        imageAlt="Content planning"
        eyebrow="Resources"
        title="Playbooks"
        description="Operating plays for Brand, Demand, Sales, and Content."
        primaryHref={ROUTES.book}
        primaryLabel="Book a strategy call"
        secondaryHref="/resources"
        secondaryLabel="All resources"
      />
      <Container className="px-4 pb-10 mobile-sm:px-5 tablet:px-8">
        <MarketingSoftCard>
          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-neutral-600">
            New playbooks drop regularly from live work. Book a call if you need a custom
            version for your team.
          </p>
        </MarketingSoftCard>
      </Container>

      <SolteraCloser />
    </MarketingPageCanvas>
  );
}
