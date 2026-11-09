"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Float, HoverLift, Reveal } from "@/components/marketing/motion/Reveal";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

export type HandledItem = {
  id?: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
  chips?: readonly string[];
  href?: string;
  cta?: string;
};

function Panel({
  image,
  imageAlt,
  chips,
}: {
  image?: string;
  imageAlt?: string;
  chips?: readonly string[];
}) {
  return (
    <div className="relative min-h-[13rem] overflow-hidden rounded-[1.4rem] bg-white">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={imageAlt ?? ""} className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      {chips && chips.length > 0 ? (
        <ul className="relative flex h-full min-h-[13rem] flex-col justify-end gap-2 p-4">
          {chips.slice(0, 3).map((chip, index) => (
            <li key={chip}>
              <Float duration={5.5 + index}>
                <span className="inline-flex max-w-full rounded-2xl bg-white px-3 py-2 text-[0.78rem] font-semibold text-[#16024A] shadow-[0_12px_30px_-18px_rgba(22,2,74,0.7)]">
                  {chip}
                </span>
              </Float>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Card({
  item,
  wide,
}: {
  item: HandledItem;
  wide?: boolean;
}) {
  const inner = (
    <article
      className={cn(
        "h-full rounded-[1.75rem] bg-[#f4f4f4] p-5 mobile-sm:p-7",
      )}
    >
      <div className={cn("grid gap-6", wide && "tablet:grid-cols-2 tablet:items-center")}>
        <div>
          <h3 className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-bold leading-tight tracking-tight text-[#16024A]">
            {item.title}
          </h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-neutral-600">{item.body}</p>
          {item.href && item.cta ? (
            <span className="mt-5 inline-flex items-center gap-2 text-[0.88rem] font-semibold text-[#3B05C4]">
              {item.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          ) : null}
        </div>
        <Panel image={item.image} imageAlt={item.imageAlt} chips={item.chips} />
      </div>
    </article>
  );

  return item.href ? (
    <Link href={item.href} className="block h-full">
      {inner}
    </Link>
  ) : (
    inner
  );
}

export function HandledBento({
  title,
  description,
  items,
}: {
  title: string;
  description?: string;
  items: readonly HandledItem[];
}) {
  const [lead, ...rest] = items;
  if (!lead) return null;

  return (
    <section className="bg-white">
      <Container className="px-4 py-16 mobile-sm:px-5 tablet:px-8 tablet:py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.05] tracking-tight text-[#16024A]">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-[1rem] leading-relaxed text-neutral-600">{description}</p>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-10 space-y-4">
          <Reveal>
            <HoverLift>
              <div id={lead.id}>
                <Card item={lead} wide />
              </div>
            </HoverLift>
          </Reveal>
          {rest.length > 0 ? (
            <ul className="grid gap-4 tablet:grid-cols-2">
              {rest.map((item, index) => (
                <li key={item.id ?? item.title} id={item.id}>
                  <Reveal delay={index * 0.06}>
                    <HoverLift className="h-full">
                      <Card item={item} />
                    </HoverLift>
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
