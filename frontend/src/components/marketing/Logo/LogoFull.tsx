import Link from "next/link";

import { cn } from "@/lib/utils/cn";

import { BrandWordmark } from "./BrandWordmark";

export type LogoFullProps = {
  href?: string;
  className?: string;
  /** Renders in white (for dark backgrounds). */
  inverted?: boolean;
  /** Size variant. */
  size?: "sm" | "md" | "lg";
};

/**
 * Brand wordmark logo: XKWISIT in mint with clean motion.
 */
export function LogoFull({
  href = "/",
  className,
  inverted,
  size = "md",
}: LogoFullProps) {
  const content = (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <BrandWordmark size={size} inverted={inverted} />
      <span className="sr-only">Xkwisit</span>
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label="Xkwisit - home"
      className="inline-flex shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-mint/40 focus-visible:ring-offset-2"
    >
      {content}
    </Link>
  );
}
