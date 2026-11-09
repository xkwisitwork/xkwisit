"use client";

import type { BrandColor } from "../types";

export type BrandColorsProps = {
  colors: BrandColor[];
};

export function BrandColors({ colors }: BrandColorsProps) {
  if (colors.length === 0) {
    return <p className="text-400 text-neutral-600">No brand colors defined.</p>;
  }

  return (
    <div className="grid gap-3 tablet:grid-cols-2 laptop:grid-cols-3">
      {colors.map((color) => (
        <div
          key={color.id}
          className="flex items-center gap-3 rounded-xl border border-neutral-400 p-3"
        >
          <div
            className="h-12 w-12 shrink-0 rounded-lg border border-neutral-300"
            style={{ backgroundColor: color.hex }}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-400 font-medium">{color.name}</p>
            <p className="text-300 tabular-nums text-neutral-600">{color.hex}</p>
            <p className="text-200 text-neutral-600">
              {color.role}
              {color.usage ? ` · ${color.usage}` : ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
