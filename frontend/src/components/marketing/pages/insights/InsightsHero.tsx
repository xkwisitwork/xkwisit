"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function InsightsHero({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#f3f2f4] px-4 py-10 text-[#16024A] tablet:px-8 tablet:py-16">
      <div className="rounded-[2rem] bg-white p-4 shadow-[0_30px_70px_-40px_rgba(22,2,74,0.45)] tablet:p-6">
        <div className="grid items-stretch gap-4 laptop:grid-cols-2 laptop:gap-6">
          <div className="grid gap-3">
            <div className="overflow-hidden rounded-[1.4rem] bg-[#F4F0FF]">
              <motion.img
                src="/images/levers/ops-scoreboard.jpg"
                alt="A weekly numbers review"
                className="h-56 w-full object-cover laptop:h-72"
                initial={reduce ? false : { scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex min-h-[8.5rem] flex-col justify-between rounded-[1.4rem] bg-[#3B05C4] p-5 text-white">
                <p className="font-display text-[2.4rem] font-bold leading-none">3</p>
                <p className="text-[0.9rem] text-white/80">Notes</p>
              </div>
              <div className="overflow-hidden rounded-[1.4rem] bg-[#F4F0FF]">
                <img
                  src="/images/levers/ops-monday.jpg"
                  alt=""
                  className="h-full min-h-[8.5rem] w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col px-1 py-2 laptop:px-4 laptop:py-4">
            <p className="text-[0.78rem] font-semibold text-neutral-400">Insights</p>
            <motion.h1
              className="mt-3 font-display text-[clamp(2rem,3.4vw,3.15rem)] font-bold leading-[1.12] tracking-tight"
              initial={reduce ? false : { y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.55, ease }}
            >
              Field notes from the
              <span className="block text-[#3B05C4]">weekly numbers.</span>
            </motion.h1>
            <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-neutral-600">
              Short notes on finding what is stuck, fixing the ads, and how African brands actually sell.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-[#3B05C4] py-1.5 pl-4 pr-1.5 text-[0.9rem] font-semibold text-[#3B05C4] hover:bg-[#F4F0FF]"
              >
                {primaryLabel}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#3B05C4] text-white" aria-hidden>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full border border-[#16024A]/15 px-4 text-[0.9rem] font-semibold text-[#16024A] hover:border-[#3B05C4] hover:text-[#3B05C4]"
              >
                {secondaryLabel}
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 laptop:mt-auto laptop:pt-8">
              <div className="rounded-[1.3rem] bg-[#F4F7FF] p-4">
                <p className="font-display text-[1.7rem] font-bold leading-none">1</p>
                <p className="mt-3 text-[0.82rem] leading-snug text-neutral-500">Set of numbers</p>
              </div>
              <div className="rounded-[1.3rem] bg-[#F4F7FF] p-4">
                <p className="font-display text-[1.7rem] font-bold leading-none">Monday</p>
                <p className="mt-3 text-[0.82rem] leading-snug text-neutral-500">Live numbers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
