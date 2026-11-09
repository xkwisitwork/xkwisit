import Link from "next/link";

import { cn } from "@/lib/utils/cn";

export type LogoMarkProps = {
  href?: string;
  className?: string;
  inverted?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-12 w-12",
} as const;

/**
 * Xkwisit mark only - no wordmark.
 */
export function LogoMark({
  href = "/",
  className,
  inverted,
  size = "md",
}: LogoMarkProps) {
  const content = (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn(sizeMap[size], className)}
    >
      <rect
        width="40"
        height="40"
        rx="10"
        className={inverted ? "fill-neutral-100" : "fill-mint"}
      />
      <path
        d="M11 11L20 20M20 20L29 11M20 20L11 29M20 20L29 29"
        stroke={inverted ? "#3B05C4" : "#FFFFFF"}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="Xkwisit - home" className="inline-flex">
      {content}
    </Link>
  );
}
