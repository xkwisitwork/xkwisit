"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Phone, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button/variants";
import { Container } from "@/components/layout/Container";
import { ROUTES, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const CALL_HREF = "tel:+2349023177560";
const LAGOS_TZ = "Africa/Lagos";

const partners = ["NORTHLINE", "APEX", "HARBOR", "LEDGER", "ORBIT"] as const;

const growthLenses = [
  { id: "brand", label: "Brand", share: 34, color: "#3B05C4" },
  { id: "demand", label: "Demand", share: 28, color: "#FC3FE3" },
  { id: "sales", label: "Sales", share: 22, color: "#5B45FF" },
  { id: "content", label: "Content", share: 16, color: "#C40404" },
] as const;

const avatarStack = [
  "/images/hero/avatar.jpg",
  "/images/hero/operator.jpg",
  "/images/hero/consultant-nigerian.png",
] as const;

const weekFocus = [
  { label: "Offer clarity", tone: "high" as const },
  { label: "Paid LP leak", tone: "med" as const },
] as const;

const SLOT_HOURS = [9, 10, 11, 14, 15, 16] as const;

/**
 * Funnel-style Mission Control hero × Xkwisit bento DNA.
 * Centered composition, floating growth UI, call ripple always on.
 */
export function Hero() {
  return (
    <section className="relative overflow-x-clip bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: `
 linear-gradient(to right, rgba(15,23,42,0.045) 1px, transparent 1px),
 linear-gradient(to bottom, rgba(15,23,42,0.045) 1px, transparent 1px)
 `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-8%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(59,5,196,0.14),_transparent_68%)]"
      />

      <Container className="relative px-4 pb-14 pt-8 mobile-sm:px-5 mobile-md:pb-16 mobile-md:pt-10 tablet:px-8 tablet:pb-20 tablet:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mint mobile-sm:text-300">
            {siteConfig.name}
          </p>

          <h1 className="mt-4 font-display text-[clamp(1.85rem,6.4vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-neutral-900">
            Growth System{" "}
            <span className="font-semibold text-neutral-600">that Exposes Leaks </span> in
            Your Business.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-neutral-600 mobile-sm:mt-5 mobile-sm:text-400 mobile-md:text-500">
            We look at your brand, your ads, and your sales as one business. Then we name
            the broken part, and fix that before you spend another week on the same ads.
          </p>

          <div className="mt-6 flex flex-col items-stretch justify-center gap-2.5 mobile-sm:mt-7 mobile-sm:gap-3 tablet:flex-row tablet:items-center">
            <Link
              href={ROUTES.book}
              className={cn(
                buttonVariants({ variant: "contained", size: "lg" }),
                "!rounded-full border-0 !bg-mint !text-white shadow-none hover:!bg-mint-deep",
                "min-h-12 w-full justify-center px-7 tablet:w-auto",
              )}
            >
              Book a strategy call
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={ROUTES.services}
              className={cn(
                buttonVariants({ variant: "outlined", size: "lg" }),
                "!rounded-full !border-neutral-400 !bg-white !text-neutral-900 hover:!border-mint hover:!bg-mint-soft hover:!text-mint-ink",
                "min-h-12 w-full justify-center px-7 tablet:w-auto",
              )}
            >
              Explore services
            </Link>
          </div>

          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-300 text-neutral-600 mobile-sm:mt-5 mobile-md:text-400">
            <li className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-mint" aria-hidden />
              Free growth X-ray
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-mint" aria-hidden />
              Built for African operators
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mx-auto mt-10 w-full max-w-5xl mobile-sm:mt-12 tablet:mt-14"
        >
          <MissionCollage />
        </motion.div>

        <div className="mx-auto mt-12 max-w-3xl text-center mobile-md:mt-14 tablet:mt-16">
          <p className="text-300 text-neutral-600 mobile-md:text-400">
            Trusted by operators across Africa&apos;s leading growth brands
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mobile-md:gap-x-8 tablet:gap-x-10">
            {partners.map((name, i) => (
              <li
                key={name}
                className={cn(
                  "font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em] mobile-sm:text-300 tablet:text-400",
                  i === 1 ? "text-mint-deep" : "text-neutral-600",
                )}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function MissionCollage() {
  return (
    <div className="relative mx-auto w-full">
      {/*
 Real 3-col grid on tablet+ so floats never cover the portrait,
 call, or each other. Mobile stacks in reading order.
 */}
      <div className="grid grid-cols-1 gap-3 tablet:grid-cols-[minmax(0,200px)_minmax(0,1fr)_minmax(0,200px)] tablet:items-start tablet:gap-3.5 laptop:grid-cols-[minmax(0,220px)_minmax(0,1fr)_minmax(0,220px)] laptop:gap-5">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          className="order-2 flex flex-col gap-2.5 tablet:order-1 tablet:gap-3"
        >
          <PipelineCard />
          <TrustPulseCard />
        </motion.div>

        <div className="relative z-10 order-1 mx-auto w-full max-w-[520px] tablet:order-2 tablet:max-w-none">
          <div className="relative overflow-hidden rounded-[1.5rem] mobile-sm:rounded-[1.75rem] tablet:rounded-[2rem]">
            <div className="relative aspect-[4/3] min-h-[220px] w-full mobile-sm:min-h-[260px] tablet:min-h-[280px] laptop:min-h-[320px]">
              <Image
                src="/images/hero/HeroImg.jpeg"
                alt={`${siteConfig.name} growth consultant`}
                fill
                priority
                className="object-cover object-[50%_16%]"
                sizes="(max-width: 768px) 92vw, 520px"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-neutral-900/10"
              />

              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[0.7rem] font-semibold text-neutral-800 shadow-sm backdrop-blur-sm mobile-sm:left-4 mobile-sm:top-4 mobile-sm:px-3 mobile-sm:text-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-mint/70" />
                  <span className="relative h-2 w-2 rounded-full bg-mint" />
                </span>
                This week’s numbers
              </span>

              <div className="absolute bottom-3 left-3 flex items-center gap-2 mobile-sm:bottom-4 mobile-sm:left-4">
                <div className="flex -space-x-2">
                  {avatarStack.map((src) => (
                    <span
                      key={src}
                      className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-white mobile-sm:h-8 mobile-sm:w-8"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </span>
                  ))}
                </div>
                <span className="rounded-full bg-white/95 px-2.5 py-1 text-[0.65rem] font-semibold text-neutral-700 backdrop-blur-sm mobile-sm:text-300">
                  NG · KE · ZA
                </span>
              </div>

              <div className="absolute bottom-3 right-3 hidden max-w-[55%] flex-wrap justify-end gap-1.5 laptop:bottom-4 laptop:right-4 laptop:flex">
                {growthLenses.map((lens, i) => (
                  <span
                    key={lens.id}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[0.65rem] font-semibold",
                      i === 0
                        ? "bg-mint text-white"
                        : "border border-white/50 bg-white/90 text-neutral-800 backdrop-blur-sm",
                    )}
                  >
                    {lens.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-30 -mt-7 flex justify-center mobile-sm:-mt-8 tablet:-mt-9">
            <a
              href={CALL_HREF}
              aria-label="Call Xkwisit"
              className="group outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2"
            >
              <CallRipple />
            </a>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.35,
          }}
          className="order-3 flex flex-col gap-2.5 tablet:gap-3"
        >
          <FocusCard />
          <LiveBooker />
        </motion.div>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-1.5 laptop:hidden">
        {growthLenses.map((lens, i) => (
          <span
            key={`m-${lens.id}`}
            className={cn(
              "rounded-full px-3 py-1.5 text-[0.7rem] font-semibold",
              i === 0
                ? "bg-mint text-white"
                : "border border-neutral-400/70 bg-white text-neutral-700",
            )}
          >
            {lens.label}
          </span>
        ))}
      </div>
    </div>
  );
}

const cardShell =
  "rounded-[1.25rem] border border-neutral-400/60 bg-white p-3.5 shadow-[0_18px_44px_-22px_rgba(15,23,42,0.32)] mobile-sm:rounded-[1.35rem] mobile-sm:p-4";

function PipelineCard() {
  const r = 32;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className={cardShell}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[0.65rem] font-medium text-neutral-600 mobile-sm:text-[0.7rem]">
            Growth mix this month
          </p>
          <p className="mt-0.5 font-display text-500 font-bold text-neutral-900">
            ₦24.3M
          </p>
        </div>
        <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[0.65rem] font-bold text-mint">
          ↑ 21%
        </span>
      </div>

      <div className="mt-2.5 flex items-center gap-2.5">
        <svg viewBox="0 0 88 88" className="h-14 w-14 shrink-0" aria-hidden>
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            className="stroke-neutral-300"
            strokeWidth="9"
          />
          {growthLenses.map((lens) => {
            const len = (lens.share / 100) * c;
            const dash = `${len} ${c - len}`;
            const el = (
              <circle
                key={lens.id}
                cx="44"
                cy="44"
                r={r}
                fill="none"
                stroke={lens.color}
                strokeWidth="9"
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
                transform="rotate(-90 44 44)"
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <ul className="min-w-0 flex-1 space-y-0.5">
          {growthLenses.map((lens) => (
            <li
              key={lens.id}
              className="flex items-center justify-between gap-2 text-[0.65rem] font-semibold text-neutral-700 mobile-sm:text-[0.7rem]"
            >
              <span className="inline-flex items-center gap-1.5 truncate">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: lens.color }}
                />
                {lens.label}
              </span>
              <span className="tabular-nums text-neutral-600">{lens.share}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TrustPulseCard() {
  return (
    <div className={cardShell}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[0.65rem] font-medium text-neutral-600 mobile-sm:text-[0.7rem]">
          Operator trust
        </p>
        <ShieldCheck className="h-3.5 w-3.5 text-mint" aria-hidden />
      </div>
      <div className="mt-1.5 flex items-end gap-2">
        <p className="font-display text-600 font-bold leading-none text-neutral-900">
          4.8
        </p>
        <div className="flex gap-1 pb-1" aria-label="4.8 out of 5 from reviews">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                i < 4 ? "bg-mint" : "bg-mint/30",
              )}
            />
          ))}
        </div>
      </div>
      <p className="mt-1 text-[0.65rem] text-neutral-600 mobile-sm:text-[0.7rem]">
        From 500+ growth reviews
      </p>
      <div className="mt-2.5 flex -space-x-2">
        {avatarStack.map((src) => (
          <span
            key={`trust-${src}`}
            className="relative h-7 w-7 overflow-hidden rounded-full ring-2 ring-white"
          >
            <Image src={src} alt="" fill className="object-cover" sizes="28px" />
          </span>
        ))}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint-soft text-[0.6rem] font-bold text-mint ring-2 ring-white">
          +12
        </span>
      </div>
    </div>
  );
}

function FocusCard() {
  return (
    <div className={cardShell}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[0.65rem] font-medium text-neutral-600 mobile-sm:text-[0.7rem]">
          Focus this week
        </p>
        <span className="rounded-full bg-mint px-2 py-0.5 text-[0.6rem] font-bold text-white">
          Brand
        </span>
      </div>
      <p className="mt-1.5 font-display text-400 font-bold leading-snug text-neutral-900 mobile-sm:text-500">
        What is broken first
      </p>
      <ul className="mt-2.5 space-y-1.5">
        {weekFocus.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between gap-2 rounded-xl bg-neutral-200/80 px-2.5 py-1.5"
          >
            <span className="truncate text-[0.65rem] font-semibold text-neutral-700 mobile-sm:text-[0.7rem]">
              {item.label}
            </span>
            <span
              className={cn(
                "shrink-0 rounded-full px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wide",
                item.tone === "high" && "bg-mint text-white",
                item.tone === "med" && "bg-mint-ice text-mint-ink",
                "bg-white text-neutral-600 ring-1 ring-neutral-400/70",
              )}
            >
              {item.tone}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LiveBooker() {
  const now = useLagosNow();
  const [mounted, setMounted] = useState(false);
  const days = useMemo(() => getUpcomingDays(now, 3), [now]);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const selectedDay = days.find((d) => d.key === dayKey) ?? days[0] ?? null;

  const slots = useMemo(
    () => (selectedDay ? getOpenSlots(selectedDay.date, now) : []),
    [selectedDay, now],
  );
  const [slotId, setSlotId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (dayKey === null && days[0]) {
      setDayKey(days[0].key);
    } else if (dayKey && !days.some((d) => d.key === dayKey) && days[0]) {
      setDayKey(days[0].key);
    }
  }, [days, dayKey]);

  useEffect(() => {
    const first = slots[0];
    if (!first) {
      setSlotId(null);
      return;
    }
    if (!slotId || !slots.some((s) => s.id === slotId)) {
      setSlotId(first.id);
    }
  }, [slots, slotId]);

  const liveClock = mounted ? formatLagosClock(now) : "--:--";

  return (
    <div className={cardShell}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[0.65rem] font-semibold text-neutral-800 mobile-sm:text-[0.7rem]">
            Strategy call
          </p>
          <p className="mt-0.5 text-[0.6rem] font-medium tabular-nums text-mint">
            Lagos · {liveClock}
          </p>
        </div>
        <Link
          href={ROUTES.book}
          className="text-[0.65rem] font-bold uppercase tracking-wide text-mint hover:text-mint-deep"
        >
          Book
        </Link>
      </div>

      <div className="mt-2.5 flex gap-1.5" role="listbox" aria-label="Pick a day">
        {days.map((d) => {
          const active = d.key === selectedDay?.key;
          return (
            <button
              key={d.key}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => setDayKey(d.key)}
              className={cn(
                "flex flex-1 flex-col items-center rounded-xl px-1 py-1.5 transition-colors",
                active
                  ? "bg-mint text-white"
                  : "bg-neutral-200 text-neutral-600 hover:bg-mint-soft",
              )}
            >
              <span className="text-[0.55rem] font-semibold uppercase opacity-80">
                {d.weekday}
              </span>
              <span className="font-display text-400 font-bold leading-none">
                {d.dayNum}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-2 space-y-1">
        {slots.length === 0 ? (
          <li className="rounded-xl bg-neutral-200/80 px-2.5 py-2 text-center text-[0.65rem] font-semibold text-neutral-600">
            No open slots - try another day
          </li>
        ) : (
          slots.slice(0, 3).map((slot) => {
            const active = slot.id === slotId;
            return (
              <li key={slot.id}>
                <button
                  type="button"
                  onClick={() => setSlotId(slot.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-left text-[0.65rem] font-semibold transition-colors mobile-sm:text-[0.7rem]",
                    active
                      ? "bg-mint text-white"
                      : "bg-neutral-200/80 text-neutral-600 hover:bg-mint-soft",
                  )}
                >
                  <span>{slot.label}</span>
                  {active ? (
                    <span className="text-[0.55rem] font-bold uppercase tracking-wider opacity-90">
                      Open
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

function useLagosNow() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return now;
}

function getLagosDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: LAGOS_TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return {
    weekday: get("weekday"),
    day: Number(get("day")),
    month: get("month"),
    year: Number(get("year")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
  };
}

function formatLagosClock(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: LAGOS_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function startOfLagosDay(base: Date, dayOffset: number) {
  const probe = new Date(base.getTime() + dayOffset * 86_400_000);
  const pp = getLagosDateParts(probe);
  return {
    key: `${pp.year}-${pp.month}-${pp.day}`,
    weekday: pp.weekday.slice(0, 3),
    dayNum: pp.day,
    month: pp.month,
    year: pp.year,
    date: probe,
    parts: pp,
  };
}

function getUpcomingDays(now: Date, count: number) {
  const days = [];
  for (let i = 0; i < count; i += 1) {
    days.push(startOfLagosDay(now, i));
  }
  return days;
}

function getOpenSlots(dayDate: Date, now: Date) {
  const dayParts = getLagosDateParts(dayDate);
  const nowParts = getLagosDateParts(now);
  const isToday =
    dayParts.year === nowParts.year &&
    dayParts.month === nowParts.month &&
    dayParts.day === nowParts.day;

  return SLOT_HOURS.filter((hour) => {
    if (!isToday) return true;
    const slotMinutes = hour * 60;
    const nowMinutes = nowParts.hour * 60 + nowParts.minute;
    return slotMinutes >= nowMinutes + 45;
  }).map((hour) => {
    const end = hour + 1;
    const label = `${String(hour).padStart(2, "0")}:00 - ${String(end).padStart(2, "0")}:00`;
    return {
      id: `${dayParts.year}-${dayParts.month}-${dayParts.day}-${hour}`,
      label,
      hour,
    };
  });
}

function CallRipple() {
  return (
    <span className="relative flex h-[4.25rem] w-[4.25rem] items-center justify-center mobile-sm:h-[4.75rem] mobile-sm:w-[4.75rem] tablet:h-20 tablet:w-20">
      <span
        aria-hidden
        className="absolute inset-[12%] animate-ping rounded-full bg-mint/30"
        style={{ animationDuration: "2s" }}
      />
      <span
        aria-hidden
        className="absolute inset-[6%] animate-pulse rounded-full border-2 border-mint/45"
      />
      <span aria-hidden className="absolute inset-0 rounded-full border border-mint/25" />
      <span
        aria-hidden
        className="border-mint/12 absolute inset-[-8px] rounded-full border"
      />
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-mint shadow-[0_14px_36px_-10px_rgba(37,99,235,0.55)] ring-1 ring-mint-ice transition-colors group-hover:bg-mint group-hover:text-white tablet:h-14 tablet:w-14">
        <Phone className="h-5 w-5 tablet:h-6 tablet:w-6" aria-hidden />
      </span>
    </span>
  );
}
