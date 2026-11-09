"use client";

import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  ArrowUpRight,
  Ban,
  Gauge,
  Layers,
  Smartphone,
} from "lucide-react";

import { Reveal } from "@/components/marketing/motion/Reveal";
import type { ServiceFitNote } from "@/config/services";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

/** Serializable slice only — never pass Lucide `icon` across the RSC boundary. */
export type WebDevelopmentStudioProps = {
  currency: "NGN" | "USD";
  startingFrom: number;
  deliverables: readonly string[];
  goodFor: readonly ServiceFitNote[];
  notFor: readonly ServiceFitNote[];
  outcomes: readonly string[];
};

const surfaces = [
  {
    title: "Web",
    body: "Marketing sites, portals, and conversion pages your team can edit.",
    Icon: AppWindow,
    tone: "bg-[#E8F1FF] text-[#2B5BFF]",
  },
  {
    title: "Mobile",
    body: "iOS and Android buy paths that finish on a real phone connection.",
    Icon: Smartphone,
    tone: "bg-[#F3E8FF] text-[#7A3CFF]",
  },
  {
    title: "Payments & data",
    body: "Checkout, webhooks, and event tracking baked into the build.",
    Icon: Gauge,
    tone: "bg-[#E7F8EF] text-[#0F9F6E]",
  },
] as const;

type FitMark = "site" | "mobile" | "data" | "ship";

/** Clean geometric marks — sized and anchored the same on every card. */
function FitMarkIcon({ mark, onLight }: { mark: FitMark; onLight: boolean }) {
  const ink = onLight ? "#16024A" : "#FFFFFF";
  const soft = onLight ? "rgba(22,2,74,0.12)" : "rgba(255,255,255,0.18)";
  const accent = onLight ? "#3B05C4" : "rgba(255,255,255,0.92)";

  if (mark === "site") {
    return (
      <svg viewBox="0 0 96 96" fill="none" aria-hidden className="h-full w-full">
        <rect x="14" y="22" width="68" height="52" rx="12" fill={soft} />
        <rect x="22" y="30" width="52" height="36" rx="8" stroke={ink} strokeWidth="2.5" />
        <path d="M22 40h52" stroke={ink} strokeWidth="2.5" />
        <circle cx="30" cy="35" r="2" fill={accent} />
        <circle cx="37" cy="35" r="2" fill={ink} opacity="0.35" />
        <circle cx="44" cy="35" r="2" fill={ink} opacity="0.35" />
        <path
          d="M34 58V48h6v10M46 58V44h6v14M58 58V50h6v8"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (mark === "mobile") {
    return (
      <svg viewBox="0 0 96 96" fill="none" aria-hidden className="h-full w-full">
        <rect x="30" y="12" width="36" height="72" rx="10" fill={soft} />
        <rect x="34" y="18" width="28" height="56" rx="6" stroke={ink} strokeWidth="2.5" />
        <rect x="42" y="22" width="12" height="3" rx="1.5" fill={ink} opacity="0.35" />
        <circle cx="48" cy="68" r="3" stroke={ink} strokeWidth="2" />
        <path
          d="M42 44l4.5 4.5L56 39"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (mark === "data") {
    return (
      <svg viewBox="0 0 96 96" fill="none" aria-hidden className="h-full w-full">
        <rect x="16" y="18" width="64" height="60" rx="14" fill={soft} />
        <path
          d="M30 62V48M44 62V36M58 62V42M72 62V30"
          stroke={ink}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M28 34c8-10 16-4 24-12 6 4 12 2 16-2"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="68" cy="20" r="3.5" fill={accent} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden className="h-full w-full">
      <circle cx="48" cy="48" r="30" fill={soft} />
      <path
        d="M48 70V34M48 34l-10 10M48 34l10 10"
        stroke={ink}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 54c4 8 10 12 14 12s10-4 14-12"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="48" cy="26" r="4" fill={accent} />
    </svg>
  );
}

const fitIconWell: Record<FitMark, string> = {
  site: "bg-[#FFE4F0] text-[#C412B0]",
  mobile: "bg-[#F0E7FF] text-[#3B05C4]",
  data: "bg-[#E5EEFF] text-[#2B5BFF]",
  ship: "bg-[#E8F1FF] text-[#1D4ED8]",
};

function FitFeatureCard({
  title,
  body,
  outcome,
  href,
  variant,
  mark,
}: {
  title: string;
  body: string;
  outcome: string;
  href: string;
  variant: "magenta" | "light" | "blue";
  mark: FitMark;
}) {
  const isLight = variant === "light";

  return (
    <Link
      href={href}
      className={cn(
        "flex h-full flex-col rounded-[1.25rem] p-5 tablet:rounded-[1.5rem] tablet:p-6",
        // Mobile: always white reference cards
        "border border-[#E8ECF2] bg-white text-[#111111] shadow-[0_8px_24px_-18px_rgba(15,23,42,0.35)]",
        // Tablet+: restore brand color variants
        isLight
          ? "tablet:border-[#EDE8F6] tablet:shadow-none"
          : "tablet:border-0 tablet:text-white tablet:shadow-none",
        variant === "magenta" && "tablet:bg-[#E11D6A]",
        // Keep blue deep enough that white type always clears WCAG contrast
        variant === "blue" &&
          "tablet:bg-gradient-to-br tablet:from-[#1E3AC7] tablet:via-[#2546E0] tablet:to-[#3B05C4]",
        variant === "light" && "tablet:bg-white",
      )}
    >
      {/* Top — icon top-left, small action top-right */}
      <div className="flex items-start justify-between gap-3">
        <div
          aria-hidden
          className={cn(
            "grid h-12 w-12 place-items-center rounded-[0.95rem] mobile-md:h-[3.25rem] mobile-md:w-[3.25rem]",
            fitIconWell[mark],
            !isLight && "tablet:bg-white/20",
          )}
        >
          <div className="h-7 w-7">
            <span className="block tablet:hidden">
              <FitMarkIcon mark={mark} onLight />
            </span>
            <span className="hidden tablet:block">
              <FitMarkIcon mark={mark} onLight={isLight} />
            </span>
          </div>
        </div>
        <span
          aria-hidden
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full bg-[#F3F4F6] text-[#6B7280]",
            !isLight && "tablet:bg-white/20 tablet:text-white",
          )}
        >
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
      </div>

      <h4
        className={cn(
          "mt-5 font-display text-[1.2rem] font-bold leading-snug tracking-tight text-[#111111] tablet:text-[1.28rem]",
          !isLight && "tablet:text-white",
        )}
      >
        {title}
      </h4>
      <p
        className={cn(
          "mt-3 text-[0.9rem] leading-[1.7] text-[#4B5563]",
          !isLight && "tablet:text-white",
        )}
      >
        {body}
      </p>
      <p
        className={cn(
          "mt-3 text-[0.84rem] font-semibold leading-relaxed text-[#16024A]",
          !isLight && "tablet:text-white",
        )}
      >
        {outcome}
      </p>

      <span
        className={cn(
          "mt-auto flex w-full items-center justify-center rounded-xl bg-[#F3F4F6] px-4 py-3 text-center text-[0.84rem] font-semibold text-[#111111]",
          // Solid white CTA on colored cards — highest contrast
          !isLight && "tablet:bg-white tablet:text-[#16024A]",
        )}
      >
        Learn more
      </span>
    </Link>
  );
}

export function WebDevelopmentStudio({
  currency,
  startingFrom,
  deliverables,
  goodFor,
  notFor,
  outcomes,
}: WebDevelopmentStudioProps) {
  const price = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(startingFrom);

  const deliverableLast =
    deliverables.length % 2 === 1 ? "tablet:col-span-2" : "";

  return (
    <section className="bg-white px-4 py-10 text-[#16024A] mobile-md:px-5 tablet:px-6 tablet:py-16 laptop:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-10 tablet:space-y-16">
        {/* Intro */}
        <Reveal>
          <div className="flex flex-col gap-5 tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-10">
            <div className="min-w-0 max-w-2xl">
              <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mint">
                What we ship
              </p>
              <h2 className="mt-3 text-balance font-display text-[clamp(1.5rem,4.2vw,2.35rem)] font-bold leading-[1.15] tracking-tight">
                Web, mobile, and the buy path in between
              </h2>
              <p className="mt-4 max-w-[46ch] text-[0.92rem] leading-[1.7] text-[#5C5478] tablet:text-[0.95rem]">
                Sites, apps, payments, and analytics in one 90-day block — built
                so customers can finish, and your team can keep shipping.
              </p>
            </div>
            <div className="w-full shrink-0 tablet:w-auto">
              <Link
                href={ROUTES.book}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-mint px-5 py-3 text-[0.84rem] font-semibold text-white hover:bg-mint-deep tablet:w-auto"
              >
                Book this engagement
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Surfaces — one panel on mobile, 3 peers from tablet */}
        <Reveal>
          <div className="overflow-hidden rounded-[1.25rem] border border-[#EDE8F6] bg-[#FAF9FC] tablet:grid tablet:grid-cols-3 tablet:gap-3 tablet:border-0 tablet:bg-transparent">
            {surfaces.map(({ title, body, Icon, tone }, index) => (
              <article
                key={title}
                className={cn(
                  "flex flex-col p-5 tablet:rounded-[1.25rem] tablet:border tablet:border-[#EDE8F6] tablet:bg-[#FAF9FC] tablet:p-6",
                  index > 0 && "border-t border-[#EDE8F6] tablet:border",
                )}
              >
                <span
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-2xl",
                    tone,
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-[1.05rem] font-bold leading-snug tablet:mt-5">
                  {title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-[1.65] text-[#5C5478] tablet:mt-2.5">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </Reveal>

        {/* Deliverables — dense list on mobile, 2-col peers from tablet */}
        <Reveal>
          <div>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2 tablet:mb-5 tablet:gap-3">
              <h3 className="font-display text-[1.15rem] font-bold tracking-tight tablet:text-[1.2rem]">
                Deliverables
              </h3>
              <p className="text-[0.8rem] font-semibold text-[#8B849E]">
                From {price} · 90-day block
              </p>
            </div>
            <div className="overflow-hidden rounded-[1.25rem] border border-[#EDE8F6] tablet:grid tablet:grid-cols-2 tablet:gap-3 tablet:overflow-visible tablet:rounded-none tablet:border-0">
              {deliverables.map((item, index) => {
                const isLast = index === deliverables.length - 1;
                const odd = deliverables.length % 2 === 1;
                return (
                  <article
                    key={item}
                    className={cn(
                      "flex gap-3 bg-white px-4 py-3.5 tablet:gap-4 tablet:rounded-[1.25rem] tablet:border tablet:border-[#EDE8F6] tablet:p-5",
                      index > 0 && "border-t border-[#EDE8F6] tablet:border",
                      isLast && odd ? deliverableLast : "",
                    )}
                  >
                    <span className="mt-0.5 shrink-0 font-mono text-[0.72rem] font-bold text-mint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="min-w-0 font-display text-[0.92rem] font-bold leading-snug tablet:text-[0.95rem]">
                      {item}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Fit — tight stack on mobile, 2×2 from tablet */}
        <Reveal>
          <div>
            <h3 className="mb-4 font-display text-[1.15rem] font-bold tracking-tight tablet:mb-5 tablet:text-[1.2rem]">
              Good fit when
            </h3>
            <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2 tablet:gap-4">
              {(
                [
                  {
                    key: goodFor[0]?.title ?? "web",
                    title: "Outgrowing your site",
                    body:
                      goodFor[0]?.body ??
                      "Pages fight the offer. Speed, tracking, and CMS are brittle. You need a conversion shell marketing can edit without waiting on engineering.",
                    outcome:
                      "What we do: rebuild the site as a conversion system—clear offer pages, a CMS your team owns, and a path that holds traffic instead of leaking it.",
                    href: ROUTES.book,
                    variant: "magenta" as const,
                    mark: "site" as const,
                  },
                  {
                    key: goodFor[1]?.title ?? "mobile",
                    title: "Real product buy path",
                    body:
                      goodFor[1]?.body ??
                      "Customers should browse, book, or pay inside your business. We ship mobile apps, portals, and checkout that finish the job WhatsApp and PDFs cannot.",
                    outcome:
                      "What we do: design and ship the product surface—web or mobile—where the sale actually completes, with payments and handoff built in from day one.",
                    href: ROUTES.book,
                    variant: "light" as const,
                    mark: "mobile" as const,
                  },
                  {
                    key: goodFor[2]?.title ?? "data",
                    title: "Trustworthy product data",
                    body:
                      goodFor[2]?.body ??
                      "Forms and installs fire into the void. Experiments are guesses. We instrument web and app events with the build so Monday numbers are real.",
                    outcome:
                      "What we do: wire events, funnels, and release hygiene into the same block—so every experiment, drop-off, and win shows up as a number leadership can trust.",
                    href: ROUTES.book,
                    variant: "light" as const,
                    mark: "data" as const,
                  },
                  {
                    key: "engage",
                    title: "Ship the buy path",
                    body: `Starting from ${price}. One 90-day block for the site, app, payments, and analytics that turn attention into revenue—not another deck that dies in Drive.`,
                    outcome:
                      "What we do: run a focused product engagement with a Monday number, a live surface customers can finish, and a team that can keep shipping after we leave.",
                    href: ROUTES.book,
                    variant: "blue" as const,
                    mark: "ship" as const,
                  },
                ] as const
              ).map((card) => (
                <div key={card.key} className="min-w-0">
                  <FitFeatureCard {...card} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Outcomes + skip — one stack on mobile */}
        <Reveal>
          <div className="overflow-hidden rounded-[1.25rem] border border-[#EDE8F6] tablet:grid tablet:grid-cols-2 tablet:gap-3 tablet:overflow-visible tablet:rounded-none tablet:border-0">
            <article className="flex flex-col bg-[#FAF9FC] p-5 tablet:rounded-[1.25rem] tablet:border tablet:border-[#EDE8F6] tablet:p-6">
              <div className="mb-4 flex items-center gap-2 tablet:mb-5">
                <Layers className="h-4 w-4 text-mint" aria-hidden />
                <h3 className="font-display text-[1.05rem] font-bold tracking-tight tablet:text-[1.1rem]">
                  Outcomes
                </h3>
              </div>
              <ul className="grid flex-1 gap-2.5 tablet:gap-3">
                {outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="rounded-[1rem] bg-white px-4 py-3 text-[0.88rem] font-semibold leading-snug text-[#16024A] tablet:py-3.5 tablet:text-[0.9rem]"
                  >
                    {outcome}
                  </li>
                ))}
              </ul>
            </article>

            <article className="flex flex-col border-t border-[#EDE8F6] bg-white p-5 tablet:rounded-[1.25rem] tablet:border tablet:border-dashed tablet:border-[#D9D3E5] tablet:p-6">
              <div className="mb-4 flex items-center gap-2 tablet:mb-5">
                <Ban className="h-4 w-4 text-mint" aria-hidden />
                <h3 className="font-display text-[1.05rem] font-bold tracking-tight tablet:text-[1.1rem]">
                  Skip if
                </h3>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                {notFor.map((note) => (
                  <div
                    key={note.title}
                    className="rounded-[1rem] bg-[#FAF9FC] px-4 py-3.5 tablet:py-4"
                  >
                    <p className="font-display text-[0.92rem] font-bold leading-snug tablet:text-[0.95rem]">
                      {note.title}
                    </p>
                    <p className="mt-2 text-[0.88rem] leading-[1.65] text-[#5C5478] tablet:mt-2.5 tablet:text-[0.9rem]">
                      {note.body}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="flex flex-col items-stretch justify-between gap-5 rounded-[1.35rem] bg-[#16024A] px-5 py-6 text-white mobile-md:px-6 mobile-md:py-7 tablet:flex-row tablet:items-center tablet:px-8">
            <div className="min-w-0 max-w-xl">
              <p className="font-display text-[1.1rem] font-bold leading-snug mobile-md:text-[1.15rem] tablet:text-[1.25rem]">
                Ready to ship the buy path?
              </p>
              <p className="mt-2 text-[0.9rem] leading-[1.65] text-white/70">
                Starting from {price}. One Monday number. Web, mobile, or both.
              </p>
            </div>
            <Link
              href={ROUTES.book}
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-mint px-5 py-3 text-[0.84rem] font-semibold text-white hover:bg-mint-deep tablet:w-auto"
            >
              Book a strategy call
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
