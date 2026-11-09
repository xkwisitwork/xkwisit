"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ScanSearch } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button/variants";
import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const signals = [
  { label: "Website & online presence", score: 64 },
  { label: "Brand", score: 78 },
  { label: "Getting customers", score: 42 },
  { label: "Turning interest into sales", score: 31 },
] as const;

/**
 * Free diagnostic teaser - plain language that invites a click.
 */
export function GrowthScoreTeaser() {
  return (
    <section className="relative overflow-x-clip bg-white">
      <Container className="relative px-4 py-16 mobile-sm:px-5 tablet:px-8 tablet:py-20">
        <div className="grid items-center gap-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-700">
              <ScanSearch className="h-3.5 w-3.5 text-mint" aria-hidden />
              Free · about 10 minutes
            </span>
            <h2 className="mt-5 text-balance text-center font-display text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.12] tracking-tight text-neutral-900">
              <span className="tablet:whitespace-nowrap">Not ready to hire?</span>{" "}
              <span className="tablet:whitespace-nowrap">Start with a free check.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-[0.95rem] leading-relaxed text-neutral-600 mobile-sm:text-400">
              Answer questions about your business, or just paste your website. You leave
              knowing the weak spots. The scores are our reading of your answers - not a
              lab test, and not a promise of results.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 tablet:flex-row">
              <Link
                href={ROUTES.businessXray}
                className={cn(
                  buttonVariants({ variant: "contained", size: "lg" }),
                  "inline-flex min-h-12 justify-center !rounded-full border-0 !bg-mint px-7 !text-white hover:!bg-mint-deep",
                )}
              >
                Paste my website
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={ROUTES.growthAssessment}
                className={cn(
                  buttonVariants({ variant: "outlined", size: "lg" }),
                  "inline-flex min-h-12 justify-center !rounded-full !border-neutral-400 !bg-white px-7 !text-neutral-900 hover:!border-mint hover:!bg-mint-soft",
                )}
              >
                Answer the questions
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="relative mx-auto min-h-[28rem] w-full max-w-3xl overflow-hidden rounded-[1.75rem] bg-[#F4F0FF]"
          >
            <Image
              src="/images/people/method-owner.jpg"
              alt="A woman in a black top standing by an office window"
              fill
              className="object-cover object-[center_18%]"
              sizes="(max-width: 1024px) 92vw, 520px"
            />
            <div className="absolute left-3 top-4 w-[min(15.5rem,72%)] rounded-2xl bg-white p-4 shadow-[0_18px_40px_-24px_rgba(22,2,74,0.45)] mobile-sm:left-4 mobile-sm:top-6">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
                Sample · not a client
              </p>
              <p className="mt-1 font-display text-[1.7rem] font-bold leading-none text-[#16024A]">
                31
                <span className="ml-1 text-[0.72rem] font-semibold text-neutral-500">
                  sales
                </span>
              </p>
              <p className="mt-1 text-[0.75rem] leading-snug text-neutral-600">
                Fix the lowest score first - before more ads.
              </p>
            </div>
            <div className="absolute bottom-4 left-3 right-3 rounded-2xl bg-white/95 p-4 shadow-[0_18px_40px_-24px_rgba(22,2,74,0.4)] backdrop-blur-sm mobile-sm:left-4 mobile-sm:right-auto mobile-sm:w-[16.5rem]">
              <ul className="space-y-2.5">
                {signals.map((signal) => (
                  <li key={signal.label}>
                    <div className="flex items-center justify-between gap-3 text-[0.72rem]">
                      <span className="font-medium text-neutral-700">{signal.label}</span>
                      <span className="font-semibold tabular-nums text-[#16024A]">
                        {signal.score}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#E7DEFF]">
                      <motion.div
                        className="h-full rounded-full bg-[#3B05C4]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${signal.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.7rem] leading-snug text-neutral-600">
                Also scored: keeping customers, day-to-day systems, and reports.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
