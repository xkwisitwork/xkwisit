"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  MessageSquareOff,
  Megaphone,
  Shuffle,
  Target,
  Users,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/Button/variants";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

type Symptom = {
  id: string;
  Icon: typeof Target;
  label: string;
  hint: string;
  constraint: string;
  score: number;
  why: string;
  firstMove: string;
};

const symptoms: Symptom[] = [
  {
    id: "leads-cold",
    Icon: MessageSquareOff,
    label: "Customers message on WhatsApp… then go quiet.",
    hint: "Interest without follow-up",
    constraint: "Follow-up",
    score: 34,
    why: "People are interested. Nobody is calling or replying fast enough. Every quiet chat is a sale that cooled off.",
    firstMove:
      "Reply the same day. Keep every lead in one list - before you buy more ads.",
  },
  {
    id: "ads-noise",
    Icon: Megaphone,
    label: "I run Instagram and Facebook ads. Sales stay small.",
    hint: "Traffic without a clear next step",
    constraint: "The offer on the page",
    score: 41,
    why: "You are paying for attention. The page or WhatsApp reply does not give a clear reason to buy or book.",
    firstMove: "Fix what you ask people to do after the click. Then touch the ads.",
  },
  {
    id: "team-tug",
    Icon: Shuffle,
    label: "Brand, ads, and sales each want something different.",
    hint: "Three plans, no owner",
    constraint: "One weekly priority",
    score: 38,
    why: "Everyone is busy. Nobody agrees on the one problem that matters this week - so the argument starts again every meeting.",
    firstMove: "One set of numbers. One person in charge. One problem for two weeks.",
  },
  {
    id: "nobody-knows",
    Icon: Users,
    label: "People say they like us. They still don’t buy.",
    hint: "Known, but not buying",
    constraint: "A clear reason to buy now",
    score: 47,
    why: "They know you. They are not sure why they should pay or book today.",
    firstMove:
      "Write one clear offer sentence. Put it on your busiest page or bio this week.",
  },
  {
    id: "guessing",
    Icon: Target,
    label: "Every month I spend money and hope.",
    hint: "No clear weak spot",
    constraint: "Guessing where to spend",
    score: 29,
    why: "Without knowing which part is broken, more spend is a guess. Hope is not a plan.",
    firstMove:
      "Take the free Growth Assessment or Business X-Ray. Fix the weakest part first.",
  },
];

/**
 * Pain recognition - tap a familiar problem, get the broken part and first move.
 */
export function ConstraintOracle() {
  const [activeId, setActiveId] = useState(symptoms[0]!.id);
  const active = symptoms.find((s) => s.id === activeId) ?? symptoms[0]!;

  return (
    <section className="relative overflow-x-clip bg-white">
      <Container className="relative px-4 py-16 mobile-sm:px-5 tablet:px-8 tablet:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mint">
            Sound familiar?
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.12] tracking-tight text-neutral-900">
            Does this sound like your business?
          </h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-neutral-600">
            Tap the one that fits - whether you run a small shop, a growing company, or a
            larger team. We name what’s probably stuck, and the first useful step.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 laptop:grid-cols-[1fr_1.05fr]">
          <ul className="flex flex-col gap-2">
            {symptoms.map((s) => {
              const selected = s.id === activeId;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(s.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-[1.25rem] border px-4 py-3.5 text-left transition-all",
                      selected
                        ? "border-mint bg-white shadow-[0_16px_40px_-28px_rgba(37,99,235,0.45)]"
                        : "border-transparent bg-white/60 hover:border-neutral-400 hover:bg-white",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",
                        selected ? "bg-mint text-white" : "bg-mint-soft text-mint",
                      )}
                    >
                      <s.Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-400 font-bold text-neutral-900">
                        {s.label}
                      </span>
                      <span className="mt-0.5 block text-200 text-neutral-600">
                        {s.hint}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.28 }}
              className="relative flex flex-col overflow-hidden rounded-[1.6rem] border border-neutral-400/70 bg-white p-6 mobile-sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-mint/15 blur-3xl"
              />

              <p className="relative font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-mint">
                What’s probably stuck
              </p>
              <h3 className="relative mt-3 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight text-neutral-900">
                {active.constraint}
              </h3>

              <div className="relative mt-5">
                <div className="mb-1.5 flex justify-between text-200">
                  <span className="text-neutral-600">How healthy this looks</span>
                  <span className="font-semibold tabular-nums text-neutral-900">
                    {active.score}/100
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-neutral-200">
                  <motion.div
                    className="h-full rounded-full bg-mint"
                    initial={{ width: 0 }}
                    animate={{ width: `${active.score}%` }}
                    transition={{ duration: 0.55 }}
                  />
                </div>
              </div>

              <p className="relative mt-6 text-300 leading-relaxed text-neutral-600 mobile-sm:text-400">
                {active.why}
              </p>

              <div className="relative mt-6 rounded-2xl bg-mint-soft/70 px-4 py-4">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-mint">
                  First move
                </p>
                <p className="mt-1.5 text-300 font-medium leading-relaxed text-mint-ink">
                  {active.firstMove}
                </p>
              </div>

              <Link
                href={ROUTES.growthAssessment}
                className={cn(
                  buttonVariants({ variant: "contained", size: "lg" }),
                  "relative !mt-7 inline-flex min-h-12 w-full justify-center !rounded-full border-0 !bg-mint px-7 !text-white hover:!bg-mint-deep tablet:w-auto",
                )}
              >
                Check my business free
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
