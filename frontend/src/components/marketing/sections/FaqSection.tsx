"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  type LucideIcon,
  Banknote,
  CalendarCheck,
  Clock,
  Compass,
  Handshake,
  KeyRound,
  ScanSearch,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { ROUTES, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

type Tone = "blue" | "vivid" | "magenta" | "red" | "ink" | "wash";

const faqs: readonly {
  q: string;
  a: string;
  tone: Tone;
  Icon: LucideIcon;
  points: readonly [string, string];
}[] = [
  {
    q: `What exactly does ${siteConfig.name} do?`,
    a: "We help businesses get more customers and more sales. First we find what is stuck (brand, website, ads, WhatsApp follow-up, or the product). Then we fix that part. We do not start by selling you more ads for the sake of it.",
    tone: "blue",
    Icon: Compass,
    points: ["Find what is stuck", "Fix that before more spend"],
  },
  {
    q: "How much does it cost to start?",
    a: "Published work starts from a clear minimum fee in naira. You hire us for a set period of work (90 days), not an open-ended mystery subscription. Exact scope and price are confirmed on the call after we know your problem.",
    tone: "ink",
    Icon: Banknote,
    points: ["Clear minimum to start", "Set days of work"],
  },
  {
    q: "How long before I see results?",
    a: "It depends on what is stuck. Follow-up fixes can move in days. Brand, website, or ads usually need a few weeks of focused work. We set one main problem for the period and show progress every Monday. We do not promise overnight miracles.",
    tone: "magenta",
    Icon: Clock,
    points: ["Depends on the stuck part", "Monday progress updates"],
  },
  {
    q: "Is the Growth Assessment or Business X-Ray really free?",
    a: "Yes. Both are free. The Assessment is a set of questions about your business. The X-Ray only needs your website. You get a clear read of weak spots. The scores are our reading of your answers or public site, not a lab test and not a guarantee of results.",
    tone: "vivid",
    Icon: ScanSearch,
    points: ["Both checks are free", "No fake lab promises"],
  },
  {
    q: "What do I get after I hire you?",
    a: "A private login where you see the work, leads, approvals, invoices, and what comes next. Our team works from the same place, so you are not chasing updates across WhatsApp, email, and PDFs.",
    tone: "red",
    Icon: KeyRound,
    points: ["Private client login", "Work and money in one place"],
  },
  {
    q: "Can you work with my current staff or freelancers?",
    a: "Yes. We often sit beside your marketer, sales person, or developer. We name one problem, put one owner on it, and keep everyone on the same plan so the work does not pull in three directions.",
    tone: "blue",
    Icon: Handshake,
    points: ["We work with your people", "One plan, one owner"],
  },
  {
    q: "Will you take over my Meta, Google, or website accounts?",
    a: "Only with your permission, and only for the work we agreed. You keep ownership. Access is tracked. When the engagement ends, access ends unless you ask us to stay on.",
    tone: "wash",
    Icon: ShieldCheck,
    points: ["Your accounts stay yours", "Access only with permission"],
  },
  {
    q: "What if we stop before the work is finished?",
    a: "You can claim money back for work we have not delivered. Work already done, ad money already paid to Meta or Google, and third-party fees stay spent. The rules are written before we start.",
    tone: "magenta",
    Icon: Wallet,
    points: ["Refund on unfinished work", "Rules written upfront"],
  },
  {
    q: "Who is this for?",
    a: "Owners and managers of small, medium, and larger businesses that already sell something and feel stuck. Shops, clinics, schools, real estate, fintech, hotels, restaurants, and similar teams across Africa.",
    tone: "vivid",
    Icon: Users,
    points: ["Small to large businesses", "Already selling, still stuck"],
  },
  {
    q: "How do we start?",
    a: "Take the free Assessment or X-Ray, or book a strategy call on the calendar. No long email chain about when we are free. On the call we name the stuck part and agree the next step.",
    tone: "red",
    Icon: CalendarCheck,
    points: ["Free check or book a call", "Clear next step"],
  },
];

const toneDot: Record<Tone, string> = {
  blue: "bg-[#3B05C4]",
  vivid: "bg-[#5B45FF]",
  magenta: "bg-[#FC3FE3]",
  red: "bg-[#C40404]",
  ink: "bg-[#16024A]",
  wash: "bg-[#E7DEFF]",
};

export function FaqSection() {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const reduce = useReducedMotion();

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return faqs.map((_, index) => index);
    return faqs
      .map((faq, index) => ({ faq, index }))
      .filter(
        ({ faq }) =>
          faq.q.toLowerCase().includes(needle) || faq.a.toLowerCase().includes(needle),
      )
      .map(({ index }) => index);
  }, [query]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  const safeCursor = matches.length === 0 ? 0 : cursor % matches.length;
  const activeIndex = matches[safeCursor] ?? 0;
  const item = faqs[activeIndex]!;
  const countLabel = String(safeCursor + 1).padStart(1, "0");

  function step(direction: 1 | -1) {
    if (matches.length === 0) return;
    setCursor((current) => (current + direction + matches.length) % matches.length);
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <section id="faq" className="relative bg-white">
      <Container className="relative px-4 py-16 mobile-sm:px-5 tablet:px-8 tablet:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mint">
            FAQ
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.7rem)] font-bold leading-[1.08] tracking-tight text-[#16024A]">
            Questions owners ask before they hire us.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-neutral-600">
            Cost, timing, access, refunds, and how we work with your team.
          </p>
          <label className="mx-auto mt-6 flex max-w-sm items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 text-left shadow-[0_10px_24px_-20px_rgba(22,2,74,0.45)]">
            <Search className="h-4 w-4 shrink-0 text-[#5B45FF]" aria-hidden />
            <span className="sr-only">Search a question</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a question"
              className="min-w-0 flex-1 bg-transparent text-[0.85rem] text-[#16024A] outline-none placeholder:text-neutral-600"
            />
          </label>
        </div>

        <div className="relative mx-auto mt-10 max-w-6xl overflow-hidden rounded-[1.75rem] bg-[#16024A] px-4 py-6 text-white shadow-[0_32px_70px_-40px_rgba(22,2,74,0.65)] mobile-sm:rounded-[2rem] mobile-sm:px-6 mobile-sm:py-8 tablet:mt-12 tablet:px-8 tablet:py-10 laptop:px-10 laptop:py-12">
          <p
            aria-hidden
            className="pointer-events-none absolute -bottom-6 right-4 font-display text-[clamp(4.5rem,12vw,9rem)] font-bold leading-none tracking-tight text-white/[0.04]"
          >
            FAQ
          </p>

          {matches.length === 0 ? (
            <p className="relative py-16 text-center text-[0.95rem] text-white/90">
              Nothing matches that. Try “Nigeria”, “X-Ray”, or “week”.
            </p>
          ) : (
            <div className="relative grid items-center gap-8 laptop:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] laptop:gap-12">
              <div>
                <CardStack
                  activeIndex={activeIndex}
                  reduce={Boolean(reduce)}
                  position={safeCursor + 1}
                  total={matches.length}
                />
                <div className="mt-5 flex items-center gap-3">
                  <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-2 py-2">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous question"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden />
                    </button>
                    <p className="min-w-[4.5rem] text-center font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/80">
                      Question
                      <span className="mt-0.5 block text-[0.85rem] tracking-normal text-white">
                        {countLabel}/{matches.length}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next question"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={item.q}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#FC3FE3]">
                    Straight answers
                  </p>
                  <h3 className="mt-3 max-w-[16ch] font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-tight text-white">
                    {item.q}
                  </h3>
                  <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/90">
                    {item.a}
                  </p>
                  <ul className="mt-6 grid gap-4 tablet:grid-cols-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3B05C4] text-white">
                          <item.Icon className="h-3.5 w-3.5" aria-hidden />
                        </span>
                        <span>
                          <span className="block font-display text-[0.78rem] font-bold uppercase tracking-[0.08em] text-white">
                            {point}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={ROUTES.book}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#16024A] transition-transform hover:-translate-y-0.5"
                  >
                    Book a strategy call
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function CardStack({
  activeIndex,
  position,
  total,
  reduce,
}: {
  activeIndex: number;
  position: number;
  total: number;
  reduce: boolean;
}) {
  const item = faqs[activeIndex]!;
  const behind = [1, 2].map((offset) => faqs[(activeIndex + offset) % faqs.length]!);

  return (
    <div className="relative mx-auto h-[300px] w-full max-w-[320px] mobile-sm:h-[320px]">
      {behind
        .slice()
        .reverse()
        .map((card, index) => {
          const depth = 2 - index;
          return (
            <div
              key={`${card.q}-back`}
              aria-hidden
              className="absolute left-0 top-0 h-[280px] w-[86%] rounded-[1.25rem] border border-white/70 bg-white/85 shadow-[0_16px_30px_-24px_rgba(0,0,0,0.6)]"
              style={{
                transform: `translate(${depth * 16}px, ${depth * -10}px) rotate(${depth * -3.5}deg)`,
              }}
            />
          );
        })}
      <AnimatePresence mode="wait">
        <motion.article
          key={item.q}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          className="absolute left-0 top-4 flex h-[280px] w-[86%] flex-col rounded-[1.25rem] bg-white p-4 text-[#16024A] shadow-[0_22px_40px_-24px_rgba(0,0,0,0.55)] mobile-sm:p-5"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-neutral-600">
              FAQ // {String(activeIndex + 1).padStart(2, "0")}
            </p>
            <span className="inline-flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-neutral-600">
              <span className={cn("h-1.5 w-1.5 rounded-full", toneDot[item.tone])} />
              Open
            </span>
          </div>
          <h3 className="mt-4 font-display text-[1.15rem] font-bold leading-snug tracking-tight">
            {item.q}
          </h3>
          <p className="mt-2 line-clamp-4 text-[0.8rem] leading-relaxed text-neutral-600">
            {item.a}
          </p>
          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <p className="text-[0.72rem] font-medium text-neutral-600">
              {position} of {total}
            </p>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3B05C4] font-display text-[0.85rem] font-bold text-white">
              {activeIndex + 1}
            </span>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
