"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { Sop } from "../types";

export function SopViewer({ sop, loading }: { sop?: Sop | null; loading?: boolean }) {
  if (loading || !sop) {
    return <Skeleton variant="rectangle" className="h-64 w-full" />;
  }

  const steps = [...sop.steps].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-600 font-medium">{sop.title}</h2>
        <p className="text-300 text-neutral-600">{sop.summary}</p>
      </div>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li key={step.id} className="rounded-xl border border-neutral-400 p-4">
            <p className="text-400 font-medium">
              {index + 1}. {step.title}
              {step.required ? (
                <span className="ml-2 text-200 text-neutral-600">Required</span>
              ) : null}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-300 text-neutral-700">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
