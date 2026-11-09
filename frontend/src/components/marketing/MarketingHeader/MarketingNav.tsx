"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import {
  marketingPrimaryNav,
  servicesMegaMenu,
  solutionsMegaMenu,
} from "@/config/navigation/marketingNav";

import { MegaMenu } from "./MegaMenu";

const megaMenus: Record<string, typeof servicesMegaMenu> = {
  "/services": servicesMegaMenu,
  "/solutions": solutionsMegaMenu,
};

export function MarketingNav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden min-w-0 flex-1 tablet:flex"
      onMouseLeave={() => setOpenMenu(null)}
    >
      <ul className="flex max-w-full items-center gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] laptop:gap-1 [&::-webkit-scrollbar]:hidden">
        {marketingPrimaryNav.map((item) => {
          const menuGroups = megaMenus[item.href];
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const isOpen = openMenu === item.href;

          return (
            <li
              key={item.href}
              className="relative shrink-0"
              onMouseEnter={() => setOpenMenu(menuGroups ? item.href : null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-full px-2.5 py-1.5 text-[0.8rem] font-medium transition-colors tablet:px-3 tablet:py-2 tablet:text-[0.875rem] laptop:gap-1 laptop:px-3.5",
                  isActive || isOpen
                    ? "bg-mint-soft text-mint-ink"
                    : "text-neutral-600 hover:bg-mint-soft/60 hover:text-neutral-900",
                )}
              >
                {item.label}
                {menuGroups ? (
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      isOpen && "rotate-180 text-mint",
                    )}
                  />
                ) : null}
              </Link>
              {isActive && !menuGroups ? (
                <span
                  aria-hidden
                  className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-mint"
                />
              ) : null}

              {menuGroups && isOpen ? (
                <MegaMenu
                  groups={menuGroups}
                  layout={item.href === "/solutions" ? "bento" : "columns"}
                  onClose={() => setOpenMenu(null)}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
