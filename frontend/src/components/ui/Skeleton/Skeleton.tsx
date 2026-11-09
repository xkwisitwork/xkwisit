import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  /** Preset shape. */
  variant?: "text" | "circle" | "rectangle" | "card";
  /** Width (CSS value or Tailwind class fragment). */
  width?: string | number;
  /** Height (CSS value or Tailwind class fragment). */
  height?: string | number;
};

const variantClass: Record<NonNullable<SkeletonProps["variant"]>, string> = {
  text: "h-4 w-full rounded-md",
  circle: "rounded-full",
  rectangle: "rounded-lg",
  card: "h-40 w-full rounded-2xl",
};

/**
 * Placeholder block for loading states.
 *
 * @example
 * <Skeleton variant="text" />
 * <Skeleton variant="circle" width={40} height={40} />
 * <Skeleton variant="card" />
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, variant = "text", width, height, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("animate-pulse bg-neutral-400/60", variantClass[variant], className)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  );
});

Skeleton.displayName = "Skeleton";

/* ─── Composed skeletons ──────────────────────────── */

/**
 * Skeleton for a stat card - label + big number + delta row.
 */
export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <Skeleton variant="text" className="w-24" />
      <Skeleton variant="text" className="mt-3 h-8 w-32" />
      <Skeleton variant="text" className="mt-2 w-16" />
    </div>
  );
}

/**
 * Skeleton for a table with `rows` rows and `columns` columns.
 */
export function TableSkeleton({
  rows = 6,
  columns = 4,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border">
      <div className="bg-muted/50 px-4 py-3">
        <div className="flex items-center gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} variant="text" className="flex-1" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={rowIdx} className="flex items-center gap-4 px-4 py-4">
            {Array.from({ length: columns }).map((__, colIdx) => (
              <Skeleton
                key={colIdx}
                variant="text"
                className="flex-1"
                width={colIdx === 0 ? "60%" : "auto"}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
