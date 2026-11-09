"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ScanSearch, Target } from "lucide-react";

/**
 * Right-side visual for Voyger-style auth: brand photo + glass hotspot chips.
 */
export function AuthHeroPanel({ mode }: { mode: "login" | "register" }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative hidden h-full min-h-[32rem] overflow-hidden rounded-[1.75rem] laptop:block">
      <Image
        src="/images/people/desk-review.jpg"
        alt="Xkwisit team reviewing the Monday growth number"
        fill
        priority
        className="object-cover object-[50%_30%]"
        sizes="(min-width: 1024px) 55vw, 100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#16024A]/55 via-[#16024A]/10 to-transparent"
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-[8%] top-[18%] max-w-[15rem]"
      >
        <GlassChip
          icon={<Target className="h-3.5 w-3.5" aria-hidden />}
          label="Monday number in view"
          sub="Brand · website · ads · follow-up"
        />
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[7%] top-[42%] max-w-[14.5rem]"
      >
        <GlassChip
          icon={<ScanSearch className="h-3.5 w-3.5" aria-hidden />}
          label={
            mode === "register"
              ? "Free Growth Assessment ready"
              : "Leads waiting in Mission Control"
          }
        />
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[12%] left-1/2 -translate-x-1/2"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-[0.78rem] font-semibold text-[#16024A] shadow-[0_12px_30px_-18px_rgba(22,2,74,0.55)] backdrop-blur-md ring-1 ring-white/70">
          <Calendar className="h-3.5 w-3.5 text-mint" aria-hidden />
          Mission Control
        </div>
      </motion.div>
    </div>
  );
}

function GlassChip({
  icon,
  label,
  sub,
}: {
  icon: ReactNode;
  label: string;
  sub?: string;
}) {
  return (
    <div className="rounded-[1.15rem] bg-white/80 px-3.5 py-3 shadow-[0_18px_40px_-24px_rgba(22,2,74,0.55)] backdrop-blur-xl ring-1 ring-white/70">
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint/10 text-mint">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-[0.8rem] font-semibold leading-snug text-[#16024A]">
            {label}
          </p>
          {sub ? (
            <p className="mt-0.5 text-[0.68rem] leading-snug text-[#5C5478]">{sub}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
