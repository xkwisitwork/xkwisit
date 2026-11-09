"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import type { AppNavItem } from "@/config/navigation/appNav";
import { cn } from "@/lib/utils/cn";

export type SidebarNavItemProps = {
  item: AppNavItem;
  collapsed?: boolean;
  hasChildren?: boolean;
  isOpen?: boolean;
  onToggleChildren?: () => void;
  tone?: "light" | "dark";
};

/**
 * Single sidebar nav row — floating-rail friendly active states.
 */
export function SidebarNavItem({
  item,
  collapsed = false,
  hasChildren = false,
  isOpen = false,
  onToggleChildren,
  tone = "light",
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const href = item.href ?? "#";
  const isActive = item.href
    ? item.exact
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
    : false;

  const Icon = item.icon;
  const dark = tone === "dark";

  const baseClass = cn(
    "group relative flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-[0.84rem] font-medium transition-all duration-200",
    collapsed && "justify-center px-0 py-2.5",
    item.disabled && "pointer-events-none opacity-50",
    dark && !isActive && "text-white/55 hover:bg-white/10 hover:text-white",
    dark &&
      isActive &&
      "bg-white/15 font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
    !dark &&
      collapsed &&
      isActive &&
      "bg-[#16024A] text-white shadow-[0_10px_24px_-12px_rgba(22,2,74,0.55)]",
    !dark &&
      collapsed &&
      !isActive &&
      "text-neutral-500 hover:bg-[#F4F0FF] hover:text-[#16024A]",
    !dark &&
      !collapsed &&
      isActive &&
      "bg-[#F4F0FF] font-semibold text-[#3B05C4]",
    !dark &&
      !collapsed &&
      !isActive &&
      "text-neutral-600 hover:bg-[#F7F5FC] hover:text-[#16024A]",
  );

  const content = (
    <>
      {Icon ? (
        <span
          className={cn(
            "grid shrink-0 place-items-center transition-transform duration-200 group-hover:scale-[1.04]",
            collapsed ? "h-10 w-10 rounded-full" : "h-5 w-5",
            collapsed && isActive && !dark && "text-white",
          )}
        >
          <Icon
            className={cn(
              collapsed ? "h-[1.15rem] w-[1.15rem]" : "h-[1.05rem] w-[1.05rem]",
              dark && (isActive ? "text-white" : "text-white/60 group-hover:text-white"),
              !dark &&
                !collapsed &&
                (isActive ? "text-[#3B05C4]" : "text-neutral-500 group-hover:text-[#16024A]"),
              !dark &&
                collapsed &&
                (isActive ? "text-white" : "text-neutral-500 group-hover:text-[#16024A]"),
            )}
            aria-hidden="true"
          />
        </span>
      ) : null}

      {!collapsed ? (
        <span className="min-w-0 flex-1 truncate">{item.label}</span>
      ) : null}

      {!collapsed && hasChildren ? (
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            dark ? "text-white/40" : "text-neutral-400",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      ) : null}

      {collapsed && item.badge ? (
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#FC3FE3]" />
      ) : null}
    </>
  );

  const shellClass = cn(baseClass, collapsed && "relative");

  if (hasChildren && onToggleChildren) {
    return (
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={item.label}
        title={collapsed ? item.label : undefined}
        onClick={onToggleChildren}
        className={shellClass}
      >
        {content}
      </button>
    );
  }

  // Always-open parents still navigate when they have an href.
  if (hasChildren && isOpen && item.href && !onToggleChildren) {
    return (
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        aria-label={item.label}
        title={collapsed ? item.label : undefined}
        className={shellClass}
      >
        {content}
      </Link>
    );
  }

  if (item.external && item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.label}
        title={collapsed ? item.label : undefined}
        className={shellClass}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      aria-label={item.label}
      title={collapsed ? item.label : undefined}
      className={shellClass}
    >
      {content}
    </Link>
  );
}
