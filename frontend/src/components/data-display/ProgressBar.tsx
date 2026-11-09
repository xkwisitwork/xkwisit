import { cn } from "@/lib/utils/cn";

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-neutral-200", className)}>
      <div
        className="h-full rounded-full bg-mint transition-all"
        style={{ width: clamped + "%" }}
      />
    </div>
  );
}
