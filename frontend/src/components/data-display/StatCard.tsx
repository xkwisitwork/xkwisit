import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function StatCard({
  label,
  value,
  hint,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-400/60 bg-white p-5 shadow-sm",
        className,
      )}
    >
      <p className="text-300 font-medium text-neutral-600">{label}</p>
      <p className="mt-1 font-display text-700 font-bold text-neutral-900">{value}</p>
      {hint ? <p className="mt-1 text-300 text-neutral-600">{hint}</p> : null}
    </div>
  );
}
