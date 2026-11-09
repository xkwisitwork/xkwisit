import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type SectionDividerProps = HTMLAttributes<HTMLDivElement> & {
  /** Vertical padding around the border. */
  spacing?: "sm" | "md" | "lg";
  /** Border style. */
  border?: "solid" | "dashed" | "dotted";
  /** Optional centered label (e.g. "OR"). */
  label?: string;
};

const spacingMap = {
  sm: "py-3",
  md: "py-6",
  lg: "py-10",
} as const;

const borderMap = {
  solid: "border-solid",
  dashed: "border-dashed",
  dotted: "border-dotted",
} as const;

/**
 * Horizontal divider with optional label.
 * Ported from the legacy SectionDivider, now typed and accessible.
 */
export const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
  function SectionDivider(
    { className, spacing = "md", border = "solid", label, ...props },
    ref,
  ) {
    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-label={label}
          className={cn(
            "flex items-center gap-4 text-300 font-medium uppercase tracking-wide text-neutral-600",
            spacingMap[spacing],
            className,
          )}
          {...props}
        >
          <span
            className={cn("h-px flex-1 border-t border-neutral-400", borderMap[border])}
          />
          <span>{label}</span>
          <span
            className={cn("h-px flex-1 border-t border-neutral-400", borderMap[border])}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={cn(spacingMap[spacing], className)}
        {...props}
      >
        <div className={cn("border-t border-neutral-400", borderMap[border])} />
      </div>
    );
  },
);

SectionDivider.displayName = "SectionDivider";
