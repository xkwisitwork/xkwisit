"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

const tilts = [-7, 5, -3, 6, -5, 4];

export function ClinicCollage({
  title,
  description,
  items,
}: {
  title: string;
  description?: string;
  items: readonly { title: string; image: string; imageAlt?: string; href?: string }[];
}) {
  const reduce = useReducedMotion();

  return (
    <section className="bg-white">
      <Container className="px-4 py-16 mobile-sm:px-5 tablet:px-8 tablet:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.08] tracking-tight text-[#16024A]">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-[1rem] leading-relaxed text-neutral-600">{description}</p>
          ) : null}
        </div>
        <ul className="mt-12 flex gap-4 overflow-x-auto pb-6 tablet:justify-center tablet:overflow-visible">
          {items.map((item, index) => {
            const card = (
              <motion.article
                className="relative h-72 w-52 shrink-0 overflow-hidden rounded-[1.6rem] bg-[#f4f4f4] shadow-[0_18px_40px_-28px_rgba(22,2,74,0.45)]"
                style={{ rotate: reduce ? 0 : tilts[index % tilts.length] }}
                whileHover={reduce ? undefined : { rotate: 0, y: -8 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.imageAlt ?? ""} className="h-full w-full object-cover" />
                <span className="absolute bottom-3 left-3 right-3 rounded-full bg-white px-3 py-1.5 text-center text-[0.75rem] font-semibold text-[#16024A]">
                  {item.title}
                </span>
              </motion.article>
            );
            return (
              <li key={item.title} className="tablet:-mx-3">
                {item.href ? <Link href={item.href}>{card}</Link> : card}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export function ClinicFocus({
  title,
  description,
  image,
  imageAlt = "",
  items,
}: {
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  items: readonly { title: string; body?: string; href?: string }[];
}) {
  return (
    <section className="bg-white">
      <Container className="grid items-center gap-8 px-4 py-8 mobile-sm:px-5 tablet:grid-cols-[0.9fr_1.1fr_0.9fr] tablet:px-8 tablet:py-16">
        <div>
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold leading-[1.08] tracking-tight text-[#16024A]">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-[0.95rem] leading-relaxed text-neutral-600">{description}</p>
          ) : null}
        </div>
        <div className="overflow-hidden rounded-[1.75rem] bg-[#f4f4f4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt} className="h-80 w-full object-cover tablet:h-[28rem]" />
        </div>
        <ul className="space-y-2">
          {items.map((item) => {
            const row = (
              <span className="flex items-center justify-between gap-3 rounded-2xl px-3 py-3 hover:bg-[#f4f4f4]">
                <span>
                  <span className="block font-display text-[0.95rem] font-bold text-[#16024A]">{item.title}</span>
                  {item.body ? (
                    <span className="mt-1 block text-[0.8rem] leading-snug text-neutral-500">{item.body}</span>
                  ) : null}
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f4f4f4] text-[#16024A]">
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </span>
            );
            return (
              <li key={item.title}>
                {item.href ? <Link href={item.href}>{row}</Link> : row}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export function ClinicRow({
  title,
  description,
  items,
}: {
  title: string;
  description?: string;
  items: readonly { title: string; body: string; href?: string }[];
}) {
  return (
    <section className="bg-white">
      <Container className="px-4 py-14 mobile-sm:px-5 tablet:px-8 tablet:py-20">
        <h2 className="max-w-xl font-display text-[clamp(1.6rem,3vw,2.3rem)] font-bold leading-[1.1] tracking-tight text-[#16024A]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-neutral-600">{description}</p>
        ) : null}
        <ul className={cn("mt-8 grid gap-3", items.length > 3 ? "tablet:grid-cols-2 laptop:grid-cols-4" : "tablet:grid-cols-3")}>
          {items.map((item) => {
            const card = (
              <article className="h-full rounded-[1.4rem] bg-[#f4f4f4] p-5">
                <h3 className="font-display text-[1rem] font-bold text-[#16024A]">{item.title}</h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-neutral-600">{item.body}</p>
              </article>
            );
            return (
              <li key={item.title}>
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
      </Container>
    </section>
  );
}
