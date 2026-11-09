"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/Button/variants";
import { DiagnosticReport } from "@/features/assessment";
import type { AssessmentReport } from "@/features/assessment";
import { loadLocalReport } from "@/features/assessment/utils/reportBuilder";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export function AssessmentReportClient({ token }: { token: string }) {
  const reduce = useReducedMotion();
  const [report, setReport] = useState<AssessmentReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const decoded = decodeURIComponent(token);
    const id = window.requestAnimationFrame(() => {
      const local = loadLocalReport(decoded) ?? loadLocalReport(token);
      setReport(local);
      setLoading(false);
    });
    return () => window.cancelAnimationFrame(id);
  }, [token]);

  return (
    <div className="bg-[#F4F2F8] pb-16 pt-8 tablet:pb-24 tablet:pt-10">
      <Container className="px-4 mobile-sm:px-5 tablet:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 24 }}
          className="mx-auto mb-6 max-w-6xl tablet:mb-8"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-[0.72rem] font-semibold text-mint shadow-[0_8px_20px_-14px_rgba(22,2,74,0.3)]">
              Your X-Ray
            </span>
            {report?.bandLabel ? (
              <span className="rounded-full bg-mint-soft px-3 py-1 text-[0.72rem] font-semibold text-mint-ink">
                {report.bandLabel}
              </span>
            ) : null}
          </div>
          <h1 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.6rem)] font-bold tracking-tight text-mint-ink">
            Your numbers
          </h1>
          <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-neutral-600">
            Clear scores. One priority. Simple next moves.
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <DiagnosticReport report={report} loading={loading} />

          {!loading && !report ? (
            <p className="mt-5 text-center text-[0.9rem] text-neutral-600">
              No saved score for this link.{" "}
              <Link
                href="/growth-assessment/start"
                className="font-semibold text-mint hover:underline"
              >
                Retake the assessment
              </Link>
              .
            </p>
          ) : null}

          <div className="mt-7 flex flex-col gap-2.5 tablet:flex-row tablet:justify-center">
            <Link
              href={ROUTES.book}
              className={cn(
                buttonVariants({ variant: "contained", size: "lg" }),
                "inline-flex min-h-12 w-full justify-center !rounded-full border-0 !bg-mint px-7 !text-white hover:!bg-mint-deep tablet:w-auto",
              )}
            >
              Talk through this score
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/growth-assessment/start"
              className={cn(
                buttonVariants({ variant: "outlined", size: "lg" }),
                "inline-flex min-h-12 w-full justify-center !rounded-full !border-[#E8E4F0] !bg-white px-7 !text-mint-ink hover:!border-mint hover:!bg-mint-soft tablet:w-auto",
              )}
            >
              Retake assessment
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
