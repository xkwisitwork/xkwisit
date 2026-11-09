"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { ROUTES, siteConfig } from "@/config/site";

/**
 * Closing band under every page. Copy is unchanged. Motion sits around it.
 */
export function CtaSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-x-clip bg-[#f3f5f8] py-14 tablet:py-20">
      <Container className="relative px-4 mobile-sm:px-5 tablet:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-mint px-6 py-12 text-white mobile-sm:px-10 tablet:px-14 tablet:py-16"
        >
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -left-10 top-8 h-40 w-40 rounded-full bg-white/15 blur-2xl"
            animate={reduce ? undefined : { x: [0, 24, 0], y: [0, 16, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -right-8 bottom-0 h-48 w-48 rounded-full bg-[#16024A]/30 blur-2xl"
            animate={reduce ? undefined : { x: [0, -18, 0], y: [0, -12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative grid items-center gap-8 tablet:grid-cols-[1.3fr_auto]">
            <div>
              <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/70">
                {siteConfig.name}
              </p>
              <h2 className="mt-3 max-w-xl font-display text-[clamp(1.7rem,4vw,2.7rem)] font-bold leading-[1.05] tracking-tight">
                Check free - or talk to us.
              </h2>
              <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/80">
                See what’s stuck in about 10 minutes. Or pick a call time. No long email about
                when {siteConfig.name} is free.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <motion.div whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={ROUTES.book}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-[0.9rem] font-semibold text-mint-ink"
                >
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </motion.div>
              <motion.div whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={ROUTES.growthAssessment}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 text-[0.9rem] font-semibold text-white"
                >
                  Start free check
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
