"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

const testimonials = [
  {
    title: "The ads weren’t the whole problem.",
    quote:
      "I was sure the ads were broken. We were getting messages, then they just sat there. They told us to look at who was supposed to reply. Simple - and true.",
    name: "Client story",
    role: "Retail · shared with permission pending",
  },
  {
    title: "We still argue. Then we pick one.",
    quote:
      "Brand, ads, and sales were each doing their own thing. We still argue. We just pick one problem on Monday and stay with it for the week.",
    name: "Client story",
    role: "Healthcare · shared with permission pending",
  },
  {
    title: "Not the pitch I expected.",
    quote:
      "I expected a campaign idea. What we got was a short note on what was stuck, and a private account my team still opens - mostly on Mondays.",
    name: "Client story",
    role: "Services · shared with permission pending",
  },
  {
    title: "The offer was the messy part.",
    quote:
      "We kept saying the channel was wrong. The offer on the page was the messy part. We rewrote that before we put more money in.",
    name: "Client story",
    role: "Real estate · shared with permission pending",
  },
  {
    title: "One problem. One person.",
    quote:
      "Everyone had a theory. Nobody owned one. We named one problem and a person for it. The other noise didn’t vanish - it just stopped running the week.",
    name: "Client story",
    role: "Clinic · shared with permission pending",
  },
] as const;

/**
 * Operator proof carousel - simple words that make people pause.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index]!;

  return (
    <section className="relative overflow-x-clip bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
 linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px),
 linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)
 `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 15%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 15%, transparent 70%)",
        }}
      />

      <Container className="relative px-4 py-14 mobile-sm:px-5 tablet:px-8 tablet:py-20">
        <p className="text-center font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mint">
          In their own words · placeholders until real quotes are cleared
        </p>

        <div className="mx-auto mt-6 max-w-2xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint-soft font-display text-600 font-bold text-mint ring-4 ring-white">
                {item.name.charAt(0)}
              </div>
              <h2 className="mt-5 font-display text-[clamp(1.35rem,3vw,1.85rem)] font-bold tracking-tight text-neutral-900">
                {item.title}
              </h2>
              <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-neutral-600 mobile-sm:text-400 tablet:text-500">
                “{item.quote}”
              </blockquote>
              <p className="mt-5 text-300 text-neutral-600">
                - {item.name} · {item.role}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 flex items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() =>
                setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400/80 text-neutral-600 transition-colors hover:border-mint hover:text-mint"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5 px-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-6 bg-mint" : "w-1.5 bg-neutral-400",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400/80 text-neutral-600 transition-colors hover:border-mint hover:text-mint"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
