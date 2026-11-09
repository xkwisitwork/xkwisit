"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

export function PageSection({
  id,
  eyebrow,
  title,
  description,
  children,
  tone = "white",
  align = "left",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  children?: ReactNode;
  tone?: "white" | "soft" | "ink";
  align?: "left" | "center";
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-x-clip",
        tone === "white" && "bg-white",
        tone === "soft" && "bg-white",
        tone === "ink" && "bg-white text-[#16024A]",
        className,
      )}
    >
      <Container className="relative px-4 py-16 mobile-sm:px-5 tablet:px-8 tablet:py-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
        {(eyebrow || title || description) && (
          <div
            className={cn(
              "mx-auto max-w-3xl text-center",
            )}
          >
            {eyebrow ? (
              <p
                className={cn(
                  "font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em]",
                  tone === "ink" ? "text-[#3B05C4]" : "text-mint",
                )}
              >
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2
                className={cn(
                  "mt-4 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.15] tracking-[-0.035em]",
                  tone === "ink" ? "text-[#16024A]" : "text-mint-ink",
                )}
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p
                className={cn(
                  "mx-auto mt-4 text-[0.95rem] leading-relaxed",
                  align === "center" ? "max-w-2xl" : "max-w-xl",
                  tone === "ink" ? "text-neutral-600" : "text-neutral-600",
                )}
              >
                {description}
              </p>
            ) : null}
          </div>
        )}
        {children ? (
          <div className={cn((eyebrow || title || description) && "mt-10")}>{children}</div>
        ) : null}
        </motion.div>
      </Container>
    </section>
  );
}

export function PageCard({
  children,
  className,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "soft" | "mint" | "ink";
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "rounded-[1.6rem] p-7 mobile-sm:rounded-[1.85rem] mobile-sm:p-8",
        tone === "white" && "border border-neutral-200 bg-white shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)]",
        tone === "soft" && "bg-[#f4f4f6]",
        tone === "mint" && "bg-[#3B05C4] text-white",
        tone === "ink" && "bg-[#3B05C4] text-white",
        className,
      )}
      whileHover={reduce ? undefined : { y: -8, scale: 1.012 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

/** High-contrast ink list row with circular mint arrow — Granger list pattern. */
export function PageInkRow({
  href,
  index,
  title,
  description,
  className,
}: {
  href: string;
  index?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1] mobile-sm:gap-6 mobile-sm:px-6",
        className,
      )}
    >
      {index ? (
        <span className="font-display text-[1.25rem] font-bold text-white/40 group-hover:text-mint">
          {index}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[1.15rem] font-bold text-white">
          {title}
        </span>
        {description ? (
          <span className="mt-1 block text-[0.88rem] leading-relaxed text-white/60">
            {description}
          </span>
        ) : null}
      </span>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint text-white transition-transform group-hover:scale-105"
        aria-hidden
      >
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

/** Pill status / category tag. */
export function PagePill({
  children,
  tone = "soft",
  className,
}: {
  children: ReactNode;
  tone?: "soft" | "mint" | "ink" | "white";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.72rem] font-semibold",
        tone === "soft" && "bg-mint-soft text-mint-ink",
        tone === "mint" && "bg-mint text-white",
        tone === "ink" && "bg-mint-ink text-white",
        tone === "white" && "border border-neutral-200 bg-white text-mint-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
