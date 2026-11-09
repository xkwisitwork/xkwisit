"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Ban,
  Bot,
  Check,
  GitBranch,
  Inbox,
  MessageSquare,
  Plug,
  Radio,
  Settings2,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import { Reveal } from "@/components/marketing/motion/Reveal";
import type { ServiceFitNote } from "@/config/services";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

/** Serializable slice only — never pass Lucide icons across the RSC boundary. */
export type CrmAutomationStudioProps = {
  currency: "NGN" | "USD";
  startingFrom: number;
  deliverables: readonly string[];
  goodFor: readonly ServiceFitNote[];
  notFor: readonly ServiceFitNote[];
  outcomes: readonly string[];
  idealFor: readonly string[];
  tagline: string;
  name: string;
};

const systemStrip = [
  "Maps to one desk owner",
  "Reports into one Monday number",
  "Hands back a ritual your team can keep",
  "Lifecycle sequences that run without heroics",
] as const;

const stageBoard = [
  { label: "New", count: 42, tone: "bg-[#EEF4FF] text-[#2B5BFF]" },
  { label: "Qualified", count: 28, tone: "bg-[#F3ECFF] text-[#6B2FFF]" },
  { label: "Demo", count: 11, tone: "bg-[#FFF0FB] text-[#C412B0]" },
  { label: "Won", count: 7, tone: "bg-mint-soft text-mint" },
] as const;

const deliverableIcons = [
  Settings2,
  GitBranch,
  Inbox,
  MessageSquare,
  Plug,
  Users,
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, rotateX: 8 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 340, damping: 26 },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative px-4 tablet:px-6 laptop:px-8", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

function FloatingOrb({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
      animate={
        reduce
          ? undefined
          : {
              y: [0, -22, 0],
              x: [0, 14, 0],
              scale: [1, 1.12, 1],
            }
      }
      transition={{ duration: 6.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function SparkTrail({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={cn("pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-mint", className)}
      animate={
        reduce
          ? undefined
          : {
              y: [0, -40, -80],
              x: [0, 12, -8],
              opacity: [0, 1, 0],
              scale: [0.6, 1.2, 0.4],
            }
      }
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

export function CrmAutomationStudio({
  currency,
  startingFrom,
  deliverables,
  goodFor,
  notFor,
  outcomes,
  idealFor,
  tagline,
  name,
}: CrmAutomationStudioProps) {
  const reduce = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);
  const [pulse, setPulse] = useState(true);

  const price = useMemo(
    () =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(startingFrom),
    [currency, startingFrom],
  );

  return (
    <div className="overflow-hidden bg-white text-[#16024A]">
      {/* Marquee — light strip */}
      <div className="relative overflow-hidden border-y border-[#ECEAF2] bg-white py-4">
        <FloatingOrb className="-left-8 top-0 h-20 w-20 bg-mint/20" />
        <FloatingOrb className="right-10 -bottom-6 h-16 w-16 bg-[#FC3FE3]/15" delay={1} />
        <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-hidden px-4 tablet:px-6">
          <motion.span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint-soft text-mint"
            animate={reduce ? undefined : { rotate: [0, 15, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
          </motion.span>
          <motion.div
            className="flex min-w-max gap-10 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#5C5478]"
            animate={reduce ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            {[...systemStrip, ...systemStrip].map((line, i) => (
              <span key={`${line}-${i}`} className="inline-flex items-center gap-10">
                {line}
                <motion.span
                  className="text-mint"
                  animate={reduce ? undefined : { scale: [1, 1.35, 1], rotate: [0, 90, 180] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: (i % 4) * 0.2 }}
                >
                  ◆
                </motion.span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Value bento */}
      <Section className="py-14 tablet:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              className="inline-flex items-center gap-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mint"
              animate={reduce ? undefined : { y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Pipeline studio · draft
            </motion.p>
            <h2 className="mt-3 text-balance font-display text-[clamp(1.65rem,3.4vw,2.5rem)] font-bold leading-[1.12] tracking-tight">
              See how CRM & automation bring value to the Monday number
            </h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-[0.95rem] leading-[1.7] text-[#5C5478]">
              {tagline} Built for {idealFor.join(", ").toLowerCase()} — not another
              spreadsheet that dies in Drive.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="mt-10 grid gap-4 tablet:grid-cols-2 laptop:grid-cols-[1.05fr_0.95fr]"
          variants={reduce ? undefined : stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{ perspective: 1200 }}
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <motion.article
              whileHover={reduce ? undefined : { y: -8, scale: 1.015, rotateX: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative overflow-hidden rounded-[1.5rem] border border-[#ECEAF2] bg-white p-5 shadow-[0_18px_48px_-36px_rgba(22,2,74,0.28)] tablet:p-6"
            >
              <SparkTrail className="left-8 top-10" />
              <SparkTrail className="right-12 top-16" />
              <div className="mb-4 flex items-center gap-2">
                <motion.span
                  className="grid h-9 w-9 place-items-center rounded-full bg-mint text-white"
                  animate={reduce ? undefined : { rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <Workflow className="h-4 w-4" aria-hidden />
                </motion.span>
                <h3 className="font-display text-[1.1rem] font-bold">Control the pipe</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stageBoard.map((stage, index) => (
                  <motion.button
                    key={stage.label}
                    type="button"
                    onClick={() => setActiveStage(index)}
                    whileHover={reduce ? undefined : { scale: 1.04, y: -2 }}
                    whileTap={reduce ? undefined : { scale: 0.96 }}
                    className={cn(
                      "rounded-[1.1rem] p-3.5 text-left transition-shadow",
                      stage.tone,
                      activeStage === index &&
                        "ring-2 ring-mint shadow-[0_12px_28px_-18px_rgba(59,5,196,0.45)]",
                    )}
                  >
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] opacity-70">
                      {stage.label}
                    </p>
                    <motion.p
                      key={`${stage.label}-${pulse}-${activeStage === index}`}
                      initial={reduce ? false : { scale: 0.85, opacity: 0.4 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-1 font-display text-[1.55rem] font-bold tabular-nums"
                    >
                      {stage.count}
                    </motion.p>
                  </motion.button>
                ))}
              </div>
            </motion.article>

            <motion.article
              variants={fadeUp}
              whileHover={reduce ? undefined : { y: -8, scale: 1.01 }}
              className="relative overflow-hidden rounded-[1.5rem] border border-[#ECEAF2] bg-white p-5 shadow-[0_18px_48px_-36px_rgba(22,2,74,0.22)] tablet:p-6"
            >
              <FloatingOrb className="-right-10 -top-10 h-28 w-28 bg-mint/15" delay={0.4} />
              <div className="relative flex items-center justify-between gap-3">
                <h3 className="font-display text-[1.1rem] font-bold">
                  Stay connected with events
                </h3>
                <motion.span
                  animate={reduce ? undefined : { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <Radio className="h-4 w-4 text-mint" aria-hidden />
                </motion.span>
              </div>
              <p className="relative mt-2 text-[0.88rem] leading-relaxed text-[#5C5478]">
                Lead capture, routing, and lifecycle pings that fire without waiting
                on a heroic rep.
              </p>
              <motion.div
                className="relative mt-5 rounded-[1.15rem] bg-mint p-4 text-white"
                animate={
                  reduce
                    ? undefined
                    : {
                        boxShadow: [
                          "0 0 0 0 rgba(59,5,196,0.35)",
                          "0 0 0 14px rgba(59,5,196,0)",
                          "0 0 0 0 rgba(59,5,196,0)",
                        ],
                      }
                }
                transition={{ duration: 2.2, repeat: Infinity }}
                whileHover={reduce ? undefined : { scale: 1.02 }}
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/80">
                  Live sequence
                </p>
                <p className="mt-1 font-display text-[1.05rem] font-bold">
                  WhatsApp + email follow-up · Stage: Qualified
                </p>
              </motion.div>
            </motion.article>
          </motion.div>

          <motion.article
            variants={fadeUp}
            whileHover={reduce ? undefined : { y: -10, rotateY: -2 }}
            className="relative overflow-hidden rounded-[1.5rem] border border-[#ECEAF2] bg-white p-5 shadow-[0_22px_56px_-40px_rgba(22,2,74,0.3)] tablet:p-6"
          >
            <FloatingOrb className="-right-8 -top-8 h-40 w-40 bg-mint/12" delay={1} />
            <FloatingOrb className="-bottom-12 left-6 h-28 w-28 bg-[#FC3FE3]/10" delay={1.6} />
            <div className="relative flex items-center gap-2">
              <motion.span
                className="grid h-9 w-9 place-items-center rounded-full bg-mint-soft text-mint"
                animate={reduce ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 2.6, repeat: Infinity }}
              >
                <Bot className="h-4 w-4" aria-hidden />
              </motion.span>
              <h3 className="font-display text-[1.1rem] font-bold">
                Futuristic and clean ops layer
              </h3>
            </div>
            <p className="relative mt-3 text-[0.9rem] leading-[1.7] text-[#5C5478]">
              {goodFor[0]?.body}
            </p>
            <div className="relative mt-6 overflow-hidden rounded-[1.25rem] border border-[#ECEAF2] bg-[#FAFAFC] p-4">
              <div className="flex items-center justify-between text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#8B849E]">
                <span>Inbox · Automations</span>
                <button
                  type="button"
                  onClick={() => setPulse((v) => !v)}
                  className="rounded-full bg-mint/10 px-2.5 py-1 text-mint"
                >
                  {pulse ? "Pause" : "Run"}
                </button>
              </div>
              <div className="mt-4 space-y-2.5">
                {[
                  "Lead captured → assign owner",
                  "No reply 24h → nudge",
                  "Demo booked → stage flip",
                ].map((row, i) => (
                  <motion.div
                    key={row}
                    className="flex items-center gap-3 rounded-xl border border-[#ECEAF2] bg-white px-3 py-2.5 shadow-sm"
                    animate={
                      reduce || !pulse
                        ? undefined
                        : {
                            x: [0, 6, 0],
                            boxShadow: [
                              "0 1px 2px rgba(22,2,74,0.04)",
                              "0 8px 20px rgba(59,5,196,0.12)",
                              "0 1px 2px rgba(22,2,74,0.04)",
                            ],
                          }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.32,
                    }}
                  >
                    <motion.span
                      animate={
                        reduce || !pulse
                          ? undefined
                          : { rotate: [0, 20, -10, 0], scale: [1, 1.2, 1] }
                      }
                      transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.32 }}
                    >
                      <Zap className="h-3.5 w-3.5 text-mint" aria-hidden />
                    </motion.span>
                    <span className="text-[0.82rem] font-semibold text-[#16024A]">{row}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <Link
              href={ROUTES.book}
              className="relative mt-5 inline-flex items-center gap-2 text-[0.84rem] font-semibold text-mint"
            >
              Book this engagement
              <motion.span
                animate={reduce ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </motion.span>
            </Link>
          </motion.article>
        </motion.div>
      </Section>

      {/* Dashboard preview — white glass */}
      <Section className="pb-6 tablet:pb-10">
        <Reveal>
          <div className="mb-8 flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
            <div className="max-w-2xl">
              <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mint">
                Scoreboard
              </p>
              <h2 className="mt-2 text-balance font-display text-[clamp(1.55rem,3vw,2.25rem)] font-bold leading-[1.12]">
                Sleek customized pipeline data
              </h2>
              <p className="mt-3 text-[0.95rem] leading-[1.7] text-[#5C5478]">
                Starting from {price}. One 90-day block to install stages, routing,
                and visibility leadership can trust.
              </p>
            </div>
          </div>
        </Reveal>

        <motion.div
          className="relative overflow-hidden rounded-[1.75rem] border border-[#ECEAF2] bg-white p-4 shadow-[0_28px_70px_-48px_rgba(22,2,74,0.28)] tablet:p-6"
          initial={reduce ? false : { opacity: 0, y: 48, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
        >
          <FloatingOrb className="right-8 top-4 h-36 w-36 bg-mint/15" delay={0.5} />
          <FloatingOrb className="-left-8 bottom-8 h-28 w-28 bg-[#FC3FE3]/10" delay={1.1} />

          <div className="relative grid gap-3 mobile-lg:grid-cols-2 laptop:grid-cols-4">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome}
                className="rounded-[1.15rem] border border-[#ECEAF2] bg-[#FAFAFC] p-4"
                whileHover={
                  reduce
                    ? undefined
                    : { y: -8, scale: 1.03, borderColor: "rgba(59,5,196,0.35)" }
                }
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
              >
                <motion.p
                  className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-mint"
                  animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.2 }}
                >
                  Outcome 0{index + 1}
                </motion.p>
                <p className="mt-2 font-display text-[0.98rem] font-bold leading-snug text-[#16024A]">
                  {outcome}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="relative mt-4 grid gap-4 laptop:grid-cols-[1.4fr_0.8fr]">
            <div className="rounded-[1.25rem] border border-[#ECEAF2] bg-[#FAFAFC] p-4 tablet:p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-display text-[1rem] font-bold">Sales overview</p>
                <span className="text-[0.72rem] text-[#8B849E]">Draft · {name}</span>
              </div>
              <div className="flex h-40 items-end gap-2 tablet:h-48 tablet:gap-3">
                {[42, 58, 36, 74, 62, 88, 70, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    className="relative flex-1 origin-bottom rounded-t-lg bg-gradient-to-t from-mint to-[#8B6CFF]"
                    initial={reduce ? false : { height: "8%", scaleY: 0.4 }}
                    whileInView={{ height: `${h}%`, scaleY: 1 }}
                    viewport={{ once: true }}
                    whileHover={reduce ? undefined : { scaleY: 1.06 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 16,
                      delay: i * 0.06,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-[#ECEAF2] bg-[#FAFAFC] p-4 tablet:p-5">
              <p className="font-display text-[1rem] font-bold">Active stage</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? undefined : { opacity: 0, y: -10, filter: "blur(4px)" }}
                  className="mt-4"
                >
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-mint">
                    {stageBoard[activeStage]?.label}
                  </p>
                  <motion.p
                    className="mt-2 font-display text-[2rem] font-bold tabular-nums"
                    animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  >
                    {stageBoard[activeStage]?.count}
                  </motion.p>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-[#5C5478]">
                    Owners, SLAs, and nudges for this stage — installed with the CRM
                    block.
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-5 space-y-3">
                {["Routing health", "Reply SLA"].map((label, i) => (
                  <div key={label}>
                    <div className="mb-1.5 flex justify-between text-[0.72rem] text-[#8B849E]">
                      <span>{label}</span>
                      <span>{i === 0 ? "92%" : "4h"}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#ECEAF2]">
                      <motion.div
                        className="h-full rounded-full bg-mint"
                        initial={reduce ? false : { width: "0%" }}
                        whileInView={{ width: i === 0 ? "92%" : "78%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.15, delay: 0.15, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Deliverables — white cards, mint accents */}
      <Section className="py-14 tablet:py-20">
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mint">
              Deliverables
            </p>
            <h2 className="mt-2 text-balance font-display text-[clamp(1.55rem,3vw,2.2rem)] font-bold leading-[1.12]">
              Written work your ops desk can run
            </h2>
          </div>
        </Reveal>

        <motion.div
          className="grid gap-3 mobile-lg:grid-cols-2 laptop:grid-cols-3"
          variants={reduce ? undefined : stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          style={{ perspective: 1000 }}
        >
          {deliverables.map((item, index) => {
            const Icon = deliverableIcons[index % deliverableIcons.length]!;
            return (
              <motion.article
                key={item}
                variants={fadeUp}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -12,
                        rotate: index % 2 === 0 ? -1.2 : 1.2,
                        scale: 1.03,
                        boxShadow: "0 28px 50px -32px rgba(59,5,196,0.35)",
                      }
                }
                transition={{ type: "spring", stiffness: 380, damping: 16 }}
                className="group relative overflow-hidden rounded-[1.35rem] border border-[#ECEAF2] bg-white p-5 shadow-[0_14px_36px_-30px_rgba(22,2,74,0.22)]"
              >
                <motion.span
                  aria-hidden
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-mint/15 blur-2xl"
                  animate={
                    reduce
                      ? undefined
                      : { scale: [1, 1.35, 1], opacity: [0.3, 0.65, 0.3] }
                  }
                  transition={{ duration: 3.6, repeat: Infinity, delay: index * 0.18 }}
                />
                <motion.span
                  className="relative grid h-11 w-11 place-items-center rounded-[0.95rem] bg-mint-soft text-mint transition-colors group-hover:bg-mint group-hover:text-white"
                  whileHover={reduce ? undefined : { rotate: 12, scale: 1.08 }}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </motion.span>
                <p className="relative mt-1 font-mono text-[0.68rem] text-[#A39BB8]">
                  /crm/{String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="relative mt-3 font-display text-[1.05rem] font-bold leading-snug text-[#16024A]">
                  {item}
                </h3>
              </motion.article>
            );
          })}
        </motion.div>
      </Section>

      {/* Good fit / skip */}
      <Section className="pb-14 tablet:pb-20">
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mint">
              Fit
            </p>
            <h2 className="mt-2 text-balance font-display text-[clamp(1.55rem,3vw,2.2rem)] font-bold leading-[1.12]">
              Good fit when CRM is the stuck part
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-3 tablet:grid-cols-2">
          {goodFor.map((note, index) => (
            <motion.article
              key={note.title}
              initial={reduce ? false : { opacity: 0, y: 28, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 300 }}
              whileHover={reduce ? undefined : { y: -8, scale: 1.015 }}
              className="rounded-[1.35rem] border border-[#ECEAF2] bg-white p-5 shadow-[0_12px_32px_-28px_rgba(22,2,74,0.2)] tablet:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <motion.span
                  className="grid h-11 w-11 place-items-center rounded-[0.95rem] bg-mint-soft font-mono text-[0.72rem] font-bold text-mint"
                  whileHover={reduce ? undefined : { rotate: -8, scale: 1.08 }}
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#F5F4F8] text-[#8B849E]">
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </div>
              <h3 className="mt-4 font-display text-[1.1rem] font-bold leading-snug">
                {note.title}
              </h3>
              <p className="mt-3 text-[0.9rem] leading-[1.7] text-[#5C5478]">{note.body}</p>
            </motion.article>
          ))}

          {notFor.map((note) => (
            <motion.article
              key={note.title}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="rounded-[1.35rem] border border-dashed border-[#E2DEEA] bg-[#FAFAFC] p-5 tablet:p-6"
            >
              <div className="flex items-center gap-2 text-mint">
                <Ban className="h-4 w-4" aria-hidden />
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]">
                  Skip if
                </p>
              </div>
              <h3 className="mt-4 font-display text-[1.1rem] font-bold leading-snug">
                {note.title}
              </h3>
              <p className="mt-3 text-[0.9rem] leading-[1.7] text-[#5C5478]">{note.body}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* Outcomes band — light */}
      <Section className="pb-14 tablet:pb-16">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-[#ECEAF2] bg-[#FAFAFC] px-5 py-10 tablet:px-8 tablet:py-12">
          <FloatingOrb className="-right-6 top-0 h-32 w-32 bg-mint/15" />
          <FloatingOrb className="left-10 -bottom-10 h-24 w-24 bg-[#FC3FE3]/10" delay={0.8} />
          <Reveal>
            <h2 className="relative max-w-xl text-balance font-display text-[clamp(1.45rem,2.8vw,2rem)] font-bold leading-[1.15]">
              What our clients protect on the scoreboard
            </h2>
          </Reveal>
          <motion.div
            className="relative mt-8 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            initial={reduce ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {outcomes.map((outcome, index) => (
              <motion.blockquote
                key={outcome}
                className="min-w-[16.5rem] max-w-[18rem] shrink-0 rounded-[1.25rem] border border-[#ECEAF2] bg-white p-5 shadow-[0_12px_28px_-24px_rgba(22,2,74,0.2)]"
                whileHover={
                  reduce
                    ? undefined
                    : { y: -10, rotate: index % 2 ? 1.5 : -1.5, scale: 1.03 }
                }
                transition={{ type: "spring", stiffness: 360, damping: 16 }}
              >
                <motion.span
                  animate={reduce ? undefined : { scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.25 }}
                  className="inline-flex"
                >
                  <Check className="h-4 w-4 text-mint" aria-hidden />
                </motion.span>
                <p className="mt-3 font-display text-[1.02rem] font-bold leading-snug text-[#16024A]">
                  “{outcome}”
                </p>
                <p className="mt-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#8B849E]">
                  Ideal for · {idealFor[index % idealFor.length]}
                </p>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Final CTA — mint primary, not dark wash */}
      <Section className="pb-16 tablet:pb-20">
        <motion.div
          className="relative overflow-hidden rounded-[1.75rem] border border-mint/20 bg-mint p-6 text-white shadow-[0_28px_60px_-36px_rgba(59,5,196,0.55)] tablet:p-10"
          whileInView={
            reduce
              ? undefined
              : { scale: [0.97, 1.01, 1], rotate: [0, -0.4, 0] }
          }
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
        >
          <FloatingOrb className="-left-10 bottom-0 h-40 w-40 bg-white/25" />
          <FloatingOrb className="-right-8 top-0 h-32 w-32 bg-[#FC3FE3]/25" delay={1.2} />
          <SparkTrail className="left-1/3 top-8" />
          <SparkTrail className="right-1/4 bottom-10" />
          <div className="relative flex flex-col gap-6 tablet:flex-row tablet:items-center tablet:justify-between">
            <div className="max-w-xl">
              <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/75">
                Ready when the pipe is busy
              </p>
              <h2 className="mt-2 text-balance font-display text-[clamp(1.45rem,3vw,2.1rem)] font-bold leading-[1.12]">
                Install CRM & automation that sales can run
              </h2>
              <p className="mt-3 text-[0.95rem] leading-[1.7] text-white/85">
                From {price}. One Monday number. Stages, routing, and lifecycle sequences
                your team keeps after the block.
              </p>
            </div>
            <motion.div whileHover={reduce ? undefined : { scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={ROUTES.book}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[0.88rem] font-bold text-mint shadow-lg hover:bg-white/95"
              >
                Book a strategy call
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
