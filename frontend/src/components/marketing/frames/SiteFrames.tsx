import { useId, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  Bot,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  Clapperboard,
  CreditCard,
  FileText,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  LineChart,
  Mail,
  Megaphone,
  MonitorSmartphone,
  Palette,
  PenLine,
  Repeat,
  Search,
  Share2,
  ShoppingBag,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Bounce, Reveal, Stagger } from "@/components/marketing/motion/Reveal";
import { SlideRail } from "@/components/marketing/frames/SlideRail";

type FrameNote = {
  title: string;
  body?: string;
  variant?: "filter" | "default";
};
type FrameCard = {
  title: string;
  body?: string;
  detail?: string;
  image?: string;
  href?: string;
  actionLabel?: string;
  icon?: LucideIcon;
};

function iconFor(title: string): LucideIcon {
  const text = title.toLowerCase();
  if (/e-?commerce|storefront|shop/.test(text)) return ShoppingBag;
  if (/real estate|property/.test(text)) return Building2;
  if (/health|clinic|patient/.test(text)) return HeartPulse;
  if (/educat|school|enrol/.test(text)) return GraduationCap;
  if (/fintech|bank/.test(text)) return Landmark;
  if (/hospital|hotel|local presence/.test(text)) return Hotel;
  if (/website|app|payment|checkout/.test(text)) return MonitorSmartphone;
  if (/customer|closing|ads|traffic|growth/.test(text)) return Megaphone;
  if (/brand|logo|identity|offer/.test(text)) return Palette;
  if (/\bai\b|tool/.test(text)) return Bot;
  if (/number|profit|score|dashboard|monday/.test(text)) return LineChart;
  if (/video/.test(text)) return Clapperboard;
  if (/email|newsletter/.test(text)) return Mail;
  if (/social/.test(text)) return Share2;
  if (/seo|search|blog/.test(text)) return Search;
  if (/content|editorial|script|repurpos/.test(text)) return PenLine;
  if (/crm|pipeline|follow-up|follow up|whatsapp/.test(text)) return Workflow;
  if (/consult/.test(text)) return Briefcase;
  if (/calendar|strategy|week/.test(text)) return CalendarDays;
  if (/diagnos|habit|fit|icp/.test(text)) return Target;
  if (/pay|price|floor/.test(text)) return CreditCard;
  if (/repeat|return|retention/.test(text)) return Repeat;
  return FileText;
}

function nameOf(name: string | { label: string; href?: string }) {
  return typeof name === "string" ? { label: name } : name;
}

export function FrameStage({
  children,
}: {
  label?: string;
  caption?: string;
  children: ReactNode;
}) {
  return <div className="bg-white text-[#16024A]">{children}</div>;
}

export function FrameColumns({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function FramePage({ children }: { children: ReactNode }) {
  return <div className="bg-white">{children}</div>;
}

export function FramePill({
  href,
  children,
  tone = "solid",
}: {
  href: string;
  children: ReactNode;
  tone?: "solid" | "dark" | "ghost" | "white" | "soft";
}) {
  // All CTA tones match navbar "Get started" (mint / mint-deep).
  const toneClass =
    tone === "white"
      ? "border-0 bg-white text-mint hover:bg-mint-soft"
      : "border-0 bg-mint text-white hover:bg-mint-deep";

  return (
    <Bounce className="inline-flex max-w-full">
      <Link
        href={href}
        className={`inline-flex max-w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[0.75rem] font-semibold transition-colors tablet:px-4 tablet:text-[0.8rem] ${toneClass}`}
      >
        {children}
      </Link>
    </Bounce>
  );
}

export function FrameNav({
  links,
  ctaHref,
  ctaLabel,
}: {
  links: readonly { href: string; label: string }[];
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 px-4 py-4 tablet:gap-4 tablet:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto rounded-full bg-white px-1.5 py-1 shadow-[0_10px_30px_-16px_rgba(22,2,74,0.35)]">
        {links.map((link) => (
          <Link
            key={link.href + link.label}
            href={link.href}
            className="shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[0.78rem] text-[#2A2348] hover:bg-[#F4F0FF] hover:text-[#3B05C4]"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <FramePill href={ctaHref}>{ctaLabel}</FramePill>
    </div>
  );
}

export function FrameHero({
  nav,
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  image,
  imageAlt = "",
  imagePosition = "object-center",
  stats,
  names,
}: {
  nav?: ReactNode;
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  stats?: readonly { value: string; label: string; href?: string }[];
  names?: readonly (string | { label: string; href?: string })[];
}) {
  const left = stats?.[0];
  const right = stats?.[1];
  const hasStage = Boolean(image);
  const scoopId = `scoop${useId().replace(/:/g, "")}`;
  const scoopMask = `url(#${scoopId})`;

  return (
    <div className="bg-white">
      {nav}
      <Reveal className="mx-auto max-w-3xl px-4 pb-2 pt-8 text-center tablet:px-8 tablet:pt-14">
        {eyebrow ? (
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#5C5478]">{eyebrow}</p>
        ) : null}
        <h1 className="mx-auto mt-3 max-w-3xl text-balance font-display text-[clamp(2rem,6.4vw,4.1rem)] font-bold leading-[1.02] tracking-tight [&_span]:text-[#16024A]">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-4 max-w-lg text-[0.95rem] leading-relaxed text-[#2A2348] tablet:text-[1.02rem]">
            {description}
          </p>
        ) : null}
        {primaryHref && primaryLabel ? (
          <div className="mt-6 flex justify-center">
            <Bounce className="inline-flex max-w-full">
              <Link
                href={primaryHref}
                className="inline-flex max-w-full items-center gap-3 rounded-full bg-mint py-1.5 pl-5 pr-1.5 text-white transition-colors hover:bg-mint-deep"
              >
                <span className="whitespace-nowrap text-[0.85rem] font-semibold">{primaryLabel}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-mint">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </Bounce>
          </div>
        ) : null}
      </Reveal>
      {hasStage ? (
        <div className="px-4 pb-10 pt-8 tablet:px-8 tablet:pb-14 tablet:pt-10">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.6rem] bg-white tablet:rounded-[2rem]">
            <svg className="absolute h-0 w-0" aria-hidden>
              <defs>
                <mask id={scoopId} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
                  <rect width="1" height="1" fill="white" />
                  <path
                    fill="black"
                    d="M0.11,1 C0.145,1 0.158,0.992 0.168,0.955 C0.182,0.90 0.198,0.862 0.228,0.856 L0.772,0.856 C0.802,0.862 0.818,0.90 0.832,0.955 C0.842,0.992 0.855,1 0.89,1 Z"
                  />
                </mask>
              </defs>
            </svg>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt}
              style={{ maskImage: scoopMask, WebkitMaskImage: scoopMask }}
              className={`h-[26rem] w-full object-cover tablet:h-[32rem] laptop:h-[36rem] ${imagePosition}`}
            />
            <div
              style={{ maskImage: scoopMask, WebkitMaskImage: scoopMask }}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(22,2,74,0.35)_0%,rgba(22,2,74,0.05)_42%,rgba(22,2,74,0.28)_100%)]"
            />
            {left ? (
              <div className="absolute left-4 top-4 max-w-[46%] text-white tablet:left-8 tablet:top-8">
                <p className="font-display text-[clamp(1.7rem,4.6vw,3.4rem)] font-bold leading-none tracking-tight [overflow-wrap:anywhere]">
                  {left.value}
                </p>
                <p className="mt-2 max-w-[11rem] text-[0.78rem] font-medium leading-snug text-white">{left.label}</p>
              </div>
            ) : null}
            {right ? (
              <div className="absolute bottom-[22%] right-4 max-w-[40%] text-right text-white tablet:right-8">
                <p className="font-display text-[clamp(1rem,2vw,1.35rem)] font-bold leading-snug [overflow-wrap:anywhere]">
                  {right.value}
                </p>
                <p className="mt-1 text-[0.78rem] font-medium leading-snug text-white">{right.label}</p>
              </div>
            ) : null}
            {names && names.length > 0 ? (
              <div className="absolute inset-x-[18%] bottom-3 tablet:inset-x-[24%] tablet:bottom-4">
                <SlideRail>
                  {names.map((entry) => {
                    const name = nameOf(entry);
                    const chip =
                      "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[#DDD3F4] bg-white px-3.5 py-1.5 text-[0.78rem] font-semibold text-[#16024A] shadow-[0_8px_18px_rgba(22,2,74,0.08)] hover:border-[#3B05C4] hover:text-[#3B05C4]";
                    const mark = <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B05C4]" aria-hidden />;
                    return name.href ? (
                      <Link key={name.href} href={name.href} className={chip}>
                        {mark}
                        {name.label}
                      </Link>
                    ) : (
                      <span key={name.label} className={chip}>
                        {mark}
                        {name.label}
                      </span>
                    );
                  })}
                </SlideRail>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function NoteStack({ notes }: { notes: readonly FrameNote[] }) {
  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div key={note.title} className="rounded-2xl bg-[#F7F4FF] px-4 py-3">
          <p className="font-display text-[0.95rem] font-bold leading-snug">{note.title}</p>
          {note.body ? <p className="mt-1.5 text-[0.88rem] leading-relaxed text-[#2A2348]">{note.body}</p> : null}
        </div>
      ))}
    </div>
  );
}

function RichCardView({ card, index }: { card: FrameCard; index: number }) {
  const tints = ["bg-[#EDE7FF]", "bg-[#E7F3FF]", "bg-[#F8EFFF]"] as const;
  const Icon = card.icon ?? iconFor(card.title);
  const inner = (
    <>
      <span className={`grid h-11 w-11 place-items-center rounded-2xl text-[#3B05C4] ${tints[index % tints.length]}`}>
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      {card.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={card.image} alt="" className="mt-4 h-28 w-full rounded-2xl object-cover" />
      ) : null}
      {card.title ? (
        <p className="mt-4 font-display text-[1.05rem] font-bold leading-snug [overflow-wrap:anywhere]">{card.title}</p>
      ) : null}
      {card.body ? <p className="mt-2 text-[0.88rem] leading-relaxed text-[#2A2348]">{card.body}</p> : null}
      {card.detail ? <p className="mt-2 text-[0.88rem] leading-relaxed text-[#3A3358]">{card.detail}</p> : null}
      {card.actionLabel ? (
        <span className="mt-4 inline-flex w-fit max-w-full whitespace-nowrap rounded-full bg-mint px-3.5 py-2 text-[0.75rem] font-semibold text-white">
          {card.actionLabel}
        </span>
      ) : null}
    </>
  );
  const shell =
    "flex h-full min-w-0 flex-col rounded-[1.5rem] border border-neutral-100 bg-white p-5 shadow-[0_16px_40px_-28px_rgba(22,2,74,0.35)] tablet:p-6";
  return (
    <Bounce className="h-full">
      {card.href ? (
        <Link href={card.href} className={shell}>
          {inner}
        </Link>
      ) : (
        <div className={shell}>{inner}</div>
      )}
    </Bounce>
  );
}

export function SplitFeature({
  eyebrow,
  title,
  body,
  notes,
  figures,
  visuals,
  visualTitles,
  cards,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  notes?: readonly FrameNote[];
  figures?: readonly { value: string; label: string }[];
  visuals: readonly string[];
  visualTitles?: readonly string[];
  cards?: readonly FrameCard[];
}) {
  const fallback: FrameCard[] = [
    ...visuals.slice(0, 2).map((src, index) => ({
      title: visualTitles?.[index] ?? "",
      image: src,
    })),
    ...(figures ?? []).slice(0, 1).map((figure) => ({
      title: figure.value,
      body: figure.label,
    })),
  ];
  const list = cards && cards.length > 0 ? cards : fallback;
  const hasAside = Boolean(body) || Boolean(notes && notes.length > 0);

  return (
    <Reveal>
      <section className="w-full px-4 py-12 tablet:px-8 tablet:py-16">
        <div className={hasAside ? "grid w-full items-start gap-6 tablet:grid-cols-2" : "w-full"}>
          <div className="min-w-0">
            {eyebrow ? (
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#5C5478]">— {eyebrow}</p>
            ) : null}
            <h2 className="mt-2 w-full text-balance font-display text-[clamp(1.55rem,3.4vw,2.45rem)] font-bold leading-[1.12]">
              {title}
            </h2>
          </div>
          {hasAside ? (
            <div className="min-w-0 space-y-3">
              {body ? <p className="text-[0.98rem] leading-relaxed text-[#2A2348]">{body}</p> : null}
              {notes && notes.length > 0 ? <NoteStack notes={notes} /> : null}
            </div>
          ) : null}
        </div>
        <Stagger
          className={`mt-8 grid gap-4 ${list.length > 2 ? "tablet:grid-cols-2 laptop:grid-cols-3" : "tablet:grid-cols-2"}`}
          itemClassName="min-w-0 h-full"
        >
          {list.map((card, index) => (
            <RichCardView key={`${card.title}-${index}`} card={card} index={index} />
          ))}
        </Stagger>
      </section>
    </Reveal>
  );
}

export function FeatureBlock({
  heading,
  visual,
  title,
  body,
  lines,
  pills,
  actionHref,
  actionLabel,
}: {
  heading: string;
  visual: string;
  title: string;
  body?: string;
  lines?: readonly FrameNote[];
  pills?: readonly { value: string; label: string }[];
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <Reveal>
      <section className="px-4 py-14 text-center tablet:px-8 tablet:py-20">
        <h2 className="mx-auto max-w-3xl text-balance font-display text-[clamp(1.7rem,4.2vw,2.75rem)] font-bold leading-[1.12]">
          {heading}
        </h2>
        {body ? (
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-[#2A2348]">{body}</p>
        ) : null}
        {title ? <p className="mx-auto mt-3 max-w-xl font-display text-[1.05rem] font-bold leading-snug">{title}</p> : null}
        {lines && lines.length > 0 ? (
          <Stagger className="mx-auto mt-8 grid max-w-3xl gap-3 text-left" itemClassName="min-w-0">
            {lines.map((line) => (
              <div key={line.title} className="rounded-2xl bg-[#F7F4FF] px-4 py-4">
                <p className="font-display text-[1rem] font-bold leading-snug">{line.title}</p>
                {line.body ? <p className="mt-1.5 text-[0.9rem] leading-relaxed text-[#2A2348]">{line.body}</p> : null}
              </div>
            ))}
          </Stagger>
        ) : null}
        {pills && pills.length > 0 ? (
          <ul className="mx-auto mt-6 grid max-w-lg gap-3 tablet:grid-cols-2">
            {pills.map((pill) => (
              <li key={pill.label} className="rounded-2xl bg-white px-4 py-4 text-left shadow-[0_16px_40px_-28px_rgba(22,2,74,0.35)]">
                <span className="block font-display text-[1.25rem] font-bold leading-none [overflow-wrap:anywhere]">
                  {pill.value}
                </span>
                <span className="mt-2 block text-[0.75rem] leading-snug text-[#2A2348]">{pill.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {actionHref && actionLabel ? (
          <div className="mt-6">
            <FramePill href={actionHref}>{actionLabel}</FramePill>
          </div>
        ) : null}
        {visual ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={visual}
            alt=""
            className="mx-auto mt-8 h-52 w-full max-w-4xl rounded-[1.75rem] object-cover tablet:h-72"
          />
        ) : null}
      </section>
    </Reveal>
  );
}

export function ProofBand({
  title,
  body,
  figures,
  href,
  label,
  image,
  secondTitle,
  secondBody,
  secondFigures,
  secondHref,
  secondLabel,
  secondImage,
  steps,
  panelNotes,
}: {
  title: string;
  body?: string;
  figures?: readonly { value: string; label: string }[];
  href?: string;
  label?: string;
  image?: string;
  secondTitle?: string;
  secondBody?: string;
  secondFigures?: readonly { value: string; label: string }[];
  secondHref?: string;
  secondLabel?: string;
  secondImage?: string;
  steps?: readonly FrameNote[];
  panelNotes?: readonly FrameNote[];
}) {
  const fit = steps ?? [];
  const notes = panelNotes ?? [];
  const filters = notes.filter((note) => note.variant === "filter");
  const outcomes = notes.filter((note) => note.variant !== "filter");
  const panelCards = [...filters, ...outcomes];
  const media = image ?? secondImage;
  const dualMedia = Boolean(image && secondImage);

  // Title + signals + optional media share one bento. Last tile spans to close odd rails.
  const bentoTotal = 1 + fit.length + (media ? 1 : 0);
  const lastTabletSpan = bentoTotal % 2 === 1 ? "tablet:col-span-2" : "";
  const lastLaptopSpan =
    bentoTotal % 3 === 1
      ? "laptop:col-span-3"
      : bentoTotal % 3 === 2
        ? "laptop:col-span-2"
        : "";
  const mediaSpan = `${lastTabletSpan} ${lastLaptopSpan}`.trim();
  const panelTotal = panelCards.length;
  const panelLastSpan =
    panelTotal % 2 === 1 ? "tablet:col-span-2" : "";

  return (
    <Reveal>
      <section className="w-full px-4 py-12 tablet:px-8 tablet:py-16">
        <div className="mx-auto w-full max-w-6xl">
          {/* Peer bento — title, signals, and media as equal tiles (no left rail) */}
          <div className="grid grid-cols-1 gap-3 tablet:grid-cols-2 laptop:grid-cols-3">
            <Bounce className="min-w-0">
              <aside className="relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-mint-ink p-4 text-white tablet:p-4">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-5 -top-6 font-display text-[5rem] font-bold leading-none text-white/[0.06]"
                >
                  Fit
                </div>
                <p className="relative font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#B9A8FF]">
                  Qualifier
                </p>
                <h2 className="relative mt-2 max-w-[14ch] text-balance font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-bold leading-[1.1] tracking-tight">
                  {title}
                </h2>
                {body ? (
                  <p className="relative mt-2 text-[0.84rem] leading-relaxed text-white/75">
                    {body}
                  </p>
                ) : null}

                <div className="relative mt-4 flex flex-col gap-2.5">
                  {figures && figures.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {figures.map((figure) => (
                        <div
                          key={`${figure.label}-${figure.value}`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-sm"
                        >
                          <span className="font-display text-[0.88rem] font-bold tabular-nums text-white">
                            {figure.value}
                          </span>
                          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/65">
                            {figure.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {href && label ? (
                    <div>
                      <FramePill href={href}>{label}</FramePill>
                    </div>
                  ) : null}
                </div>
              </aside>
            </Bounce>

            {fit.map((note, index) => {
              const Icon = iconFor(note.title);
              const accent = index === 0;
              const isLastSignal = !media && index === fit.length - 1;
              return (
                <Bounce
                  key={note.title}
                  className={`min-w-0 ${
                    isLastSignal ? `${lastTabletSpan} ${lastLaptopSpan}` : ""
                  }`}
                >
                  <article
                    className={`relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#EDE8F6] p-3.5 tablet:p-4 ${
                      accent
                        ? "bg-mint text-white shadow-[0_18px_36px_-28px_rgba(59,5,196,0.5)]"
                        : "bg-white shadow-[0_12px_28px_-24px_rgba(22,2,74,0.28)]"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -bottom-3 -right-1 font-display text-[3.25rem] font-bold leading-none ${
                        accent ? "text-white/10" : "text-mint/[0.06]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="relative flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-xl ${
                          accent
                            ? "bg-white/15 text-white"
                            : "bg-mint-soft text-mint"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span
                        className={`font-display text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${
                          accent ? "text-white/70" : "text-mint/70"
                        }`}
                      >
                        Signal {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p
                      className={`relative mt-3 font-display text-[0.98rem] font-bold leading-snug ${
                        accent ? "text-white" : "text-mint-ink"
                      }`}
                    >
                      {note.title}
                    </p>
                    {note.body ? (
                      <p
                        className={`relative mt-1.5 text-[0.84rem] leading-relaxed ${
                          accent ? "text-white/80" : "text-[#2A2348]"
                        }`}
                      >
                        {note.body}
                      </p>
                    ) : null}
                  </article>
                </Bounce>
              );
            })}

            {media ? (
              <Bounce className={`min-w-0 ${mediaSpan}`}>
                <div className="relative h-full min-h-[11rem] overflow-hidden rounded-[1.25rem] bg-mint-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={media}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mint-ink/55 via-transparent to-transparent" />
                  {dualMedia ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={secondImage}
                      alt=""
                      className="absolute bottom-2.5 right-2.5 h-12 w-12 rounded-xl border-2 border-white object-cover shadow-lg"
                    />
                  ) : null}
                </div>
              </Bounce>
            ) : null}
          </div>

          {/* Flex ribbon — Not for / outcomes / floors */}
          {(secondTitle ||
            secondBody ||
            filters.length > 0 ||
            outcomes.length > 0 ||
            (secondFigures && secondFigures.length > 0) ||
            secondHref) && (
            <div className="mt-3 flex flex-col gap-3 tablet:flex-row tablet:items-stretch">
              <Bounce className="min-w-0 flex-[1.4]">
                <div className="flex h-full flex-col gap-4 rounded-[1.5rem] border border-dashed border-[#D9CFFF] bg-[#F8F5FF] px-4 py-4 tablet:px-5 tablet:py-5">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div className="min-w-0 max-w-xl">
                      {secondTitle ? (
                        <p className="font-display text-[1.05rem] font-bold leading-snug text-[#16024A]">
                          {secondTitle}
                        </p>
                      ) : null}
                      {secondBody ? (
                        <p className="mt-1 text-[0.86rem] leading-relaxed text-[#2A2348]">
                          {secondBody}
                        </p>
                      ) : null}
                    </div>
                    {secondHref && secondLabel ? (
                      <FramePill href={secondHref} tone="ghost">
                        {secondLabel}
                      </FramePill>
                    ) : null}
                  </div>

                  {panelCards.length > 0 ? (
                    <div className="grid gap-2 tablet:grid-cols-2">
                      {panelCards.map((note, index) => {
                        const isFilter = note.variant === "filter";
                        const Icon = isFilter ? Ban : iconFor(note.title);
                        const isLast = index === panelCards.length - 1;
                        return (
                          <div
                            key={note.title}
                            className={`flex min-w-0 gap-3 rounded-2xl px-3.5 py-3.5 ${
                              isFilter
                                ? "border border-[#E4D9FF] bg-white"
                                : "bg-white shadow-[0_12px_28px_-24px_rgba(22,2,74,0.35)]"
                            } ${isLast ? panelLastSpan : ""}`}
                          >
                            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-mint-soft text-mint">
                              <Icon className="h-3.5 w-3.5" aria-hidden />
                            </span>
                            <div className="min-w-0">
                              <p className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-mint/75">
                                {isFilter ? "Skip if" : "Aim for"}
                              </p>
                              <p className="mt-1 font-display text-[0.95rem] font-bold leading-snug text-mint-ink">
                                {note.title}
                              </p>
                              {note.body ? (
                                <p className="mt-1.5 text-[0.86rem] leading-relaxed text-[#2A2348]">
                                  {note.body}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}

                  {secondFigures && secondFigures.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                      {secondFigures.map((figure) => (
                        <li
                          key={`${figure.label}-${figure.value}`}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5"
                        >
                          <span className="font-display text-[0.88rem] font-bold text-[#3B05C4]">
                            {figure.value}
                          </span>
                          <span className="text-[0.72rem] font-medium text-[#5C5478]">
                            {figure.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Bounce>

              {secondImage && image ? (
                <Bounce className="w-full shrink-0 tablet:w-[11.5rem]">
                  <div className="relative h-full min-h-[8.5rem] overflow-hidden rounded-[1.5rem] bg-[#16024A]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={secondImage}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </Bounce>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </Reveal>
  );
}

export function ClosingPair({
  eyebrow,
  title,
  body,
  lines,
  cards,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  lines?: readonly string[];
  cards: readonly FrameCard[];
}) {
  return (
    <Reveal>
      <section className="px-4 py-14 tablet:px-8 tablet:py-20">
        {eyebrow ? (
          <p className="text-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#5C5478]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mx-auto mt-2 max-w-3xl text-balance text-center font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-bold leading-[1.12]">
          {title}
        </h2>
        {body ? (
          <p className="mx-auto mt-4 max-w-xl text-center text-[0.95rem] leading-relaxed text-[#2A2348]">{body}</p>
        ) : null}
        {lines && lines.length > 0 ? (
          <div className="mx-auto mt-4 max-w-xl space-y-3 text-center">
            {lines.map((line) => (
              <p key={line} className="text-[0.95rem] leading-relaxed text-[#2A2348]">
                {line}
              </p>
            ))}
          </div>
        ) : null}
        <Stagger className="mx-auto mt-8 grid max-w-4xl items-stretch gap-4 tablet:grid-cols-2" itemClassName="min-w-0 h-full">
          {cards.slice(0, 2).map((card, index) => {
            const purple = index === 1;
            const inner = (
              <>
                <span className="block">
                  <span className="block font-display text-[1.15rem] font-bold leading-snug">{card.title}</span>
                  {card.body ? (
                    <span className={`mt-2 block text-[0.9rem] leading-relaxed ${purple ? "text-white/80" : "text-[#2A2348]"}`}>
                      {card.body}
                    </span>
                  ) : null}
                  {card.detail ? (
                    <span className={`mt-2 block text-[0.82rem] leading-relaxed ${purple ? "text-white/70" : "text-[#2A2348]"}`}>
                      {card.detail}
                    </span>
                  ) : null}
                </span>
                {card.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={card.image} alt="" className="mt-4 h-32 w-full rounded-2xl object-cover" />
                ) : null}
                {card.actionLabel ? (
                  <span
                    className={`mt-5 inline-flex w-fit max-w-full whitespace-nowrap rounded-full px-3.5 py-2 text-[0.75rem] font-semibold ${
                      purple ? "bg-white text-mint" : "bg-mint text-white"
                    }`}
                  >
                    {card.actionLabel}
                  </span>
                ) : null}
              </>
            );
            const shell = `flex h-full flex-col rounded-[1.75rem] p-5 tablet:p-6 ${
              purple
                ? "bg-[#3B05C4] text-white"
                : "border border-neutral-100 bg-white shadow-[0_16px_40px_-28px_rgba(22,2,74,0.35)]"
            }`;
            return (
              <Bounce key={card.title} className="h-full">
                {card.href ? (
                  <Link href={card.href} className={shell}>
                    {inner}
                  </Link>
                ) : (
                  <div className={shell}>{inner}</div>
                )}
              </Bounce>
            );
          })}
        </Stagger>
      </section>
    </Reveal>
  );
}

const pastel = ["bg-[#EDE7FF]", "bg-[#E7F3FF]", "bg-[#F8EFFF]"] as const;

export function PastelCards({
  items,
}: {
  items: readonly { title: string; body?: string }[];
}) {
  return (
    <ul className="mt-5 grid gap-2 tablet:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.title} className={`rounded-2xl p-3 text-left ${pastel[index % pastel.length]}`}>
          <p className="font-display text-[0.82rem] font-bold leading-snug">{item.title}</p>
          {item.body ? <p className="mt-1 text-[0.7rem] leading-snug text-[#2A2348]">{item.body}</p> : null}
        </li>
      ))}
    </ul>
  );
}

export function CheckCards({
  items,
}: {
  items: readonly { title: string; points: readonly string[]; tone?: "soft" | "ink" }[];
}) {
  return (
    <div className={`mt-5 grid gap-3 ${items.length > 1 ? "tablet:grid-cols-2" : ""}`}>
      {items.map((item) => (
        <div
          key={item.title}
          className={
            item.tone === "ink"
              ? "rounded-[1.2rem] bg-[#3B05C4] p-4 text-white"
              : "rounded-[1.2rem] border border-[#3B05C4]/10 bg-[#F7F4FF] p-4"
          }
        >
          <p className="font-display text-[1rem] font-bold">{item.title}</p>
          <ul className="mt-3 space-y-2">
            {item.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-[0.75rem] leading-snug">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function ClosingBand({
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  image,
  grow = false,
}: {
  title: string;
  body?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  image?: string;
  grow?: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-4 bg-[#F7F4FF] px-4 py-10 tablet:grid-cols-[1fr_0.7fr] tablet:px-8 tablet:py-14 ${
        grow ? "mt-auto flex-1" : ""
      }`}
    >
      <div className="min-w-0">
        <h2 className="text-balance font-display text-[clamp(1.45rem,3vw,2.1rem)] font-bold leading-[1.15]">{title}</h2>
        {body ? <p className="mt-3 max-w-xl text-[0.92rem] leading-relaxed text-[#2A2348]">{body}</p> : null}
        <div className="mt-5 flex flex-wrap gap-2">
          <FramePill href={primaryHref}>{primaryLabel}</FramePill>
          {secondaryHref && secondaryLabel ? (
            <FramePill href={secondaryHref} tone="ghost">
              {secondaryLabel}
            </FramePill>
          ) : null}
        </div>
      </div>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="h-36 w-full rounded-[1.2rem] object-cover" />
      ) : null}
    </div>
  );
}
