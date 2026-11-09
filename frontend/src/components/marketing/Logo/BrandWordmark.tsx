"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils/cn";

const WORD = "XKWISIT";

const sizeMap = {
  sm: "text-[0.82rem] tracking-[0.16em] tablet:text-[0.88rem]",
  md: "text-[0.9rem] tracking-[0.18em] tablet:text-[0.98rem] laptop:text-[1.05rem]",
  lg: "text-[1.1rem] tracking-[0.2em] tablet:text-[1.2rem] laptop:text-[1.3rem]",
} as const;

export type BrandWordmarkProps = {
  className?: string;
  inverted?: boolean;
  size?: "sm" | "md" | "lg";
};

/**
 * Brand wordmark — mint, letter-stagger enter + soft hover lift.
 */
export function BrandWordmark({
  className,
  inverted,
  size = "md",
}: BrandWordmarkProps) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden
      className={cn(
        "group/logo relative inline-flex items-baseline font-display font-bold uppercase leading-none",
        inverted ? "text-white" : "text-mint",
        sizeMap[size],
        className,
      )}
      initial="hidden"
      animate="show"
      whileHover={reduce ? undefined : "hover"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : 0.045,
            delayChildren: reduce ? 0 : 0.04,
          },
        },
        hover: {
          transition: {
            staggerChildren: 0.03,
          },
        },
      }}
    >
      {WORD.split("").map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          className="inline-block will-change-transform"
          variants={{
            hidden: reduce
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 8, filter: "blur(4px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 420,
                damping: 28,
              },
            },
            hover: reduce
              ? { y: 0 }
              : {
                  y: -2,
                  color: inverted ? "#FFFFFF" : "#5B45FF",
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 22,
                  },
                },
          }}
        >
          {letter}
        </motion.span>
      ))}
      {!inverted ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-px w-0 bg-gradient-to-r from-transparent via-mint to-transparent opacity-0 transition-all duration-300 group-hover/logo:w-full group-hover/logo:opacity-70"
        />
      ) : null}
    </motion.span>
  );
}
