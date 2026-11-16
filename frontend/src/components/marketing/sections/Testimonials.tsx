"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

const testimonials = [
  {
    title: "Trust was the product.",
    quote:
      "Guests wouldn’t book what they couldn’t trust. The work wasn’t louder ads — it was verification, clearer listings, and a booking path that felt safe enough to finish.",
    name: "StayTrove",
    role: "Hospitality tech · Lagos",
  },
  {
    title: "Impact needed a clearer door.",
    quote:
      "People cared about the mission. They just couldn’t see how to join it. The site finally made education, mentorship, and next steps obvious — for girls and for partners.",
    name: "GYGI",
    role: "Nonprofit · education & skills",
  },
  {
    title: "Delivery had to look like delivery.",
    quote:
      "We do serious engineering work. The old site didn’t. Now civil, structure, and project delivery read like the standard we hold on site — and enquiries come in cleaner.",
    name: "Yetosol Associates",
    role: "Civil & construction",
  },
  {
    title: "Newcomers needed a first step, not jargon.",
    quote:
      "Our families don’t need another finance lecture. They need a clear first move. The story and the site finally match how we actually help people build stability in Canada.",
    name: "First Step Wealth Group",
    role: "Financial services · Canada",
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
          In their own words · real testimonies from real businesses
        </p>

        <div className="mx-auto mt-6 max-w-2xl text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.name + item.title}
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
