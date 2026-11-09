import type { Metadata } from "next";

import {
  MarketingPageCanvas,
  MarketingPageHero,
  MarketingSoftCard,
} from "@/components/marketing/MarketingPageHero";
import { CtaSection } from "@/components/marketing/sections/CtaSection";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = { title: "Status" };

export default function StatusPage() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        eyebrow="Status"
        title="All systems operational."
        description="Marketing site, booking, and assessment endpoints are healthy."
      />
      <Container className="px-4 pb-12 mobile-sm:px-5 tablet:px-8">
        <ul className="grid gap-4 tablet:grid-cols-3">
          {[
            { label: "Marketing site", state: "Operational" },
            { label: "Booking", state: "Operational" },
            { label: "Assessment", state: "Operational" },
          ].map((item, index) => (
            <li key={item.label}>
              <MarketingSoftCard tone={index === 1 ? "ink" : "white"}>
                <p
                  className={`text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${
                    index === 1 ? "text-white/65" : "text-neutral-500"
                  }`}
                >
                  {item.label}
                </p>
                <p
                  className={`mt-3 font-display text-[1.2rem] font-bold ${
                    index === 1 ? "text-white" : "text-mint-ink"
                  }`}
                >
                  {item.state}
                </p>
              </MarketingSoftCard>
            </li>
          ))}
        </ul>
      </Container>

      <CtaSection />
    </MarketingPageCanvas>
  );
}
