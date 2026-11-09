import type { Metadata } from "next";

import { MarketingPageCanvas, MarketingPageHero, MarketingSoftCard } from "@/components/marketing/MarketingPageHero";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";

export const metadata: Metadata = {
  title: "Guides",
  description: "Longer explainers for business owners from Xkwisit." };

export default function Page() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        imageSrc="/images/people/method-monday.jpg"
        imageAlt="Monday review"
        eyebrow="Resources"
        title="Guides"
        description="Longer explainers for owners who want the method, not the fluff."
        primaryHref={ROUTES.book}
        primaryLabel="Book a strategy call"
        secondaryHref="/resources"
        secondaryLabel="All resources"
      />
      <Container className="px-4 pb-10 mobile-sm:px-5 tablet:px-8">
        <MarketingSoftCard>
          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-neutral-600">
            Guides expand on how we find what is stuck and how teams run the Monday
            check. Prefer a live walkthrough? Book a call.
          </p>
        </MarketingSoftCard>
      </Container>

      <SolteraCloser />
    </MarketingPageCanvas>
  );
}
