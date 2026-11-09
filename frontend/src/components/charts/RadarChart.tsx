import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function RadarChart({
  className,
  children,
  title,
}: {
  className?: string;
  children?: ReactNode;
  title?: string;
  data?: unknown;
  [key: string]: unknown;
}) {
  return (
    <div
      className={cn("rounded-2xl border border-neutral-400/60 bg-white p-4", className)}
    >
      {title ? (
        <p className="mb-2 text-300 font-semibold text-neutral-600">{title}</p>
      ) : null}
      <div className="flex h-40 items-center justify-center rounded-xl bg-mint-soft/50 text-300 text-mint-ink">
        {children ?? "RadarChart"}
      </div>
    </div>
  );
}
