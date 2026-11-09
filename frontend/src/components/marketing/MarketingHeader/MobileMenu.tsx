"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { IconButton } from "@/components/ui/Button";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";

import { LogoFull } from "../Logo";
import {
  marketingPrimaryNav,
  servicesMegaMenu,
  solutionsMegaMenu,
} from "@/config/navigation/marketingNav";
import { MarketingNavItem } from "./MarketingNavItem";
import { CurrencySelect } from "@/components/marketing/CurrencySelect";

export type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll while menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-sm tablet:hidden"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-white p-6 tablet:hidden"
          >
            <div className="flex items-center justify-between">
              <LogoFull size="sm" />
              <CurrencySelect />
              <IconButton
                aria-label="Close menu"
                icon={<X className="h-5 w-5" />}
                variant="ghost"
                onClick={onClose}
              />
            </div>

            <div className="mt-8 space-y-8">
              {/* Primary nav */}
              <ul className="space-y-1">
                {marketingPrimaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-full px-4 py-3 text-500 font-medium text-neutral-900 transition-colors hover:bg-neutral-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Services quick list */}
              <div>
                <p className="mb-3 px-4 text-200 font-semibold uppercase tracking-widest text-neutral-600">
                  Services
                </p>
                <ul className="space-y-0.5">
                  {servicesMegaMenu
                    .flatMap((group) => group.items)
                    .slice(0, 6)
                    .map((item) => (
                      <li key={item.href}>
                        <MarketingNavItem item={item} onNavigate={onClose} />
                      </li>
                    ))}
                </ul>
              </div>

              {/* Solutions quick list */}
              <div>
                <p className="mb-3 px-4 text-200 font-semibold uppercase tracking-widest text-neutral-600">
                  Solutions
                </p>
                <ul className="space-y-0.5">
                  {solutionsMegaMenu
                    .flatMap((group) => group.items)
                    .slice(0, 6)
                    .map((item) => (
                      <li key={item.href}>
                        <MarketingNavItem item={item} onNavigate={onClose} />
                      </li>
                    ))}
                </ul>
              </div>

              {/* CTAs - account and booking stay separate */}
              <div className="space-y-3 border-t border-neutral-400 pt-6">
                <Link
                  href="/register"
                  onClick={onClose}
                  className={cn(
                    buttonVariants({
                      variant: "contained",
                      size: "lg",
                      fullWidth: true,
                    }),
                    "!rounded-full border-0 !bg-mint !text-white shadow-none hover:!bg-mint-deep",
                  )}
                >
                  Create account
                </Link>
                <Link
                  href="/book"
                  onClick={onClose}
                  className={cn(
                    buttonVariants({
                      variant: "outlined",
                      size: "lg",
                      fullWidth: true,
                    }),
                    "!rounded-full !border-neutral-400 !bg-white !text-neutral-900 hover:!border-mint hover:!bg-mint-soft",
                  )}
                >
                  Book a strategy call
                </Link>
                <Link
                  href="/login"
                  onClick={onClose}
                  className="block text-center text-300 font-medium text-neutral-600 hover:text-mint"
                >
                  Already have an account? Log in
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
