import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1",
    "rounded-full font-medium leading-none whitespace-nowrap",
    "[&_svg]:shrink-0 [&_svg]:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-muted text-foreground",
        outline: "border border-border text-foreground",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        destructive: "bg-destructive/10 text-destructive",
        info: "bg-primary/10 text-primary",
        muted: "bg-neutral-200 text-neutral-600",
        dot: "bg-transparent text-foreground gap-1.5",
      },
      size: {
        sm: "h-5 px-2 text-200",
        md: "h-6 px-2.5 text-300",
        lg: "h-7 px-3 text-400",
      },
      dot: {
        true: "before:content-[''] before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:bg-current",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      dot: false,
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    /** Optional leading icon (ignored when `dot` is true). */
    leftIcon?: ReactNode;
  };

/**
 * Compact status indicator.
 *
 * @example
 *   <Badge variant="success">Active</Badge>
 *   <Badge variant="dot" dot>Live</Badge>
 *   <Badge variant="outline" leftIcon={<Tag />}>design</Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, size, dot, leftIcon, children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, dot }), className)}
      {...props}
    >
      {!dot && leftIcon ? (
        <span className="[&_svg]:h-3 [&_svg]:w-3">{leftIcon}</span>
      ) : null}
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

/* ─── StatusBadge (domain helper) ───────────────────── */

export type StatusTone =
  "default" | "success" | "warning" | "destructive" | "info" | "muted";

export type StatusBadgeProps = Omit<BadgeProps, "variant"> & {
  tone: StatusTone;
};

const toneToVariant: Record<StatusTone, BadgeProps["variant"]> = {
  default: "default",
  success: "success",
  warning: "warning",
  destructive: "destructive",
  info: "info",
  muted: "muted",
};

/**
 * Badge variant whose tone is passed as a semantic prop.
 * Useful when rendering statuses from a lookup table.
 */
export function StatusBadge({ tone, dot = true, ...props }: StatusBadgeProps) {
  return <Badge variant={toneToVariant[tone]} dot={dot} {...props} />;
}
