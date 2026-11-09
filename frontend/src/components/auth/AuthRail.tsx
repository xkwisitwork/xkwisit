"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, HelpCircle, Home, LogIn, ScanSearch, UserPlus } from "lucide-react";

import { LogoFull } from "@/components/marketing/Logo";
import { ROUTES } from "@/config/site";
import { cn } from "@/lib/utils/cn";

const topLinks = [
  { href: ROUTES.home, label: "Home", Icon: Home },
  { href: ROUTES.login, label: "Sign in", Icon: LogIn },
  { href: ROUTES.register, label: "Create account", Icon: UserPlus },
  { href: ROUTES.growthAssessment, label: "Growth X-Ray", Icon: ScanSearch },
] as const;

const bottomLinks = [
  { href: ROUTES.book, label: "Book a call", Icon: Calendar },
  { href: ROUTES.contact, label: "Help", Icon: HelpCircle },
] as const;

/**
 * Slim light rail for auth screens.
 */
export function AuthRail() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[4.25rem] flex-col items-center border-r border-neutral-400/70 bg-white/90 py-5 backdrop-blur-xl tablet:flex">
      <LogoFull
        size="sm"
        className="[writing-mode:vertical-rl] rotate-180 tracking-[0.28em]"
      />

      <nav
        aria-label="Auth shortcuts"
        className="mt-8 flex flex-1 flex-col items-center gap-2"
      >
        {topLinks.map(({ href, label, Icon }) => {
          const active =
            pathname === href || (href !== ROUTES.home && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              title={label}
              aria-label={label}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full transition-all",
                active
                  ? "bg-mint text-white shadow-[0_0_20px_-4px_rgba(37,99,235,0.7)]"
                  : "text-neutral-600 hover:bg-mint-soft hover:text-mint",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center gap-2 pb-1">
        {bottomLinks.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            title={label}
            aria-label={label}
            className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-600 transition-all hover:bg-mint-soft hover:text-mint"
          >
            <Icon className="h-4 w-4" aria-hidden />
          </Link>
        ))}
      </div>
    </aside>
  );
}
