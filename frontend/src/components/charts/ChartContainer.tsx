"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type ChartContainerProps = {
  className?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  height?: number | string;
};

export function ChartContainer({
  className,
  title,
  description,
  children,
  height = 280,
}: ChartContainerProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-400/60 bg-white p-4 shadow-none",
        className,
      )}
    >
      {(title || description) && (
        <div className="mb-3">
          {title ? (
            <p className="text-400 font-semibold text-neutral-800">{title}</p>
          ) : null}
          {description ? (
            <p className="mt-0.5 text-300 text-neutral-600">{description}</p>
          ) : null}
        </div>
      )}
      <div style={{ height }} className="w-full">
        {children}
      </div>
    </div>
  );
}
