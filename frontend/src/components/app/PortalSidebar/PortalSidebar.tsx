"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { IconButton } from "@/components/ui/Button";
import { LogoFull } from "@/components/marketing/Logo";
import { portalNavSections, type PortalNavItem } from "@/config/navigation/portalNav";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useClient } from "@/contexts/ClientContext";
import { cn } from "@/lib/utils/cn";

function PortalNavLink({ item, collapsed }: { item: PortalNavItem; collapsed: boolean }) {
  const pathname = usePathname();
  const href = item.href ?? "#";
  const isActive = item.href
    ? item.exact
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(`${item.href}/`)
    : false;
  const Icon = item.icon;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      aria-label={item.label}
      title={collapsed ? item.label : undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-400 font-medium transition-colors",
        isActive
          ? "bg-[#F4F0FF] font-semibold text-[#3B05C4]"
          : "text-neutral-600 hover:bg-[#F4F0FF] hover:text-[#16024A]",
        collapsed && "justify-center px-2",
      )}
    >
      {Icon ? (
        <Icon
          className={cn(
            "h-4 w-4 shrink-0",
            isActive ? "text-primary" : "text-neutral-600",
          )}
          aria-hidden="true"
        />
      ) : null}
      {!collapsed ? <span className="truncate">{item.label}</span> : null}
    </Link>
  );
}

/**
 * Client-portal sidebar. Mirrors `AppSidebar` with portal navigation.
 */
export function PortalSidebar({ mobileOpen = false }: { mobileOpen?: boolean }) {
  const [collapsed, setCollapsed] = useLocalStorage(
    "xkwisit:portal-sidebar:collapsed",
    false,
  );
  const { client } = useClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const compact = (mounted ? collapsed : false) && !mobileOpen;

  return (
    <aside
      className={cn(
        "z-50 flex h-dvh max-h-dvh shrink-0 flex-col border-r border-[#E7DEFF] bg-white",
        "transition-[width,transform] duration-300 ease-out",
        "max-[767px]:fixed max-[767px]:inset-y-0 max-[767px]:left-0 max-[767px]:-translate-x-full",
        mobileOpen && "max-[767px]:translate-x-0",
        compact ? "w-[72px]" : "w-[240px]",
      )}
    >
      <div
        className={cn(
          "flex h-[74px] shrink-0 items-center border-b border-neutral-400",
          compact ? "justify-center px-3" : "justify-between px-5",
        )}
      >
        <LogoFull
          size={compact ? "sm" : "md"}
          className={cn(
            compact &&
              "[writing-mode:vertical-rl] rotate-180 tracking-[0.28em]",
          )}
        />

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
          className={compact ? "hidden" : ""}
        />
      </div>

      {!compact && client ? (
        <div className="border-b border-neutral-400 px-5 py-3">
          <p className="truncate text-300 font-medium text-neutral-600">Workspace</p>
          <p className="truncate text-400 font-semibold text-neutral-900">
            {client.name}
          </p>
        </div>
      ) : null}

      <nav
        aria-label="Portal navigation"
        className="thin-scrollbar flex-1 overflow-y-auto p-3"
      >
        <ul className="space-y-6">
          {portalNavSections.map((section) => (
            <li key={section.id}>
              {section.label && !compact ? (
                <p className="mb-2 px-3 text-200 font-semibold uppercase tracking-widest text-neutral-600">
                  {section.label}
                </p>
              ) : null}
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <PortalNavLink item={item} collapsed={compact} />
                    {item.children?.length && !compact ? (
                      <ul className="ml-5 mt-1 space-y-0.5 border-l border-neutral-400 pl-3">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <PortalNavLink item={child} collapsed={false} />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      {compact ? (
        <div className="border-t border-neutral-400 p-3">
          <IconButton
            aria-label="Expand sidebar"
            icon={<PanelLeftOpen className="h-4 w-4" />}
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(false)}
            className="mx-auto"
          />
        </div>
      ) : null}
    </aside>
  );
}
