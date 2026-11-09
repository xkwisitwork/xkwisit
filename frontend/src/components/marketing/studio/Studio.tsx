"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Reveal } from "@/components/marketing/motion/Reveal";
import { BarPlot, type PlotPoint } from "@/components/marketing/studio/Plot";
import { cn } from "@/lib/utils/cn";

export type StudioChapter = {
  title: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  cta?: string;
  chips?: readonly string[];
  kicker?: string;
};

function pad(index: number) {
  return String(index).padStart(2, "0");
}

function Wrap({ href, children, className }: { href?: string; children: ReactNode; className?: string }) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function StudioChapters({
  kicker,
  title,
  description,
  items,
}: {
  kicker?: string;
  title: string;
  description?: string;
  items: readonly StudioChapter[];
}) {
  const lead = items.find((item) => item.image) ?? items[0];

  return (
    <>
      <section className="bg-white text-[#16024A]">
        <div className="px-4 py-16 tablet:px-8 tablet:py-24">
          <div className="text-center">
            {kicker ? (
              <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#3B05C4]">
                {kicker}
              </p>
            ) : null}
            <h2 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold leading-[1.15] tracking-tight">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-[1rem] leading-relaxed text-neutral-600">{description}</p>
            ) : null}
          </div>
          <div className="mt-10 grid items-center gap-10 tablet:grid-cols-2">
          <div className="relative">
            {lead?.image ? (
              <div className="overflow-hidden rounded-[1.75rem] bg-[#f4f4f6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lead.image} alt={lead.imageAlt ?? ""} className="h-[24rem] w-full object-cover" />
              </div>
            ) : (
              <div className="flex h-[24rem] items-end rounded-[1.75rem] bg-[#3B05C4] p-8 text-white">
                <p className="font-display text-[2rem] font-bold leading-tight">{lead?.title}</p>
              </div>
            )}
            {lead ? (
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] tablet:right-auto tablet:max-w-xs">
                {lead.kicker ? (
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#3B05C4]">{lead.kicker}</p>
                ) : null}
                <p className="mt-1 font-display text-[1.05rem] font-bold leading-snug">{lead.title}</p>
              </div>
            ) : null}
          </div>
          <div>
            <ul>
              {items.slice(0, 4).map((item) => (
                <li key={item.title} className="border-b border-neutral-200 py-3">
                  <Wrap href={item.href} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#3B05C4]" aria-hidden />
                    <span>
                      <span className="block font-display text-[1rem] font-bold">{item.title}</span>
                      {item.body ? (
                        <span className="mt-1 block text-[0.88rem] leading-snug text-neutral-500">{item.body}</span>
                      ) : null}
                    </span>
                  </Wrap>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-[#16024A]">
        <div className="px-4 py-16 tablet:px-8 tablet:py-24">
          <div className="text-center">
            <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.8rem)] font-bold leading-[1.15] tracking-tight">
              {title}
            </h2>
            <p className="mt-3 font-display text-[0.85rem] font-semibold text-[#3B05C4]">{pad(items.length)}</p>
          </div>
          <ul className="mt-8 grid gap-4 tablet:grid-cols-2">
            {items.map((item, index) => (
              <li key={`${item.title}-${index}`}>
                <Reveal>
                  <Wrap href={item.href} className="block h-full">
                    <article className="h-full overflow-hidden rounded-[1.4rem] border border-[#16024A]/10 bg-white shadow-[0_18px_40px_-28px_rgba(22,2,74,0.35)]">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt={item.imageAlt ?? ""} className="h-44 w-full object-cover" />
                      ) : null}
                      <div className="p-5">
                        <p className="font-display text-[0.75rem] font-semibold text-[#3B05C4]">{pad(index + 1)}</p>
                        <h3 className="mt-2 font-display text-[1.2rem] font-bold leading-snug">{item.title}</h3>
                        {item.body ? (
                          <p className="mt-2 text-[0.9rem] leading-relaxed text-neutral-600">{item.body}</p>
                        ) : null}
                        {item.chips && item.chips.length > 0 ? (
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {item.chips.map((chip) => (
                              <li key={chip} className="rounded-full bg-[#F4F0FF] px-2.5 py-1 text-[0.72rem] text-[#16024A]">
                                {chip}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {item.cta ? (
                          <span className="mt-4 inline-flex items-center gap-1 text-[0.85rem] font-semibold text-[#3B05C4]">
                            {item.cta}
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                          </span>
                        ) : null}
                      </div>
                    </article>
                  </Wrap>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export function StudioCarousel({
  title,
  description,
  items,
}: {
  title: string;
  description?: string;
  items: readonly { title: string; body?: string; href?: string; kicker?: string }[];
}) {
  const scroller = useRef<HTMLUListElement>(null);

  function move(direction: number) {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.max(node.clientWidth * 0.8, 280), behavior: "smooth" });
  }

  return (
    <section className="bg-white text-[#16024A]">
      <div className="px-4 py-16 tablet:px-8 tablet:py-24">
        <div className="text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.15] tracking-tight">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-[0.98rem] leading-relaxed text-neutral-600">{description}</p>
          ) : null}
        </div>
        <div className="relative mt-8">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => move(-1)}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#16024A]/10 bg-white text-[#16024A] shadow-sm tablet:flex"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <ul
            ref={scroller}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2 tablet:px-14"
          >
            {items.map((item, index) => {
              const card = (
                <article className="flex h-full flex-col rounded-[1.4rem] border border-[#16024A]/10 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(22,2,74,0.3)]">
                  <span className="font-display text-[0.75rem] font-semibold text-[#3B05C4]">{pad(index + 1)}</span>
                  {item.kicker ? (
                    <span className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
                      {item.kicker}
                    </span>
                  ) : null}
                  <h3 className="mt-3 font-display text-[1.2rem] font-bold leading-snug">{item.title}</h3>
                  {item.body ? (
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-neutral-600">{item.body}</p>
                  ) : null}
                </article>
              );
              return (
                <li key={`${item.title}-${index}`} className="w-[min(85vw,320px)] shrink-0 snap-start">
                  {item.href ? (
                    <Link href={item.href} className="block h-full">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            aria-label="Next"
            onClick={() => move(1)}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#16024A]/10 bg-white text-[#16024A] shadow-sm tablet:flex"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}

export function StudioLedger({
  title,
  description,
  items,
}: {
  title: string;
  description?: string;
  items: readonly { title: string; body?: string; href?: string; kicker?: string }[];
}) {
  return (
    <section className="bg-white text-[#16024A]">
      <div className="px-4 py-16 tablet:px-8 tablet:py-24">
        <div className="text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.15] tracking-tight">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-[0.98rem] leading-relaxed text-neutral-600">{description}</p>
          ) : null}
        </div>
        <ul className={cn("mt-8 grid gap-4", items.length > 3 ? "tablet:grid-cols-2" : "tablet:grid-cols-3")}>
          {items.map((item, index) => (
            <li key={`${item.title}-${index}`}>
              <Wrap href={item.href} className="block h-full">
                <article className="h-full rounded-[1.4rem] border border-[#16024A]/10 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(22,2,74,0.3)]">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[0.75rem] font-semibold text-[#3B05C4]">{pad(index + 1)}</span>
                    {item.kicker ? (
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
                        {item.kicker}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 font-display text-[1.15rem] font-bold leading-snug">{item.title}</h3>
                  {item.body ? <p className="mt-2 text-[0.9rem] leading-relaxed text-neutral-600">{item.body}</p> : null}
                </article>
              </Wrap>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function StudioSplit({
  leftTitle,
  rightTitle,
  left,
  right,
}: {
  leftTitle: string;
  rightTitle: string;
  left: readonly string[];
  right: readonly string[];
}) {
  return (
    <section className="bg-white">
      <div className="grid gap-4 px-4 py-16 tablet:grid-cols-2 tablet:px-8 tablet:py-24">
        <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-6 text-center tablet:p-8">
          <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold leading-[1.15] tracking-tight text-[#16024A]">
            {leftTitle}
          </h2>
          <ul className="mt-6 space-y-3">
            {left.map((item, index) => (
              <li key={`${item}-${index}`} className="flex items-start gap-3 text-[0.98rem] leading-snug">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#3B05C4]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-[1.75rem] bg-[#3B05C4] p-6 text-center text-white tablet:p-8">
          <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold leading-[1.15] tracking-tight">
            {rightTitle}
          </h2>
          <ul className="mt-6 space-y-3">
            {right.map((item, index) => (
              <li key={`${item}-${index}`} className="flex items-start gap-3 text-[0.98rem] leading-snug text-white/90">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export function StudioNameRow({ names }: { names: readonly string[] }) {
  if (names.length === 0) return null;
  return (
    <section className="bg-white">
      <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-b border-[#16024A]/10 px-4 pb-10 tablet:px-8">
        {names.map((name) => (
          <li key={name} className="font-display text-[0.85rem] font-semibold text-[#16024A]/45">
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function StudioStatement({
  body,
  href,
  label,
  title,
  accent,
}: {
  body: string;
  href: string;
  label: string;
  title: string;
  accent?: string;
}) {
  return (
    <section className="bg-white">
      <div className="px-4 py-16 text-center tablet:px-8 tablet:py-24">
        <h2 className="font-display text-[clamp(2rem,4.2vw,3.3rem)] font-bold leading-[1.15] tracking-tight text-[#16024A]">
          {title}
          {accent ? <span className="text-[#3B05C4]"> {accent}</span> : null}
        </h2>
        <p className="mt-4 text-[0.98rem] leading-relaxed text-neutral-600">{body}</p>
        <Link
          href={href}
          className="mt-6 inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full bg-[#16024A] px-5 text-[0.9rem] font-semibold text-white hover:bg-[#3B05C4]"
        >
          {label}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

export function StudioFigures({
  label,
  items,
}: {
  label: string;
  items: readonly { value: string; label: string }[];
}) {
  if (items.length < 3) return null;
  return (
    <section className="bg-white">
      <div className="grid items-end justify-items-center gap-6 border-y border-neutral-200 px-4 py-10 text-center tablet:grid-cols-4 tablet:px-8">
        <p className="font-display text-[0.85rem] font-semibold text-neutral-500">{label}</p>
        {items.slice(0, 3).map((item) => (
          <div key={item.label}>
            <p className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-none tracking-tight text-[#16024A]">
              {item.value}
            </p>
            <p className="mt-2 text-[0.85rem] text-neutral-500">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function StudioBoard({
  title,
  items,
  chartCaption,
  chart,
  figure,
}: {
  title: string;
  items: readonly string[];
  chartCaption: string;
  chart: readonly PlotPoint[];
  figure: { value: string; label: string; note?: string };
}) {
  return (
    <section className="bg-[#f6f6f8]">
      <div className="px-4 py-16 tablet:px-8 tablet:py-24">
        <h2 className="text-center font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.15] tracking-tight text-[#16024A]">
          {title}
        </h2>
        <div className="mt-8 grid items-stretch gap-4 tablet:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[1.75rem] bg-[#3B05C4] p-6 text-white tablet:p-8">
          <ul className="space-y-3">
            {items.slice(0, 3).map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-snug">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <div className="relative min-h-[16rem]">
          <article className="rounded-[1.5rem] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.4)] tablet:mr-10">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-neutral-500">{chartCaption}</p>
            <div className="mt-4">
              <BarPlot data={chart} />
            </div>
          </article>
          <article className="mt-4 rounded-[1.5rem] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.4)] tablet:absolute tablet:bottom-0 tablet:right-0 tablet:mt-0 tablet:w-52">
            <p className="font-display text-[1.35rem] font-bold leading-none text-[#16024A]">{figure.value}</p>
            <p className="mt-2 text-[0.8rem] text-neutral-500">{figure.label}</p>
            {figure.note ? <p className="mt-2 text-[0.75rem] leading-snug text-neutral-500">{figure.note}</p> : null}
          </article>
        </div>
        </div>
      </div>
    </section>
  );
}
