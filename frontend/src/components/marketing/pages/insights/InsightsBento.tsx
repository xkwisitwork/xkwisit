"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export type InsightNote = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
};

const stance = [
  {
    title: "Field notes",
    body: "Written from live Monday numbers - not recycled thought-leadership templates.",
  },
  {
    title: "Short on purpose",
    body: "If it cannot help an owner decide this week, it does not ship.",
  },
  {
    title: "Tied to desks",
    body: "Each note points at brand, demand, sales, or systems - so you know where to act.",
  },
] as const;

const categories = [
  { name: "Strategy", key: "strategy", body: "When to spend, when to stop, how to pick the problem." },
  { name: "Ops", key: "ops", body: "Scoreboards, ownership, and rituals that survive WhatsApp chaos." },
  { name: "Market", key: "market", body: "African buying paths - WhatsApp, offline close, trust cues." },
] as const;

const desks = ["Brand", "Demand", "Sales", "Systems"] as const;

const faces = [
  "/images/people/method-monday.jpg",
  "/images/people/method-owner.jpg",
  "/images/people/method-spend.jpg",
] as const;

function Card({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className={cn(
        "rounded-[1.7rem] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(22,2,74,0.35)]",
        className,
      )}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.article>
  );
}

export function InsightsBento({ posts }: { posts: readonly InsightNote[] }) {
  const lead = posts[0];
  const rest = posts.slice(1);
  const feature = posts[2] ?? posts[1];

  return (
    <section className="bg-[#ececef] px-4 py-12 text-[#16024A] tablet:px-8 tablet:py-16">
      <div className="grid items-stretch gap-4 tablet:grid-cols-2 laptop:grid-cols-12">
        {lead ? (
          <Card className="flex flex-col tablet:col-span-2 laptop:col-span-8" delay={0.02}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={faces[0]}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-display text-[1.05rem] font-bold leading-tight">{lead.title}</h2>
                  <p className="text-[0.75rem] text-neutral-400">Strategy</p>
                </div>
              </div>
              <Link
                href={`/insights/${lead.slug}`}
                aria-label={`Read ${lead.title}`}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#3B05C4] hover:bg-[#F4F0FF]"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-neutral-600">{lead.excerpt}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {categories.map((item) => (
                <li
                  key={item.name}
                  className="rounded-full bg-[#F4F0FF] px-3 py-1 text-[0.75rem] font-semibold text-[#3B05C4]"
                >
                  {item.name}
                </li>
              ))}
            </ul>
            <Link
              href={`/insights/${lead.slug}`}
              className="mt-5 inline-flex items-center gap-1 whitespace-nowrap text-[0.88rem] font-semibold text-[#3B05C4]"
            >
              Read the note
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </Card>
        ) : null}

        <Card className="tablet:col-span-2 laptop:col-span-4" delay={0.06}>
          <h2 className="font-display text-[1.15rem] font-bold leading-tight">
            Read one note. Pick one action.
          </h2>
          <p className="mt-2 text-[0.82rem] leading-relaxed text-neutral-500">
            Insights are not a binge library. Take the one idea that matches your stuck part and put an
            owner on it.
          </p>
          <ul className="mt-4 space-y-3">
            {rest.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="block rounded-2xl bg-[#f6f6f8] px-3 py-3 hover:bg-[#F4F0FF]"
                >
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
                    {post.category}
                  </span>
                  <span className="mt-1 block font-display text-[0.95rem] font-bold leading-snug">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="flex flex-col justify-between laptop:col-span-3" delay={0.08}>
          <div className="flex">
            {faces.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                className="-ml-3 h-12 w-12 rounded-full border-2 border-white object-cover first:ml-0"
              />
            ))}
          </div>
          <div className="mt-6">
            <p className="font-display text-[1.35rem] font-bold leading-tight">3 notes</p>
            <p className="mt-1 text-[0.82rem] text-neutral-500">Strategy · Ops · Market</p>
          </div>
        </Card>

        <Card className="laptop:col-span-5" delay={0.1}>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-neutral-400">
            Editorial
          </p>
          <h2 className="mt-2 font-display text-[1.45rem] font-bold leading-tight">
            How we write field notes.
          </h2>
          <p className="mt-2 text-[0.88rem] leading-relaxed text-neutral-500">{stance[0].body}</p>
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-neutral-100 bg-[#f7f7f8] p-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3B05C4] text-[0.7rem] font-bold text-white">
              01
            </span>
            <div>
              <p className="font-display text-[0.92rem] font-bold">{stance[1].title}</p>
              <p className="mt-1 text-[0.8rem] leading-relaxed text-neutral-500">{stance[1].body}</p>
            </div>
          </div>
        </Card>

        <Card className="laptop:col-span-4" delay={0.12}>
          <p className="text-[0.78rem] text-neutral-400">Use on Monday</p>
          <p className="mt-3 font-display text-[2.4rem] font-bold leading-none tracking-tight">Monday</p>
          <p className="mt-2 font-display text-[1.05rem] font-bold text-neutral-700">One action</p>
          <div className="mt-6 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={faces[1]} alt="" className="h-9 w-9 rounded-full object-cover" />
            <p className="text-[0.82rem] leading-snug text-neutral-500">Live Monday numbers</p>
          </div>
        </Card>

        <Card className="flex flex-col tablet:col-span-2 laptop:col-span-5 laptop:row-span-2" delay={0.14}>
          <h2 className="font-display text-[1.2rem] font-bold">What the tags mean.</h2>
          <ul className="mt-4 flex-1 divide-y divide-neutral-100">
            {categories.map((item) => {
              const match = posts.find((post) => post.category === item.key);
              const href = match ? `/insights/${match.slug}` : ROUTES.insights;
              return (
                <li key={item.name} className="flex items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[0.95rem] font-bold">{item.name}</p>
                    <p className="mt-0.5 text-[0.78rem] leading-snug text-neutral-500">{item.body}</p>
                  </div>
                  <Link
                    href={href}
                    aria-label={`Read the ${item.name} note`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4f4f6] text-[#16024A] hover:bg-[#3B05C4] hover:text-white"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={lead ? `/insights/${lead.slug}` : ROUTES.insights}
            className="mt-4 inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-[#16024A] px-4 py-2.5 text-[0.85rem] font-semibold text-white hover:bg-[#3B05C4]"
          >
            Read one note
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={faces[2]} alt="" className="h-6 w-6 rounded-full object-cover" />
          </Link>
        </Card>

        <Card className="tablet:col-span-2 laptop:col-span-7" delay={0.16}>
          <div className="rounded-2xl bg-[#f6f6f8] px-4 py-3">
            <p className="font-display text-[0.95rem] font-bold">{stance[2].title}</p>
            <p className="mt-1 text-[0.82rem] leading-relaxed text-neutral-500">{stance[2].body}</p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
              {desks.map((desk) => (
                <li
                  key={desk}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-[0.78rem] font-semibold"
                >
                  {desk}
                </li>
              ))}
          </ul>
        </Card>

        {feature ? (
          <Card className="overflow-hidden p-0 laptop:col-span-4" delay={0.18}>
            <Link href={`/insights/${feature.slug}`} className="flex h-full flex-col">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/levers/demand-phone.jpg"
                alt=""
                className="h-28 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
                  {feature.category}
                </p>
                <h3 className="mt-1 font-display text-[1.05rem] font-bold leading-snug">{feature.title}</h3>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-neutral-500">{feature.excerpt}</p>
              </div>
            </Link>
          </Card>
        ) : null}

        <Card className="flex flex-col items-start justify-between laptop:col-span-3" delay={0.2}>
          <span className="font-display text-[0.95rem] font-bold tracking-tight text-[#3B05C4]">
            Xkwisit
          </span>
          <Link
            href={ROUTES.book}
            className="mt-6 inline-flex items-center gap-1 whitespace-nowrap font-display text-[1.15rem] font-bold leading-tight text-[#16024A] hover:text-[#3B05C4]"
          >
            Book a strategy call
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </Card>
      </div>
    </section>
  );
}
