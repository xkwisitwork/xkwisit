"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { NavGroup, NavItem } from "@/config/navigation/marketingNav";
import { cn } from "@/lib/utils/cn";

import { MarketingNavItem } from "./MarketingNavItem";

export type MegaMenuProps = {
  groups: NavGroup[];
  onClose: () => void;
  onKeepOpen?: () => void;
  /** `columns` = Services-style groups. `bento` = tile grid (Solutions). */
  layout?: "columns" | "bento";
};

const panelShell =
  "relative max-h-[min(68vh,calc(100dvh-5.25rem))] overflow-y-auto overscroll-contain rounded-[1.25rem] border border-mint/25 bg-white shadow-[0_28px_64px_-28px_rgba(37,99,235,0.45),0_0_0_1px_rgba(37,99,235,0.06)] tablet:rounded-[1.35rem]";

/**
 * Viewport-anchored shell — never clips off the left/right of a tablet screen.
 */
function MegaShell({
  children,
  onKeepOpen,
  onClose,
}: {
  children: ReactNode;
  onKeepOpen?: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onKeepOpen}
      onMouseLeave={onClose}
      className="fixed inset-x-3 top-14 z-50 mx-auto w-[calc(100vw-1.5rem)] max-w-[46rem] pt-2 tablet:inset-x-5 tablet:top-16 tablet:w-[calc(100vw-2.5rem)] laptop:inset-x-8 laptop:max-w-[48rem]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-[2rem] bg-mint/10 blur-2xl"
      />
      {children}
    </motion.div>
  );
}

/**
 * Multi-column / bento hover menu — viewport-safe on tablet.
 */
export function MegaMenu({
  groups,
  onClose,
  onKeepOpen,
  layout = "columns",
}: MegaMenuProps) {
  if (layout === "bento") {
    return (
      <BentoMegaMenu
        groups={groups}
        onClose={onClose}
        onKeepOpen={onKeepOpen}
      />
    );
  }

  const cols = Math.min(Math.max(groups.length, 1), 3);

  return (
    <MegaShell onKeepOpen={onKeepOpen} onClose={onClose}>
      <div className={panelShell}>
        <div
          className={cn(
            "grid gap-1 p-2.5 tablet:gap-2 tablet:p-3 laptop:p-4",
            cols === 1 && "grid-cols-1",
            cols === 2 && "grid-cols-1 tablet:grid-cols-2",
            cols >= 3 && "grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3",
          )}
        >
          {groups.map((group) => (
            <div key={group.label} className="min-w-0">
              <p className="mb-1 px-2.5 pt-1 font-display text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-mint tablet:mb-1.5 tablet:px-3 tablet:text-[0.65rem]">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <MarketingNavItem
                      item={item}
                      onNavigate={onClose}
                      className="!gap-2 !px-2 !py-2 tablet:!gap-3 tablet:!px-3 tablet:!py-2.5"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </MegaShell>
  );
}

function BentoMegaMenu({
  groups,
  onClose,
  onKeepOpen,
}: {
  groups: NavGroup[];
  onClose: () => void;
  onKeepOpen?: () => void;
}) {
  const pathname = usePathname();
  const items = groups.flatMap((g) => g.items);

  return (
    <MegaShell onKeepOpen={onKeepOpen} onClose={onClose}>
      <div className={cn(panelShell, "bg-[#FAFAFB]")}>
        <div className="sticky top-0 z-[1] flex flex-wrap items-center justify-between gap-2 border-b border-[#EDE8F6] bg-white px-3 py-2.5 tablet:gap-3 tablet:px-4 tablet:py-3">
          <div className="min-w-0 flex-1">
            <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-mint tablet:text-[0.65rem]">
              Solutions
            </p>
            <p className="mt-0.5 truncate text-[0.72rem] text-neutral-600 tablet:text-[0.8rem]">
              Industry plays — pick the desk that matches your market.
            </p>
          </div>
          <Link
            href="/solutions"
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-mint-soft px-2.5 py-1.5 text-[0.72rem] font-semibold text-mint-ink transition hover:bg-mint hover:text-white"
          >
            All
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2 p-2.5 tablet:gap-2.5 tablet:p-3 laptop:grid-cols-3 laptop:p-4">
          {items.map((item) => (
            <BentoTile
              key={item.href}
              item={item}
              active={
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              }
              onNavigate={onClose}
            />
          ))}
        </div>
      </div>
    </MegaShell>
  );
}

function BentoTile({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active?: boolean;
  onNavigate: () => void;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group relative flex min-h-[5.75rem] flex-col overflow-hidden rounded-[1rem] border p-3 transition-all tablet:min-h-[6.75rem] tablet:rounded-[1.15rem] tablet:p-3.5",
        active
          ? "border-mint/40 bg-mint-soft shadow-[0_12px_28px_-18px_rgba(59,5,196,0.45)]"
          : "border-transparent bg-white hover:-translate-y-0.5 hover:border-mint/25 hover:shadow-[0_16px_32px_-20px_rgba(59,5,196,0.4)]",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        {Icon ? (
          <span
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-xl transition-colors tablet:h-10 tablet:w-10 tablet:rounded-2xl",
              active
                ? "bg-mint text-white"
                : "bg-mint-soft text-mint group-hover:bg-mint group-hover:text-white",
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        ) : null}
        <ArrowUpRight
          className={cn(
            "h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover:opacity-100",
            active ? "text-mint opacity-70" : "text-neutral-400",
          )}
        />
      </div>
      <p className="mt-2 font-display text-[0.86rem] font-bold leading-tight text-mint-ink tablet:mt-2.5 tablet:text-[0.95rem]">
        {item.label}
      </p>
      {item.description ? (
        <p className="mt-1 line-clamp-2 text-[0.7rem] leading-snug text-neutral-600 tablet:text-[0.76rem]">
          {item.description}
        </p>
      ) : null}
    </Link>
  );
}
