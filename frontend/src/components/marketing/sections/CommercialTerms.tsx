"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CalendarRange,
  FileSpreadsheet,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { SheetDownloadGate } from "@/components/marketing/sections/SheetDownloadGate";
import {
  ENGAGEMENT_DAYS,
  MINIMUM_START_NGN,
  REFUND_PERCENT_OF_UNDELIVERED,
} from "@/config/commercial";
import { ROUTES, siteConfig } from "@/config/site";
import { useCurrency } from "@/contexts/CurrencyContext";
import { cn } from "@/lib/utils/cn";

type RuleCard = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  Icon: LucideIcon;
  shell: string;
  accent: string;
  progress?: number;
};

type OverviewRow = {
  Icon: LucideIcon;
  title: string;
  detail: string;
  iconBg: string;
};

/**
 * Commercial terms.
 * Mobile: single-card carousel + arrows (no stacked peeks).
 * Tablet/desktop: static grid - no carousel chrome.
 */
export function CommercialTerms() {
  const { formatFromNgn, currency } = useCurrency();
  const minimum = formatFromNgn(MINIMUM_START_NGN);
  const reduce = useReducedMotion();

  const overviewRows: OverviewRow[] = useMemo(
    () => [
      {
        Icon: CalendarRange,
        title: `${ENGAGEMENT_DAYS} days of work`,
        detail: "A set block - not an open mystery subscription",
        iconBg: "bg-mint text-white",
      },
      {
        Icon: Banknote,
        title: `Starts at ${minimum}`,
        detail: "Published floor. Below that we do not take the job",
        iconBg: "bg-success text-white",
      },
      {
        Icon: ShieldCheck,
        title: `${REFUND_PERCENT_OF_UNDELIVERED}% on work not done`,
        detail: "Claim undelivered work if we stop early",
        iconBg: "bg-[#5B45FF] text-white",
      },
      {
        Icon: FileSpreadsheet,
        title: "Growth sheet PDF",
        detail: "See the leak, name the fix, grow on purpose",
        iconBg: "bg-mint-soft text-mint",
      },
    ],
    [minimum],
  );

  const rules: RuleCard[] = useMemo(
    () => [
      {
        id: "days",
        eyebrow: "Engagement",
        title: `${ENGAGEMENT_DAYS} days of work`,
        body: `You pay for a set period of work - not an open-ended “hope it works” subscription. Waiting another ${ENGAGEMENT_DAYS} days on the same ads does not fix what’s stuck.`,
        Icon: CalendarRange,
        shell: "bg-[#EEF0FF]",
        accent: "text-mint",
      },
      {
        id: "minimum",
        eyebrow: "Starting fee",
        title: `Starts at ${minimum}`,
        body: `We start after at least ${minimum} is paid. That is the lowest published starting fee. Below that, we do not take the job.`,
        Icon: Banknote,
        shell: "bg-[#E8F8EF]",
        accent: "text-success",
        progress: 72,
      },
      {
        id: "refund",
        eyebrow: "Protection",
        title: `${REFUND_PERCENT_OF_UNDELIVERED}% back`,
        body: "If we stop early, you can claim what you paid for work not delivered. Work already done, ad money already paid to Meta or Google, and third-party fees stay spent.",
        Icon: ShieldCheck,
        shell: "bg-[#F4F0FF]",
        accent: "text-[#5B45FF]",
      },
    ],
    [minimum],
  );

  // Mobile slides: overview (paginated rows) + each rule
  const slideCount = 1 + rules.length;
  const [slide, setSlide] = useState(0);
  const [rowPage, setRowPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const rowsPerPage = 2;
  const rowPages = Math.ceil(overviewRows.length / rowsPerPage);

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setInterval(() => {
      setSlide((current) => {
        // On overview, advance row page first, then next slide
        if (current === 0) {
          setRowPage((page) => {
            if (page + 1 < rowPages) return page + 1;
            setSlide(1);
            return 0;
          });
          return current;
        }
        return (current + 1) % slideCount;
      });
    }, 4800);
    return () => window.clearInterval(timer);
  }, [reduce, paused, slideCount, rowPages]);

  function go(delta: number) {
    setPaused(true);
    setRowPage(0);
    setSlide((current) => (current + delta + slideCount) % slideCount);
  }

  const visibleRows = overviewRows.slice(
    rowPage * rowsPerPage,
    rowPage * rowsPerPage + rowsPerPage,
  );

  return (
    <section className="relative overflow-x-clip bg-white">
      <Container className="relative px-3 py-14 mobile-sm:px-5 mobile-sm:py-16 tablet:px-8 tablet:py-20">
        <div className="mx-auto max-w-2xl px-1 text-center mobile-sm:px-0">
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mint">
            Before we start
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.7rem,5vw,2.6rem)] font-bold leading-[1.1] tracking-tight text-mint-ink">
            Clear pay rules before we start.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.92rem] leading-relaxed text-neutral-600 mobile-sm:text-[0.95rem]">
            {ENGAGEMENT_DAYS} days of work. Published minimum. Full refund on work not
            done. Prices are in naira
            {currency === "NGN"
              ? "."
              : `; other currencies like ${currency} are a guide, not a bank rate.`}
          </p>
        </div>

        {/* —— Mobile only: single-card carousel —— */}
        <div
          className="mx-auto mt-8 w-full max-w-lg tablet:hidden"
          onTouchStart={() => setPaused(true)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Pay rules"
        >
          <div className="relative mx-auto w-[98%]">
            <AnimatePresence mode="wait">
              <motion.article
                key={`${slide}-${rowPage}`}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className={cn(
                  "overflow-hidden rounded-[1.6rem] border border-mint-ice/80 bg-white shadow-[0_20px_40px_-28px_rgba(22,2,74,0.35)]",
                  slide > 0 && rules[slide - 1]?.shell,
                  slide > 0 && "border-transparent",
                )}
              >
                {slide === 0 ? (
                  <OverviewMobile
                    brand={siteConfig.shortName}
                    rows={visibleRows}
                    rowPage={rowPage}
                    rowPages={rowPages}
                    onRowPage={setRowPage}
                    bookHref={ROUTES.book}
                  />
                ) : (
                  <RuleMobile
                    card={rules[slide - 1]!}
                    bookHref={ROUTES.book}
                  />
                )}
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-mint-ice bg-white text-mint-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: slideCount }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Slide ${index + 1}`}
                  aria-current={index === slide}
                  onClick={() => {
                    setPaused(true);
                    setRowPage(0);
                    setSlide(index);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    index === slide ? "w-7 bg-mint" : "w-2 bg-mint-ice",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-mint text-white"
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        {/* —— Tablet / desktop: static grid, no carousel —— */}
        <ul className="mt-10 hidden gap-4 tablet:grid tablet:grid-cols-3">
          {rules.map((rule) => (
            <li key={rule.id}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-[1.5rem] p-6",
                  rule.shell,
                )}
              >
                <rule.Icon className={cn("h-5 w-5", rule.accent)} aria-hidden />
                <p
                  className={cn(
                    "mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.16em]",
                    rule.accent,
                  )}
                >
                  {rule.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-[1.2rem] font-bold text-mint-ink">
                  {rule.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-neutral-600">
                  {rule.body}
                </p>
                {typeof rule.progress === "number" ? (
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/70">
                    <div
                      className="h-full rounded-full bg-success"
                      style={{ width: `${rule.progress}%` }}
                    />
                  </div>
                ) : null}
              </article>
            </li>
          ))}
        </ul>

        <GrowthPackageBanner bookHref={ROUTES.book} />
      </Container>
    </section>
  );
}

function GrowthPackageBanner({ bookHref }: { bookHref: string }) {
  return (
    <article className="relative mt-6 overflow-hidden rounded-[1.75rem] bg-[#16024A] text-white shadow-[0_28px_60px_-28px_rgba(22,2,74,0.55)] tablet:mt-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, #3B05C4 0, transparent 42%), radial-gradient(circle at 88% 80%, #9B6BFF 0, transparent 36%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#3B05C4]/40 blur-3xl"
      />

      <div className="relative grid gap-6 p-5 mobile-sm:p-6 tablet:grid-cols-[1.35fr_0.85fr] tablet:items-center tablet:gap-8 tablet:p-8 laptop:p-10">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#EDE7FF]">
            Free package
            <span className="rounded-full bg-[#3B05C4] px-2 py-0.5 text-[0.62rem] tracking-[0.12em] text-white">
              PDF
            </span>
          </span>

          <h3 className="mt-4 max-w-2xl font-display text-[clamp(1.7rem,4.2vw,2.85rem)] font-bold leading-[1.05] tracking-tight">
            Stop guessing.
            <span className="mt-1 block text-[#C4B5FF]">
              Know how your business grows.
            </span>
          </h3>

          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/75">
            Busy owners still can&apos;t name the one leak killing profit. This free
            package forces the answer onto one page - money out, money in, the problem
            worth fixing this week. Fill it once and Monday stops being a fog.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {["Money out", "Money in", "One fix this week"].map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[0.75rem] font-semibold text-white/85"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-col gap-2.5 rounded-[1.35rem] bg-white p-4 text-[#16024A] shadow-[0_20px_40px_-24px_rgba(0,0,0,0.45)] tablet:p-5">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#3B05C4]">
            Unlock now
          </p>
          <SheetDownloadGate
            buttonClassName="!min-h-12 !border-0 !bg-[#3B05C4] !text-white hover:!bg-[#2a0490]"
          />
          <Link
            href={bookHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#16024A]/15 px-4 text-[0.88rem] font-semibold text-[#16024A] hover:bg-[#F4F0FF]"
          >
            Book a call
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

function OverviewMobile({
  brand,
  rows,
  rowPage,
  rowPages,
  onRowPage,
  bookHref,
}: {
  brand: string;
  rows: OverviewRow[];
  rowPage: number;
  rowPages: number;
  onRowPage: (page: number) => void;
  bookHref: string;
}) {
  return (
    <div className="flex flex-col px-5 py-5">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint text-white">
          <span className="font-display text-[0.85rem] font-bold">X</span>
        </span>
        <p className="font-display text-[0.95rem] font-bold text-mint-ink">{brand}</p>
      </div>

      <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-mint">
        Before we start
      </p>
      <h3 className="mt-1.5 font-display text-[1.4rem] font-bold text-mint-ink">
        Clear pay rules
      </h3>

      <ul className="mt-5 space-y-3.5">
        {rows.map((row) => (
          <li key={row.title} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full",
                row.iconBg,
              )}
            >
              <row.Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.88rem] font-bold text-mint-ink">
                {row.title}
              </span>
              <span className="mt-0.5 block text-[0.75rem] leading-snug text-neutral-600">
                {row.detail}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {rowPages > 1 ? (
        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous rules on this card"
            disabled={rowPage === 0}
            onClick={() => onRowPage(Math.max(0, rowPage - 1))}
            className="rounded-full px-2 py-1 text-[0.72rem] font-semibold text-mint disabled:opacity-30"
          >
            More ↑
          </button>
          <p className="text-[0.7rem] font-medium text-neutral-500">
            {rowPage + 1} / {rowPages}
          </p>
          <button
            type="button"
            aria-label="Next rules on this card"
            disabled={rowPage >= rowPages - 1}
            onClick={() => onRowPage(Math.min(rowPages - 1, rowPage + 1))}
            className="rounded-full px-2 py-1 text-[0.72rem] font-semibold text-mint disabled:opacity-30"
          >
            More ↓
          </button>
        </div>
      ) : null}

      <div className="mt-5 flex flex-col gap-2">
        <SheetDownloadGate
          buttonClassName="!min-h-11 !border-0 !bg-mint-soft !text-mint"
          compact
        />
        <Link
          href={bookHref}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-mint text-[0.85rem] font-semibold text-white"
        >
          Book a call
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function RuleMobile({ card, bookHref }: { card: RuleCard; bookHref: string }) {
  return (
    <div className="flex flex-col px-5 py-5">
      <card.Icon className={cn("h-5 w-5", card.accent)} aria-hidden />
      <p
        className={cn(
          "mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em]",
          card.accent,
        )}
      >
        {card.eyebrow}
      </p>
      <h3 className="mt-1.5 font-display text-[1.35rem] font-bold text-mint-ink">
        {card.title}
      </h3>
      <p className="mt-3 text-[0.9rem] leading-relaxed text-neutral-600">{card.body}</p>
      {typeof card.progress === "number" ? (
        <div className="mt-5">
          <div className="flex justify-between text-[0.72rem] font-semibold text-mint-ink">
            <span>Published floor</span>
            <span>{card.progress}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/80">
            <div
              className="h-full rounded-full bg-success"
              style={{ width: `${card.progress}%` }}
            />
          </div>
        </div>
      ) : null}
      <Link
        href={bookHref}
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white text-[0.85rem] font-semibold text-mint-ink shadow-sm"
      >
        Talk through this rule
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}
