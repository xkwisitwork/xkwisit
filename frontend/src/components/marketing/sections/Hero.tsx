"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, Phone, Zap } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

const partners = [
  { name: "YETOSOL", href: "https://yetosol.com" },
  { name: "GYGI", href: "https://gygi.org" },
  { name: "STAYTROVE", href: "https://web.staytrove.com" },
  { name: "OCTOPUS", href: null },
  { name: "LAGBUY", href: "https://www.lagbuy.com" },
] as const;

const testimonials = [
  {
    company: "YETOSOL",
    quote:
      "We stopped guessing which lever was broken. Xkwisit named the leak — then the same ad spend started closing.",
    name: "Ada Okonkwo",
    role: "Agency owner, Yetosol",
    image: "/images/people/founder-smile.jpg",
  },
  {
    company: "GYGI",
    quote:
      "Brand, ads, and sales finally sat on one scoreboard. Monday stopped being a scramble — we knew what to fix first.",
    name: "Chidi Eze",
    role: "CEO, GYGI",
    image: "/images/people/shop-owner.jpg",
  },
  {
    company: "STAYTROVE",
    quote:
      "They showed us the gap between traffic and closed deals. Once we fixed that path, growth stopped feeling random.",
    name: "Ngozi Adeyemi",
    role: "Founder, StayTrove",
    image: "/images/people/desk-review.jpg",
  },
  {
    company: "LAGBUY",
    quote:
      "Xkwisit connected our offer, campaigns, and follow-up. Resources we were already spending started producing measurable results.",
    name: "Tunde Balogun",
    role: "CEO, Lagbuy",
    image: "/images/people/smile-b.jpg",
  },
  {
    company: "OCTOPUS",
    quote:
      "Clear diagnosis, clear owners, clear next move. We stopped pouring budget into the wrong channel week after week.",
    name: "Amaka Nwosu",
    role: "Operator, Octopus",
    image: "/images/people/method-owner.jpg",
  },
] as const;

/** Shared payloads that Name-Drop across the three cards (left → right). */
const flowPayloads = [
  {
    kind: "easy" as const,
    title: "New project",
    meta: "Yetosol · live",
  },
  {
    kind: "listen" as const,
    quote: "Harbor Logistics flagged at risk",
    who: "Mission pulse · 3m ago",
  },
  {
    kind: "tools" as const,
    label: "Collected",
    value: "₦4.2M",
    points: [28, 42, 38, 55, 48, 72, 68, 86],
  },
  {
    kind: "easy" as const,
    title: "Book strategy",
    meta: "30-min growth X-ray",
  },
  {
    kind: "listen" as const,
    quote: "Apex Retail scored hot",
    who: "Lead → pipeline · today",
  },
  {
    kind: "tools" as const,
    label: "Pipeline",
    value: "₦12.8M",
    points: [34, 40, 52, 48, 66, 70, 82, 90],
  },
  {
    kind: "easy" as const,
    title: "Open pipeline",
    meta: "₦12.8M weighted",
  },
  {
    kind: "listen" as const,
    quote: "Brand pack v3 cleared",
    who: "Approval · yesterday",
  },
  {
    kind: "tools" as const,
    label: "Open leads",
    value: "18",
    points: [22, 35, 48, 44, 62, 58, 78, 92],
  },
] as const;

type FlowPayload = (typeof flowPayloads)[number];

const cardMeta = [
  {
    id: "growth",
    eyebrow: "We make it clear",
    body: "Brand, ads, and sales on one scoreboard.",
    image: "/images/desks/growth.jpg",
  },
  {
    id: "review",
    eyebrow: "Delivery review",
    body: "See what’s slipping before the week runs you.",
    image: "/images/people/desk-review.jpg",
  },
  {
    id: "owner",
    eyebrow: "Mission Control",
    body: "Built for agency owners who want Monday numbers.",
    image: "/images/hero/xkwisit-hero-agency.jpg",
  },
  {
    id: "ops",
    eyebrow: "We listen to operators",
    body: "Across Africa — less noise, clearer levers.",
    image: "/images/people/method-owner.jpg",
  },
  {
    id: "pipeline",
    eyebrow: "We give you tools",
    body: "Collected, pipeline, seats, and what’s at risk.",
    image: "/images/levers/sales-pipeline.jpg",
  },
  {
    id: "monday",
    eyebrow: "Monday numbers",
    body: "One scoreboard for the whole growth system.",
    image: "/images/levers/ops-monday.jpg",
  },
  {
    id: "brand",
    eyebrow: "Brand first",
    body: "Fix the broken part before you spend more.",
    image: "/images/desks/brand.jpg",
  },
] as const;

/**
 * Ash word — CSS letter-drop (not Framer).
 * Framer + MotionConfig reducedMotion="user" can leave opacity:0 forever;
 * CSS defaults to visible and only animates under motion-safe.
 */
function EmphasizedWord({ children, reduce }: { children: string; reduce: boolean }) {
  const letters = Array.from(children);

  return (
    <span
      className="relative inline-block overflow-visible whitespace-nowrap text-[#5C5C66]"
      aria-label={children}
      data-no-translate
    >
      {letters.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={cn(
            "relative inline-block text-[#5C5C66] opacity-100",
            !reduce && "motion-safe:animate-letter-drop",
          )}
          style={reduce ? undefined : { animationDelay: `${0.12 + i * 0.075}s` }}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

/**
 * Landing hero — ticketapp copy + cylindrical cover-flow cards (all breakpoints).
 */
export function Hero() {
  const reduce = useReducedMotion();
  const { locale } = useLanguage();
  const pcm = locale === "pcm";
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 2800);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="relative overflow-x-clip bg-[#F7F8FA]">
      <Container className="relative px-4 pb-14 pt-10 mobile-sm:px-5 mobile-md:pb-16 mobile-md:pt-12 tablet:px-8 tablet:pb-20 tablet:pt-14">
        <div
          className="mx-auto max-w-[44rem] text-center tablet:max-w-[52rem]"
          data-no-translate={pcm ? true : undefined}
        >
          {pcm ? (
            <h1 className="mx-auto max-w-[20em] text-balance font-display text-[clamp(1.75rem,6.4vw,3.75rem)] font-bold leading-[1.22] tracking-[-0.03em] text-[#16024A] tablet:leading-[1.14]">
              Na system wey dey{" "}
              <EmphasizedWord reduce={!!reduce}>show wetin dey spoil</EmphasizedWord> for
              your business be this
            </h1>
          ) : (
            <h1 className="mx-auto max-w-[14em] text-balance font-display text-[clamp(2rem,6.8vw,4.1rem)] font-bold leading-[1.18] tracking-[-0.03em] text-[#16024A] tablet:leading-[1.12]">
              Growth System that{" "}
              <EmphasizedWord reduce={!!reduce}>Exposes</EmphasizedWord> Leaks in Your
              Business.
            </h1>
          )}

          <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed text-[#16024A]/75 mobile-sm:mt-7 mobile-sm:text-[1.05rem] tablet:mt-8">
            {pcm
              ? "We go connect your brand, marketing, and sales make we see wetin dey drive growth and wetin dey hold am back. Then we go find di gaps, fix wetin no dey work, and turn your resources to clear results."
              : "We connect your brand, marketing, and sales to understand what’s driving growth and what’s holding it back. Then we identify the gaps, fix what isn’t working, and turn your resources into measurable results."}
          </p>

          <div className="mt-7 flex flex-col items-stretch justify-center gap-2.5 tablet:mt-8 tablet:flex-row tablet:items-center tablet:gap-3">
            <Link
              href={ROUTES.book}
              className="inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full bg-[#3B05C4] px-7 text-[0.92rem] font-semibold text-white shadow-[0_14px_32px_-16px_rgba(59,5,196,0.65)] transition hover:bg-[#2C0494]"
            >
              <Zap className="h-4 w-4" aria-hidden />
              {pcm ? "Book strategy call" : "Book a strategy call"}
            </Link>
            <Link
              href={ROUTES.growthAssessment}
              className="border-[#16024A]/12 inline-flex min-h-[3.1rem] items-center justify-center gap-2 rounded-full border bg-white px-7 text-[0.92rem] font-semibold text-[#16024A] shadow-sm transition hover:bg-white/80"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {pcm ? "Free growth check" : "Free Growth Assessment"}
            </Link>
          </div>
        </div>

        <FeatureDeck tick={tick} reduce={!!reduce} />

        <div className="mx-auto mt-12 max-w-3xl text-center tablet:mt-16">
          <p className="font-display text-[1.15rem] font-bold text-[#16024A] tablet:text-[1.35rem]">
            Hear From Top Construction CEOs
          </p>
          <TestimonialCarousel reduce={!!reduce} />
          <PartnerPills reduce={!!reduce} />
        </div>
      </Container>
    </section>
  );
}

/** Auto-advancing testimonial carousel for partner CEOs. */
function TestimonialCarousel({ reduce }: { reduce: boolean }) {
  const [active, setActive] = useState(0);
  const n = testimonials.length;
  const item = testimonials[active]!;

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") {
        return;
      }
      setActive((prev) => (prev + 1) % n);
    }, 4800);
    return () => window.clearInterval(id);
  }, [reduce, n]);

  return (
    <div className="mt-5">
      <div className="relative mx-auto min-h-[11.5rem] max-w-lg">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.company}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={reduce ? { duration: 0.15 } : { duration: 0.4, ease }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-4 h-14 w-14 overflow-hidden rounded-full shadow-md ring-2 ring-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
            <p className="mx-auto max-w-lg text-[0.9rem] leading-relaxed text-[#16024A]/80">
              “{item.quote}”
            </p>
            <p className="mt-3 text-[0.78rem] font-semibold text-[#16024A]/70">
              {item.name} · {item.role}
            </p>
            <p className="mt-1 font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
              {item.company}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-center gap-1.5">
        {testimonials.map((t, i) => (
          <button
            key={t.company}
            type="button"
            aria-label={`Show ${t.company} testimonial`}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === active ? "w-5 bg-[#3B05C4]" : "w-1.5 bg-[#3B05C4]/25",
            )}
          />
        ))}
      </div>
    </div>
  );
}

/** Sleek partner pills — AirDrop-style focus that auto-advances. */
function PartnerPills({ reduce }: { reduce: boolean }) {
  const [active, setActive] = useState(0);
  const n = partners.length;

  useEffect(() => {
    if (reduce) return;

    const tick = () => {
      // Pause while the tab is hidden so focus doesn't jump mid-click.
      if (typeof document !== "undefined" && document.visibilityState === "hidden") {
        return;
      }
      setActive((prev) => (prev + 1) % n);
    };

    const id = window.setInterval(tick, 2600);
    return () => window.clearInterval(id);
  }, [reduce, n]);

  const pillClass = (isActive: boolean) =>
    cn(
      "absolute left-1/2 top-0 inline-flex min-w-[6.5rem] items-center justify-center rounded-full px-4 py-2.5",
      "font-display text-[0.68rem] font-semibold uppercase tracking-[0.14em] tablet:min-w-[7.1rem] tablet:text-[0.72rem]",
      "ring-1 backdrop-blur-sm transition-colors",
      isActive
        ? "bg-white text-[#3B05C4] shadow-[0_14px_34px_-14px_rgba(22,2,74,0.55)] ring-[#EDE8F7]"
        : "bg-white/85 text-[#16024A]/75 ring-[#16024A]/10 hover:text-[#16024A]",
    );

  const pillMotion = (rel: number, abs: number, isActive: boolean) => ({
    x: `calc(-50% + ${rel * 6.85}rem)`,
    scale: isActive ? 1.06 : Math.max(0.88, 1 - abs * 0.07),
    opacity: isActive ? 1 : Math.max(0.42, 1 - abs * 0.26),
    zIndex: 20 - abs,
  });

  const pillTransition = reduce
    ? { duration: 0.2 }
    : { type: "spring" as const, stiffness: 360, damping: 30, mass: 0.75 };

  return (
    <div
      className="relative mx-auto mt-8 h-[3.35rem] w-full max-w-lg overflow-x-clip"
      role="list"
      aria-label="Partners"
    >
      {partners.map((partner, i) => {
        const rel = wrapRel(i, active, n);
        const abs = Math.abs(rel);
        const isActive = rel === 0;
        // Keep mounted (hide far pills) so keys stay stable and remount flicker is avoided.
        const hidden = abs > 2;

        const motionProps = {
          role: "listitem" as const,
          className: cn(pillClass(isActive), hidden && "pointer-events-none"),
          initial: false as const,
          animate: {
            ...pillMotion(rel, abs, isActive),
            ...(hidden ? { opacity: 0, scale: 0.8 } : null),
          },
          transition: pillTransition,
          onFocus: () => {
            if (!hidden) setActive(i);
          },
          tabIndex: hidden ? -1 : 0,
        };

        if (partner.href) {
          return (
            <motion.a
              key={partner.name}
              {...motionProps}
              href={hidden ? undefined : partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${partner.name}`}
              onClick={() => setActive(i)}
            >
              {partner.name}
            </motion.a>
          );
        }

        return (
          <motion.button
            key={partner.name}
            {...motionProps}
            type="button"
            disabled={hidden}
            aria-label={`${partner.name} — coming soon`}
            title="Coming soon"
            onClick={() => setActive(i)}
          >
            {partner.name}
          </motion.button>
        );
      })}
    </div>
  );
}

function wrapRel(i: number, active: number, n: number) {
  let rel = i - active;
  const half = Math.floor(n / 2);
  if (rel > half) rel -= n;
  if (rel < -half) rel += n;
  return rel;
}

function FeatureDeck({ tick, reduce }: { tick: number; reduce: boolean }) {
  const [active, setActive] = useState(3);
  const n = cardMeta.length;
  const dragX = useRef(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % n);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduce, n]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const delta = e.clientX - dragX.current;
    if (Math.abs(delta) < 40) return;
    setActive((prev) => (delta < 0 ? (prev + 1) % n : (prev - 1 + n) % n));
  };

  // Wider arc spacing + readable face angle
  const angleStep = isDesktop ? 28 : 42;
  const xStep = isDesktop ? 38 : 42;

  return (
    <div className="relative mx-auto mt-14 w-full mobile-sm:mt-16 tablet:mt-20">
      <div
        className="relative mx-auto h-[23rem] w-[100vw] touch-pan-y overflow-visible pt-3 [perspective:1200px] mobile-sm:h-[24.5rem] tablet:h-[27rem] laptop:h-[28.5rem]"
        style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {cardMeta.map((meta, i) => {
          const rel = wrapRel(i, active, n);
          const isCenter = rel === 0;
          const abs = Math.abs(rel);
          if (abs > 3) return null;

          const xPct = rel * xStep;
          const rotateY = -rel * angleStep;
          const z = isCenter ? 88 : -abs * 70;
          const scale = isCenter ? 1 : Math.max(0.78, 1 - abs * 0.07);
          const payloadIndex =
            (tick - i + flowPayloads.length * 10) % flowPayloads.length;

          return (
            <button
              key={meta.id}
              type="button"
              aria-label={meta.eyebrow}
              aria-pressed={isCenter}
              onClick={() => setActive(i)}
              className={cn(
                "absolute left-1/2 top-3 h-[calc(100%-0.75rem)] origin-center overflow-visible",
                "transition-[transform,opacity,filter] duration-500 ease-out",
                "w-[58vw] max-w-[16.5rem] tablet:w-[31vw] tablet:max-w-[17.25rem] laptop:w-[18vw] laptop:max-w-[16.5rem]",
              )}
              style={{
                transform: `translateX(calc(-50% + ${xPct}%)) rotateY(${rotateY}deg) translateZ(${z}px) scale(${scale})`,
                zIndex: 40 - abs,
                opacity: isCenter ? 1 : Math.max(0.45, 0.85 - abs * 0.12),
                filter: isCenter
                  ? "none"
                  : `blur(${Math.min(2 + abs * 2.5, 8)}px) brightness(0.78)`,
              }}
            >
              <FeatureCardFace
                meta={meta}
                payload={flowPayloads[payloadIndex]!}
                payloadKey={`${tick}-${i}-${payloadIndex}`}
                reduce={reduce}
                showPayload={isDesktop || isCenter}
                className="h-full"
              />
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex justify-center gap-1.5">
        {cardMeta.map((m, i) => (
          <button
            key={m.id}
            type="button"
            aria-label={`Go to ${m.eyebrow}`}
            onClick={() => setActive(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === active ? "w-5 bg-[#3B05C4]" : "w-1.5 bg-[#3B05C4]/25",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureCardFace({
  meta,
  payload,
  payloadKey,
  reduce,
  showPayload,
  className,
}: {
  meta: (typeof cardMeta)[number];
  payload: FlowPayload;
  payloadKey: string;
  reduce: boolean;
  showPayload: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[1.35rem] ring-1 ring-black/10",
        "bg-[#16024A] shadow-[0_24px_50px_-30px_rgba(22,2,74,0.55)]",
        "tablet:rounded-[1.5rem]",
        className,
      )}
    >
      {/* Full-bleed photo — keep overlays off this plane */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={meta.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* Soft bottom wash only — leaves the photo open above the copy */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#0B021F] via-[#0B021F]/70 to-transparent"
      />

      <div className="relative z-10 mt-auto flex min-h-0 flex-col justify-end px-3 pb-3 pt-10">
        <AnimatePresence mode="wait" initial={false}>
          {showPayload ? (
            <motion.div
              key={payloadKey}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 4 }}
              transition={reduce ? { duration: 0.15 } : { duration: 0.28, ease }}
              className="mb-2 w-full"
            >
              <PayloadChip payload={payload} compact />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#C8F5E4]">
          {meta.eyebrow}
        </p>
        <p className="mt-1 line-clamp-2 text-[0.78rem] font-semibold leading-snug text-white">
          {meta.body}
        </p>
      </div>
    </article>
  );
}

function PayloadChip({
  payload,
  compact = false,
}: {
  payload: FlowPayload;
  compact?: boolean;
}) {
  if (payload.kind === "easy") {
    return (
      <div
        className={cn(
          "flex w-full max-w-[15rem] items-center gap-2 rounded-xl bg-white/95 p-1.5 shadow-[0_10px_24px_-14px_rgba(22,2,74,0.55)] ring-1 ring-white/70 backdrop-blur-sm",
          !compact && "w-[11.5rem] flex-col rounded-2xl p-2",
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-[#F7F5FC] px-2 py-1">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#3B05C4] text-white">
            <Calendar className="h-3 w-3" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[0.68rem] font-semibold text-[#16024A]">
              {payload.title}
            </p>
            <p className="truncate text-[0.55rem] text-neutral-600">{payload.meta}</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-[#16024A] px-2.5 py-1 text-[0.58rem] font-semibold text-white">
          Start
          <ArrowRight className="h-2.5 w-2.5" aria-hidden />
        </span>
      </div>
    );
  }

  if (payload.kind === "listen") {
    return (
      <div className="flex w-full max-w-[15rem] items-start gap-2 rounded-xl bg-white/95 p-2 shadow-[0_10px_24px_-14px_rgba(22,2,74,0.55)] ring-1 ring-white/70 backdrop-blur-sm">
        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#F4F0FF] text-[0.52rem] font-bold text-[#3B05C4]">
          XP
        </span>
        <div className="min-w-0">
          <p className="line-clamp-2 text-[0.68rem] font-semibold leading-snug text-[#16024A]">
            {payload.quote}
          </p>
          <p className="mt-0.5 truncate text-[0.55rem] text-neutral-600">
            {payload.who}
          </p>
        </div>
      </div>
    );
  }

  return (
    <SleekGraphSlide
      label={payload.label}
      value={payload.value}
      points={payload.points}
      compact={compact}
    />
  );
}

/** Compact sparkline chip — sits with the card copy, not over the photo */
function SleekGraphSlide({
  label,
  value,
  points,
  compact = false,
}: {
  label: string;
  value: string;
  points: readonly number[];
  compact?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const fillId = `sleekFill-${uid}`;
  const strokeId = `sleekStroke-${uid}`;

  const w = 120;
  const h = 36;
  const pad = 3;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(max - min, 1);

  const coords = points.map((p, i) => {
    const x = pad + (i / (points.length - 1)) * (w - pad * 2);
    const y = h - pad - ((p - min) / range) * (h - pad * 2 - 2);
    return { x, y };
  });

  const line = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ");

  const area = `${line} L ${coords[coords.length - 1]!.x} ${h} L ${coords[0]!.x} ${h} Z`;
  const tip = coords[coords.length - 2] ?? coords[coords.length - 1]!;

  return (
    <div
      className={cn(
        "flex w-full max-w-[15rem] items-center gap-2.5 overflow-hidden rounded-xl bg-white/95 p-2 shadow-[0_10px_24px_-14px_rgba(22,2,74,0.55)] ring-1 ring-white/70 backdrop-blur-sm",
        !compact && "max-w-[12rem]",
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-[0.55rem] font-medium text-neutral-600">
            {label}
          </p>
          <span className="shrink-0 rounded-full bg-[#E8F8EF] px-1.5 py-0.5 text-[0.5rem] font-semibold text-[#027A48]">
            +18%
          </span>
        </div>
        <p className="font-display text-[0.95rem] font-bold leading-none tracking-tight text-[#16024A]">
          {value}
        </p>
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-8 w-[4.5rem] shrink-0"
        aria-hidden
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B05C4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B05C4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5B45FF" />
            <stop offset="100%" stopColor="#3B05C4" />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill={`url(#${fillId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke={`url(#${strokeId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease }}
        />
        <circle
          cx={tip.x}
          cy={tip.y}
          r="2.5"
          fill="#3B05C4"
          stroke="white"
          strokeWidth="1.25"
        />
      </svg>
    </div>
  );
}
