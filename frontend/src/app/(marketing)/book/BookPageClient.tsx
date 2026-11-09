"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { MarketingPageCanvas, MarketingPageHero } from "@/components/marketing/MarketingPageHero";
import {
  BookAsideAccount,
  BookAsideGet,
  BookAsidePhone,
  bookFormShellClassName,
} from "@/components/marketing/pages/book/BookDash";
import { BookPageBody } from "@/components/marketing/pages/book/BookPageBody";
import { buttonVariants } from "@/components/ui/Button/variants";
import { Container } from "@/components/layout/Container";
import { ROUTES, siteConfig } from "@/config/site";
import { createBooking } from "@/features/booking/api/booking.api";
import { cn } from "@/lib/utils/cn";

const LAGOS_TZ = "Africa/Lagos";
const SLOT_HOURS = [9, 10, 11, 14, 15, 16] as const;

const asideGets = [
  "Live walkthrough of your growth system",
  "One ranked bottleneck for this quarter",
  "Clear next step - X-ray, package, or DIY roadmap",
] as const;

export default function BookPageClient() {
  return (
    <MarketingPageCanvas className="overflow-x-clip">
      <MarketingPageHero
        introOnly
        imageSrc="/images/people/desk-review.jpg"
        imageAlt="Reviewing the work"
        eyebrow="Strategy call"
        title={
          <>
            <span className="block">Book 30 minutes.</span>
            <span className="mt-1 block font-semibold text-neutral-600 mobile-sm:mt-0 mobile-sm:inline">
              {" "}
              Leave knowing the one problem to fix first.
            </span>
          </>
        }
        description={`${siteConfig.name} will show you where growth is stuck - brand, ads, or sales - and the first move worth funding.`}
        primaryHref="#booking"
        primaryLabel="Pick a slot"
      />

      <div className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F0FF_42%,#FFFFFF_100%)]">
        <Container id="booking" className="relative scroll-mt-24 px-4 py-8 mobile-sm:px-5 tablet:px-8 tablet:py-12">
          <div className="grid gap-4 mobile-sm:gap-5 tablet:gap-6 laptop:grid-cols-[1.05fr_0.95fr] laptop:items-start laptop:gap-8">
            <BookingForm />

            <aside className="flex flex-col gap-3 mobile-sm:gap-4">
              <BookAsideGet items={asideGets} />
              <BookAsideAccount href={ROUTES.register} />
              <BookAsidePhone href="tel:+2349023177560" label="+234 902 317 7560" />
            </aside>
          </div>
        </Container>
      </div>

      <BookPageBody />
    </MarketingPageCanvas>
  );
}

function BookingForm() {
  const router = useRouter();
  const now = useLagosNow();
  const days = useMemo(() => getUpcomingDays(now, 5), [now]);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const selectedDay = days.find((d) => d.key === dayKey) ?? days[0] ?? null;
  const slots = useMemo(
    () => (selectedDay ? getOpenSlots(selectedDay.date, now) : []),
    [selectedDay, now],
  );
  const [slotId, setSlotId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!dayKey && days[0]) setDayKey(days[0].key);
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

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!selectedDay || !slotId || !name || !email) return;
    setSubmitting(true);
    try {
      const booking = await createBooking({
        name,
        email,
        company,
        dayKey: selectedDay.key,
        slotId,
        timezone: LAGOS_TZ });
      const params = new URLSearchParams({
        id: booking.id,
        name: booking.name,
        email: booking.email,
        company: booking.company,
        day: booking.dayKey,
        slot: booking.slotId });
      router.push(`${ROUTES.book}/confirm?${params.toString()}`);
    } catch {
      const params = new URLSearchParams({
        name,
        email,
        company,
        day: selectedDay.key,
        slot: slotId });
      router.push(`${ROUTES.book}/confirm?${params.toString()}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn(bookFormShellClassName, "min-w-0")}>
      <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
        <p className="font-display text-[1.15rem] font-bold text-[#16024A]">Pick a slot</p>
        <p className="rounded-full bg-[#F4F0FF] px-3 py-1 text-[0.7rem] font-semibold tabular-nums text-[#3B05C4]">
          Lagos · {formatLagosClock(now)}
        </p>
      </div>

      <div
        className="-mx-1 mt-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="listbox"
        aria-label="Choose a day"
      >
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
                "flex min-h-[4.5rem] min-w-[3.9rem] shrink-0 snap-start flex-col items-center justify-center rounded-[1.35rem] px-3 py-2.5 transition-colors mobile-sm:min-w-[4.4rem]",
                active
                  ? "bg-[#16024A] text-white shadow-[0_14px_28px_-16px_rgba(22,2,74,0.55)]"
                  : "bg-[#F7F4FF] text-[#2A2348] hover:bg-[#EDE7FF]",
              )}
            >
              <span className="text-[0.6rem] font-semibold uppercase tracking-wide opacity-80">
                {d.weekday}
              </span>
              <span className="mt-0.5 font-display text-500 font-bold tabular-nums leading-none">
                {d.dayNum}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-2 tablet:grid-cols-2">
        {slots.length === 0 ? (
          <li className="col-span-full rounded-[1.25rem] bg-[#F7F4FF] px-3 py-3.5 text-center text-300 text-[#5C5478]">
            No open slots today - pick another day
          </li>
        ) : (
          slots.map((slot) => {
            const active = slot.id === slotId;
            return (
              <li key={slot.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => setSlotId(slot.id)}
                  className={cn(
                    "flex min-h-11 w-full items-center rounded-[1.25rem] px-3.5 py-2.5 text-left text-300 font-semibold transition-colors",
                    active
                      ? "bg-[#3B05C4] text-white"
                      : "bg-[#F7F4FF] text-[#16024A] hover:bg-[#EDE7FF]",
                  )}
                >
                  <span className="truncate">{slot.label}</span>
                </button>
              </li>
            );
          })
        )}
      </ul>

      <div className="mt-5 grid gap-3 mobile-sm:mt-6">
        <Field
          label="Full name"
          value={name}
          onChange={setName}
          required
          autoComplete="name"
        />
        <Field
          label="Work email"
          type="email"
          value={email}
          onChange={setEmail}
          required
          autoComplete="email"
          inputMode="email"
        />
        <Field
          label="Company"
          value={company}
          onChange={setCompany}
          autoComplete="organization"
        />
      </div>

      <button
        type="submit"
        disabled={submitting || !slotId || !name || !email}
        className={cn(
          buttonVariants({ variant: "contained", size: "lg" }),
          "!rounded-full border-0 !bg-[#16024A] !text-white shadow-none hover:!bg-[#3B05C4]",
          "mt-5 inline-flex min-h-12 w-full justify-center disabled:opacity-50 mobile-sm:mt-6",
        )}
      >
        Confirm this slot
        <ArrowRight className="h-4 w-4 shrink-0" />
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
  inputMode }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "text" | "tel" | "url" | "search" | "numeric" | "decimal";
}) {
  return (
    <label className="block min-w-0">
      <span className="text-300 font-semibold text-neutral-700">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 min-h-11 w-full rounded-[1.15rem] border border-[#DDD3F4] bg-[#F7F4FF] px-3.5 py-2.5 text-base text-[#16024A] outline-none ring-[#3B05C4] focus:bg-white focus:ring-2 mobile-sm:text-400"
      />
    </label>
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

function getLagosParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: LAGOS_TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false }).formatToParts(date);
  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? "";
  return {
    weekday: get("weekday"),
    day: Number(get("day")),
    month: get("month"),
    year: Number(get("year")),
    hour: Number(get("hour")),
    minute: Number(get("minute")) };
}

function formatLagosClock(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: LAGOS_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false }).format(date);
}

function getUpcomingDays(now: Date, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const probe = new Date(now.getTime() + i * 86_400_000);
    const p = getLagosParts(probe);
    return {
      key: `${p.year}-${p.month}-${p.day}`,
      weekday: p.weekday.slice(0, 3),
      dayNum: p.day,
      date: probe };
  });
}

function getOpenSlots(dayDate: Date, now: Date) {
  const day = getLagosParts(dayDate);
  const n = getLagosParts(now);
  const isToday = day.year === n.year && day.month === n.month && day.day === n.day;
  return SLOT_HOURS.filter((hour) => {
    if (!isToday) return true;
    return hour * 60 >= n.hour * 60 + n.minute + 45;
  }).map((hour) => ({
    id: `${day.year}-${day.month}-${day.day}-${hour}`,
    label: `${String(hour).padStart(2, "0")}:00 - ${String(hour + 1).padStart(2, "0")}:00` }));
}
