"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils/cn";

/* ─── Linear bar ─────────────────────────────────────── */

export type ProgressProps = ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  /** Value from 0 to 100. */
  value?: number;
  /** Tone of the fill. */
  tone?: "primary" | "success" | "warning" | "destructive";
  /** Optional height preset. */
  size?: "sm" | "md" | "lg";
  /** Optional label rendered above the bar. */
  label?: string;
  /** Show percentage to the right of the label. */
  showValue?: boolean;
};

const toneClass = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
} as const;

const sizeClass = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
} as const;

/**
 * Linear progress bar.
 *
 * @example
 *   <Progress value={68} label="Onboarding" showValue />
 */
export const Progress = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(function Progress(
  { className, value = 0, tone = "primary", size = "md", label, showValue, ...props },
  ref,
) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between gap-3">
          {label ? (
            <span className="text-300 font-medium text-foreground">{label}</span>
          ) : null}
          {showValue ? (
            <span className="text-300 tabular-nums text-neutral-600">
              {Math.round(clamped)}%
            </span>
          ) : null}
        </div>
      )}

      <ProgressPrimitive.Root
        ref={ref}
        value={clamped}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-muted",
          sizeClass[size],
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-transform duration-500 ease-out",
            toneClass[tone],
          )}
          style={{ transform: `translateX(-${100 - clamped}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
});

Progress.displayName = "Progress";

/* ─── Circular variant ───────────────────────────────── */

export type CircularProgressProps = {
  /** Value from 0 to 100. */
  value: number;
  /** Diameter in pixels. */
  size?: number;
  /** Stroke width in pixels. */
  strokeWidth?: number;
  tone?: "primary" | "success" | "warning" | "destructive";
  /** Optional content centered inside the circle. */
  children?: React.ReactNode;
  className?: string;
};

const toneStroke = {
  primary: "stroke-primary",
  success: "stroke-success",
  warning: "stroke-warning",
  destructive: "stroke-destructive",
} as const;

export function CircularProgress({
  value,
  size = 48,
  strokeWidth = 4,
  tone = "primary",
  children,
  className,
}: CircularProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            "transition-[stroke-dashoffset] duration-500 ease-out",
            toneStroke[tone],
          )}
        />
      </svg>
      {children ? (
        <span className="absolute inset-0 flex items-center justify-center text-300 font-semibold tabular-nums">
          {children}
        </span>
      ) : null}
    </div>
  );
}
