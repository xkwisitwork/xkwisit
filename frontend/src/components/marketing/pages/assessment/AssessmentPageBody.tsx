"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Gauge,
  Hourglass,
  MessageSquare,
} from "lucide-react";

import { PageFaq, PageSection } from "@/components/marketing/pages/shared";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

const bounce = { type: "spring" as const, stiffness: 380, damping: 16, mass: 0.7 };

const honesty = [
  {
    t: "Our reading, not a lab certificate",
    b: "Scores are a desk opinion shaped by what you share — useful, not absolute.",
    tone: "pink" as const,
    art: "gauge",
  },
  {
    t: "Shape first, depth later",
    b: "A quick scan shows the silhouette. Live calls dig into the rooms that matter.",
    tone: "lime" as const,
    art: "chat",
  },
  {
    t: "Name one problem",
    b: "The point is the constraint you can act on Monday — not a vanity grade.",
    tone: "sky" as const,
    art: "check",
  },
] as const;

const after = [
  {
    t: "You get a short note",
    b: "The weak area and a first move in plain language — shareable with your team.",
    tone: "lavender" as const,
    art: "note",
    span: "wide" as const,
  },
  {
    t: "You can book",
    b: "If you want us in the room, pick a 30-minute slot.",
    tone: "mint" as const,
    art: "book",
    span: "half" as const,
    href: ROUTES.book,
    cta: "Book a strategy call",
  },
  {
    t: "You can wait",
    b: "Use the note on Monday with your own team first. No pressure drip.",
    tone: "peach" as const,
    art: "spark",
    span: "half" as const,
  },
] as const;

const faqs = [
  {
    q: "Is it really free?",
    a: "Yes. The assessment and X-Ray are free doors. Paid work starts only after you choose a block.",
  },
  {
    q: "How long does it take?",
    a: "X-Ray is minutes. Full assessment is about ten minutes if you answer honestly.",
  },
  {
    q: "Will you spam me?",
    a: "We send the reading and a calm follow-up. No daily drip of “just checking in.”",
  },
] as const;

const toneBg: Record<string, string> = {
  pink: "bg-gradient-to-br from-[#FFE4F1] via-[#FFD6EC] to-[#FFC8E4]",
  lime: "bg-gradient-to-br from-[#E8FBC8] via-[#DCF5A8] to-[#CFE98A]",
  sky: "bg-gradient-to-br from-[#D9F0FF] via-[#C5E6FF] to-[#B0DBFF]",
  lavender: "bg-gradient-to-br from-[#EDE4FF] via-[#E0D4FF] to-[#D2C4FF]",
  mint: "bg-gradient-to-br from-[#D9F7EF] via-[#C4F0E4] to-[#AEE8D8]",
  peach: "bg-gradient-to-br from-[#FFE8D9] via-[#FFDCC6] to-[#FFD0B3]",
};

function BentoArt({ kind }: { kind: string }) {
  if (kind === "gauge") {
    return (
      <div className="relative mx-auto mt-6 flex h-28 w-full max-w-[180px] items-end justify-center">
        <div className="absolute inset-x-6 bottom-0 h-20 rounded-t-[2rem] bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" />
        <div className="relative z-[1] mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_12px_28px_-12px_rgba(22,2,74,0.35)]">
          <Gauge className="h-7 w-7 text-mint" strokeWidth={1.75} />
        </div>
        <span className="absolute right-8 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F5C542] text-white shadow-md">
          <BadgeCheck className="h-4 w-4" />
        </span>
      </div>
    );
  }

  if (kind === "chat") {
    return (
      <div className="relative mx-auto mt-5 flex h-28 w-full max-w-[200px] items-end justify-center gap-2">
        <div className="h-[88%] w-[42%] rounded-[1.1rem] border border-white/80 bg-white/85 p-2 shadow-[0_14px_30px_-16px_rgba(22,2,74,0.4)]">
          <div className="mb-2 h-1.5 w-8 rounded-full bg-neutral-200" />
          <div className="space-y-1.5">
            <div className="h-5 w-[85%] rounded-lg bg-[#E8FBC8]" />
            <div className="ml-auto h-5 w-[70%] rounded-lg bg-mint/20" />
            <div className="h-5 w-[60%] rounded-lg bg-[#E8FBC8]" />
          </div>
        </div>
        <div className="h-full w-[48%] rounded-[1.2rem] border border-white/80 bg-white p-2.5 shadow-[0_18px_36px_-16px_rgba(22,2,74,0.45)]">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="h-4 w-4 rounded-full bg-mint/30" />
            <span className="h-1.5 w-10 rounded-full bg-neutral-200" />
          </div>
          <div className="space-y-1.5">
            <div className="h-4 w-full rounded-md bg-mint-soft" />
            <div className="h-4 w-[80%] rounded-md bg-mint-soft" />
            <div className="mt-2 flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5 text-mint" />
              <span className="h-1.5 w-12 rounded-full bg-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "check") {
    return (
      <div className="relative mx-auto mt-6 flex h-28 w-full max-w-[200px] flex-col items-center justify-end gap-2 pb-1">
        <div className="w-full space-y-2 rounded-2xl bg-white/80 p-3 shadow-[0_14px_30px_-18px_rgba(22,2,74,0.35)]">
          <div className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#FC3FE3]" />
            <span className="h-1.5 flex-1 rounded-full bg-neutral-200" />
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-mint" />
            <span className="h-1.5 flex-1 rounded-full bg-neutral-200" />
          </div>
        </div>
        <span className="absolute -right-1 top-2 inline-flex items-center gap-1 rounded-full bg-mint-ink px-3 py-1.5 text-[0.65rem] font-semibold text-white shadow-lg">
          Name it
          <BadgeCheck className="h-3.5 w-3.5 text-[#E8FBC8]" />
        </span>
      </div>
    );
  }

  if (kind === "note") {
    return (
      <div className="relative flex h-full min-h-[140px] flex-wrap content-center items-center justify-end gap-2 p-2 tablet:min-h-0">
        {["Weak loop", "First move", "Owner", "Monday", "Shareable"].map(
          (label, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...bounce, delay: 0.05 * i }}
              className="rounded-full bg-white/90 px-3 py-1.5 text-[0.72rem] font-semibold text-mint-ink shadow-[0_8px_20px_-12px_rgba(22,2,74,0.35)]"
            >
              {label}
            </motion.span>
          ),
        )}
      </div>
    );
  }

  if (kind === "book") {
    return (
      <div className="relative mx-auto mt-4 flex h-24 w-full max-w-[160px] items-center justify-center">
        <div className="absolute inset-x-4 top-2 h-16 rounded-2xl bg-white/70" />
        <div className="relative z-[1] flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_14px_28px_-12px_rgba(22,2,74,0.4)]">
          <CalendarDays className="h-6 w-6 text-mint" strokeWidth={1.75} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto mt-4 flex h-24 w-full max-w-[160px] items-center justify-center">
      <div className="absolute h-16 w-16 rounded-full bg-white/50 blur-sm" />
      <div className="relative z-[1] flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_14px_28px_-12px_rgba(22,2,74,0.4)]">
        <Hourglass className="h-6 w-6 text-[#FC3FE3]" strokeWidth={1.75} />
      </div>
    </div>
  );
}

function BentoCard({
  tone,
  title,
  body,
  art,
  index,
  wide,
  className,
  children,
}: {
  tone: string;
  title: string;
  body: string;
  art: string;
  index: number;
  wide?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 22, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ ...bounce, delay: index * 0.07 }}
      whileHover={reduce ? undefined : { y: -6, scale: 1.015 }}
      className={cn(
        "relative flex min-h-[240px] overflow-hidden rounded-[1.75rem] p-5 shadow-[0_22px_50px_-28px_rgba(22,2,74,0.28),inset_0_1px_0_rgba(255,255,255,0.65)] mobile-sm:p-6 tablet:min-h-[280px]",
        wide
          ? "flex-col tablet:min-h-[220px] tablet:flex-row tablet:items-center tablet:gap-6"
          : "flex-col",
        toneBg[tone],
        className,
      )}
    >
      <div className={cn("relative z-[1]", wide ? "max-w-md shrink-0" : "max-w-[18rem]")}>
        <p className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-mint-ink/55">
          0{index + 1}
        </p>
        <h3 className="mt-2 font-display text-[1.2rem] font-bold leading-snug tracking-tight text-mint-ink mobile-sm:text-[1.35rem]">
          {title}
        </h3>
        <p className="mt-2 text-[0.88rem] leading-relaxed text-mint-ink/70">
          {body}
        </p>
        {children}
      </div>
      <div
        className={cn(
          "relative z-[1] pt-2",
          wide ? "mt-4 min-w-0 flex-1 tablet:mt-0" : "mt-auto",
        )}
      >
        <BentoArt kind={art} />
      </div>
    </motion.article>
  );
}

export function AssessmentPageBody() {
  return (
    <>
      <PageSection
        tone="soft"
        eyebrow="Honesty"
        title="How to read your score."
        description="Three plain rules so the number doesn’t get mistaken for a verdict."
      >
        <div className="grid gap-4 tablet:grid-cols-3 tablet:gap-5">
          {honesty.map((item, index) => (
            <BentoCard
              key={item.t}
              tone={item.tone}
              title={item.t}
              body={item.b}
              art={item.art}
              index={index}
            />
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="After submit"
        title="What happens next."
        description="A short note lands. Then you choose the pace — book, or run Monday yourself."
      >
        <div className="grid gap-4 tablet:grid-cols-2 tablet:gap-5">
          {after.map((item, index) => (
            <BentoCard
              key={item.t}
              tone={item.tone}
              title={item.t}
              body={item.b}
              art={item.art}
              index={index}
              wide={item.span === "wide"}
              className={item.span === "wide" ? "tablet:col-span-2" : undefined}
            >
              {"href" in item && item.href ? (
                <Link
                  href={item.href}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-mint-ink px-4 py-2.5 text-[0.8rem] font-semibold text-white shadow-[0_12px_28px_-14px_rgba(22,2,74,0.55)] transition hover:bg-mint"
                >
                  {item.cta}
                  <BookOpen className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </BentoCard>
          ))}
        </div>
      </PageSection>

      <PageFaq title="Assessment questions" items={faqs} />
      <SolteraCloser
        title="Prefer the short door?"
        body="Paste a website for a live X-Ray, or book thirty minutes if you want us in the room."
        primaryHref={ROUTES.businessXray}
        primaryLabel="Run a Business X-Ray"
        secondaryHref={ROUTES.book}
        secondaryLabel="Book a strategy call"
      />
    </>
  );
}
