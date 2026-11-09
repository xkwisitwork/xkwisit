"use client";

export function CapacityMeter({ percent, label }: { percent: number; label?: string }) {
  const clamped = Math.min(120, Math.max(0, percent));
  const tone =
    percent > 100 ? "bg-destructive" : percent > 85 ? "bg-primary/50" : "bg-primary";

  return (
    <div className="space-y-1">
      {label ? (
        <div className="flex justify-between text-200 text-neutral-600">
          <span>{label}</span>
          <span className="tabular-nums">{percent}%</span>
        </div>
      ) : null}
      <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
        <div
          className={`h-full ${tone}`}
          style={{ width: `${Math.min(100, clamped)}%` }}
        />
      </div>
    </div>
  );
}
