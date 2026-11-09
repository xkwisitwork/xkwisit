import type { Metadata } from "next";

import {
  MarketingPageCanvas,
  MarketingPageHero,
  MarketingSoftCard,
} from "@/components/marketing/MarketingPageHero";
import { MissionPageBody } from "@/components/marketing/pages/mission/MissionPageBody";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";

export const metadata: Metadata = {
  title: "Mission",
  description:
    "We help African brands stop paying for the same ads when the sale is not coming back.",
};

export default function Page() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        eyebrow="Mission"
        title="Why we exist"
        description="We help African brands stop paying for the same ads when the sale is not coming back."
        primaryHref={ROUTES.book}
        primaryLabel="Book a strategy call"
        secondaryHref="/about"
        secondaryLabel="About Xkwisit"
      />
      <Container className="px-4 pb-6 mobile-sm:px-5 tablet:px-8">
        <div className="grid gap-4 tablet:grid-cols-[1.2fr_0.8fr]">
          <MarketingSoftCard>
            <p className="text-[0.95rem] leading-relaxed text-neutral-600">
              Xkwisit exists so a diagnosis becomes a decision. Most growth problems are
              the same problem in different rooms: the offer, the ads, the follow-up, and
              what sales says, with nobody looking at the same numbers.
            </p>
          </MarketingSoftCard>
          <MarketingSoftCard tone="ink">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/55">
              Our rule
            </p>
            <p className="mt-3 font-display text-[1.45rem] font-bold leading-snug text-white">
              Find what is stuck before we fix it.
            </p>
          </MarketingSoftCard>
        </div>
      </Container>
      <MissionPageBody />
    </MarketingPageCanvas>
  );
}
