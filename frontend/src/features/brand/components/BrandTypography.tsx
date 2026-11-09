"use client";

import type { BrandTypeface } from "../types";

export type BrandTypographyProps = {
  typefaces: BrandTypeface[];
};

export function BrandTypography({ typefaces }: BrandTypographyProps) {
  if (typefaces.length === 0) {
    return <p className="text-400 text-neutral-600">No typefaces defined yet.</p>;
  }

  return (
    <div className="space-y-3">
      {typefaces.map((face) => (
        <div key={face.id} className="rounded-xl border border-neutral-400 px-4 py-3">
          <p className="text-600 font-medium" style={{ fontFamily: face.family }}>
            {face.name}
          </p>
          <p className="mt-1 text-300 text-neutral-600">
            {face.family}
            {face.weight ? ` · ${face.weight}` : ""} · {face.role}
          </p>
          {face.usage ? (
            <p className="mt-1 text-300 text-neutral-600">{face.usage}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
