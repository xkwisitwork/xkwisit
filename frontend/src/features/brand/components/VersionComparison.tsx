"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import type { BrandRevision } from "../types";

export type VersionComparisonProps = {
  left?: BrandRevision | null;
  right?: BrandRevision | null;
};

export function VersionComparison({ left, right }: VersionComparisonProps) {
  if (!left || !right) {
    return <p className="text-400 text-neutral-600">Select two revisions to compare.</p>;
  }

  return (
    <div className="grid gap-4 tablet:grid-cols-2">
      {[left, right].map((revision, index) => (
        <Card key={revision.id}>
          <CardHeader>
            <CardTitle>
              {index === 0 ? "Before" : "After"} · v{revision.version}
            </CardTitle>
            <CardDescription>{revision.summary}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-200">
              {revision.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={revision.previewUrl}
                  alt={`Version ${revision.version}`}
                  className="max-h-full max-w-full object-contain p-4"
                />
              ) : (
                <span className="text-300 text-neutral-600">No preview</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
