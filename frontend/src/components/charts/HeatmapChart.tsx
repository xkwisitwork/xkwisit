"use client";

import { cn } from "@/lib/utils/cn";

import { ChartContainer } from "./ChartContainer";

export type HeatmapCell = {
  x: string;
  y: string;
  value: number;
};

export type HeatmapChartProps = {
  data?: HeatmapCell[];
  title?: string;
  description?: string;
  className?: string;
  /** Max value for color scale; defaults to max in data */
  max?: number;
};

const DEFAULT_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DEFAULT_HOURS = ["9a", "11a", "1p", "3p", "5p"];

const DEFAULT_DATA: HeatmapCell[] = DEFAULT_DAYS.flatMap((day, di) =>
  DEFAULT_HOURS.map((hour, hi) => ({
    x: day,
    y: hour,
    value: ((di * 3 + hi * 5) % 10) + (di % 3),
  })),
);

function cellColor(value: number, max: number) {
  const t = max <= 0 ? 0 : Math.min(1, value / max);
  // cobalt mint scale
  const alpha = 0.08 + t * 0.72;
  return `rgba(37, 99, 235, ${alpha.toFixed(2)})`;
}

export function HeatmapChart({
  data = DEFAULT_DATA,
  title = "Activity heatmap",
  description,
  className,
  max,
}: HeatmapChartProps) {
  const xs = Array.from(new Set(data.map((d) => d.x)));
  const ys = Array.from(new Set(data.map((d) => d.y)));
  const peak = max ?? Math.max(...data.map((d) => d.value), 1);
  const lookup = new Map(data.map((d) => [`${d.x}:${d.y}`, d.value]));

  return (
    <ChartContainer
      title={title}
      description={description}
      className={className}
      height="auto"
    >
      <div className="overflow-x-auto">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `auto repeat(${xs.length}, minmax(2rem, 1fr))`,
          }}
        >
          <div />
          {xs.map((x) => (
            <div
              key={x}
              className="pb-1 text-center text-200 font-medium text-neutral-600"
            >
              {x}
            </div>
          ))}
          {ys.map((y) => (
            <div key={`row-${y}`} className="contents">
              <div className="pr-2 text-right text-200 text-neutral-600">{y}</div>
              {xs.map((x) => {
                const value = lookup.get(`${x}:${y}`) ?? 0;
                return (
                  <div
                    key={`${x}-${y}`}
                    title={`${x} ${y}: ${value}`}
                    className={cn(
                      "aspect-square rounded-md border border-white/60",
                      value === 0 && "bg-neutral-100",
                    )}
                    style={
                      value > 0 ? { backgroundColor: cellColor(value, peak) } : undefined
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </ChartContainer>
  );
}
