import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  MarketingPageCanvas,
  MarketingPageHero,
  MarketingSoftCard,
} from "@/components/marketing/MarketingPageHero";
import { TeamPageBody } from "@/components/marketing/pages/team/TeamPageBody";
import { Container } from "@/components/layout/Container";
import { teamMembers } from "@/config/team";
import { ROUTES } from "@/config/site";

export const metadata: Metadata = {
  title: "Team",
  description: "The people who find what is stuck, fix it, and sit in the Monday meeting.",
};

export default function Page() {
  return (
    <MarketingPageCanvas>
      <MarketingPageHero
        eyebrow="Team"
        title="The team that solves business problems & drive growth."
        description="Named owners for marketing, software, brand, and numbers - not five people guessing."
        primaryHref={ROUTES.book}
        primaryLabel="Book a strategy call"
        secondaryHref="/about"
        secondaryLabel="About Xkwisit"
        imageSrc="/images/people/tobe.jpg"
        imageAlt="uncle TOBE, Lead Software Engineer"
        stats={[
          { value: String(teamMembers.length), label: "Named owners" },
          { value: "1 Monday", label: "Shared check-in" },
          { value: "Lagos", label: "Home base" },
        ]}
      />

      <Container className="px-4 pb-10 mobile-sm:px-5 tablet:px-8">
        <ul className="grid gap-4 tablet:grid-cols-2">
          {teamMembers.map((member, index) => (
            <li key={member.id}>
              <MarketingSoftCard tone={index % 2 === 1 ? "ink" : "white"} className="flex h-full flex-col">
                <div className="flex items-start gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.imageAlt}
                    className="h-16 w-16 shrink-0 rounded-full object-cover"
                    style={{ objectPosition: member.objectPosition }}
                  />
                  <div className="min-w-0">
                    <p
                      className={`text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${
                        index % 2 === 1 ? "text-white/55" : "text-mint"
                      }`}
                    >
                      {member.role}
                    </p>
                    <h2
                      className={`mt-1 font-display text-[1.25rem] font-bold ${
                        index % 2 === 1 ? "text-white" : "text-mint-ink"
                      }`}
                    >
                      {member.name}
                    </h2>
                    <p
                      className={`mt-1 text-[0.85rem] ${
                        index % 2 === 1 ? "text-white/65" : "text-neutral-600"
                      }`}
                    >
                      {member.focus}
                    </p>
                  </div>
                </div>
                <p
                  className={`mt-4 flex-1 text-[0.9rem] leading-relaxed ${
                    index % 2 === 1 ? "text-white/75" : "text-neutral-600"
                  }`}
                >
                  “{member.opinion}”
                </p>
                <Link
                  href={member.href}
                  className={`mt-5 inline-flex items-center gap-3 text-[0.78rem] font-semibold ${
                    index % 2 === 1 ? "text-white" : "text-mint-ink"
                  }`}
                >
                  See their work area
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      index % 2 === 1 ? "bg-mint text-white" : "bg-mint-soft text-mint"
                    }`}
                  >
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              </MarketingSoftCard>
            </li>
          ))}
        </ul>
      </Container>

      <TeamPageBody />
    </MarketingPageCanvas>
  );
}
