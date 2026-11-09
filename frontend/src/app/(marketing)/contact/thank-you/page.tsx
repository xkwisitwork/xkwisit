import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  MarketingPageCanvas,
  MarketingPageHero,
  MarketingSoftCard,
} from "@/components/marketing/MarketingPageHero";
import { CtaSection } from "@/components/marketing/sections/CtaSection";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";

export const metadata: Metadata = {
  title: "Message received",
  description: "Thanks for contacting Xkwisit.",
};

export default function ContactThankYouPage() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        eyebrow="Thank you"
        title="We got your message."
        description="A strategist will reply within one business day. Meanwhile, you can book a call or start the free X-ray."
        primaryHref={ROUTES.book}
        primaryLabel="Book a strategy call"
        secondaryHref={ROUTES.home}
        secondaryLabel="Back home"
      />
      <Container className="px-4 pb-10 mobile-sm:px-5 tablet:px-8">
        <MarketingSoftCard className="max-w-xl" tone="soft">
          <p className="text-[0.95rem] leading-relaxed text-neutral-700">
            Prefer to start with numbers? Take the free X-ray and we will name the one
            problem to fix first.
          </p>
          <Link
            href={ROUTES.growthAssessment}
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-mint px-5 py-2.5 text-[0.85rem] font-semibold text-white hover:bg-mint-deep"
          >
            Take the free X-ray
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </MarketingSoftCard>
      </Container>

      <CtaSection />
    </MarketingPageCanvas>
  );
}
