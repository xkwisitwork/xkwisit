import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

/* ─── Card ───────────────────────────────────────────── */

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** Adds a hover elevation effect. */
  interactive?: boolean;
  /** Uses the glass-morphism surface instead of the solid surface. */
  glass?: boolean;
  /** Removes default padding. Useful when composing custom sections. */
  bare?: boolean;
  /** Optional click handler (adds button semantics on the div). */
  onClick?: () => void;
};

/**
 * Surface container used across the app.
 *
 * @example
 *   <Card interactive>
 *     <CardHeader>
 *       <CardTitle>Revenue</CardTitle>
 *       <CardDescription>Last 30 days</CardDescription>
 *     </CardHeader>
 *     <CardContent>...</CardContent>
 *   </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    className,
    interactive = false,
    glass = false,
    bare = false,
    onClick,
    onKeyDown,
    children,
    ...props
  },
  ref,
) {
  const isClickable = Boolean(onClick);

  return (
    <div
      ref={ref}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        onKeyDown?.(event);

        if (!onClick || event.defaultPrevented) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "min-w-0 break-words text-left tablet:w-full",
        glass ? "surface-glass" : "rounded-2xl border border-border bg-card shadow-sm",
        (interactive || isClickable) &&
          "cursor-pointer transition-all hover:-translate-y-[1px] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-0",
        !bare && "p-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

/* ─── CardHeader ─────────────────────────────────────── */

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("mb-4 flex flex-col gap-1.5", className)} {...props}>
      {children}
    </div>
  );
});

CardHeader.displayName = "CardHeader";

/* ─── CardTitle ──────────────────────────────────────── */

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4";
};

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle({ className, as: Comp = "h3", children, ...props }, ref) {
    return (
      <Comp
        ref={ref}
        className={cn(
          "break-words text-600 font-semibold leading-tight tracking-tight text-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

CardTitle.displayName = "CardTitle";

/* ─── CardDescription ────────────────────────────────── */

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ className, children, ...props }, ref) {
    return (
      <p
        ref={ref}
        className={cn("break-words text-300 text-neutral-600", className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);

CardDescription.displayName = "CardDescription";

/* ─── CardContent ────────────────────────────────────── */

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    );
  },
);

CardContent.displayName = "CardContent";

/* ─── CardFooter ─────────────────────────────────────── */

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "mt-4 flex items-center justify-between gap-3 border-t border-border pt-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = "CardFooter";

/* ─── CardStat (convenience) ─────────────────────────── */

export type CardStatProps = {
  label: string;
  value: ReactNode;
  delta?: ReactNode;
  icon?: ReactNode;
  className?: string;
};

/**
 * Convenience component for the most common card shape: a KPI.
 */
export function CardStat({ label, value, delta, icon, className }: CardStatProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-300 font-medium text-neutral-600">{label}</p>
        {icon ? <span className="text-neutral-600">{icon}</span> : null}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="font-display text-800 leading-none tracking-tight">{value}</p>
        {delta ? <span className="text-300">{delta}</span> : null}
      </div>
    </div>
  );
}
