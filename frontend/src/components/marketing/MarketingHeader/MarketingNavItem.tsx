"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/cn";

import type { NavItem } from "@/config/navigation/marketingNav";

export type MarketingNavItemProps = {
  item: NavItem;
  /** Override active state detection. */
  forceActive?: boolean;
  /** Called after navigation. */
  onNavigate?: () => void;
  /** Extra classes. */
  className?: string;
};

/**
 * A single navigation link with active-state detection.
 * Used inside the desktop nav, mega menu, and mobile menu.
 */
export function MarketingNavItem({
  item,
  forceActive,
  onNavigate,
  className,
}: MarketingNavItemProps) {
  const pathname = usePathname();
  const isActive =
    forceActive ?? (pathname === item.href || pathname.startsWith(`${item.href}/`));

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group flex items-start gap-3 rounded-xl px-3 py-2.5 text-400 transition-colors",
        isActive
          ? "bg-mint-soft text-mint-ink"
          : "text-neutral-600 hover:bg-mint-soft/70 hover:text-neutral-900",
        className,
      )}
    >
      {Icon ? (
        <span
          className={cn(
            "mt-0.5 shrink-0 rounded-xl p-2 transition-colors",
            isActive
              ? "bg-mint text-white"
              : "bg-mint-soft text-mint group-hover:bg-mint group-hover:text-white",
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
      ) : null}

      <span className="min-w-0 flex-1">
        <span className="block font-medium leading-tight">{item.label}</span>
        {item.description ? (
          <span className="mt-1 block text-300 leading-snug text-neutral-600">
            {item.description}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
