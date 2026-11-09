"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { HoverLift, Reveal } from "@/components/marketing/motion/Reveal";
import { AreaPlot } from "@/components/marketing/studio/Plot";
import { Container } from "@/components/layout/Container";
import { ROUTES, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function PillLink({
  href,
  children,
  tone = "ink",
}: {
  href: string;
  children: ReactNode;
  tone?: "ink" | "white";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center gap-3 rounded-full pl-5 pr-1.5 text-[0.9rem] font-semibold",
        tone === "ink" && "bg-[#16024A] text-white hover:bg-[#3B05C4]",
        tone === "white" && "bg-white text-[#16024A]",
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full",
          tone === "ink" && "bg-white text-[#16024A]",
          tone === "white" && "bg-[#16024A] text-white",
        )}
        aria-hidden
      >
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

export function SolteraHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt = "",
  stats,
  series,
  seriesCaption,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  stats?: readonly { value: string; label: string }[];
  series?: readonly { label: string; value: number }[];
  seriesCaption?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  const reduce = useReducedMotion();

  const shown = stats?.slice(0, 3) ?? [];

  return (
    <section className="bg-white text-[#16024A]">
      <div className="px-4 py-14 tablet:px-8 tablet:py-20">
        <div className="text-center">
          <p className="inline-flex rounded-full border border-[#3B05C4]/20 bg-[#F4F0FF] px-3 py-1 font-display text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#3B05C4]">
            {eyebrow}
          </p>
          <motion.h1
            className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4rem)] font-bold leading-[1.12] tracking-tight text-[#16024A] [&_span]:text-[#3B05C4]"
            initial={reduce ? false : { y: 18 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {title}
          </motion.h1>
        </div>
        <div className="mt-10 grid items-center gap-12 tablet:grid-cols-[1.05fr_0.95fr]">
        <div className="text-center">
          <p className="mx-auto max-w-xl text-[1.02rem] leading-relaxed text-neutral-600">{description}</p>
          {(primaryHref || secondaryHref) && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {primaryHref && primaryLabel ? (
                <Link
                  href={primaryHref}
                  className="inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full bg-[#3B05C4] px-5 text-[0.9rem] font-semibold text-white hover:bg-[#2C0494]"
                >
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : null}
              {secondaryHref && secondaryLabel ? (
                <Link
                  href={secondaryHref}
                  className="inline-flex min-h-12 items-center whitespace-nowrap rounded-full border border-[#16024A]/15 px-5 text-[0.9rem] font-semibold text-[#16024A] hover:border-[#3B05C4] hover:text-[#3B05C4]"
                >
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          )}
        </div>
        <div className="relative min-h-[18rem] tablet:min-h-[28rem]">
          {imageSrc ? (
            <div className="overflow-hidden rounded-[1.75rem] bg-[#F4F0FF] shadow-[0_24px_50px_-32px_rgba(22,2,74,0.45)] tablet:ml-10">
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="h-[20rem] w-full object-cover tablet:h-[26rem]"
                initial={reduce ? false : { scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease }}
              />
            </div>
          ) : (
            <div className="h-[18rem] rounded-[1.75rem] bg-[#F4F0FF]" />
          )}
          <div className="mt-4 grid gap-3 tablet:pointer-events-none tablet:absolute tablet:inset-0 tablet:mt-0">
            {series && series.length > 1 ? (
              <motion.div
                className="rounded-2xl border border-[#3B05C4]/10 bg-white p-3 text-[#16024A] shadow-[0_18px_40px_-20px_rgba(59,5,196,0.35)] tablet:absolute tablet:right-0 tablet:top-0 tablet:w-48"
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <AreaPlot data={series} />
                {seriesCaption ? (
                  <p className="mt-1 text-[0.65rem] leading-snug text-neutral-500">{seriesCaption}</p>
                ) : null}
              </motion.div>
            ) : null}
            {shown[0] ? (
              <motion.div
                className="rounded-2xl border border-black/[0.04] bg-white px-3 py-3 text-[#16024A] shadow-[0_18px_40px_-20px_rgba(22,2,74,0.35)] tablet:absolute tablet:left-0 tablet:top-16 tablet:w-40"
                animate={reduce ? undefined : { y: [0, 7, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="font-display text-[1rem] font-bold leading-tight">{shown[0].value}</p>
                <p className="mt-1 text-[0.68rem] leading-snug text-neutral-500">{shown[0].label}</p>
              </motion.div>
            ) : null}
            {shown[1] ? (
              <motion.div
                className="rounded-2xl border border-black/[0.04] bg-white px-3 py-3 text-[#16024A] shadow-[0_18px_40px_-20px_rgba(22,2,74,0.35)] tablet:absolute tablet:bottom-6 tablet:left-6 tablet:w-40"
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              >
                <p className="font-display text-[1rem] font-bold leading-tight">{shown[1].value}</p>
                <p className="mt-1 text-[0.68rem] leading-snug text-neutral-500">{shown[1].label}</p>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export function SolteraSplit({
  eyebrow,
  title,
  body,
  href,
  label,
}: {
  eyebrow: string;
  title: ReactNode;
  body: string;
  href?: string;
  label?: string;
}) {
  return (
    <Reveal>
      <section className="bg-white">
        <Container className="px-4 py-14 mobile-sm:px-5 tablet:px-8 tablet:py-20">
          <div className="text-center">
            <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#3B05C4]">
              ✦ {eyebrow}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.15] tracking-tight text-[#16024A]">
              {title}
            </h2>
          </div>
          <div>
            <p className="text-[1rem] leading-relaxed text-neutral-600">{body}</p>
            {href && label ? (
              <div className="mt-6">
                <PillLink href={href}>{label}</PillLink>
              </div>
            ) : null}
          </div>
        </Container>
      </section>
    </Reveal>
  );
}

export function SolteraPhotoStats({
  items,
}: {
  items: readonly {
    src: string;
    alt?: string;
    value: string;
    label: string;
    caption: string;
  }[];
}) {
  return (
    <section className="bg-white">
      <Container className="grid gap-4 px-4 pb-14 mobile-sm:px-5 tablet:grid-cols-2 tablet:px-8 tablet:pb-20">
        {items.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.06}>
            <HoverLift>
              <article className="overflow-hidden rounded-[1.5rem] bg-[#f4f4f4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.alt ?? ""} className="h-52 w-full object-cover" />
                <div className="p-6">
                  <p className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-none text-[#16024A]">
                    {item.value}
                  </p>
                  <p className="mt-2 font-display text-[0.95rem] font-bold text-[#16024A]">{item.label}</p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-neutral-600">{item.caption}</p>
                </div>
              </article>
            </HoverLift>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

export function SolteraFeatureSplit({
  eyebrow,
  title,
  body,
  href,
  label,
  imageSrc,
  imageAlt = "",
  features,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href?: string;
  label?: string;
  imageSrc: string;
  imageAlt?: string;
  features: readonly { title: string; body: string }[];
}) {
  return (
    <Reveal>
      <section className="bg-white">
        <Container className="grid items-center gap-8 px-4 py-6 mobile-sm:px-5 tablet:grid-cols-2 tablet:px-8 tablet:py-10">
          <div>
            <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#3B05C4]">
              ✦ {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-bold leading-[1.05] tracking-tight text-[#16024A]">
              {title}
            </h2>
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-neutral-600">{body}</p>
            {href && label ? (
              <div className="mt-6">
                <PillLink href={href}>{label}</PillLink>
              </div>
            ) : null}
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature.title} className="rounded-2xl bg-[#f4f6f8] p-4">
                  <p className="font-display text-[0.85rem] font-bold uppercase tracking-[0.06em] text-[#16024A]">
                    {feature.title}
                  </p>
                  {feature.body ? (
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-neutral-600">{feature.body}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </Container>
      </section>
    </Reveal>
  );
}

export function SolteraSteps({
  eyebrow,
  title,
  description,
  steps,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  steps: readonly {
    index: string;
    title: string;
    body: string;
    image: string;
    imageAlt?: string;
    href?: string;
    cta?: string;
    id?: string;
  }[];
}) {
  return (
    <section className="bg-white">
      <Container className="px-4 py-14 mobile-sm:px-5 tablet:px-8 tablet:py-20">
        <div className="grid gap-6 tablet:grid-cols-2">
          <div>
            <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#3B05C4]">
              ✦ {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.05] tracking-tight text-[#16024A]">
              {title}
            </h2>
          </div>
          {description ? (
            <p className="text-[1rem] leading-relaxed text-neutral-600 tablet:pt-8">{description}</p>
          ) : null}
        </div>
        <ol className="mt-10 space-y-4">
          {steps.map((step, index) => (
            <li key={step.index + step.title} id={step.id}>
              <Reveal delay={index * 0.04}>
                <article className="grid overflow-hidden rounded-[1.5rem] bg-[#f4f4f4] tablet:grid-cols-2">
                  <div className={cn("relative min-h-[14rem]", index % 2 === 1 && "tablet:order-2")}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={step.image}
                      alt={step.imageAlt ?? ""}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center px-6 py-8 tablet:px-10">
                    <p className="font-display text-[1.6rem] font-bold text-[#3B05C4]">{step.index}</p>
                    <h3 className="mt-2 font-display text-[1.35rem] font-bold uppercase tracking-tight text-[#16024A]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-neutral-600">{step.body}</p>
                    {step.href && step.cta ? (
                      <div className="mt-5">
                        <PillLink href={step.href}>{step.cta}</PillLink>
                      </div>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Inner-page closer. Homepage keeps CtaSection. Same words, photo-band layout. */
export function SolteraCloser({
  title = "Check free - or talk to us.",
  body,
  primaryHref = ROUTES.book,
  primaryLabel = "Book a strategy call",
  secondaryHref = ROUTES.growthAssessment,
  secondaryLabel = "Start free check",
}: {
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
} = {}) {
  const reduce = useReducedMotion();
  const copy =
    body ??
    `See what’s stuck in about 10 minutes. Or pick a call time. No long email about when ${siteConfig.name} is free.`;

  return (
    <section className="bg-white">
      <div className="px-4 py-8 tablet:px-8 tablet:py-12">
        <motion.div
          className="rounded-[2rem] border border-[#3B05C4]/10 bg-[#F7F4FF] px-6 py-12 text-center text-[#16024A] tablet:px-12 tablet:py-16"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#3B05C4]">
            {siteConfig.name}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.15] tracking-tight">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-relaxed text-neutral-600">{copy}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={primaryHref}
              className="inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full bg-[#3B05C4] px-5 text-[0.9rem] font-semibold text-white hover:bg-[#2C0494]"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex min-h-12 items-center whitespace-nowrap rounded-full border border-[#16024A]/15 bg-white px-5 text-[0.9rem] font-semibold text-[#16024A]"
            >
              {secondaryLabel}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
