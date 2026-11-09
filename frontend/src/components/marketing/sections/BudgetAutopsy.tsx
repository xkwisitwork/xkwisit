"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CircleDollarSign,
  Percent,
  X,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/Button/variants";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

/**
 * Budget Autopsy - spend patterns as a living dashboard.
 * Naira figures are each stage’s share of the sample budget (examples only).
 */
const autopsies = [
  {
    id: "ads",
    label: "You spent a lot on ads",
    short: "Ads",
    spend: "₦12M",
    spendNaira: 12_000_000,
    spendNote: "paid for ads in 3 months",
    image: "/images/levers/demand-search.jpg",
    imageAlt: "Ad and search spend being reviewed on a laptop",
    stages: [
      { name: "Money spent on ads", pct: 100, tone: "full" as const },
      { name: "People who visited", pct: 62, tone: "ok" as const },
      { name: "People who replied", pct: 28, tone: "warn" as const },
      { name: "People who bought", pct: 9, tone: "crit" as const },
    ],
    verdict:
      "Many people saw the ad. Very few bought. The problem is often the page they land on, or nobody calling them back.",
  },
  {
    id: "brand",
    label: "You spent a lot on looking good",
    short: "Brand",
    spend: "₦4.8M",
    spendNaira: 4_800_000,
    spendNote: "logo, photos, and content",
    image: "/images/levers/brand-board.jpg",
    imageAlt: "Brand boards and creative direction on a desk",
    stages: [
      { name: "Money spent on brand", pct: 100, tone: "full" as const },
      { name: "People who know you", pct: 71, tone: "ok" as const },
      { name: "People who asked", pct: 34, tone: "warn" as const },
      { name: "People who bought", pct: 14, tone: "crit" as const },
    ],
    verdict:
      "Your business looks fine. But people do not know what to do next - so they like you and still do not buy.",
  },
  {
    id: "sales",
    label: "You spent a lot on sales people",
    short: "Sales",
    spend: "₦7.2M",
    spendNaira: 7_200_000,
    spendNote: "salaries and sales tools",
    image: "/images/levers/sales-pipeline.jpg",
    imageAlt: "Sales pipeline board with deal stages",
    stages: [
      { name: "Money spent on sales", pct: 100, tone: "full" as const },
      { name: "Leads they called", pct: 55, tone: "warn" as const },
      { name: "Follow-ups done", pct: 22, tone: "crit" as const },
      { name: "Deals closed", pct: 11, tone: "crit" as const },
    ],
    verdict:
      "You have staff. But many leads get forgotten - nobody has a clear list of who to call next.",
  },
] as const;

type Autopsy = (typeof autopsies)[number];
type StageTone = Autopsy["stages"][number]["tone"];

function formatNaira(value: number) {
  if (value <= 0) return "₦0";
  const millions = value / 1_000_000;
  const digits = millions >= 10 ? 1 : 2;
  const text = millions.toFixed(digits).replace(/\.?0+$/, "");
  return `₦${text}M`;
}

function stageStatus(tone: StageTone) {
  if (tone === "full" || tone === "ok") {
    return { ok: true, label: "Okay so far" };
  }
  if (tone === "warn") {
    return { ok: false, label: "Dropping off" };
  }
  return { ok: false, label: "Money stops here" };
}

/** Simple rising leak path for the analytics panel. */
function leakPath(stages: Autopsy["stages"]) {
  const W = 280;
  const H = 120;
  const pts = stages.map((stage, i) => {
    const x = 12 + (i / (stages.length - 1)) * (W - 24);
    const y = 16 + (1 - stage.pct / 100) * (H - 32);
    return { x, y, pct: stage.pct };
  });
  let d = `M ${pts[0]!.x} ${pts[0]!.y}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const a = pts[i]!;
    const b = pts[i + 1]!;
    const mx = (a.x + b.x) / 2;
    d += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
  }
  const fill = `${d} L ${pts[pts.length - 1]!.x} ${H} L ${pts[0]!.x} ${H} Z`;
  return { d, fill, pts, W, H };
}

function ProgressRing({
  value,
  tone,
  size = 52,
}: {
  value: number;
  tone: "good" | "warn" | "bad";
  size?: number;
}) {
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, value)) / 100) * c;
  const color =
    tone === "good" ? "#3B05C4" : tone === "warn" ? "#C45A05" : "#C40404";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#E7DEFF"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        className="fill-[#16024A]"
        style={{ fontSize: 11, fontWeight: 700 }}
      >
        {value}%
      </text>
    </svg>
  );
}

export function BudgetAutopsy() {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const item = autopsies[active]!;
  const close = item.stages[item.stages.length - 1]!;
  const closeNaira = item.spendNaira * (close.pct / 100);
  const leaked = item.spendNaira - closeNaira;
  const curve = leakPath(item.stages);
  const focus = item.stages.find((s) => s.tone === "crit") ?? close;

  return (
    <section className="relative overflow-x-clip bg-[#f7f8fc]">
      <div className="px-4 pb-4 pt-16 mobile-sm:px-5 tablet:px-8 tablet:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#3B05C4]">
            Where the money goes
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4.2vw,2.9rem)] font-bold leading-[1.08] tracking-tight text-[#16024A]">
            Are you spending and not making enough profit?
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-display text-[clamp(1.05rem,2vw,1.25rem)] font-semibold leading-snug text-neutral-600">
            We can fix that.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-neutral-600">
            Below are three true-to-life pictures of how money leaves a business and
            never comes back as profit. The naira figures are{" "}
            <span className="font-semibold text-[#16024A]">
              illustrations from business owners before they worked with Xkwisit
            </span>{" "}
            - not invented charts, and not a promise of the same numbers for you. They
            show the shape of the wound. We show the wound so you can stop bleeding.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-4">
          <article
            className="rounded-[1.75rem] bg-white p-5 shadow-[0_24px_50px_-36px_rgba(22,2,74,0.35)] mobile-sm:p-7"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(22,2,74,0.06) 1px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          >
            <div className="grid items-center gap-6 tablet:grid-cols-2">
              <div>
                <h3 className="font-display text-[clamp(1.45rem,2.6vw,2rem)] font-bold leading-tight tracking-tight text-[#16024A]">
                  {item.label}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-neutral-600">{item.verdict}</p>
                <p className="mt-4 text-[0.85rem] font-semibold text-[#16024A]">
                  {item.spend} · {item.spendNote}
                </p>
              </div>
              <div className="relative min-h-[14rem] overflow-hidden rounded-[1.4rem] bg-[#f4f4f4]">
                <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 480px" />
                <span className="absolute bottom-4 left-4 rounded-2xl bg-white px-3 py-2 text-[0.78rem] font-semibold text-[#16024A] shadow-[0_12px_28px_-16px_rgba(22,2,74,0.5)]">
                  Sold · {close.pct}%
                </span>
                <span className="absolute bottom-16 left-4 rounded-2xl bg-white px-3 py-2 text-[0.78rem] font-semibold text-[#16024A] shadow-[0_12px_28px_-16px_rgba(22,2,74,0.5)]">
                  {formatNaira(leaked)} did not become a sale
                </span>
              </div>
            </div>
          </article>

          <ul className="grid gap-4 tablet:grid-cols-2">
            {autopsies.map((story, index) =>
              index === active ? null : (
                <li key={story.id}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className="h-full w-full rounded-[1.75rem] bg-white p-5 text-left shadow-[0_24px_50px_-36px_rgba(22,2,74,0.35)] mobile-sm:p-6"
                  >
                    <h3 className="font-display text-[1.25rem] font-bold leading-tight text-[#16024A]">
                      {story.label}
                    </h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-neutral-600">{story.verdict}</p>
                    <div className="relative mt-4 h-40 overflow-hidden rounded-[1.2rem] bg-[#f4f4f4]">
                      <Image src={story.image} alt={story.imageAlt} fill className="object-cover" sizes="400px" />
                      <span className="absolute bottom-3 left-3 rounded-2xl bg-white px-3 py-1.5 text-[0.75rem] font-semibold text-[#16024A]">
                        {story.spend} · {story.spendNote}
                      </span>
                    </div>
                  </button>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <Container className="relative px-4 pb-16 pt-10 mobile-sm:px-5 tablet:px-8 tablet:pb-20">
        {/* Halo-style dashboard board */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: reduce ? 0 : 0.06 }}
          className="mx-auto grid w-[98%] gap-3 tablet:gap-4 laptop:grid-cols-[1.35fr_0.95fr]"
        >
          {/* Left column */}
          <div className="grid gap-3 tablet:gap-4">
            {/* Overview - dark mint hero tile */}
            <AnimatePresence mode="wait">
              <motion.article
                key={item.id}
                initial={reduce ? false : { opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#16024A] via-[#2A0490] to-[#3B05C4] p-5 text-white shadow-[0_28px_60px_-36px_rgba(22,2,74,0.7)] mobile-sm:rounded-[2rem] mobile-sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                      This example
                    </p>
                    <h3 className="mt-1 font-display text-[1.45rem] font-bold tracking-tight mobile-sm:text-[1.7rem]">
                      {item.label}
                    </h3>
                  </div>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[0.75rem] font-semibold text-white">
                    Before Xkwisit
                  </span>
                </div>

                <div className="mt-5 grid gap-4 tablet:grid-cols-[1fr_1.05fr] tablet:items-end">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-3.5 py-3 backdrop-blur-sm">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
                        <CircleDollarSign className="h-4 w-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/65">
                          Money you paid out
                        </p>
                        <p className="font-display text-[1.35rem] font-bold leading-none">
                          {item.spend}
                        </p>
                        <p className="mt-0.5 text-[0.75rem] text-white/75">
                          {item.spendNote}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-3.5 py-3 backdrop-blur-sm">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
                        <Percent className="h-4 w-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/65">
                          Money that came back as sales
                        </p>
                        <p className="font-display text-[1.35rem] font-bold leading-none">
                          {close.pct}% · {formatNaira(closeNaira)}
                        </p>
                        <p className="mt-0.5 text-[0.75rem] text-white/75">
                          {formatNaira(leaked)} did not become a sale
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative mx-auto aspect-[5/4] w-full max-w-[16rem] overflow-hidden rounded-[1.35rem] border border-white/20 bg-white/10 tablet:ml-auto tablet:max-w-none">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover opacity-95"
                      sizes="(max-width: 768px) 70vw, 280px"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[0.68rem] font-semibold text-mint-ink shadow-sm">
                      Sold · {close.pct}%
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-[#FC3FE3] px-2.5 py-1 text-[0.68rem] font-semibold text-white shadow-sm">
                      Lost · {100 - close.pct}%
                    </span>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Analytics + Alerts row */}
            <div className="grid gap-3 tablet:grid-cols-[1.15fr_0.85fr] tablet:gap-4">
              <article className="rounded-[1.5rem] bg-[#16024A] p-5 text-white mobile-sm:rounded-[1.75rem] mobile-sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/60">
                      The journey
                    </p>
                    <h3 className="mt-1 font-display text-[1.15rem] font-bold">
                      From spend to sale
                    </h3>
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.72rem] font-semibold text-[#C9BEFF]">
                    Only {focus.pct}% left at the end
                  </span>
                </div>

                <div className="relative mt-4">
                  <svg
                    viewBox={`0 0 ${curve.W} ${curve.H}`}
                    className="h-auto w-full"
                    role="img"
                    aria-label={`Leak curve for ${item.label}. Ends at ${close.pct}% sales.`}
                  >
                    <defs>
                      <linearGradient id={`${uid}-leak`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FC3FE3" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#3B05C4" stopOpacity="0.05" />
                      </linearGradient>
                      <linearGradient id={`${uid}-stroke`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#C9BEFF" />
                        <stop offset="100%" stopColor="#FC3FE3" />
                      </linearGradient>
                    </defs>
                    <path d={curve.fill} fill={`url(#${uid}-leak)`} />
                    <path
                      d={curve.d}
                      fill="none"
                      stroke={`url(#${uid}-stroke)`}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {curve.pts.map((pt, i) => (
                      <circle
                        key={item.stages[i]!.name}
                        cx={pt.x}
                        cy={pt.y}
                        r={i === item.stages.length - 1 ? 5 : 3.5}
                        fill={i === item.stages.length - 1 ? "#FC3FE3" : "#fff"}
                        stroke="#C9BEFF"
                        strokeWidth="1.5"
                      />
                    ))}
                  </svg>
                  <div className="pointer-events-none absolute right-2 top-1 rounded-xl bg-white px-2.5 py-1.5 text-[#16024A] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.35)]">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-neutral-500">
                      Bought
                    </p>
                    <p className="font-display text-[0.95rem] font-bold leading-none">
                      {close.pct}%
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex justify-between gap-2 text-[0.68rem] font-medium text-white/55">
                  {item.stages.map((stage) => (
                    <span key={stage.name} className="truncate text-center">
                      {stage.name.split(" ").slice(-1)[0]}
                    </span>
                  ))}
                </div>
              </article>

              <article className="rounded-[1.5rem] bg-[#F5E84A] p-5 text-[#16024A] mobile-sm:rounded-[1.75rem] mobile-sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-[1.15rem] font-bold">
                    Where it breaks
                  </h3>
                  <button
                    type="button"
                    className="text-[0.75rem] font-semibold underline-offset-2 hover:underline"
                    onClick={() => setActive((i) => (i + 1) % autopsies.length)}
                  >
                    Next story
                  </button>
                </div>
                <ul className="mt-4 space-y-3">
                  {item.stages.map((stage) => {
                    const status = stageStatus(stage.tone);
                    return (
                      <li
                        key={stage.name}
                        className="flex items-center justify-between gap-3 border-b border-[#16024A]/10 pb-3 last:border-0 last:pb-0"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-[0.9rem] font-semibold">
                            {stage.name}
                          </p>
                          <p className="mt-0.5 text-[0.75rem] text-[#16024A]/75">
                            {stage.pct}% left · {status.label}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "grid h-8 w-8 shrink-0 place-items-center rounded-full",
                            status.ok ? "bg-[#16024A] text-[#F5E84A]" : "bg-[#16024A] text-white",
                          )}
                          aria-hidden
                        >
                          {status.ok ? (
                            <Check className="h-4 w-4" strokeWidth={3} />
                          ) : (
                            <X className="h-4 w-4" strokeWidth={3} />
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </div>
          </div>

          {/* Right column - activity */}
          <article className="flex flex-col rounded-[1.75rem] border border-[#E7DEFF] bg-[#EEF8F2] p-5 shadow-[0_20px_50px_-40px_rgba(22,2,74,0.35)] mobile-sm:rounded-[2rem] mobile-sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Pick a story
                </p>
                <h3 className="mt-1 font-display text-[1.2rem] font-bold text-mint-ink">
                  Ads, brand, or sales?
                </h3>
              </div>
              <span className="rounded-full bg-white px-2.5 py-1 text-[0.72rem] font-semibold text-mint">
                3 stories
              </span>
            </div>

            <div
              className="mt-5 flex justify-between gap-1"
              role="tablist"
              aria-label="Choose a spending story"
            >
              {autopsies.map((pattern, index) => {
                const on = index === active;
                return (
                  <button
                    key={pattern.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(index)}
                    className={cn(
                      "flex h-11 w-11 flex-col items-center justify-center rounded-full text-[0.72rem] font-semibold transition-colors",
                      on
                        ? "bg-mint-ink text-white shadow-[0_10px_20px_-12px_rgba(22,2,74,0.55)]"
                        : "bg-white text-mint-ink hover:bg-white/80",
                    )}
                  >
                    <span className="text-[0.62rem] uppercase tracking-wide opacity-70">
                      {["01", "02", "03"][index]}
                    </span>
                    <span className="leading-none">{pattern.short}</span>
                  </button>
                );
              })}
              {/* spacer pills for visual rhythm like Mon–Sat */}
              <span
                className="hidden h-11 w-11 items-center justify-center rounded-full bg-white/60 text-[0.72rem] font-semibold text-neutral-400 tablet:flex"
                aria-hidden
              >
                ·
              </span>
              <span
                className="hidden h-11 w-11 items-center justify-center rounded-full bg-white/60 text-[0.72rem] font-semibold text-neutral-400 laptop:flex"
                aria-hidden
              >
                ·
              </span>
            </div>

            <div className="relative mt-5 overflow-hidden rounded-[1.25rem] bg-white p-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                Sales that came back
              </p>
              <p className="mt-1 font-display text-[1.75rem] font-bold leading-none text-mint-ink">
                {formatNaira(closeNaira)}
              </p>
              <svg
                viewBox="0 0 240 64"
                className="mt-3 h-14 w-full"
                aria-hidden
              >
                <defs>
                  <linearGradient id={`${uid}-wave`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B05C4" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#FC3FE3" stopOpacity="0.85" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 48 C 30 48, 40 20, 70 28 S 110 8, 140 22 S 190 50, 240 18"
                  fill="none"
                  stroke={`url(#${uid}-wave)`}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="140" cy="22" r="5" fill="#3B05C4" />
              </svg>
              <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-mint-soft text-mint">
                <CircleDollarSign className="h-4 w-4" aria-hidden />
              </span>
            </div>

            <ul className="mt-4 flex-1 space-y-2.5">
              {item.stages.slice(0, 3).map((stage, index) => {
                const status = stageStatus(stage.tone);
                const pill = status.ok
                  ? "Okay"
                  : status.label === "Dropping off"
                    ? "Dropping"
                    : "Stuck";
                const pillClass =
                  pill === "Okay"
                    ? "bg-[#16024A] text-white"
                    : pill === "Dropping"
                      ? "bg-[#F5E84A] text-[#16024A]"
                      : "bg-white text-mint-ink";
                return (
                  <li
                    key={stage.name}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-white/80 px-3.5 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[0.88rem] font-semibold text-mint-ink">
                        {stage.name}
                      </p>
                      <p className="mt-0.5 text-[0.72rem] text-neutral-600">
                        {stage.pct}% of the {item.spend} is still here
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold",
                        pillClass,
                      )}
                    >
                      {pill}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 text-[0.88rem] font-medium leading-relaxed text-mint-ink">
              {item.verdict}
            </p>
          </article>

          {/* Bottom pattern rows - full width */}
          <div className="laptop:col-span-2">
            <article className="overflow-hidden rounded-[1.5rem] border border-[#E7DEFF] bg-white shadow-[0_18px_40px_-32px_rgba(22,2,74,0.35)] mobile-sm:rounded-[1.75rem]">
              <div className="flex items-center justify-between gap-3 border-b border-[#E7DEFF] px-4 py-3.5 mobile-sm:px-5">
                <h3 className="font-display text-[1.05rem] font-bold text-mint-ink">
                  All three stories
                </h3>
                <p className="text-[0.75rem] font-medium text-neutral-500">
                  Tap one to open it
                </p>
              </div>
              <ul className="divide-y divide-[#E7DEFF]">
                {autopsies.map((pattern, index) => {
                  const end = pattern.stages[pattern.stages.length - 1]!;
                  const on = index === active;
                  const tone =
                    end.pct >= 14 ? "good" : end.pct >= 11 ? "warn" : "bad";
                  return (
                    <li key={pattern.id}>
                      <button
                        type="button"
                        onClick={() => setActive(index)}
                        aria-pressed={on}
                        className={cn(
                          "flex w-full flex-col gap-3 px-4 py-4 text-left transition-colors mobile-sm:px-5 tablet:flex-row tablet:items-center tablet:gap-4",
                          on ? "bg-mint-soft/70" : "hover:bg-neutral-50",
                        )}
                      >
                        <ProgressRing value={end.pct} tone={tone} />
                        <div className="min-w-0 flex-1">
                          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-mint">
                            Story 0{index + 1}
                          </p>
                          <p className="mt-0.5 font-display text-[1.05rem] font-bold text-mint-ink">
                            {pattern.label}
                          </p>
                          <p className="mt-0.5 text-[0.8rem] text-neutral-600">
                            {pattern.spend} · {pattern.spendNote}
                          </p>
                        </div>
                        <div className="hidden items-center gap-4 text-[0.78rem] font-medium text-neutral-600 tablet:flex">
                          {pattern.stages.map((stage) => (
                            <span
                              key={stage.name}
                              className="flex flex-col items-center gap-1"
                              title={stage.name}
                            >
                              <span
                                className={cn(
                                  "h-2 w-2 rounded-full",
                                  stage.tone === "crit"
                                    ? "bg-[#C40404]"
                                    : stage.tone === "warn"
                                      ? "bg-[#C45A05]"
                                      : "bg-mint",
                                )}
                              />
                              <span className="tabular-nums">{stage.pct}%</span>
                            </span>
                          ))}
                        </div>
                        <span
                          className={cn(
                            "inline-flex shrink-0 items-center justify-center rounded-full px-4 py-2 text-[0.8rem] font-semibold",
                            on
                              ? "bg-mint text-white"
                              : "bg-mint-ink text-white hover:bg-mint",
                          )}
                        >
                          Open
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </article>
            <p className="mt-3 text-center text-[0.85rem] leading-relaxed text-neutral-600">
              These naira amounts illustrate what owners saw{" "}
              <span className="font-semibold text-mint-ink">before</span> they worked
              with Xkwisit - so you can recognise the same leak in your own books.
            </p>
          </div>
        </motion.div>
      </Container>

      {/* FOMO - full 98% viewport width (outside Container) */}
      <div className="pb-16 tablet:pb-20">
        <motion.aside
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="relative mx-auto mt-10 w-[98%] overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-mint-soft/80 via-white/50 to-[#E7DEFF]/70 p-4 shadow-[0_28px_60px_-42px_rgba(59,5,196,0.35)] backdrop-blur-xl mobile-sm:rounded-[2.25rem] mobile-sm:p-5 tablet:p-7"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(59,5,196,0.14) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 top-6 h-44 w-44 rounded-full bg-mint/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 bottom-8 h-48 w-48 rounded-full bg-[#FC3FE3]/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/3 h-32 w-56 -translate-x-1/2 rounded-full bg-[#C9BEFF]/30 blur-3xl"
          />

          <div className="relative grid gap-4 laptop:grid-cols-[1.15fr_0.95fr] laptop:gap-5">
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/70 bg-mint/90 px-3.5 py-1.5 font-display text-[0.82rem] font-bold italic tracking-tight text-white shadow-[0_0_24px_rgba(59,5,196,0.45)] backdrop-blur-md">
                  Cost of waiting
                </span>
                <span className="rounded-full border border-white/80 bg-white/55 px-3 py-1 text-[0.72rem] font-semibold text-mint shadow-[0_8px_20px_-14px_rgba(59,5,196,0.4)] backdrop-blur-md">
                  Every week has a price
                </span>
              </div>

              <article className="w-full rounded-[1.6rem] border border-white/70 bg-white/45 p-5 shadow-[0_16px_40px_-24px_rgba(59,5,196,0.35)] backdrop-blur-xl mobile-sm:rounded-[1.85rem] mobile-sm:p-6">
                <h3 className="font-display text-[clamp(1.35rem,3vw,1.85rem)] font-bold leading-[1.15] tracking-tight text-mint-ink">
                  While you “think about it,” the same leak keeps taking money that
                  should have been profit.
                </h3>
                <div className="mt-4 flex items-center justify-between gap-3 text-[0.7rem] font-medium text-neutral-500">
                  <span>Owner · still deciding</span>
                  <span>Today</span>
                </div>
              </article>

              <article className="w-full rounded-[1.6rem] border border-mint/20 bg-mint-soft/55 p-5 shadow-[0_16px_40px_-24px_rgba(59,5,196,0.3)] backdrop-blur-xl mobile-sm:rounded-[1.85rem] mobile-sm:p-6">
                <p className="text-[0.95rem] leading-relaxed text-mint-ink">
                  Your competitors are not waiting for a perfect quarter. They are fixing
                  the page, the follow-up, or the offer - and collecting the buyers you
                  already paid to attract. The naira you spent on ads, brand, or staff
                  does not pause because you are busy. It keeps leaving. Quietly. Every
                  Monday.
                </p>
                <div className="mt-4 flex items-center justify-between gap-3 text-[0.7rem] font-medium text-neutral-500">
                  <span>Market · meanwhile</span>
                  <span>Every Monday</span>
                </div>
              </article>

              <article className="flex w-full min-w-0 flex-col gap-4 rounded-[1.6rem] border border-white/70 bg-white/40 p-4 shadow-[0_16px_40px_-24px_rgba(59,5,196,0.28)] backdrop-blur-xl mobile-sm:rounded-[1.85rem] mobile-sm:p-5 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-3">
                <p className="min-w-0 text-[0.88rem] font-medium leading-snug text-mint-ink mobile-sm:text-[0.9rem] tablet:max-w-sm">
                  The owners in these stories stopped guessing. They found the break.
                  Then they stopped bleeding.
                </p>
                <Link
                  href={ROUTES.growthAssessment}
                  className={cn(
                    buttonVariants({ variant: "contained", size: "lg" }),
                    "inline-flex min-h-11 w-full shrink-0 !rounded-full border-0 !bg-mint px-5 !text-white shadow-[0_12px_28px_-12px_rgba(59,5,196,0.65)] hover:!bg-mint-deep tablet:w-auto tablet:px-6",
                  )}
                >
                  Stop the leak this week
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            </div>

            <div className="w-full rounded-[1.75rem] border border-white/60 bg-white/30 p-3.5 shadow-[0_20px_48px_-28px_rgba(59,5,196,0.4)] backdrop-blur-2xl mobile-sm:rounded-[2rem] mobile-sm:p-4">
              <div className="mb-3 flex items-center justify-between gap-2 px-1">
                <p className="font-display text-[0.95rem] font-bold italic text-mint-ink">
                  What keeps walking out
                </p>
                <span className="rounded-full border border-white/80 bg-white/60 px-2.5 py-1 text-[0.68rem] font-semibold text-mint backdrop-blur-md">
                  4 truths
                </span>
              </div>

              <ul className="space-y-3">
                {[
                  {
                    title: "Money already spent",
                    body: "Does not come back on its own. Fix the break, or keep writing it off.",
                    tag: "Spend",
                  },
                  {
                    title: "Buyers already interested",
                    body: "Will buy from whoever answers first. Silence is a gift to someone else.",
                    tag: "Demand",
                  },
                  {
                    title: "Attention you already paid for",
                    body: "Ads brought eyes. If the page or reply is weak, that attention walks to a competitor.",
                    tag: "Attention",
                  },
                  {
                    title: "Another 90 days",
                    body: "Of the same spend pattern is another 90 days of profit walking out.",
                    tag: "Time",
                  },
                ].map((point) => (
                  <li
                    key={point.title}
                    className="w-full rounded-[1.35rem] border border-white/70 bg-white/50 p-4 shadow-[0_12px_28px_-20px_rgba(59,5,196,0.35)] backdrop-blur-xl"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display text-[1.02rem] font-bold text-mint-ink">
                        {point.title}
                      </p>
                      <span className="shrink-0 rounded-full border border-mint/15 bg-mint-soft/80 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-mint backdrop-blur-sm">
                        {point.tag}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-neutral-700">
                      {point.body}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[0.65rem] font-medium text-neutral-500">
                      <span>Still happening</span>
                      <span>Now</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
