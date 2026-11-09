"use client";

import { useEffect, useState } from "react";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { SignOutConfirmDialog } from "@/components/app/SignOutConfirmDialog";
import { IconButton } from "@/components/ui/Button";
import { LogoFull, LogoMark } from "@/components/marketing/Logo";
import { appNavSections } from "@/config/navigation/appNav";
import { useAuth } from "@/contexts/AuthContext";
import { useBilling } from "@/contexts/BillingContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { NAV_FEATURE_MAP } from "@/lib/constants/entitlements";
import { cn } from "@/lib/utils/cn";

import { SidebarNavGroup } from "./SidebarNavGroup";

function initials(name: string) {
  const parts = name.split(/[\s@._-]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "X") + (parts[1]?.[0] ?? "")).toUpperCase();
}

/**
 * Floating white icon rail — Xkwisit purple accents, settings children always open when expanded.
 */
export function AppSidebar({
  mobileOpen = false,
  onCloseMobile,
}: {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
  const [collapsed, setCollapsed] = useLocalStorage(
    "xkwisit:sidebar:collapsed:v2",
    false,
  );
  const { hasPermission, user } = useAuth();
  const { canAccess, isPlatformAdmin } = useBilling();
  const [mounted, setMounted] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const isCollapsed = mounted ? collapsed : false;
  const compact = isCollapsed && !mobileOpen;
  const displayName =
    user?.fullName?.trim() ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() ||
    user?.email ||
    "Account";

  // Super Admin: Dashboard opens Platform Control; Executive Brief stays its own page.
  const sections = appNavSections
    .filter((section) => {
      const feature = NAV_FEATURE_MAP[section.id] ?? "always";
      if (feature === "platform" || section.id === "platform") {
        return isPlatformAdmin;
      }
      return canAccess(feature);
    })
    .map((section) => {
      if (!isPlatformAdmin) return section;
      return {
        ...section,
        items: section.items.map((item) =>
          item.id === "dashboard"
            ? { ...item, href: "/platform", exact: false }
            : item,
        ),
      };
    });

  return (
    <aside
      className={cn(
        "z-50 flex shrink-0 flex-col bg-white text-[#16024A]",
        "transition-[width,transform,border-radius,margin] duration-300 ease-out",
        // Desktop: floating pill rail
        "tablet:my-3 tablet:ml-3 tablet:h-[calc(100dvh-1.5rem)] tablet:max-h-[calc(100dvh-1.5rem)]",
        "tablet:rounded-[1.75rem] tablet:border tablet:border-[#EDE8F7]",
        "tablet:shadow-[0_22px_50px_-34px_rgba(22,2,74,0.45)]",
        // Mobile drawer
        "max-[767px]:fixed max-[767px]:inset-y-0 max-[767px]:left-0 max-[767px]:h-dvh max-[767px]:max-h-dvh",
        "max-[767px]:-translate-x-full max-[767px]:border-r max-[767px]:border-[#EDE8F7]",
        mobileOpen && "max-[767px]:translate-x-0",
        compact ? "w-[84px]" : "w-[268px]",
      )}
    >
      <div
        className={cn(
          "flex h-16 shrink-0 items-center",
          compact ? "justify-center px-2" : "justify-between px-4",
        )}
      >
        {compact ? (
          <LogoMark size="sm" className="!h-9 !w-9" />
        ) : (
          <LogoFull size="md" />
        )}

        <IconButton
          aria-label={compact ? "Expand sidebar" : "Collapse sidebar"}
          icon={
            compact ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )
          }
          variant="ghost"
          size="icon-sm"
          onClick={() => setCollapsed((prev) => !prev)}
          className={cn(
            "text-neutral-500 hover:bg-[#F4F0FF] hover:text-[#16024A]",
            compact ? "hidden" : "",
            "max-[767px]:hidden",
          )}
        />
      </div>

      <nav
        aria-label="Dashboard navigation"
        className="thin-scrollbar min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2.5 pb-3"
      >
        <ul className={cn("space-y-5", compact && "space-y-3")}>
          {sections.map((section) => (
            <li key={section.id}>
              <SidebarNavGroup
                section={section}
                collapsed={compact}
                hasPermission={hasPermission}
                canAccess={canAccess}
                tone="light"
              />
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={cn(
          "shrink-0 border-t border-[#F0ECF6] p-2.5",
          compact ? "flex flex-col items-center gap-2" : "space-y-2",
        )}
      >
        {compact ? (
          <IconButton
            aria-label="Expand sidebar"
            icon={<PanelLeftOpen className="h-4 w-4" />}
            variant="ghost"
            size="icon-sm"
            onClick={() => setCollapsed(false)}
            className="hidden text-neutral-500 hover:bg-[#F4F0FF] hover:text-[#16024A] tablet:inline-flex"
          />
        ) : null}

        <button
          type="button"
          onClick={() => setSignOutOpen(true)}
          aria-label="Sign out"
          title="Sign out"
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-[0.84rem] font-medium text-neutral-500 transition-colors hover:bg-[#FEF3F2] hover:text-[#B42318]",
            compact && "justify-center px-0",
          )}
        >
          <LogOut className="h-[1.05rem] w-[1.05rem]" aria-hidden />
          {!compact ? <span>Sign out</span> : null}
        </button>

        <SignOutConfirmDialog open={signOutOpen} onOpenChange={setSignOutOpen} />

        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl bg-[#F7F5FC] p-2",
            compact && "justify-center",
          )}
          title={displayName}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#16024A] font-display text-[0.75rem] font-bold text-white">
            {initials(displayName)}
          </span>
          {!compact ? (
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.8rem] font-semibold text-[#16024A]">
                {displayName}
              </p>
              <p className="truncate text-[0.65rem] text-neutral-500">Workspace seat</p>
            </div>
          ) : null}
        </div>

        {mobileOpen && onCloseMobile ? (
          <button
            type="button"
            onClick={onCloseMobile}
            className="w-full rounded-xl bg-[#F4F0FF] px-3 py-2 text-[0.75rem] font-semibold text-[#3B05C4] tablet:hidden"
          >
            Close menu
          </button>
        ) : null}
      </div>
    </aside>
  );
}
