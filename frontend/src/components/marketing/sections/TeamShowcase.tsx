"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Bell, MessageCircle } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { teamMembers } from "@/config/team";
import { cn } from "@/lib/utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Team section — interlocking rounded composition (Bleu-style),
 * remapped to Xkwisit brand + roster content.
 */
export function TeamShowcase() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const member = teamMembers[index]!;
  const total = teamMembers.length;
  const firstName = member.name.split(" ")[0]!;

  function go(delta: number) {
    setIndex((i) => (i + delta + total) % total);
  }

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 9000);
    return () => window.clearInterval(timer);
  }, [reduce, paused, index, total]);

  return (
    <section
      id="team"
      className="relative overflow-x-clip bg-white py-16 mobile-md:py-20 tablet:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container bare className="relative w-full tablet:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease }}
          className="mx-auto w-[98%] max-w-2xl text-center tablet:w-full"
        >
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#3B05C4]">
            The team
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.65rem,4vw,2.45rem)] font-bold leading-tight tracking-tight text-[#16024A]">
            The team that solves business problems & drives growth.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-neutral-500">
            One plan. Named owners. Not a crowd guessing.
          </p>
        </motion.div>

        {/* Interlocking stage */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease, delay: 0.08 }}
          className="relative mx-auto mt-12 w-[98%] max-w-[58rem] tablet:mt-16 tablet:w-full"
        >
          <div
            className={cn(
              "grid items-start gap-3",
              "grid-cols-1",
              "tablet:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)_2.6rem]",
              "tablet:gap-3.5",
            )}
          >
            {/* ── LEFT SHELL ── */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-[#EEEAF8] bg-white p-3 shadow-[0_24px_50px_-32px_rgba(22,2,74,0.28)] mobile-sm:rounded-[2.75rem] mobile-sm:p-3.5 tablet:rounded-[3rem] tablet:p-4">
                {/* Profile strip */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${member.id}-profile`}
                    initial={reduce ? false : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: 6 }}
                    transition={{ duration: 0.35, ease }}
                    className="mb-3 flex flex-wrap items-center gap-2 rounded-full bg-[#F7F4FF] py-1.5 pl-1.5 pr-2 ring-1 ring-[#E8E0F5]"
                  >
                    <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.image}
                        alt=""
                        className="h-full w-full object-cover"
                        style={{ objectPosition: member.objectPosition }}
                      />
                    </span>
                    <div className="min-w-0 flex-1 pr-1">
                      <p className="truncate font-display text-[0.82rem] font-bold leading-tight text-[#16024A]">
                        {member.name}
                      </p>
                      <p className="truncate text-[0.62rem] text-[#16024A]/55">{member.role}</p>
                    </div>
                    <Link
                      href={member.href}
                      className="shrink-0 rounded-full bg-white px-2.5 py-1.5 text-[0.62rem] font-semibold text-[#16024A] ring-1 ring-[#E8E0F5] transition hover:bg-[#F0EBFF]"
                    >
                      See work
                    </Link>
                    <Link
                      href="/book"
                      className="shrink-0 rounded-full bg-[#3B05C4] px-2.5 py-1.5 text-[0.62rem] font-semibold text-white transition hover:bg-[#2C0494]"
                    >
                      Book them
                    </Link>
                  </motion.div>
                </AnimatePresence>

                {/* Portrait plate */}
                <div className="relative overflow-hidden rounded-[1.85rem] bg-[#F7F4FF] ring-[3px] ring-[#F0EBFF] mobile-sm:rounded-[2rem] tablet:rounded-[2.25rem]">
                  <div className="relative aspect-square w-full tablet:aspect-[5/5.15]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={member.id}
                        initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.45, ease }}
                        className="absolute inset-0"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={member.image}
                          alt={member.imageAlt}
                          className="h-full w-full object-cover"
                          style={{ objectPosition: member.objectPosition }}
                          draggable={false}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Floating ask pill on photo */}
                    <motion.div
                      className="absolute bottom-3 left-3 right-3 z-10 tablet:left-4 tablet:right-auto tablet:w-[14rem]"
                      animate={reduce ? undefined : { y: [0, -4, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Link
                        href="/book"
                        className="flex items-center gap-2 rounded-full bg-white px-3 py-2.5 text-[0.78rem] font-semibold text-[#16024A] shadow-[0_12px_28px_-14px_rgba(22,2,74,0.45)] ring-1 ring-[#EEEAF8] transition hover:bg-[#F7F4FF]"
                      >
                        <MessageCircle className="h-4 w-4 text-[#3B05C4]" aria-hidden />
                        Ask {firstName} about {member.tags[0].toLowerCase()}…
                      </Link>
                    </motion.div>
                  </div>
                </div>

                {/* Tags under portrait */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#F7F4FF] px-3 py-1.5 text-[0.7rem] font-semibold text-[#16024A] ring-1 ring-[#E8E0F5]"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="rounded-full bg-[#3B05C4] px-3 py-1.5 text-[0.7rem] font-semibold text-white">
                    {member.focus}
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT CLUSTER ── */}
            <div className="flex min-w-0 flex-col gap-3 tablet:gap-3.5">
              {/* Focus notify pill */}
              <motion.div
                animate={reduce ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              >
                <div className="flex items-center gap-2.5 rounded-full bg-[#16024A] px-4 py-3 text-white shadow-[0_14px_32px_-20px_rgba(22,2,74,0.45)]">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#3B05C4]">
                    <Bell className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <p className="min-w-0 flex-1 truncate text-[0.82rem] font-semibold">
                    Focus: {member.focus}
                  </p>
                </div>
              </motion.div>

              {/* Stats + roster row */}
              <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3">
                <motion.div
                  animate={reduce ? undefined : { y: [0, 4, 0] }}
                  transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                  className="rounded-[1.75rem] bg-[#3B05C4] p-4 text-white shadow-[0_14px_32px_-20px_rgba(59,5,196,0.4)] tablet:rounded-[2rem] tablet:p-5"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${member.id}-stats`}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="font-display text-[2rem] font-bold leading-none tracking-tight tablet:text-[2.35rem]">
                        {member.index}
                      </p>
                      <p className="mt-1 text-[0.78rem] font-semibold text-white/75">on roster</p>
                      <p className="mt-3 text-[0.72rem] leading-snug text-white/60">
                        of 0{total} named owners
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <div className="rounded-[1.75rem] bg-[#EDE7FF] p-3.5 tablet:rounded-[2rem] tablet:p-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
                    The roster
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-1">
                    {teamMembers.map((slide, i) => {
                      const active = i === index;
                      return (
                        <button
                          key={slide.id}
                          type="button"
                          aria-label={`Show ${slide.name}`}
                          aria-current={active}
                          onClick={() => setIndex(i)}
                          className="group flex min-w-0 flex-1 flex-col items-center gap-1.5"
                        >
                          <span
                            className={cn(
                              "relative h-10 w-10 overflow-hidden rounded-full transition tablet:h-11 tablet:w-11",
                              active
                                ? "ring-2 ring-[#3B05C4] ring-offset-2 ring-offset-[#EDE7FF]"
                                : "opacity-70 ring-1 ring-[#16024A]/10 group-hover:opacity-100",
                            )}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={slide.image}
                              alt=""
                              className="h-full w-full object-cover"
                              style={{ objectPosition: slide.objectPosition }}
                            />
                          </span>
                          <span
                            className={cn(
                              "w-full truncate text-center text-[0.55rem] font-semibold",
                              active ? "text-[#16024A]" : "text-[#16024A]/50",
                            )}
                          >
                            {slide.name.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Opinion / “now playing” card */}
              <motion.div
                animate={reduce ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
                className="relative overflow-hidden rounded-[1.75rem] bg-[#16024A] p-4 text-white shadow-[0_18px_40px_-24px_rgba(22,2,74,0.5)] tablet:rounded-[2rem] tablet:p-5"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${member.id}-quote`}
                    initial={reduce ? false : { opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? undefined : { opacity: 0, x: -8 }}
                    transition={{ duration: 0.35, ease }}
                    className="flex items-start gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/45">
                        What they say
                      </p>
                      <p className="mt-2 font-display text-[0.95rem] font-bold leading-snug tablet:text-[1.05rem]">
                        “{member.opinion}”
                      </p>
                      <p className="mt-3 text-[0.72rem] text-white/55">
                        {member.name} · {member.role}
                      </p>
                    </div>
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-2 ring-white/20 tablet:h-16 tablet:w-16">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.image}
                        alt=""
                        className="h-full w-full object-cover"
                        style={{ objectPosition: member.objectPosition }}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                <Link
                  href={member.href}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-[0.75rem] font-semibold text-white transition hover:bg-[#3B05C4]"
                >
                  Open their work area
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </motion.div>

              {/* Does strip */}
              <div className="rounded-[1.5rem] bg-white px-4 py-3.5 shadow-[0_12px_28px_-20px_rgba(22,2,74,0.28)] tablet:rounded-[1.75rem]">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
                  What they own
                </p>
                <p className="mt-1 text-[0.88rem] leading-snug text-[#16024A]">{member.does}</p>
              </div>
            </div>

            {/* ── VERTICAL BADGE (tablet+) ── */}
            <div className="hidden tablet:block">
              <div className="sticky top-28 flex h-full min-h-[22rem] items-center justify-center">
                <div className="flex h-[18rem] w-[2.6rem] items-center justify-center rounded-full bg-[#16024A] shadow-[0_16px_36px_-20px_rgba(22,2,74,0.45)]">
                  <span className="rotate-180 text-[0.72rem] font-semibold tracking-[0.22em] text-white [writing-mode:vertical-rl]">
                    Xkwisit team
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous teammate"
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#16024A] shadow-[0_10px_24px_-16px_rgba(22,2,74,0.4)] ring-1 ring-[#E8E0D4]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {teamMembers.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to ${slide.name}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-7 bg-[#3B05C4]" : "w-2 bg-[#16024A]/20",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next teammate"
              onClick={() => go(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#16024A] text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
