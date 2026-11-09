import type { Metadata } from "next";

import { MarketingPageCanvas, MarketingPageHero, MarketingSoftCard } from "@/components/marketing/MarketingPageHero";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";

export const metadata: Metadata = {
  title: "Templates",
  description: "Briefs, Monday sheets, and teardown notes from Xkwisit." };

export default function Page() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        imageSrc="/images/people/desk-review.jpg"
        imageAlt="Reviewing a brief"
        eyebrow="Resources"
        title="Templates"
        description="Briefs, Monday sheets, and teardown notes your team can reuse."
        primaryHref={ROUTES.book}
        primaryLabel="Book a strategy call"
        secondaryHref="/resources"
        secondaryLabel="All resources"
      />
      <Container className="px-4 pb-10 mobile-sm:px-5 tablet:px-8">
        <MarketingSoftCard>
          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-neutral-600">
            Templates stay simple on purpose. Fill them in, bring them to Monday, and keep
            everyone on the same problem.
          </p>
        </MarketingSoftCard>
      </Container>

      <SolteraCloser />
    </MarketingPageCanvas>
  );
}
