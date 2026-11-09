"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  LayoutGrid,
  Phone,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { divisions } from "@/config/divisions";
import { ROUTES, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const technology = divisions[0]!;

type StatusTone = "good" | "attention" | "medium";

type StatusCard = {
  id: string;
  label: string;
  status: string;
  tone: StatusTone;
  quote: string;
  by: string;
};

type WorkspaceItem = {
  id: string;
  title: string;
  detail: string;
  Icon: LucideIcon;
  href: string;
};

/** Pastel status cards - attachment layout, Xkwisit meaning. */
const statusCards: StatusCard[] = [
  {
    id: "team",
    label: "Agency OS",
    status: "Good",
    tone: "good",
    quote:
      "Every client job sits on one screen. The stuck task has a person’s name - nothing hides in WhatsApp.",
    by: "Our team · Monday ritual",
  },
  {
    id: "home",
    label: "Client portal",
    status: "Attention",
    tone: "attention",
    quote:
      "Owners still chase “any update?” across chats. Your private login ends that - results, approvals, and next steps in one place.",
    by: "Your side · private account",
  },
  {
    id: "phone",
    label: "Approvals",
    status: "Medium",
    tone: "medium",
    quote:
      "Clear what is stuck before Monday. Approve designs and posts from your phone - not only in a lost thread.",
    by: "Owners · on mobile",
  },
];

const workspaceItems: WorkspaceItem[] = [
  {
    id: "login",
    title: "Your private login",
    detail: "Your side · see work anytime",
    Icon: Zap,
    href: ROUTES.book,
  },
  {
    id: "record",
    title: "Agency record",
    detail: "Our side · one shared system",
    Icon: LayoutGrid,
    href: ROUTES.book,
  },
  {
    id: "approvals",
    title: "Approvals",
    detail: "Phone-ready · clear before Monday",
    Icon: Phone,
    href: ROUTES.book,
  },
  {
    id: "invoices",
    title: "Invoices & pay",
    detail: "Money next to the work",
    Icon: Wallet,
    href: ROUTES.book,
  },
  {
    id: "build",
    title: "Website, app & payments",
    detail: technology.stake,
    Icon: ArrowRight,
    href: technology.href,
  },
];

const toneStyles: Record<
  StatusTone,
  { card: string; badge: string; label: string }
> = {
  good: {
    card: "bg-[#E8F8EF]",
    badge: "text-[#00AC4F]",
    label: "text-[#067A3A]",
  },
  attention: {
    card: "bg-[#FDECEC]",
    badge: "text-[#C40404]",
    label: "text-[#8E0303]",
  },
  medium: {
    card: "bg-[#FFF0E8]",
    badge: "text-[#C45A05]",
    label: "text-[#9A4504]",
  },
};

/**
 * Two-systems product section - modal layout borrowed from the B2B dashboard attachment.
 * Xkwisit copy, data, and mint brand retained.
 */
export function ProjectsShowcase() {
  const [activeId, setActiveId] = useState(statusCards[0]!.id);
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-x-clip bg-white">
      <Container className="relative px-4 py-16 mobile-sm:px-5 tablet:px-8 tablet:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-mint">
            Two sides. One system.
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.7rem)] font-bold leading-[1.08] tracking-tight text-mint-ink">
            Stop chasing updates on scattered platforms.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-relaxed text-neutral-600">
            Private login for you. Same system for our team. See work, leads, and invoices
            anytime - so nothing gets lost in chat.
          </p>
        </div>

        {/* Soft stage behind the modal - attachment glassmorphism feel */}
        <div className="relative mx-auto mt-10 max-w-5xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_30%_20%,rgba(59,5,196,0.14),transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(252,63,227,0.1),transparent_50%)] blur-sm"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-6 rounded-[1.75rem] bg-mint-soft/80 backdrop-blur-sm"
          />

          <motion.article
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-[0_40px_80px_-36px_rgba(22,2,74,0.45)] mobile-sm:rounded-[2rem]"
            role="region"
            aria-label="Xkwisit client workspace preview"
          >
            {/* Header - school modal pattern → Xkwisit workspace */}
            <header className="flex items-start gap-3 border-b border-neutral-200/80 px-4 py-4 mobile-sm:gap-4 mobile-sm:px-6 mobile-sm:py-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mint text-white shadow-[0_10px_24px_-12px_rgba(59,5,196,0.7)]">
                <svg viewBox="0 0 40 40" className="h-4 w-4" aria-hidden>
                  <path
                    d="M11 11L20 20M20 20L29 11M20 20L11 29M20 20L29 29"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Workspace
                </p>
                <h3 className="mt-0.5 font-display text-[1.15rem] font-bold leading-tight text-mint-ink mobile-sm:text-[1.35rem]">
                  {siteConfig.name} client portal
                </h3>
              </div>

              <dl className="hidden shrink-0 gap-6 text-right tablet:flex">
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                    Structure
                  </dt>
                  <dd className="mt-0.5 text-[0.85rem] font-semibold text-mint-ink">
                    Two sides
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                    Shared view
                  </dt>
                  <dd className="mt-0.5 text-[0.85rem] font-semibold text-mint-ink">
                    One Monday number
                  </dd>
                </div>
              </dl>

              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-neutral-500"
                aria-hidden
              >
                <X className="h-4 w-4" />
              </span>
            </header>

            <div className="grid gap-0 laptop:grid-cols-[1.05fr_0.95fr]">
              {/* Left - pastel feedback cards */}
              <div className="space-y-3 p-4 mobile-sm:p-5 tablet:p-6">
                {statusCards.map((card, index) => {
                  const tone = toneStyles[card.tone];
                  const selected = activeId === card.id;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setActiveId(card.id)}
                      aria-pressed={selected}
                      className={cn(
                        "w-full rounded-[1.25rem] px-4 py-3.5 text-left transition-shadow mobile-sm:rounded-[1.35rem] mobile-sm:px-5 mobile-sm:py-4",
                        tone.card,
                        selected
                          ? "ring-2 ring-mint/40 shadow-[0_14px_28px_-20px_rgba(22,2,74,0.35)]"
                          : "hover:shadow-[0_10px_22px_-18px_rgba(22,2,74,0.3)]",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p
                          className={cn(
                            "text-[0.78rem] font-bold mobile-sm:text-[0.85rem]",
                            tone.label,
                          )}
                        >
                          {card.label}
                        </p>
                        <span
                          className={cn(
                            "text-[0.72rem] font-semibold mobile-sm:text-[0.78rem]",
                            tone.badge,
                          )}
                        >
                          {card.status}
                        </span>
                      </div>
                      <p className="mt-2.5 text-[0.88rem] font-medium italic leading-relaxed text-mint-ink/90 mobile-sm:text-[0.92rem]">
                        “{card.quote}”
                      </p>
                      <p className="mt-3 text-[0.72rem] font-medium text-neutral-600">
                        {index === 0 ? "01" : index === 1 ? "02" : "03"} · {card.by}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right - licensed tools list panel */}
              <div className="border-t border-neutral-200/80 bg-[#F7F8FA] p-4 mobile-sm:p-5 tablet:border-l tablet:border-t-0 tablet:p-6">
                <p className="text-[0.8rem] font-semibold text-mint-ink mobile-sm:text-[0.88rem]">
                  What lives in this workspace
                </p>
                <p className="mt-1 text-[0.75rem] leading-snug text-neutral-600">
                  Same record for you and our team - pick a lane to open.
                </p>

                <ul className="mt-4 space-y-1">
                  {workspaceItems.map((item) => {
                    const Icon = item.Icon;
                    const related =
                      (item.id === "record" && activeId === "team") ||
                      (item.id === "login" && activeId === "home") ||
                      (item.id === "approvals" && activeId === "phone");
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-[1.1rem] px-2.5 py-2.5 transition-colors mobile-sm:px-3 mobile-sm:py-3",
                            related
                              ? "bg-white shadow-[0_8px_20px_-14px_rgba(22,2,74,0.35)]"
                              : "hover:bg-white/80",
                          )}
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-mint shadow-sm">
                            <Icon className="h-4 w-4" aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-display text-[0.92rem] font-bold text-mint-ink">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block truncate text-[0.72rem] text-neutral-600">
                              {item.detail}
                            </span>
                          </span>
                          <ChevronRight
                            className="h-4 w-4 shrink-0 text-neutral-500"
                            aria-hidden
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <Link
                  href={ROUTES.book}
                  className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-mint px-4 py-2.5 text-[0.85rem] font-semibold text-white hover:bg-mint-deep"
                >
                  Book a walkthrough
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </motion.article>
        </div>
      </Container>
    </section>
  );
}
