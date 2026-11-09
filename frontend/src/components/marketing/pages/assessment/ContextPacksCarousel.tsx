"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  animate,
  type PanInfo,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button/variants";
import {
  growthAssessmentSections,
  growthDimensionConfigs,
} from "@/config/growthDimensions";
import { ROUTES, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export type ContextPack = {
  id: string;
  title: string;
  meta: string;
  tag: string;
  href?: string;
  image: string;
  imageAlt: string;
  toggleable?: boolean;
};

type Props = {
  activeDims: string[];
  door: "assessment" | "xray" | "call";
  onSelectPack: (id: string) => void;
  onAttachAll: () => void;
};

const questionCount = growthAssessmentSections.reduce(
  (n, s) => n + s.questions.length,
  0,
);

const dimensionImages: Record<string, { src: string; alt: string }> = {
  "digital-presence": {
    src: "/images/desks/technology.jpg",
    alt: "Technology desk",
  },
  brand: { src: "/images/desks/brand.jpg", alt: "Brand desk" },
  "lead-generation": {
    src: "/images/levers/demand-search.jpg",
    alt: "Demand search",
  },
  "sales-conversion": {
    src: "/images/levers/sales-pipeline.jpg",
    alt: "Sales pipeline",
  },
  "customer-retention": {
    src: "/images/people/shop-owner.jpg",
    alt: "Shop owner",
  },
  operations: {
    src: "/images/levers/ops-scoreboard.jpg",
    alt: "Ops scoreboard",
  },
  analytics: {
    src: "/images/desks/intelligence.jpg",
    alt: "Intelligence desk",
  },
};

export function buildContextPacks(): ContextPack[] {
  const dims = Object.values(growthDimensionConfigs).map((d) => {
    const img = dimensionImages[d.id] ?? {
      src: "/images/desks/growth.jpg",
      alt: d.label,
    };
    return {
      id: d.id,
      title: d.label,
      meta: d.description,
      tag: `${Math.round(d.weight * 10) / 10}× weight`,
      image: img.src,
      imageAlt: img.alt,
      toggleable: true as const,
    };
  });

  return [
    {
      id: "assessment-pack",
      title: "Growth Assessment",
      meta: `${questionCount} questions · ${growthAssessmentSections.length} sections`,
      tag: "Questionnaire",
      href: "/growth-assessment/start",
      image: "/images/people/method-monday.jpg",
      imageAlt: "Monday method review",
    },
    {
      id: "xray-pack",
      title: "Business X-Ray",
      meta: "Live homepage fetch · four loops",
      tag: "Instant scan",
      href: ROUTES.businessXray,
      image: "/images/desks/intelligence.jpg",
      imageAlt: "Scoreboard desk",
    },
    {
      id: "roadmap",
      title: "90-day roadmap",
      meta: "Shareable first moves after you score",
      tag: "Plan",
      href: "/growth-assessment/start",
      image: "/images/desks/growth.jpg",
      imageAlt: "Growth plan desk",
    },
    ...dims,
  ];
}

type Break = "mobile" | "tablet" | "desktop";

/** Manual swipe only. Wider fan on tablet/desktop. Bounce spring on change. */
function curveStyle(offset: number, reduce: boolean | null, br: Break) {
  const abs = Math.abs(offset);
  const gap = br === "desktop" ? 96 : br === "tablet" ? 88 : 70;

  if (reduce) {
    return {
      x: `${offset * Math.min(gap, 78)}%`,
      scale: offset === 0 ? 1 : 0.9,
      opacity: abs > 2 ? 0 : 1,
      zIndex: 20 - abs,
      rotateY: 0,
      y: 0,
      filter: "none" as const,
    };
  }

  return {
    x: `${offset * gap}%`,
    y: abs * abs * (br === "mobile" ? 10 : 18),
    scale: Math.max(0.52, 1 - abs * (br === "mobile" ? 0.16 : 0.12)),
    rotateY: offset * (br === "mobile" ? -26 : -36),
    opacity: abs > 2 ? 0 : Math.max(0.3, 1 - abs * 0.26),
    zIndex: 40 - abs,
    filter:
      abs === 0
        ? "brightness(1)"
        : `brightness(${Math.max(0.55, 1 - abs * 0.14)})`,
  };
}

function useBreak(): Break {
  const [br, setBr] = useState<Break>("mobile");

  useEffect(() => {
    const tablet = window.matchMedia("(min-width: 768px)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      if (desktop.matches) setBr("desktop");
      else if (tablet.matches) setBr("tablet");
      else setBr("mobile");
    };
    sync();
    tablet.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    return () => {
      tablet.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
    };
  }, []);

  return br;
}

export function ContextPacksCarousel({
  activeDims,
  door,
  onSelectPack,
  onAttachAll,
}: Props) {
  const reduce = useReducedMotion();
  const br = useBreak();
  const packs = useMemo(() => buildContextPacks(), []);
  const [active, setActive] = useState(0);
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 260, damping: 28, mass: 0.55 });

  const go = useCallback(
    (next: number) => {
      const len = packs.length;
      setActive(((next % len) + len) % len);
    },
    [packs.length],
  );

  function onDragEnd(_: unknown, info: PanInfo) {
    const threshold = 56;
    if (info.offset.x < -threshold || info.velocity.x < -420) go(active + 1);
    else if (info.offset.x > threshold || info.velocity.x > 420) go(active - 1);
    // Bounce snap-back when releasing a swipe
    void animate(dragX, 0, {
      type: "spring",
      stiffness: 480,
      damping: 14,
      mass: 0.55,
    });
  }

  const nearby = [-2, -1, 0, 1, 2].map((offset) => {
    const index = (active + offset + packs.length) % packs.length;
    return { offset, pack: packs[index]!, index };
  });

  const center = packs[active]!;

  function isSelected(pack: ContextPack) {
    if (pack.id === "assessment-pack" || pack.id === "roadmap")
      return door === "assessment";
    if (pack.id === "xray-pack") return door === "xray";
    return activeDims.includes(pack.id);
  }

  return (
    <section className="relative mt-12 overflow-x-clip">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-mint">
          Context packs
        </p>
        <h3 className="mt-3 font-display text-[clamp(1.6rem,4vw,2.4rem)] font-bold tracking-tight text-mint-ink">
          Curious what the desk can open?
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-neutral-600">
          Same {siteConfig.name} doors and seven dimensions — spun into a working
          carousel you can attach, flip, and start from.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onAttachAll}
            className={cn(
              buttonVariants({ variant: "contained", size: "md" }),
              "inline-flex !rounded-full border-0 !bg-mint !text-white hover:!bg-mint-deep",
            )}
          >
            Attach all dimensions
            <span className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-mint">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>
          {center.href ? (
            <Link
              href={center.href}
              className="text-[0.85rem] font-semibold text-mint-ink underline-offset-4 hover:underline"
            >
              Open {center.title}
            </Link>
          ) : null}
        </div>
      </motion.div>

      {/* Manual swipe only — bounce spring; wider fan on tablet/desktop */}
      <div
        className="relative mx-auto mt-8 h-[280px] w-full max-w-[1240px] tablet:mt-14 tablet:h-[420px] laptop:h-[460px]"
        style={{ perspective: "1700px" }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center touch-pan-y"
          style={{ x: springX, transformStyle: "preserve-3d" }}
          drag={reduce ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.28}
          onDragEnd={onDragEnd}
        >
          {nearby.map(({ offset, pack, index }) => {
            const style = curveStyle(offset, reduce, br);
            const selected = isSelected(pack);
            const isCenter = offset === 0;

            return (
              <motion.article
                key={`${pack.id}-${index}`}
                className="absolute w-[150px] cursor-grab active:cursor-grabbing mobile-sm:w-[168px] tablet:w-[220px] laptop:w-[248px]"
                style={{ transformStyle: "preserve-3d" }}
                initial={false}
                animate={{
                  x: style.x,
                  y: style.y,
                  scale: style.scale,
                  rotateY: style.rotateY,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  filter: style.filter,
                }}
                transition={{
                  type: "spring",
                  stiffness: 360,
                  damping: 14,
                  mass: 0.62,
                }}
                whileHover={
                  reduce || !isCenter
                    ? undefined
                    : {
                        y: (typeof style.y === "number" ? style.y : 0) - 12,
                        scale:
                          (typeof style.scale === "number" ? style.scale : 1) +
                          0.05,
                      }
                }
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!isCenter) {
                      go(index);
                      return;
                    }
                    onSelectPack(pack.id);
                  }}
                  className={cn(
                    "group relative block w-full overflow-hidden rounded-[1.4rem] border text-left shadow-[0_28px_60px_-28px_rgba(22,2,74,0.55)]",
                    selected
                      ? "border-mint ring-2 ring-mint/25"
                      : "border-white/70",
                  )}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-mint-ink">
                    <Image
                      src={pack.image}
                      alt={pack.imageAlt}
                      fill
                      sizes="280px"
                      className="object-cover transition duration-700 group-hover:scale-105"
                      priority={isCenter}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16024A]/90 via-[#16024A]/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <p className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/75">
                        {pack.tag}
                      </p>
                      <p className="mt-1 font-display text-[1rem] font-bold leading-tight text-white">
                        {pack.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[0.7rem] leading-snug text-white/75">
                        {pack.meta}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* Single centered caption — no scattered # labels on mobile */}
      <motion.div
        key={center.id}
        initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 18 }}
        className="mx-auto mt-3 max-w-md px-4 text-center tablet:mt-5"
      >
        <p className="font-display text-[0.9rem] font-bold text-mint-ink">
          <span className="text-mint">
            #{String(active + 1).padStart(2, "0")}
          </span>{" "}
          {center.title}
        </p>
        <p className="mt-1 text-[0.8rem] text-neutral-600">{center.meta}</p>
      </motion.div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(active - 1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E7DEFF] bg-white text-mint-ink transition hover:bg-mint-soft"
          aria-label="Previous pack"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <p className="min-w-[4.5rem] text-center font-display text-[0.78rem] font-semibold tabular-nums text-neutral-500">
          {active + 1} / {packs.length}
        </p>
        <button
          type="button"
          onClick={() => go(active + 1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E7DEFF] bg-white text-mint-ink transition hover:bg-mint-soft"
          aria-label="Next pack"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
