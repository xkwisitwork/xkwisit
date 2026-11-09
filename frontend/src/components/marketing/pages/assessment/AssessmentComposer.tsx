"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  FileText,
  ListChecks,
  ScanSearch,
  Stethoscope,
  DoorOpen,
  X,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/Button/variants";
import { ContextPacksCarousel } from "@/components/marketing/pages/assessment/ContextPacksCarousel";
import {
  growthDimensionConfigs,
} from "@/config/growthDimensions";
import { ROUTES, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const ease = [0.22, 1, 0.36, 1] as const;

type DoorId = "assessment" | "xray" | "call";

const doors: Record<
  DoorId,
  {
    label: string;
    chip: string;
    href: string;
    cta: string;
    hint: string;
  }
> = {
  assessment: {
    label: "Full assessment",
    chip: "assessment.pack",
    href: "/growth-assessment/start",
    cta: "Start assessment",
    hint: "Sixteen plain questions. Seven scores. One fix-first.",
  },
  xray: {
    label: "Business X-Ray",
    chip: "xray.scan",
    href: ROUTES.businessXray,
    cta: "Paste my website",
    hint: "One field. Live homepage read on brand, demand, sales, retention.",
  },
  call: {
    label: "Strategy call",
    chip: "call.30m",
    href: ROUTES.book,
    cta: "Book 30 minutes",
    hint: "Walk the weak spot live. Lagos time. No slide deck.",
  },
};

const prompts = [
  "Leads come in, but nobody closes.",
  "Ads spend goes up - revenue stays flat.",
  "Brand looks fine. WhatsApp follow-up dies.",
  "We sell once - then customers vanish.",
] as const;

const dimensions = Object.values(growthDimensionConfigs);

function Chip({
  label,
  onRemove,
  tone = "soft",
}: {
  label: string;
  onRemove?: () => void;
  tone?: "soft" | "mint";
}) {
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.28, ease }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.78rem] font-semibold",
        tone === "mint"
          ? "border-mint/20 bg-mint text-white"
          : "border-[#E7DEFF] bg-white text-mint-ink",
      )}
    >
      <FileText className="h-3.5 w-3.5 opacity-70" aria-hidden />
      {label}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full p-0.5 opacity-60 transition hover:opacity-100"
          aria-label={`Remove ${label}`}
        >
          <X className="h-3 w-3" />
        </button>
      ) : null}
    </motion.span>
  );
}

export function AssessmentComposer() {
  const reduce = useReducedMotion();
  const [door, setDoor] = useState<DoorId>("assessment");
  const [note, setNote] = useState("");
  const [activeDims, setActiveDims] = useState<string[]>(() =>
    dimensions.slice(0, 4).map((d) => d.id),
  );

  const activeDoor = doors[door];

  function toggleDim(id: string) {
    setActiveDims((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function selectPack(id: string) {
    if (id === "assessment-pack" || id === "roadmap") {
      setDoor("assessment");
      return;
    }
    if (id === "xray-pack") {
      setDoor("xray");
      return;
    }
    toggleDim(id);
  }

  function suggestDoor() {
    const text = note.toLowerCase();
    if (text.includes("website") || text.includes("site") || text.includes("seo")) {
      setDoor("xray");
      return;
    }
    if (text.includes("call") || text.includes("talk") || text.includes("meeting")) {
      setDoor("call");
      return;
    }
    setDoor("assessment");
  }

  return (
    <div className="relative mx-auto max-w-6xl">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_20%_20%,rgba(59,5,196,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(91,69,255,0.14),transparent_40%)]"
        animate={
          reduce
            ? undefined
            : { opacity: [0.7, 1, 0.7], scale: [1, 1.02, 1] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease }}
        className="overflow-hidden rounded-[2rem] border border-[#E7DEFF] bg-white/90 shadow-[0_30px_80px_-40px_rgba(22,2,74,0.45)] backdrop-blur-xl"
      >
        <div className="border-b border-[#F0EBFF] px-5 py-4 mobile-sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <AnimatePresence mode="popLayout">
              <Chip key={activeDoor.chip} label={activeDoor.chip} tone="mint" />
              {activeDims.slice(0, 3).map((id) => {
                const dim =
                  growthDimensionConfigs[id as keyof typeof growthDimensionConfigs];
                if (!dim) return null;
                return (
                  <Chip
                    key={id}
                    label={`${dim.label.toLowerCase()}.dim`}
                    onRemove={() => toggleDim(id)}
                  />
                );
              })}
            </AnimatePresence>
            {activeDims.length > 3 ? (
              <span className="rounded-full bg-mint-soft px-2.5 py-1 text-[0.72rem] font-semibold text-mint">
                +{activeDims.length - 3} dimensions
              </span>
            ) : null}
          </div>
        </div>

        <div className="px-5 py-5 mobile-sm:px-6">
          <label className="sr-only" htmlFor="growth-note">
            What feels stuck
          </label>
          <div
            className={cn(
              "relative rounded-[2rem] border bg-[#F4F2F8] transition focus-within:border-mint/35 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(59,5,196,0.08)]",
              note ? "border-[#E7DEFF]" : "border-transparent",
            )}
          >
            {!note ? (
              <span
                aria-hidden
                className="pointer-events-none absolute left-2 top-2 inline-flex max-w-[calc(100%-1rem)] items-center truncate rounded-full bg-white px-4 py-2 text-[0.88rem] font-medium text-neutral-500 shadow-[0_8px_20px_-14px_rgba(22,2,74,0.4)]"
              >
                Tell {siteConfig.name} what’s stuck — brand, ads, sales, or follow-up…
              </span>
            ) : null}
            <textarea
              id="growth-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder=""
              className="relative z-[1] w-full resize-none bg-transparent px-5 py-4 text-[1.02rem] leading-relaxed text-mint-ink outline-none"
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {prompts.map((p, i) => (
              <motion.button
                key={p}
                type="button"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease }}
                onClick={() => setNote(p)}
                className="rounded-full border border-[#E7DEFF] bg-[#FBF9FF] px-3 py-1.5 text-left text-[0.75rem] font-medium text-mint-ink transition hover:border-mint/40 hover:bg-mint-soft"
              >
                {p}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#F0EBFF] px-4 py-3 mobile-sm:flex-row mobile-sm:items-center mobile-sm:justify-between mobile-sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <ToolButton
              label="Pick a door"
              onClick={suggestDoor}
              icon={<DoorOpen className="h-4 w-4" />}
            />
            <div className="flex items-center gap-1 rounded-full border border-[#E7DEFF] bg-[#FBF9FF] p-1">
              {(
                [
                  ["assessment", ListChecks],
                  ["xray", ScanSearch],
                  ["call", Calendar],
                ] as const
              ).map(([id, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setDoor(id)}
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-full transition",
                    door === id
                      ? "bg-mint text-white shadow-[0_10px_20px_-12px_rgba(59,5,196,0.8)]"
                      : "text-mint-ink/70 hover:bg-white",
                  )}
                  aria-label={doors[id].label}
                  aria-pressed={door === id}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E7DEFF] bg-white px-3 py-1.5 text-[0.75rem] font-semibold text-mint-ink">
              <Stethoscope className="h-3.5 w-3.5 text-mint" aria-hidden />
              {siteConfig.name} Diagnosis
            </span>
          </div>

          <div className="flex flex-col gap-2 mobile-sm:items-end">
            <p className="text-[0.78rem] text-neutral-600">{activeDoor.hint}</p>
            <Link
              href={activeDoor.href}
              className={cn(
                buttonVariants({ variant: "contained", size: "md" }),
                "inline-flex !rounded-full border-0 !bg-mint-ink !px-5 !text-white hover:!bg-mint",
              )}
            >
              {activeDoor.cta}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      <ContextPacksCarousel
        activeDims={activeDims}
        door={door}
        onSelectPack={selectPack}
        onAttachAll={() => setActiveDims(dimensions.map((d) => d.id))}
      />
    </div>
  );
}

function ToolButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 items-center gap-2 rounded-full border border-[#E7DEFF] bg-white px-3 text-[0.75rem] font-semibold text-mint-ink transition hover:bg-mint-soft"
    >
      {icon}
      {label}
    </button>
  );
}

