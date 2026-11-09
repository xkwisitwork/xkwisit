"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

const cards = [
  {
    quote:
      "I was sure the ads were the problem. We were getting enquiries, then they just sat there. They told us to look at who was supposed to reply. Obvious, once someone said it.",
    name: "Adaeze Okafor",
    role: "CEO, Northline Commerce",
    city: "Lagos",
    tone: "bg-[#F4F0FF]",
  },
  {
    quote:
      "Brand, ads, and sales were each doing their own thing. We still argue. We just pick one problem on Monday and stay with it for the week.",
    name: "Chinedu Bassey",
    role: "Founder, Harbor Health",
    city: "Abuja",
    tone: "bg-[#E7DEFF]",
  },
  {
    quote:
      "I expected a campaign idea. What we got was a short note on what was broken, and a board my team still opens. Mostly on Mondays, when someone remembers.",
    name: "Mariama Diallo",
    role: "COO, Ledger Labs",
    city: "Accra",
    tone: "bg-[#FBE7FA]",
  },
  {
    quote:
      "We kept saying the channel was wrong. The offer on the page was the messy part. We rewrote that before we put more money in. Still a bit awkward to admit.",
    name: "Tunde Adebayo",
    role: "Growth Lead, Vista Homes",
    city: "Ibadan",
    tone: "bg-[#E4E0FF]",
  },
  {
    quote:
      "Everyone had a theory. Nobody owned one. We named one problem and a person for it. The other noise didn’t vanish. It just stopped running the week.",
    name: "Amina Yusuf",
    role: "Founder, Bloom Clinic",
    city: "Kano",
    tone: "bg-[#FDECEC]",
  },
] as const;

const desktopPoses = [
  { x: 0, y: 28, r: -6, z: 50 },
  { x: 78, y: 4, r: 5, z: 40 },
  { x: 138, y: -16, r: 10, z: 30 },
  { x: 186, y: -36, r: 14, z: 20 },
  { x: 24, y: 48, r: 0, z: 0 },
] as const;

/** Centered peek. Small angles so the stack doesn’t lean off the screen. */
const mobilePoses = [
  { x: 0, y: 18, r: -2, z: 50 },
  { x: 14, y: -4, r: 2, z: 40 },
  { x: 26, y: -16, r: 3, z: 30 },
  { x: 36, y: -26, r: 4, z: 20 },
  { x: 0, y: 24, r: 0, z: 0 },
] as const;

/**
 * Operator proof - a still fan of quotes, not a grid of cards.
 */
export function TestimonialCards() {
  const [index, setIndex] = useState(0);
  const [compact, setCompact] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const apply = () => setCompact(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return (
    <section className="relative overflow-x-clip bg-white">
      <Container className="relative px-4 py-16 mobile-sm:px-5 tablet:px-8 tablet:py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mint">
            Testimonials
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.12] tracking-tight text-neutral-900">
            Operators who stopped guessing.
          </h2>
        </motion.div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-6 tablet:mt-10 tablet:grid-cols-2 tablet:gap-16">
          <p className="text-[0.95rem] leading-relaxed text-neutral-700">
            What they noticed first, once someone named it.
          </p>
          <p className="text-[0.95rem] leading-relaxed text-neutral-700 tablet:text-right">
            And the bit they still do when the week starts.
          </p>
        </div>

        <div className="relative mx-auto mt-6 h-[28rem] max-w-3xl tablet:mt-2 tablet:h-[32rem]">
          <span className="absolute left-0 top-[16%] hidden font-display text-300 text-neutral-600 tablet:block">
            leak
          </span>
          <span className="absolute bottom-2 left-2 hidden font-display text-300 text-neutral-600 tablet:block">
            owner
          </span>
          <span className="absolute right-0 top-[20%] hidden font-display text-300 text-neutral-600 tablet:block">
            fix
          </span>
          <span className="absolute bottom-2 right-0 hidden font-display text-300 text-neutral-600 tablet:block">
            monday
          </span>

          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[22rem] w-[min(100%,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-[2.4rem] bg-white tablet:h-[24rem]"
          />

          <ul className="absolute inset-0">
            {cards.map((card, cardIndex) => {
              const rel = (cardIndex - index + cards.length) % cards.length;
              const pose = (compact ? mobilePoses : desktopPoses)[rel] ?? desktopPoses[0];
              const hidden = rel === cards.length - 1;
              return (
                <li
                  key={card.name}
                  className="absolute left-1/2 top-[14%] w-[98%] tablet:top-[12%] tablet:w-[16.5rem]"
                  style={{ zIndex: pose.z }}
                >
                  <button
                    type="button"
                    aria-label={
                      rel === 0 ? `Next quote after ${card.name}` : `Show ${card.name}`
                    }
                    aria-current={rel === 0 ? "true" : undefined}
                    onClick={() =>
                      setIndex(rel === 0 ? (index + 1) % cards.length : cardIndex)
                    }
                    className={cn(
                      "flex h-[19.5rem] w-full flex-col rounded-[1.6rem] p-5 text-left shadow-[0_18px_36px_-28px_rgba(22,2,74,0.45)] transition-transform duration-500",
                      card.tone,
                      hidden && "pointer-events-none",
                    )}
                    style={{
                      transform: `translate(calc(-50% + ${pose.x}px), ${pose.y}px) rotate(${pose.r}deg)`,
                      transformOrigin: "center center",
                      opacity: hidden ? 0 : 1,
                      transitionDuration: reduce ? "0ms" : undefined,
                    }}
                  >
                    <p
                      className={cn(
                        "font-display font-bold leading-snug tracking-tight text-[#16024A]",
                        rel === 0
                          ? "text-[1.05rem] font-semibold leading-relaxed"
                          : "text-[1.15rem]",
                      )}
                    >
                      {rel === 0 ? card.quote : `${card.quote.split(".")[0]}.`}
                    </p>
                    <span className="mt-auto flex items-end justify-between gap-3 pt-4">
                      <span>
                        <span className="block text-[0.75rem] font-semibold text-[#16024A]">
                          {card.name}
                        </span>
                        <span className="mt-0.5 block text-[0.7rem] text-[#16024A]">
                          {card.role} · {card.city}
                        </span>
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#16024A] text-white">
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-2 text-center font-display text-[1.7rem] font-bold tracking-tight text-neutral-950">
          Xkwisit
        </p>
      </Container>
    </section>
  );
}
