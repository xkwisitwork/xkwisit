import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageCard, PageFaq, PageSection } from "@/components/marketing/pages/shared";
import { CtaSection } from "@/components/marketing/sections/CtaSection";
import { ROUTES } from "@/config/site";

const roleSplit = [
  {
    title: "Marketing & growth",
    body: "Owns demand quality, offers, and whether ads match what sales can close.",
  },
  {
    title: "Software & product",
    body: "Owns the buy path - site, app, payments - so intent can finish.",
  },
  {
    title: "Brand & creative",
    body: "Owns clarity of the offer in words and visuals people remember.",
  },
  {
    title: "Numbers & ops",
    body: "Owns the Monday scoreboard and whether each desk shares one problem.",
  },
] as const;

const monday = [
  { step: "Name", body: "One stuck problem for the week - written in plain language." },
  { step: "Owner", body: "One named person. No shared “someone will do it.”" },
  { step: "Check", body: "Same number next Monday. Adjust or finish - do not add noise." },
] as const;

const faqs = [
  {
    q: "Will I only talk to sales?",
    a: "Strategy calls are with people who do the work. Specialists join when the desk needs them.",
  },
  {
    q: "Can I request a specific person?",
    a: "We match by problem, not celebrity. If a named owner fits, they stay on the engagement.",
  },
  {
    q: "Are you hiring?",
    a: "Sometimes. See Careers - we are selective about people who hate vanity dashboards.",
  },
] as const;

export function TeamPageBody() {
  return (
    <>
      <PageSection
        eyebrow="Roles"
        title="How work splits across the team."
        description="Named owners beat five people guessing in a group chat."
      >
        <ul className="grid gap-4 tablet:grid-cols-2">
          {roleSplit.map((item, index) => (
            <li key={item.title}>
              <PageCard tone={index % 2 === 1 ? "soft" : "white"} className="h-full">
                <h3 className="font-display text-[1.15rem] font-bold text-mint-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-neutral-600">
                  {item.body}
                </p>
              </PageCard>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        tone="soft"
        eyebrow="Monday ritual"
        title="The same three moves every week."
      >
        <ol className="grid gap-4 tablet:grid-cols-3">
          {monday.map((item, index) => (
            <li key={item.step}>
              <PageCard tone={index === 1 ? "ink" : "white"} className="h-full">
                <p
                  className={`font-display text-[1.3rem] font-bold ${
                    index === 1 ? "text-mint" : "text-mint"
                  }`}
                >
                  {item.step}
                </p>
                <p
                  className={`mt-2 text-[0.9rem] leading-relaxed ${
                    index === 1 ? "text-white/70" : "text-neutral-600"
                  }`}
                >
                  {item.body}
                </p>
              </PageCard>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection
        eyebrow="Working with us"
        title="How clients actually interface with roles."
      >
        <div className="grid gap-4 tablet:grid-cols-2">
          <PageCard>
            <h3 className="font-display text-[1.15rem] font-bold text-mint-ink">
              In your portal
            </h3>
            <p className="mt-2 text-[0.9rem] text-neutral-600">
              Tasks and updates sit where you can see them. You are not chasing five
              WhatsApp threads for status.
            </p>
          </PageCard>
          <PageCard tone="ink">
            <h3 className="font-display text-[1.15rem] font-bold text-white">
              On the call
            </h3>
            <p className="mt-2 text-[0.9rem] text-white/70">
              We bring the desk owner who owns this week’s problem - not a rotating AE who
              never touches the work.
            </p>
          </PageCard>
        </div>
        <div className="mt-8">
          <Link
            href={ROUTES.book}
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-mint px-2 pl-6 pr-2 text-[0.85rem] font-semibold text-white hover:bg-mint-deep"
          >
            <span>Book a strategy call</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-mint">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </div>
      </PageSection>

      <PageFaq title="Team questions" items={faqs} />
      <CtaSection />
    </>
  );
}
