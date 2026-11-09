import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

import { PackagePrice } from "@/components/marketing/PackagePrice";
import {
  PageCard,
  PageFaq,
  PagePill,
  PageSection,
} from "@/components/marketing/pages/shared";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";
import { StudioFigures, StudioNameRow } from "@/components/marketing/studio/Studio";
import {
  ENGAGEMENT_DAYS,
  MINIMUM_START_NGN,
  REFUND_PERCENT_OF_UNDELIVERED,
} from "@/config/commercial";
import { packages } from "@/config/packages";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const payRules = [
  {
    title: `${ENGAGEMENT_DAYS} days of work`,
    body: "You hire a set block - not an open “hope it works” subscription.",
  },
  {
    title: "Published minimum",
    body: `Work starts at a clear naira floor (from ₦${(MINIMUM_START_NGN / 1_000_000).toFixed(1)}M published). Below that we do not take the job.`,
  },
  {
    title: `${REFUND_PERCENT_OF_UNDELIVERED}% on work not done`,
    body: "If we stop early, undelivered work can be claimed back. Ads already spent at Meta/Google stay spent.",
  },
] as const;

const compareAxes = [
  { label: "Clarity first", foundation: true, starter: true, engine: true, partner: true },
  { label: "Hands-on execution", foundation: false, starter: true, engine: true, partner: true },
  { label: "Multi-channel", foundation: false, starter: false, engine: true, partner: true },
  { label: "Dedicated strategist rhythm", foundation: false, starter: false, engine: true, partner: true },
] as const;

const objections = [
  {
    q: "Why not just hire freelancers?",
    a: "You can. The gap we close is shared numbers across brand, ads, and sales - freelancers rarely own that Monday ritual.",
  },
  {
    q: "Can I start smaller than Foundation?",
    a: "Use the free X-Ray or assessment. Paid work has a published minimum so we can actually finish a diagnosis.",
  },
  {
    q: "Do prices include ad spend?",
    a: "No. Media budget sits in your ad accounts. Our fee is for the work - strategy, creative, and systems.",
  },
] as const;

const faqs = [
  {
    q: "Are package prices fixed forever?",
    a: "Listed prices are starting points in naira. Scope and final quote lock after we name the problem on the call.",
  },
  {
    q: "Monthly vs 90-day block?",
    a: `We plan in ~${ENGAGEMENT_DAYS}-day blocks even when billing shows monthly. The point is a finished stretch of work.`,
  },
  {
    q: "What if we pause mid-engagement?",
    a: `Undelivered work can qualify for a ${REFUND_PERCENT_OF_UNDELIVERED}% claim path. Delivered work and third-party spend do not reverse.`,
  },
  {
    q: "Enterprise / custom?",
    a: "When you need multiple markets or dedicated squads, we write a custom SOW. Book a call - do not guess from the grid.",
  },
] as const;

export function PricingPageBody() {
  const list = [...packages].sort((a, b) => a.order - b.order);

  return (
    <>
      <StudioNameRow names={list.map((item) => item.name)} />
      <StudioFigures
        label="Before you pick"
        items={[
          { value: `${ENGAGEMENT_DAYS} days`, label: "Block of work" },
          { value: `₦${(MINIMUM_START_NGN / 1_000_000).toFixed(1)}M`, label: "Published floor" },
          { value: `${REFUND_PERCENT_OF_UNDELIVERED}%`, label: "On work not done" },
        ]}
      />
      <PageSection
        eyebrow="Pay rules"
        title="Read these before you pick a package."
        description="Clear days, clear floor, clear refund path on work not delivered."
      >
        <ul className="grid gap-4 tablet:grid-cols-3">
          {payRules.map((rule, index) => (
            <li key={rule.title}>
              <PageCard tone={index === 1 ? "ink" : "white"} className="h-full">
                <h3
                  className={`font-display text-[1.2rem] font-bold ${
                    index === 1 ? "text-white" : "text-mint-ink"
                  }`}
                >
                  {rule.title}
                </h3>
                <p
                  className={`mt-3 text-[0.9rem] leading-relaxed ${
                    index === 1 ? "text-white/70" : "text-neutral-600"
                  }`}
                >
                  {rule.body}
                </p>
              </PageCard>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        tone="soft"
        eyebrow="Packages"
        title="Pick a starting lane. We refine on the call."
      >
        <ul className="grid gap-4 laptop:grid-cols-2">
          {list.map((pkg) => (
            <li key={pkg.id}>
              <PageCard tone={pkg.featured ? "ink" : "white"} className="flex h-full flex-col">
                {pkg.featured ? (
                  <PagePill tone="mint">Featured</PagePill>
                ) : (
                  <PagePill>Package</PagePill>
                )}
                <h3
                  className={cn(
                    "mt-4 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight",
                    pkg.featured ? "text-white" : "text-mint-ink",
                  )}
                >
                  {pkg.name}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-[0.88rem]",
                    pkg.featured ? "text-white/65" : "text-neutral-600",
                  )}
                >
                  {pkg.tagline}
                </p>
                <div className={pkg.featured ? "[&_*]:!text-white" : undefined}>
                  <PackagePrice amountNgn={pkg.priceMonthly} />
                </div>
                <p
                  className={cn(
                    "mt-2 text-[0.85rem]",
                    pkg.featured ? "text-white/60" : "text-neutral-600",
                  )}
                >
                  {pkg.bestFor}
                </p>
                <ul className="mt-5 flex-1 space-y-2">
                  {pkg.includes.slice(0, 5).map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "flex gap-2 text-[0.85rem]",
                        pkg.featured ? "text-white/85" : "text-neutral-600",
                      )}
                    >
                      <Check
                        className={cn(
                          "mt-0.5 h-3.5 w-3.5 shrink-0",
                          pkg.featured ? "text-mint" : "text-mint",
                        )}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                {pkg.excludes.length > 0 ? (
                  <ul className="mt-3 space-y-1.5">
                    {pkg.excludes.slice(0, 2).map((item) => (
                      <li
                        key={item}
                        className={cn(
                          "flex gap-2 text-[0.8rem]",
                          pkg.featured ? "text-white/50" : "text-neutral-500",
                        )}
                      >
                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Link
                  href={ROUTES.book}
                  className={cn(
                    "mt-8 inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-full px-2 pl-6 pr-2 text-[0.85rem] font-semibold",
                    pkg.featured
                      ? "bg-mint text-white hover:bg-mint-deep"
                      : "bg-mint text-white hover:bg-mint-deep",
                  )}
                >
                  <span>Talk through this package</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-mint">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </PageCard>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        eyebrow="Compare"
        title="What changes as you move up the ladder."
      >
        <div className="overflow-x-auto rounded-[2rem] border border-neutral-200 bg-white">
          <table className="min-w-full text-left text-[0.85rem]">
            <thead className="bg-mint-ink text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Capability</th>
                <th className="px-5 py-4 font-semibold">Foundation</th>
                <th className="px-5 py-4 font-semibold">Starter</th>
                <th className="px-5 py-4 font-semibold">Engine</th>
                <th className="px-5 py-4 font-semibold">Partner</th>
              </tr>
            </thead>
            <tbody>
              {compareAxes.map((row) => (
                <tr key={row.label} className="border-t border-neutral-100">
                  <td className="px-5 py-4 font-medium text-mint-ink">{row.label}</td>
                  {(["foundation", "starter", "engine", "partner"] as const).map((key) => (
                    <td key={key} className="px-5 py-4 text-neutral-600">
                      {row[key] ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-mint-soft text-mint">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection tone="soft" eyebrow="Objections" title="Straight talk on price resistance.">
        <ul className="grid gap-4 tablet:grid-cols-3">
          {objections.map((item) => (
            <li key={item.q}>
              <PageCard className="h-full">
                <h3 className="font-display text-[1.05rem] font-bold text-mint-ink">{item.q}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-neutral-600">{item.a}</p>
              </PageCard>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageFaq
        title="Pricing questions"
        description="Fees, refunds, and how packages map to real work."
        items={faqs}
      />
      <SolteraCloser />
    </>
  );
}
