"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils/cn";

export type PageFaqItem = {
  q: string;
  a: string;
};

/**
 * Page-local FAQ — contained white card on a soft canvas.
 * Pass route-specific questions — never homepage FAQ copy.
 */
export function PageFaq({
  eyebrow = "FAQ",
  title,
  description,
  items,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  items: readonly PageFaqItem[];
}) {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-[#F5F5F7] text-[#16024A]">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 mobile-sm:px-5 tablet:px-8 tablet:py-16 laptop:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          className="relative overflow-hidden rounded-[1.75rem] border border-[#ECEAF2] bg-white shadow-[0_24px_60px_-36px_rgba(22,2,74,0.28)] tablet:rounded-[2rem]"
        >
          {/* Soft ambient wash — kept light */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-mint/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-12 h-48 w-48 rounded-full bg-[#FC3FE3]/8 blur-3xl"
          />

          <div className="relative grid gap-8 p-6 mobile-sm:p-7 tablet:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] tablet:gap-10 tablet:p-10 laptop:gap-14 laptop:p-12">
            {/* Intro column */}
            <div className="tablet:sticky tablet:top-28 tablet:self-start">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#ECEAF2] bg-[#FAFAFC] px-3 py-1 font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden />
                {eyebrow}
              </p>
              <h2 className="mt-4 text-balance font-display text-[clamp(1.55rem,3.2vw,2.35rem)] font-bold leading-[1.12] tracking-tight">
                {title}
              </h2>
              {description ? (
                <p className="mt-3 max-w-[34ch] text-[0.95rem] leading-[1.7] text-[#5C5478]">
                  {description}
                </p>
              ) : (
                <p className="mt-3 max-w-[34ch] text-[0.95rem] leading-[1.7] text-[#5C5478]">
                  Straight answers on scope, timing, and how we work the Monday number.
                </p>
              )}
            </div>

            {/* Accordion column */}
            <ul className="space-y-3">
              {items.map((item, index) => {
                const isOpen = open === index;
                return (
                  <motion.li
                    key={item.q}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: reduce ? 0 : index * 0.06,
                    }}
                  >
                    <div
                      className={cn(
                        "overflow-hidden rounded-[1.25rem] border transition-colors",
                        isOpen
                          ? "border-mint/25 bg-[#FAFAFC] shadow-[0_12px_28px_-22px_rgba(59,5,196,0.28)]"
                          : "border-[#ECEAF2] bg-white hover:border-[#DDD8E8]",
                      )}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? -1 : index)}
                        className="flex w-full items-start gap-4 px-4 py-4 text-left tablet:px-5 tablet:py-5"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="font-display text-[1.02rem] font-bold leading-snug text-[#16024A] tablet:text-[1.08rem]">
                            {item.q}
                          </span>
                        </span>
                        <motion.span
                          className={cn(
                            "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors",
                            isOpen
                              ? "bg-mint text-white"
                              : "bg-[#F0EEF5] text-[#5C5478]",
                          )}
                          animate={
                            reduce
                              ? undefined
                              : isOpen
                                ? { rotate: 180, scale: 1.05 }
                                : { rotate: 0, scale: 1 }
                          }
                          transition={{ type: "spring", stiffness: 380, damping: 22 }}
                          aria-hidden
                        >
                          {isOpen ? (
                            <Minus className="h-4 w-4" strokeWidth={2.5} />
                          ) : (
                            <Plus className="h-4 w-4" strokeWidth={2.5} />
                          )}
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            key="answer"
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-[#ECEAF2] px-4 pb-5 pt-3 text-[0.92rem] leading-[1.7] text-[#5C5478] tablet:px-5">
                              {item.a}
                            </p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
