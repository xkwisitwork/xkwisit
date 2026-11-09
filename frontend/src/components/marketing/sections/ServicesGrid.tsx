"use client";

import { useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Code2,
  Bot,
  Megaphone,
  Palette,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { divisions } from "@/config/divisions";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const scenes: Record<string, { src: string; alt: string; position: string }> = {
  technology: {
    src: "/images/desks/technology.jpg",
    alt: "Laptop and phone showing a professional website with order and sales notifications",
    position: "object-center",
  },
  growth: {
    src: "/images/desks/growth.jpg",
    alt: "Social media manager planning content and posting times on her phone",
    position: "object-[center_20%]",
  },
  brand: {
    src: "/images/desks/brand.jpg",
    alt: "Podcast and content studio with cameras, lights, and interview chairs",
    position: "object-center",
  },
  ai: {
    src: "/images/desks/ai.jpg",
    alt: "Two robotic hands reaching toward each other, representing AI tools",
    position: "object-center",
  },
  intelligence: {
    src: "/images/desks/intelligence.jpg",
    alt: "Revenue dashboard with channel breakdown and sales overview charts",
    position: "object-[center_30%]",
  },
};

const marks: Record<string, { Icon: LucideIcon; color: string }> = {
  technology: { Icon: Code2, color: "#3B05C4" },
  growth: { Icon: Megaphone, color: "#FC3FE3" },
  brand: { Icon: Palette, color: "#5B45FF" },
  ai: { Icon: Bot, color: "#C40404" },
  intelligence: { Icon: BarChart3, color: "#16024A" },
};

export function ServicesGrid() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section id="what-we-do" className="relative overflow-x-clip bg-white">
      <Container className="relative px-4 py-16 mobile-sm:px-5 tablet:px-8 tablet:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#3B05C4]">
            What we can do for you
          </p>
          <h2 className="mt-3 text-balance font-display text-[clamp(2.1rem,4.4vw,3.35rem)] font-bold leading-[1.02] tracking-tight text-[#16024A]">
            Five desks.{" "}
            <span className="tablet:whitespace-nowrap">One goal: more profit.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[0.98rem] leading-relaxed text-neutral-600">
            Website and payments. Getting customers. Brand that is clear. AI your team will
            use. Numbers you can trust. Start with the desk that is blocking sales today -
            not every desk at once.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous desk"
            onClick={() =>
              setActive((index) => (index + divisions.length - 1) % divisions.length)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E7DEFF] bg-white text-[#16024A]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
          <p className="min-w-[4.5rem] text-center font-display text-[0.72rem] font-semibold tabular-nums tracking-[0.14em] text-[#3B05C4]">
            {divisions[active]!.index}
            <span className="text-neutral-500"> / 05</span>
          </p>
          <button
            type="button"
            aria-label="Next desk"
            onClick={() => setActive((index) => (index + 1) % divisions.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16024A] text-white"
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="mt-4 rounded-[2rem]">
          <div className="flex h-[22rem] gap-1.5 tablet:h-[28rem] tablet:gap-3">
            {divisions.map((desk, index) => {
              const open = index === active;
              const scene = scenes[desk.id] ?? scenes.technology!;
              const mark = marks[desk.id] ?? marks.technology!;
              const Icon = mark.Icon;

              return (
                <div
                  key={desk.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={open}
                  aria-label={open ? desk.title : `Open ${desk.title}`}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActive(index);
                    }
                  }}
                  className={cn(
                    "relative h-full min-w-0 cursor-pointer overflow-hidden rounded-[1.75rem] outline-none focus-visible:ring-2 focus-visible:ring-[#3B05C4] tablet:rounded-[2rem]",
                    reduce
                      ? "transition-none"
                      : "ease-[cubic-bezier(0.77,0,0.18,1)] transition-[flex-grow,flex-basis,width] duration-700",
                    open
                      ? "w-auto shrink grow basis-0"
                      : "w-9 shrink-0 grow-0 basis-9 tablet:w-16 tablet:basis-16",
                  )}
                >
                  {/* Native img: next/image optimizer was returning empty bytes for these assets. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={scene.src}
                    alt={open ? scene.alt : ""}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover",
                      scene.position,
                    )}
                    draggable={false}
                  />
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-[#16024A]/70 via-[#16024A]/10 to-transparent"
                    aria-hidden
                  />

                  {open ? (
                    <div className="absolute inset-x-0 bottom-0 z-10 p-3 tablet:p-5">
                      <div className="flex max-w-xl items-center gap-3 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 shadow-[0_12px_30px_-18px_rgba(22,2,74,0.65)]">
                        <span
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white tablet:h-10 tablet:w-10"
                          style={{ color: mark.color }}
                        >
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-display text-[0.92rem] font-bold leading-tight text-[#16024A] tablet:text-[1.05rem]">
                            {desk.title}
                          </span>
                          <span className="block truncate text-[0.72rem] text-neutral-600 tablet:text-[0.8rem]">
                            {desk.stake}
                          </span>
                        </span>
                      </div>
                      <p className="mt-3 hidden max-w-lg text-[0.86rem] leading-relaxed text-white tablet:block">
                        {desk.outcome}
                      </p>
                      <ul className="mt-3 hidden gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] tablet:flex [&::-webkit-scrollbar]:hidden">
                        {desk.services.map((item) => (
                          <li
                            key={item}
                            className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-[0.68rem] font-medium text-white"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-wrap items-center gap-4">
                        <Link
                          href={ROUTES.book}
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-white"
                        >
                          Book this desk
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                        <Link
                          href={desk.href}
                          onClick={(event) => event.stopPropagation()}
                          className="text-[0.8rem] font-semibold text-white/80 underline-offset-4 hover:underline"
                        >
                          {desk.id === "technology"
                            ? "See the technical work"
                            : "Open the service"}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <span className="absolute bottom-3 left-1/2 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-white shadow-[0_8px_18px_-10px_rgba(22,2,74,0.7)] tablet:bottom-4 tablet:h-10 tablet:w-10">
                      <Icon
                        className="h-3.5 w-3.5 tablet:h-4 tablet:w-4"
                        style={{ color: mark.color }}
                        aria-hidden
                      />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-xl text-center tablet:hidden">
          <p className="text-[0.92rem] leading-relaxed text-neutral-700">
            {divisions[active]!.outcome}
          </p>
          <ul className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {divisions[active]!.services.map((item) => (
              <li
                key={item}
                className="shrink-0 rounded-full bg-[#F4F0FF] px-2.5 py-1 text-[0.68rem] font-medium text-[#16024A]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
