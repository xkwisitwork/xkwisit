"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/Button/variants";
import { PageFaq } from "@/components/marketing/pages/shared";
import { SolteraCloser } from "@/components/marketing/soltera/Soltera";
import { AssessmentWizard } from "@/features/assessment";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const startFaqs = [
  {
    q: "Can I pause and come back?",
    a: "Yes. Finish when you can answer honestly - rushed answers make a weak score.",
  },
  {
    q: "What do I get at the end?",
    a: "A short reading on the weak area and a first move. Then you can book or run Monday alone.",
  },
  {
    q: "Is this the X-Ray?",
    a: "No. This is the question-based assessment. The X-Ray is the paste-your-website door.",
  },
] as const;

/**
 * Growth Assessment start — incident-dashboard shell around the wizard.
 */
export function AssessmentStartClient() {
  const reduce = useReducedMotion();

  return (
    <div className="bg-[#F4F2F8] pb-16 pt-6 tablet:pb-24 tablet:pt-8">
      <Container className="px-4 mobile-sm:px-5 tablet:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 24 }}
          className="mx-auto mb-6 max-w-6xl"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-[0.72rem] font-semibold text-mint shadow-[0_8px_20px_-14px_rgba(22,2,74,0.35)]">
              Growth Assessment
            </span>
            <span className="rounded-full bg-[#E8F8EF] px-3 py-1 text-[0.72rem] font-semibold text-[#067647]">
              Free · ~10 minutes
            </span>
          </div>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(1.85rem,4vw,2.75rem)] font-bold tracking-tight text-mint-ink">
            Don’t guess what’s broken.
          </h1>
          <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-neutral-600">
            Walk five rooms. Get a score — and the one thing to fix first.
          </p>
        </motion.div>

        <AssessmentWizard />

        <p className="mt-8 text-center text-[0.88rem] text-neutral-600">
          Prefer a live walkthrough?{" "}
          <Link
            href={ROUTES.book}
            className="font-semibold text-mint-ink underline-offset-2 hover:underline"
          >
            Book a strategy call
          </Link>
        </p>

        <div className="mt-5 flex justify-center">
          <Link
            href={ROUTES.growthAssessment}
            className={cn(
              buttonVariants({ variant: "ghost", size: "md" }),
              "inline-flex gap-1 !rounded-full text-neutral-600",
            )}
          >
            Back to overview
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
      <PageFaq
        title="While you take the assessment"
        description="Quick answers so you can finish without second-guessing."
        items={startFaqs}
      />
      <SolteraCloser />
    </div>
  );
}
