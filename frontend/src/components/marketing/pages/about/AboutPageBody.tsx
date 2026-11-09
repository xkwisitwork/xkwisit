import Link from "next/link";
import { ArrowRight, Building2, KeyRound, LineChart, Users } from "lucide-react";

import {
  PageCard,
  PageFaq,
  PagePill,
  PageSection,
} from "@/components/marketing/pages/shared";
import { CtaSection } from "@/components/marketing/sections/CtaSection";
import { ROUTES, siteConfig } from "@/config/site";

const storyBeats = [
  {
    title: "Owners were buying more ads",
    body: "Spend went up. Replies stayed flat. The Monday meeting argued about creative while nobody owned follow-up.",
  },
  {
    title: "Agencies sold channels, not problems",
    body: "A branding shop, a media buyer, and a web vendor each claimed success on their own chart. The sale still did not come back.",
  },
  {
    title: "We built one diagnosis first",
    body: `${siteConfig.name} starts by naming the stuck part - offer, site, ads, or WhatsApp - then puts one owner on that fix.`,
  },
] as const;

const principles = [
  {
    title: "Diagnosis before spend",
    body: "We do not open a campaign until the weak spot is named in plain language.",
  },
  {
    title: "One Monday scoreboard",
    body: "Brand, ads, sales, and content argue about the same number every week.",
  },
  {
    title: "Systems owners can run",
    body: "Your team leaves with a login and a ritual - not a PDF that dies in Drive.",
  },
  {
    title: "Honest about placeholders",
    body: "Where we do not have permission to name a client, we say so. No invented 10x charts.",
  },
] as const;

const whoWeServe = [
  {
    Icon: Building2,
    title: "SMB operators",
    body: "Shops, clinics, schools, and service brands that need clarity before another ad cycle.",
  },
  {
    Icon: LineChart,
    title: "Mid-market teams",
    body: "Marketing and sales already hired - but still fighting over whose number is “right.”",
  },
  {
    Icon: Users,
    title: "Growing brands",
    body: "Expanding across cities or WhatsApp-heavy markets where offline close still matters.",
  },
] as const;

const engagement = [
  { step: "01", title: "Free check or call", body: "X-Ray, assessment, or 30 minutes. Leave with one problem named." },
  { step: "02", title: "Scope the block", body: "Usually 90 days. Clear minimum fee. Written deliverables." },
  { step: "03", title: "Your login + our OS", body: "You see the work. We run the same Monday ritual inside." },
  { step: "04", title: "Hand back the system", body: "Your team can keep the scoreboard without us in every chat." },
] as const;

const faqs = [
  {
    q: "Is Xkwisit an ad agency?",
    a: "We run ads when that is the stuck part. We also fix brand, site, and follow-up. We do not sell “more spend” as the default answer.",
  },
  {
    q: "Where are you based?",
    a: `Lagos, Nigeria - working with operators across Africa. ${siteConfig.contact.email} reaches the team.`,
  },
  {
    q: "Do I need a big team to work with you?",
    a: "No. Founders and lean teams are normal. Mid-market teams use us when channels fight each other.",
  },
  {
    q: "How is this different from a general consultant?",
    a: "We leave a portal and a Monday ritual, not only a slide deck. The point is a system your people can run.",
  },
] as const;

export function AboutPageBody() {
  return (
    <>
      <PageSection
        eyebrow="Origin"
        title="Built because spend without a diagnosis burns quarters."
        description="African brands were paying for the same ads while the sale stayed stuck somewhere else. We exist to name that somewhere."
      >
        <ol className="grid gap-4 tablet:grid-cols-3">
          {storyBeats.map((beat, index) => (
            <li key={beat.title} className={index === 1 ? "tablet:row-span-1" : undefined}>
              <PageCard tone={index === 1 ? "ink" : "white"} className="h-full">
                <PagePill tone={index === 1 ? "mint" : "soft"}>0{index + 1}</PagePill>
                <h3
                  className={`mt-4 font-display text-[1.2rem] font-bold ${
                    index === 1 ? "text-white" : "text-mint-ink"
                  }`}
                >
                  {beat.title}
                </h3>
                <p
                  className={`mt-2 text-[0.9rem] leading-relaxed ${
                    index === 1 ? "text-white/70" : "text-neutral-600"
                  }`}
                >
                  {beat.body}
                </p>
              </PageCard>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection
        tone="soft"
        eyebrow="Two systems"
        title="Your login. Our operating system."
        description="Clients see the work without chasing screenshots. Our team runs one Monday problem across brand, ads, and sales."
      >
        <div className="grid gap-4 tablet:grid-cols-2">
          <PageCard className="min-h-[16rem]">
            <KeyRound className="h-5 w-5 text-mint" aria-hidden />
            <h3 className="mt-4 font-display text-[1.35rem] font-bold text-mint-ink">
              Client portal
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-neutral-600">
              Tasks, next moves, and the week’s number in one place. Built so owners do not
              live inside five vendor WhatsApp groups.
            </p>
          </PageCard>
          <PageCard tone="ink" className="min-h-[16rem]">
            <LineChart className="h-5 w-5 text-mint" aria-hidden />
            <h3 className="mt-4 font-display text-[1.35rem] font-bold text-white">
              Agency OS
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">
              Same ritual our strategists use: one problem, one owner, one check. That is how
              creative and media stop arguing past each other.
            </p>
          </PageCard>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Principles"
        title="Four rules we do not bend."
        description="If a vendor asks you to skip diagnosis, they are selling activity - not a fix."
      >
        <ul className="grid gap-4 tablet:grid-cols-2">
          {principles.map((item) => (
            <li key={item.title}>
              <PageCard tone="soft" className="h-full">
                <h3 className="font-display text-[1.2rem] font-bold text-mint-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-neutral-600">
                  {item.body}
                </p>
              </PageCard>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        tone="soft"
        eyebrow="Who we serve"
        title="Operators who are tired of channel silos."
      >
        <ul className="grid gap-4 tablet:grid-cols-3">
          {whoWeServe.map((item) => (
            <li key={item.title}>
              <PageCard className="h-full">
                <item.Icon className="h-5 w-5 text-mint" aria-hidden />
                <h3 className="mt-4 font-display text-[1.15rem] font-bold text-mint-ink">
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
        tone="ink"
        eyebrow="Engagement"
        title="How work usually unfolds."
        description="Free doors first. Then a set block of work - not an open mystery retainer."
      >
        <ol className="grid gap-3 tablet:grid-cols-2 laptop:grid-cols-4">
          {engagement.map((item) => (
            <li key={item.step}>
              <div className="h-full rounded-[1.5rem] border border-[#16024A]/10 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(22,2,74,0.28)]">
                <p className="font-display text-[1.5rem] font-bold text-[#3B05C4]">{item.step}</p>
                <h3 className="mt-3 font-display text-[1.05rem] font-bold text-[#16024A]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-neutral-600">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection tone="soft" eyebrow="Explore" title="Go deeper on the people and the mission.">
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/about/team", label: "Meet the team" },
            { href: "/about/mission", label: "Read the mission" },
            { href: "/about/careers", label: "Careers" },
            { href: ROUTES.book, label: "Book a call" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center gap-3 rounded-full bg-mint px-2 pl-5 pr-2 text-[0.85rem] font-semibold text-white hover:bg-mint-deep"
            >
              <span>{link.label}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-mint">
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </PageSection>

      <PageFaq
        title="About Xkwisit - common questions"
        description="Straight answers before you book."
        items={faqs}
      />
      <CtaSection />
    </>
  );
}
