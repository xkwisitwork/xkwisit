"use client";

import { cn } from "@/lib/utils/cn";

export type HamburgerButtonProps = {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  /** Accessible label. */
  label?: string;
};

/**
 * Animated hamburger toggle.
 * Three bars that morph into an X when opened.
 */
export function HamburgerButton({
  isOpen,
  onClick,
  className,
  label,
}: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label ?? (isOpen ? "Close menu" : "Open menu")}
      aria-expanded={isOpen}
      aria-controls="marketing-mobile-menu"
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full",
        "text-mint transition-colors",
        "hover:bg-mint-soft",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>

      <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
        <rect
          x="4"
          y={isOpen ? 15 : 8}
          width="24"
          height="3"
          rx="1.5"
          className="fill-current transition-all duration-300"
          style={{
            transformOrigin: "center",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        />
        <rect
          x="4"
          y="15"
          width="24"
          height="3"
          rx="1.5"
          className={cn(
            "fill-current transition-opacity duration-200",
            isOpen ? "opacity-0" : "opacity-100",
          )}
        />
        <rect
          x="4"
          y={isOpen ? 15 : 22}
          width="24"
          height="3"
          rx="1.5"
          className="fill-current transition-all duration-300"
          style={{
            transformOrigin: "center",
            transform: isOpen ? "rotate(-45deg)" : "rotate(0deg)",
          }}
        />
      </svg>
    </button>
  );
}
