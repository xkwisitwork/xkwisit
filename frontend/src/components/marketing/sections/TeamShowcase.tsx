"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Flag,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { teamMembers } from "@/config/team";
import { cn } from "@/lib/utils/cn";

const rise = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 280, damping: 24 },
  },
};

export function TeamShowcase() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const member = teamMembers[index]!;
  const total = teamMembers.length;

  function go(delta: number) {
    setIndex((i) => (i + delta + total) % total);
  }

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 7600);
    return () => window.clearInterval(timer);
  }, [reduce, paused, index, total]);

  return (
    <section
      id="team"
      className="relative overflow-x-clip bg-white py-16 mobile-md:py-20 tablet:py-24"
    >
      <Container className="relative px-4 mobile-sm:px-5 tablet:px-8">
        <div
          className="relative mx-auto w-full max-w-5xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            setTilt({ x: 0, y: 0 });
          }}
          onMouseMove={(event) => {
            if (reduce) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            const px = (event.clientX - bounds.left) / bounds.width - 0.5;
            const py = (event.clientY - bounds.top) / bounds.height - 0.5;
            setTilt({ x: py * -5, y: px * 7 });
          }}
        >
          <div style={{ perspective: 1400 }}>
            <motion.div
              className="relative rounded-[2rem] bg-[#3B05C4] px-3 py-4 shadow-[0_40px_80px_-48px_rgba(59,5,196,0.85)] mobile-sm:px-4 tablet:px-7 tablet:py-6"
              animate={reduce ? undefined : { rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.4 }}
              role="region"
              aria-roledescription="carousel"
              aria-label="The team"
            >
              <div className="mb-4 text-center text-white">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/80">
                  The team
                </p>
                <h2 className="mt-2 font-display text-[clamp(1.35rem,3vw,1.85rem)] font-bold leading-tight tracking-tight">
                  The team that solves business problems & drives growth.
                </h2>
                <p className="mx-auto mt-2 max-w-md text-[0.85rem] leading-relaxed text-white/85">
                  One plan. Named owners. Not five people guessing.
                </p>
                <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/70">
                  {member.index} / 0{total}
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={member.id}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid items-stretch gap-3 tablet:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] tablet:gap-4"
                >
                  <div className="relative min-h-[24rem] tablet:min-h-full">
                    <motion.div
                      className="absolute inset-0 overflow-hidden rounded-[1.6rem] bg-[#16024A]"
                      initial={reduce ? false : { scale: 1.08, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- team photos must render reliably from /public */}
                      <img
                        src={member.image}
                        alt={member.imageAlt}
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ objectPosition: member.objectPosition }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
                      <p className="absolute left-4 right-14 top-4 text-[0.58rem] font-semibold uppercase leading-relaxed tracking-[0.16em] text-white">
                        In their words · {member.name.split(" ")[0]}
                      </p>
                    </motion.div>

                    <motion.p
                      initial={reduce ? false : { opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 260,
                        damping: 22,
                      }}
                      className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rotate-180 rounded-full bg-white px-2.5 py-4 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#16024A] shadow-[0_10px_24px_-16px_rgba(22,2,74,0.6)] [writing-mode:vertical-rl]"
                    >
                      {member.role.split(" ").slice(-1)[0]}
                    </motion.p>

                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.22,
                        type: "spring",
                        stiffness: 260,
                        damping: 22,
                      }}
                      className="absolute inset-x-3 bottom-3 z-10"
                    >
                      <div className="rounded-2xl bg-white px-4 py-3 text-[#16024A] shadow-[0_16px_30px_-20px_rgba(22,2,74,0.55)]">
                        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#636363]">
                          What they own
                        </p>
                        <p className="mt-1 font-display text-[0.95rem] font-bold leading-snug tracking-tight">
                          {member.focus}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="flex min-w-0 flex-col gap-2.5"
                    initial="hidden"
                    animate="show"
                    variants={{
                      show: {
                        transition: { staggerChildren: 0.07, delayChildren: 0.12 },
                      },
                    }}
                  >
                    <motion.div
                      variants={rise}
                      className="relative rounded-[1.4rem] bg-white px-4 pb-4 pt-3.5 text-[#16024A]"
                    >
                      <span className="absolute -right-1 -top-1 flex h-11 w-11 items-center justify-center rounded-full bg-[#3B05C4] text-white shadow-[0_10px_24px_-14px_rgba(22,2,74,0.45)]">
                        <svg viewBox="0 0 40 40" className="h-5 w-5" aria-hidden>
                          <path
                            d="M11 11L20 20M20 20L29 11M20 20L11 29M20 20L29 29"
                            stroke="currentColor"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <div className="flex items-center gap-3 pr-8">
                        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={member.image}
                            alt=""
                            className="h-full w-full object-cover"
                            style={{ objectPosition: member.objectPosition }}
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#636363]">
                            {member.role}
                          </p>
                          <p className="truncate font-display text-[1.45rem] font-bold leading-none tracking-tight tablet:text-[1.65rem]">
                            {member.name}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-[0.78rem] leading-snug text-[#636363]">
                        {member.focus}
                      </p>
                      <Link
                        href={member.href}
                        className="mt-3 inline-flex items-center gap-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#16024A]"
                      >
                        See their work area
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </motion.div>

                    <motion.div variants={rise} className="flex flex-wrap gap-2">
                      {member.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/80 bg-white px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[#16024A]"
                        >
                          #{tag.replace(/\s+/g, "")}
                        </span>
                      ))}
                    </motion.div>

                    <motion.div
                      variants={rise}
                      className="flex items-center gap-3 rounded-[1.4rem] bg-white px-3.5 py-3 text-[#16024A]"
                    >
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={teamMembers[(index + 1) % total]!.image}
                          alt=""
                          className="h-full w-full object-cover"
                          style={{
                            objectPosition:
                              teamMembers[(index + 1) % total]!.objectPosition,
                          }}
                        />
                      </span>
                      <p className="min-w-0 flex-1 text-[0.78rem] font-semibold leading-snug">
                        {member.does}
                      </p>
                      <Flag className="h-4 w-4 shrink-0 text-[#3B05C4]" aria-hidden />
                    </motion.div>

                    <motion.div
                      variants={rise}
                      className="rounded-[1.4rem] bg-white px-4 py-3.5 text-[#16024A]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-[#16024A] px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-white">
                          Their view
                        </span>
                        <span className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[#636363]">
                          {member.index} of 0{total}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-[clamp(1.2rem,2.2vw,1.55rem)] font-bold leading-[1.05] tracking-tight">
                        What {member.name.split(" ")[0]} believes
                      </h3>
                      <p className="mt-2 line-clamp-5 text-[0.78rem] leading-relaxed text-[#636363]">
                        “{member.opinion}”
                      </p>
                    </motion.div>

                    <motion.div
                      variants={rise}
                      className="flex items-center justify-between gap-3 rounded-full bg-white px-3 py-2.5 text-[#16024A]"
                    >
                      <span className="flex items-center gap-2">
                        <span className="flex">
                          {teamMembers.slice(0, 3).map((mate, i) => (
                            <span
                              key={mate.id}
                              className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-white"
                              style={{ marginLeft: i === 0 ? 0 : -8 }}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={mate.image}
                                alt=""
                                className="h-full w-full object-cover"
                                style={{ objectPosition: mate.objectPosition }}
                              />
                            </span>
                          ))}
                        </span>
                        <span className="text-[0.62rem] font-bold uppercase leading-tight tracking-[0.06em]">
                          0{total}
                          <span className="block font-semibold text-[#636363]">
                            people
                          </span>
                        </span>
                      </span>
                      <Link
                        href="/about/team"
                        className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#3B05C4]"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                        Full team
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <p className="mt-4 text-center text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/75">
                Meet who owns the stuck part
              </p>
            </motion.div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous teammate"
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#16024A] shadow-[0_10px_24px_-16px_rgba(22,2,74,0.45)]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {teamMembers.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show ${slide.name}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-7 bg-[#3B05C4]" : "w-1.5 bg-[#E7DEFF]",
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
        </div>
      </Container>
    </section>
  );
}
