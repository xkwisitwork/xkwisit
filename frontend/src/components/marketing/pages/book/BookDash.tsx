"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Bounce } from "@/components/marketing/motion/Reveal";
import { cn } from "@/lib/utils/cn";

const stripe =
  "repeating-linear-gradient(135deg, rgba(22,2,74,0.14) 0 6px, transparent 6px 12px)";

export function BookShell({
  children,
  className,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "ink" | "teal" | "lavender" | "soft";
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "rounded-[2rem] p-5 mobile-sm:rounded-[2.25rem] mobile-sm:p-6 tablet:p-7",
        tone === "white" && "bg-white shadow-[0_24px_60px_-36px_rgba(22,2,74,0.35)]",
        tone === "ink" && "bg-[#16024A] text-white shadow-[0_24px_60px_-28px_rgba(22,2,74,0.55)]",
        tone === "teal" &&
          "bg-[#0F3D3A] text-white shadow-[0_24px_60px_-28px_rgba(15,61,58,0.55)]",
        tone === "lavender" && "bg-[#EDE7FF] text-[#16024A]",
        tone === "soft" && "bg-[#F7F4FF] text-[#16024A]",
        className,
      )}
      whileHover={reduce ? undefined : { y: -6, scale: 1.012 }}
      transition={{ type: "spring", stiffness: 380, damping: 16, mass: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

/** Call lanes from existing book copy - brand, ads, sales, follow-up. */
const HEAT_LANES = ["Brand", "Ads", "Sales", "Follow-up"] as const;

/** Brand-family lane hues: electric purple, soft violet, indigo, magenta-violet. */
const HEAT_LANE_RGB: readonly (readonly [number, number, number])[] = [
  [59, 5, 196],
  [155, 107, 255],
  [110, 60, 210],
  [196, 91, 255],
];

/** Relative attention on the call - one hot cell per topic. Illustration of focus, not a live feed. */
const HEAT_VALUES: readonly (readonly number[])[] = [
  [9, 4, 3, 5],
  [3, 8, 4, 2],
  [2, 3, 7, 9],
];

function heatFill(value: number, peak: number, laneIndex: number) {
  const t = peak <= 0 ? 0 : Math.min(1, value / peak);
  const [r, g, b] = HEAT_LANE_RGB[laneIndex] ?? HEAT_LANE_RGB[0];
  const alpha = 0.22 + t * 0.78;
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
}

/** Teal focus card: call length + heatmap across the three cover threads. */
export function BookCoverDash({
  items,
}: {
  items: readonly { title: string; body: string }[];
}) {
  const rows = items.slice(0, 3);
  const peak = 9;
  const short = (title: string) => {
    if (/stuck/i.test(title)) return "Stuck";
    if (/tried/i.test(title)) return "Tried";
    if (/move/i.test(title)) return "Move";
    return title.split(" ").slice(-1)[0] ?? title;
  };

  return (
    <BookShell tone="teal" className="flex flex-col !p-4 tablet:!p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/55">
            Focus map
          </p>
          <p className="mt-1.5 font-display text-[1.05rem] font-bold leading-snug">
            Three threads in play
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[0.7rem] font-semibold text-white/80">
          30 min
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#EDE7FF] text-[#3B05C4]">
            <ArrowUpRight className="h-3 w-3" aria-hidden />
          </span>
        </span>
      </div>

      <div className="mt-4 flex items-end gap-3">
        <p className="font-display text-[clamp(2rem,4.5vw,2.6rem)] font-bold leading-none tracking-tight">
          3
        </p>
        <p className="pb-0.5 text-[0.82rem] leading-snug text-white/65">topics · one problem named</p>
      </div>

      <div className="mt-4 rounded-[1.15rem] bg-black/20 p-2.5">
        <p className="mb-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/45">
          Heatmap · illustration of call focus
        </p>
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `minmax(2.5rem,auto) repeat(${HEAT_LANES.length}, minmax(0, 1fr))`,
          }}
        >
          <div />
          {HEAT_LANES.map((lane) => (
            <div
              key={lane}
              className="pb-0.5 text-center text-[0.55rem] font-semibold leading-tight text-white/55"
            >
              {lane}
            </div>
          ))}
          {rows.map((item, rowIndex) => (
            <div key={item.title} className="contents">
              <div className="pr-1.5 self-center text-right text-[0.62rem] font-semibold text-white/70">
                {short(item.title)}
              </div>
              {HEAT_LANES.map((lane, colIndex) => {
                const value = HEAT_VALUES[rowIndex]?.[colIndex] ?? 0;
                return (
                  <div
                    key={`${item.title}-${lane}`}
                    title={`${item.title} · ${lane}`}
                    className="h-6 rounded-md border border-white/10"
                    style={{ backgroundColor: heatFill(value, peak, colIndex) }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {HEAT_LANES.map((lane, index) => {
            const [r, g, b] = HEAT_LANE_RGB[index] ?? HEAT_LANE_RGB[0];
            return (
              <span key={lane} className="inline-flex items-center gap-1.5 text-[0.58rem] text-white/55">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
                  aria-hidden
                />
                {lane}
              </span>
            );
          })}
        </div>
      </div>

      <ul className="mt-3 grid items-start gap-1.5 tablet:grid-cols-3">
        {rows.map((item, index) => (
          <li key={item.title} className="rounded-[0.95rem] bg-white/10 px-2.5 py-2">
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-white/50">
              0{index + 1} · {short(item.title)}
            </p>
            <p className="mt-0.5 text-[0.75rem] leading-snug text-white/85">{item.body}</p>
          </li>
        ))}
      </ul>
    </BookShell>
  );
}

/** Compact leave-with outcomes - content height, no stretch. */
export function BookOutcomesDash({
  items,
  leadSupport = [],
}: {
  items: readonly string[];
  /** Short support under Outcome 01 - must already be true on the book page. */
  leadSupport?: readonly string[];
}) {
  const [first, second, third] = items;

  return (
    <BookShell tone="white" className="flex flex-col gap-3 !p-4 tablet:!p-5">
      <div>
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#5C5478]">
          Walk-away board
        </p>
        <p className="mt-1.5 font-display text-[1.05rem] font-bold leading-snug text-[#16024A]">
          What is settled before you hang up.
        </p>
      </div>

      <div className="grid gap-2.5">
        <div className="rounded-[1.25rem] bg-[#3B05C4] p-4 text-white">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/70">
            Outcome 01
          </p>
          <p className="mt-2 font-display text-[1.02rem] font-bold leading-snug">{first}</p>
          {leadSupport.length > 0 ? (
            <ul className="mt-2.5 space-y-1.5">
              {leadSupport.map((line) => (
                <li
                  key={line}
                  className="rounded-[0.9rem] bg-white/12 px-3 py-2 text-[0.8rem] leading-snug text-white/90"
                >
                  {line}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-3">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full w-[82%] rounded-full bg-white"
                style={{ backgroundImage: stripe }}
              />
            </div>
            <p className="mt-1.5 text-[0.68rem] text-white/70">Named before you leave</p>
          </div>
        </div>

        <div className="grid gap-2.5 tablet:grid-cols-2">
          <div className="rounded-[1.25rem] bg-[#EDE7FF] p-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#5C5478]">
              Outcome 02
            </p>
            <p className="mt-2 font-display text-[0.95rem] font-bold leading-snug text-[#16024A]">
              {second}
            </p>
            <svg viewBox="0 0 160 36" className="mt-3 h-8 w-full" aria-hidden>
              <path
                d="M0 28 C24 26 28 14 48 16 C68 18 72 6 96 10 C120 14 128 22 160 8"
                fill="none"
                stroke="#3B05C4"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M0 28 C24 26 28 14 48 16 C68 18 72 6 96 10 C120 14 128 22 160 8 V36 H0 Z"
                fill="#3B05C4"
                opacity="0.12"
              />
            </svg>
          </div>

          <div className="rounded-[1.25rem] bg-[#F4F0FF] p-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#5C5478]">
              Outcome 03
            </p>
            <p className="mt-2 font-display text-[0.95rem] font-bold leading-snug text-[#16024A]">
              {third}
            </p>
          </div>
        </div>
      </div>
    </BookShell>
  );
}

/** Timeline card for prepare list. */
export function BookPrepareDash({ items }: { items: readonly string[] }) {
  return (
    <BookShell tone="white" className="h-full">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#5C5478]">
            Checklist
          </p>
          <p className="mt-2 font-display text-[1.15rem] font-bold leading-snug text-[#16024A]">
            Rough notes are enough.
          </p>
        </div>
        <span className="rounded-full bg-[#F4F0FF] px-3 py-1.5 text-[0.72rem] font-semibold text-[#3B05C4]">
          {items.length} items
        </span>
      </div>

      <ol className="relative mt-8 space-y-0">
        <span
          className="absolute bottom-3 left-[0.9rem] top-3 w-px bg-[#DDD3F4]"
          aria-hidden
        />
        {items.map((item, index) => (
          <li key={item} className="relative flex gap-4 py-3">
            <span className="relative z-[1] mt-1 grid h-[1.15rem] w-[1.15rem] shrink-0 place-items-center rounded-full border-2 border-[#3B05C4] bg-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3B05C4]" />
            </span>
            <div className="min-w-0 flex-1 rounded-[1.25rem] bg-[#F7F4FF] px-4 py-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#5C5478]">
                0{index + 1}
              </p>
              <p className="mt-1 text-[0.92rem] font-medium leading-snug text-[#16024A]">{item}</p>
            </div>
          </li>
        ))}
      </ol>
    </BookShell>
  );
}

/** Soft arc card for call length + never-do lines. */
export function BookGuardDash({
  items,
}: {
  items: readonly string[];
}) {
  return (
    <BookShell tone="soft" className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#5C5478]">
            Guardrails
          </p>
          <p className="mt-2 font-display text-[1.15rem] font-bold leading-snug text-[#16024A]">
            Off the table on call one.
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-6 grid h-36 w-36 place-items-center">
        <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle cx="60" cy="60" r="46" fill="none" stroke="#DDD3F4" strokeWidth="14" />
          <circle
            cx="60"
            cy="60"
            r="46"
            fill="none"
            stroke="#3B05C4"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="200 289"
            transform="rotate(-90 60 60)"
          />
          <circle
            cx="60"
            cy="60"
            r="46"
            fill="none"
            stroke="#16024A"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="48 289"
            strokeDashoffset="-200"
            transform="rotate(-90 60 60)"
            opacity="0.45"
          />
        </svg>
        <div className="text-center">
          <p className="font-display text-[1.8rem] font-bold leading-none text-[#16024A]">30</p>
          <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#5C5478]">
            min focus
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-[1.2rem] bg-white px-4 py-3 text-[0.88rem] leading-snug text-[#2A2348] shadow-[0_12px_28px_-24px_rgba(22,2,74,0.4)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </BookShell>
  );
}

export function BookAsideGet({ items }: { items: readonly string[] }) {
  return (
    <BookShell tone="white">
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-[1.05rem] font-bold text-[#16024A]">What you get</p>
        <span className="rounded-full bg-[#F4F0FF] px-2.5 py-1 text-[0.68rem] font-semibold text-[#3B05C4]">
          Call
        </span>
      </div>
      <ul className="mt-5 space-y-2.5">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-[1.25rem] bg-[#F7F4FF] px-3.5 py-3"
          >
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-[0.7rem] font-bold text-[#3B05C4] shadow-[0_8px_16px_-12px_rgba(22,2,74,0.45)]">
              0{index + 1}
            </span>
            <span className="min-w-0 text-[0.88rem] leading-snug text-[#2A2348]">{item}</span>
          </li>
        ))}
      </ul>
    </BookShell>
  );
}

export function BookAsideAccount({ href }: { href: string }) {
  return (
    <BookShell tone="lavender">
      <p className="font-display text-[1.05rem] font-bold text-[#16024A]">Rather dive in yourself?</p>
      <p className="mt-2 text-[0.88rem] leading-relaxed text-[#2A2348]">
        Create a free account and run the Growth X-Ray on your own timeline.
      </p>
      <Bounce className="mt-4 inline-flex w-full">
        <Link
          href={href}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#16024A] px-4 text-[0.85rem] font-semibold text-white hover:bg-[#3B05C4]"
        >
          Create account
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </Bounce>
    </BookShell>
  );
}

export function BookAsidePhone({ href, label }: { href: string; label: string }) {
  return (
    <BookShell tone="ink" className="!p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white">
          <Phone className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-[0.75rem] text-white/65">Prefer to talk now?</p>
          <a
            href={href}
            className="mt-0.5 block break-all font-display text-[1.05rem] font-bold text-white hover:text-[#EDE7FF]"
          >
            {label}
          </a>
        </div>
      </div>
    </BookShell>
  );
}

export const bookFormShellClassName =
  "rounded-[2rem] bg-white p-5 shadow-[0_24px_60px_-36px_rgba(22,2,74,0.35)] mobile-sm:rounded-[2.25rem] mobile-sm:p-6 tablet:p-7";
