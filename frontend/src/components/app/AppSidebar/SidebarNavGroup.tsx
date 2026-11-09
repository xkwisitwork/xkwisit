"use client";

import { useState } from "react";

import type { AppNavItem, AppNavSection } from "@/config/navigation/appNav";
import type { Permission } from "@/lib/constants/permissions";
import { NAV_FEATURE_MAP, type FeatureKey } from "@/lib/constants/entitlements";
import { cn } from "@/lib/utils/cn";

import { SidebarNavItem } from "./SidebarNavItem";

export type SidebarNavGroupProps = {
  section: AppNavSection;
  collapsed: boolean;
  hasPermission: (permission: Permission | Permission[]) => boolean;
  canAccess: (feature: FeatureKey | "always" | "platform") => boolean;
  tone?: "light" | "dark";
};

/** Parents that should keep children visible whenever the rail is expanded. */
const ALWAYS_OPEN_IDS = new Set(["settings"]);

function itemAllowed(
  item: AppNavItem,
  hasPermission: SidebarNavGroupProps["hasPermission"],
  canAccess: SidebarNavGroupProps["canAccess"],
) {
  if (item.permission && !hasPermission(item.permission)) return false;
  const feature = NAV_FEATURE_MAP[item.id] ?? "always";
  return canAccess(feature);
}

export function SidebarNavGroup({
  section,
  collapsed,
  hasPermission,
  canAccess,
  tone = "light",
}: SidebarNavGroupProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    if (ALWAYS_OPEN_IDS.has(id)) return;
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const visibleItems = section.items.filter((item) =>
    itemAllowed(item, hasPermission, canAccess),
  );

  if (visibleItems.length === 0) return null;

  const dark = tone === "dark";

  return (
    <div>
      {section.label && !collapsed ? (
        <p
          className={cn(
            "mb-2 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em]",
            dark ? "text-white/35" : "text-neutral-500",
          )}
        >
          {section.label}
        </p>
      ) : null}

      <ul className={cn("space-y-0.5", collapsed && "space-y-1.5")}>
        {visibleItems.map((item) => {
          const hasChildren = Boolean(item.children?.length);
          const visibleChildren =
            item.children?.filter((child) =>
              itemAllowed(child, hasPermission, canAccess),
            ) ?? [];
          const forceOpen = ALWAYS_OPEN_IDS.has(item.id);
          const isOpen = forceOpen || Boolean(openItems[item.id]);

          return (
            <li key={item.id}>
              <SidebarNavItem
                item={item}
                collapsed={collapsed}
                hasChildren={hasChildren && visibleChildren.length > 0}
                isOpen={isOpen}
                onToggleChildren={
                  hasChildren && !forceOpen ? () => toggle(item.id) : undefined
                }
                tone={tone}
              />

              {hasChildren && isOpen && !collapsed ? (
                <ul
                  className={cn(
                    "ml-3 mt-1 space-y-0.5 border-l pl-3",
                    dark ? "border-white/10" : "border-[#E8E2F4]",
                  )}
                >
                  {visibleChildren.map((child) => (
                    <li key={child.id}>
                      <SidebarNavItem
                        item={child}
                        collapsed={false}
                        hasChildren={false}
                        tone={tone}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export type { AppNavItem };
