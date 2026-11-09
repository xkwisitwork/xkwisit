"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown, UserPlus } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button/variants";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const paths = [
  {
    href: ROUTES.register,
    title: "Create account",
    body: "Open your workspace and start diagnosing growth.",
    Icon: UserPlus,
    primary: true,
  },
  {
    href: ROUTES.book,
    title: "Book a strategy call",
    body: "Thirty minutes. Live X-Ray with our team.",
    Icon: Calendar,
    primary: false,
  },
] as const;

/**
 * Header CTA that keeps Sign up and Booking as equal, clear paths -
 * never conflates “create account” with “book a call”.
 */
export function GetStartedMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          buttonVariants({ variant: "contained", size: "md" }),
          "inline-flex gap-1.5 !rounded-full border-0 !bg-mint !text-white shadow-none hover:!bg-mint-deep",
        )}
      >
        Get started
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] origin-top-right"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-2 rounded-[1.5rem] bg-mint/10 blur-xl"
            />
            <div className="relative overflow-hidden rounded-[1.25rem] border border-mint/25 bg-white shadow-[0_24px_50px_-24px_rgba(37,99,235,0.45)]">
              <div
                aria-hidden
                className="h-1 w-full bg-gradient-to-r from-mint via-mint-mid to-mint-deep"
              />
              <p className="px-4 pb-1 pt-3 font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-mint">
                How do you want to start?
              </p>
              <ul className="space-y-0.5 p-2">
                {paths.map((path) => (
                  <li key={path.href}>
                    <Link
                      href={path.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors",
                        path.primary
                          ? "bg-mint-soft/80 hover:bg-mint-soft"
                          : "hover:bg-neutral-200/80",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                          path.primary ? "bg-mint text-white" : "bg-mint-soft text-mint",
                        )}
                      >
                        <path.Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1 font-display text-300 font-bold text-neutral-900">
                          {path.title}
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </span>
                        <span className="mt-0.5 block text-200 leading-snug text-neutral-600">
                          {path.body}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
