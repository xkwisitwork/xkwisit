"use client";

import { Languages } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils/cn";
import type { AppLocale } from "@/lib/i18n/locales";

export type LanguageSelectProps = {
  className?: string;
  /** Compact = icon + native short select for tight chrome */
  size?: "sm" | "md";
  /** Dark glass style for the voice modal */
  tone?: "light" | "dark";
};

export function LanguageSelect({
  className,
  size = "sm",
  tone = "light",
}: LanguageSelectProps) {
  const { locale, setLocale, locales } = useLanguage();
  const dark = tone === "dark";

  return (
    <label
      className={cn(
        "inline-flex items-center gap-1 font-semibold",
        dark ? "text-white/80" : "text-neutral-700",
        size === "sm" ? "text-[0.72rem]" : "text-[0.8rem]",
        className,
      )}
    >
      <Languages
        className={cn(
          "shrink-0",
          dark ? "text-white/70" : "text-mint",
          size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
        )}
        aria-hidden
      />
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as AppLocale)}
        aria-label="Choose website language"
        className={cn(
          "rounded-full font-semibold outline-none",
          dark
            ? "border border-white/15 bg-white/10 text-white backdrop-blur-md focus:border-white/35"
            : "border border-neutral-300 bg-white text-[#16024A] focus:border-[#3B05C4]",
          size === "sm" ? "h-8 max-w-[6.75rem] px-2 text-[0.68rem]" : "h-10 px-3 text-[0.8rem]",
        )}
      >
        {locales.map((option) => (
          <option key={option.code} value={option.code} className="text-[#16024A]">
            {option.native}
          </option>
        ))}
      </select>
    </label>
  );
}
