import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  ClosingPair,
  FrameColumns,
  FrameHero,
  FrameNav,
  FramePage,
  FrameStage,
  ProofBand,
  SplitFeature,
} from "@/components/marketing/frames/SiteFrames";

import { Container } from "@/components/layout/Container";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export type MarketingPageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Optional right-side image for split heroes. */
  imageSrc?: string;
  imageAlt?: string;
  /** Small proof chips under the CTAs. */
  stats?: readonly { value: string; label: string }[];
  /** Hero only - skip the frame sections that would reprint the same lines. */
  introOnly?: boolean;
  className?: string;
};

/**
 * Shared marketing page intro — bento shell, massive type, circular primary CTA.
 * Layout from the attached reference; typography + mint tokens from Xkwisit.
 * Not used on the public homepage.
 */
export function MarketingPageHero({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  imageSrc,
  imageAlt = "",
  stats,
  introOnly = false,
  className,
}: MarketingPageHeroProps) {
  const photo = imageSrc ?? "/images/desks/intelligence.jpg";
  const figures = (stats ?? []).map((stat) => ({ value: stat.value, label: stat.label }));
  const heroStats = figures.slice(0, 2);
  const links = [
    primaryHref && primaryLabel ? { href: primaryHref, label: primaryLabel } : null,
    secondaryHref && secondaryLabel ? { href: secondaryHref, label: secondaryLabel } : null,
  ].filter((item): item is { href: string; label: string } => item !== null);
  const showNav = !introOnly && links.length > 0;

  return (
    <div className={className}>
      <FrameStage label={eyebrow} caption={description}>
        <FrameColumns>
          <FramePage>
            <FrameHero
              nav={
                showNav ? (
                  <FrameNav
                    links={links}
                    ctaHref={primaryHref ?? ROUTES.book}
                    ctaLabel={primaryLabel ?? "Book a strategy call"}
                  />
                ) : undefined
              }
              eyebrow={eyebrow}
              title={title}
              description={description}
              primaryHref={primaryHref}
              primaryLabel={primaryLabel}
              secondaryHref={secondaryHref}
              secondaryLabel={secondaryLabel}
              image={photo}
              imageAlt={imageAlt}
              stats={heroStats}
              names={introOnly ? undefined : figures.map((stat) => stat.label)}
            />
            {introOnly ? null : (
              <>
                <SplitFeature
                  eyebrow={eyebrow}
                  title={
                    typeof title === "string"
                      ? title
                      : figures[0]
                        ? `${figures[0].value}. ${figures[0].label}`
                        : primaryLabel ?? eyebrow
                  }
                  body={
                    figures[1]
                      ? `${figures[1].value} - ${figures[1].label}.`
                      : description
                  }
                  visuals={[]}
                  cards={
                    figures.length > 0
                      ? figures.map((stat) => ({
                          title: stat.value,
                          body: stat.label,
                          image: photo,
                        }))
                      : [
                          {
                            title: primaryLabel ?? eyebrow,
                            body: description,
                            image: photo,
                            href: primaryHref ?? ROUTES.book,
                            actionLabel: primaryLabel ?? "Book a strategy call",
                          },
                          ...(secondaryHref && secondaryLabel
                            ? [
                                {
                                  title: secondaryLabel,
                                  body: "No call required - run a free check on your own timeline.",
                                  image: "/images/people/desk-review.jpg",
                                  href: secondaryHref,
                                  actionLabel: secondaryLabel,
                                },
                              ]
                            : []),
                        ]
                  }
                />
                {figures.length > 0 ? (
                  <ProofBand
                    title={figures[0] ? `${figures[0].value} on the call` : eyebrow}
                    body={figures[0] ? figures[0].label : description}
                    figures={figures}
                    href={primaryHref ?? ROUTES.book}
                    label={primaryLabel ?? "Book a strategy call"}
                    image={photo}
                    secondTitle={secondaryLabel ?? (figures[1]?.label ?? eyebrow)}
                    secondBody={
                      figures[1]
                        ? `${figures[1].value}. ${figures[1].label}`
                        : figures[2]
                          ? `${figures[2].value}. ${figures[2].label}`
                          : description
                    }
                    secondHref={secondaryHref ?? ROUTES.book}
                    secondLabel={secondaryLabel ?? "Book a strategy call"}
                    secondImage="/images/people/desk-review.jpg"
                  />
                ) : null}
                <ClosingPair
                  title={figures[2]?.value ?? primaryLabel ?? eyebrow}
                  body={figures[2]?.label ?? description}
                  cards={[
                    {
                      title: figures[0]?.value ?? primaryLabel ?? eyebrow,
                      body: figures[0] ? figures[0].label : description,
                      image: photo,
                      href: primaryHref ?? ROUTES.book,
                      actionLabel: primaryLabel ?? "Book a strategy call",
                    },
                    {
                      title: figures[1]?.value ?? secondaryLabel ?? "Book a strategy call",
                      body: figures[1]
                        ? figures[1].label
                        : secondaryLabel
                          ? "No call required - run a free check on your own timeline."
                          : description,
                      image: "/images/people/desk-review.jpg",
                      href: secondaryHref ?? ROUTES.book,
                      actionLabel: secondaryLabel ?? "Book a strategy call",
                    },
                  ]}
                />
              </>
            )}
          </FramePage>
        </FrameColumns>
      </FrameStage>
    </div>
  );
}

export type MarketingCtaBandProps = {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
};

/** Inner-page CTA band. Homepage uses CtaSection — do not swap that. */
export function MarketingCtaBand({
  title = "Still guessing where sales are stuck?",
  description = "Take a free check, or book thirty minutes. We name the problem and the first move.",
  href = ROUTES.book,
  label = "Book a strategy call",
}: MarketingCtaBandProps) {
  return (
    <div className="bg-white">
      <Container className="px-4 pb-12 mobile-sm:px-5 tablet:px-8 tablet:pb-16">
        <div className="overflow-hidden rounded-[2rem] bg-mint-ink px-6 py-12 text-white mobile-sm:px-10 tablet:px-14 tablet:py-16">
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mint-soft/80">
            Next step
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-bold leading-[1.05] tracking-tight">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/70">
            {description}
          </p>
          <Link
            href={href}
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-mint px-2 pl-6 pr-2 text-[0.9rem] font-semibold text-white transition-colors hover:bg-mint-deep"
          >
            <span>{label}</span>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-mint"
              aria-hidden
            >
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
}

/** Page canvas — soft gray so white bento cards read clearly. Homepage stays white. */
export function MarketingPageCanvas({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("bg-white", className)}>{children}</div>;
}

/** Nested card used inside marketing pages. */
export function MarketingSoftCard({
  children,
  className,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "soft" | "ink" | "mint";
}) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] p-7 mobile-sm:rounded-[2rem] mobile-sm:p-8",
        tone === "white" && "border border-neutral-200/90 bg-white",
        tone === "soft" && "bg-mint-soft/70",
        tone === "mint" && "bg-mint text-white",
        tone === "ink" && "bg-[#3B05C4] text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Circular mint arrow control — Granger-style proceed affordance. */
export function CircleArrowLink({
  href,
  label,
  className,
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint text-white transition-colors hover:bg-mint-deep",
        className,
      )}
    >
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}
