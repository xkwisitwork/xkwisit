"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";
import {
  marketingPrimaryNav,
  servicesMegaMenu,
  solutionsMegaMenu,
} from "@/config/navigation/marketingNav";

import { LogoFull } from "../Logo";
import { VoiceGuideTrigger } from "@/components/marketing/VoiceGuide";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { HamburgerButton } from "./HamburgerButton";
import { GetStartedMenu } from "./GetStartedMenu";
import { ROUTES } from "@/config/site";
import { CurrencySelect } from "@/components/marketing/CurrencySelect";

const megaMenus: Record<string, typeof servicesMegaMenu> = {
  "/services": servicesMegaMenu,
  "/solutions": solutionsMegaMenu,
};

/** Primary links shown in the compact tablet bar */
const tabletNav = marketingPrimaryNav.slice(0, 4);

/**
 * White marketing header — denser on tablet, viewport-safe mega menus.
 */
export function MarketingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMega = useCallback(
    (href: string) => {
      clearCloseTimer();
      setOpenMenu(href);
    },
    [clearCloseTimer],
  );

  const scheduleCloseMega = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  }, [clearCloseTimer]);

  const closeMega = useCallback(() => {
    clearCloseTimer();
    setOpenMenu(null);
  }, [clearCloseTimer]);

  useEffect(() => {
    setMobileOpen(false);
    closeMega();
  }, [pathname, closeMega]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMega();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu, closeMega]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 overflow-visible px-3 pt-2.5 tablet:px-4 tablet:pt-3 laptop:px-6">
        <div
          className={cn(
            "mx-auto flex h-12 w-full max-w-6xl items-center gap-2 rounded-full border px-2.5 transition-all duration-300 tablet:h-14 tablet:gap-3 tablet:px-3 laptop:gap-4 laptop:px-4",
            isScrolled
              ? "border-mint/20 bg-white/95 shadow-[0_16px_40px_-24px_rgba(22,2,74,0.45)] backdrop-blur-xl"
              : "border-neutral-400/50 bg-white/90 shadow-[0_10px_30px_-22px_rgba(22,2,74,0.35)] backdrop-blur-md",
          )}
        >
          <div className="shrink-0 pl-1">
            <LogoFull size="md" />
          </div>

          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 tablet:block"
          >
            <ul className="flex items-center justify-center gap-0.5 rounded-full bg-mint-soft/40 p-0.5 laptop:gap-1">
              {tabletNav.map((item) => {
                const menuGroups = megaMenus[item.href];
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                const isOpen = openMenu === item.href;

                return (
                  <li
                    key={item.href}
                    className="relative shrink-0"
                    onMouseEnter={() => {
                      if (menuGroups) openMega(item.href);
                      else scheduleCloseMega();
                    }}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-0.5 whitespace-nowrap rounded-full px-2 py-1.5 text-[0.78rem] font-medium transition-colors tablet:px-2.5 tablet:text-[0.82rem] laptop:gap-1 laptop:px-3.5 laptop:py-1.5 laptop:text-400",
                        isActive || isOpen
                          ? "bg-white text-mint-ink shadow-sm"
                          : "text-neutral-600 hover:bg-white/70 hover:text-neutral-900",
                      )}
                      aria-expanded={menuGroups ? isOpen : undefined}
                      onClick={(e) => {
                        if (!menuGroups) return;
                        if (window.matchMedia("(max-width: 1023px)").matches) {
                          e.preventDefault();
                          if (isOpen) closeMega();
                          else openMega(item.href);
                        }
                      }}
                    >
                      {item.label}
                      {menuGroups ? (
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 opacity-60 transition-transform tablet:h-3.5 tablet:w-3.5",
                            isOpen && "rotate-180 text-mint opacity-100",
                          )}
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mic stays in the bar chrome — never inside the hamburger drawer */}
          <div className="ml-auto flex shrink-0 items-center gap-1 tablet:gap-2">
            <VoiceGuideTrigger className="h-8 w-8 tablet:h-9 tablet:w-9" />

            <div className="hidden items-center gap-1 tablet:flex laptop:gap-2">
              <div className="hidden laptop-lg:block">
                <CurrencySelect />
              </div>
              <Link
                href={ROUTES.login}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "!rounded-full !px-2 !text-[0.78rem] !text-neutral-800 hover:!bg-mint-soft hover:!text-mint-ink laptop:!px-3 laptop:!text-[0.875rem]",
                )}
              >
                Log in
              </Link>
              <GetStartedMenu className="[&_button]:!h-8 [&_button]:!gap-1 [&_button]:!px-2.5 [&_button]:!text-[0.78rem] tablet:[&_button]:!h-9 laptop:[&_button]:!h-9 laptop:[&_button]:!px-4 laptop:[&_button]:!text-[0.875rem]" />
            </div>

            <HamburgerButton
              isOpen={mobileOpen}
              onClick={() => setMobileOpen((p) => !p)}
              className="tablet:hidden"
            />
          </div>
        </div>
      </header>

      {openMenu && megaMenus[openMenu] ? (
        <MegaMenu
          groups={megaMenus[openMenu]!}
          layout={openMenu === "/solutions" ? "bento" : "columns"}
          onClose={closeMega}
          onKeepOpen={clearCloseTimer}
        />
      ) : null}

      {openMenu ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-[#16024A]/10"
          onClick={closeMega}
        />
      ) : null}

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
