"use client";

import type { ReactNode } from "react";

export function OpportunityForm({ children }: { children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-400/60 bg-white p-6">
      {children ?? (
        <p className="text-400 text-neutral-600">
          Opportunity form will connect to create/update APIs next.
        </p>
      )}
    </div>
  );
}
