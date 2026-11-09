"use client";

import Link from "next/link";
import { UserPlus, Upload } from "lucide-react";

export function LeadEmptyState({ hasFilters }: { hasFilters: boolean }) {
  if (hasFilters) {
    return (
      <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
        <p className="font-display text-600 leading-tight">No leads match your filters</p>
        <p className="mx-auto mt-2 max-w-sm text-400 text-neutral-600">
          Try loosening the filters or clearing them to see all leads.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <UserPlus className="h-7 w-7 text-primary" />
      </div>

      <p className="mt-6 font-display text-600 leading-tight">No leads yet</p>
      <p className="mx-auto mt-2 max-w-sm text-400 text-neutral-600">
        Add your first lead manually, or import a CSV to get started.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/crm/leads/new"
          className="inline-flex items-center justify-center rounded-full bg-mint px-5 py-2.5 text-400 font-semibold text-white hover:bg-mint-deep"
        >
          Add lead
        </Link>
        <Link
          href="/crm/leads/import"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-400 bg-white px-5 py-2.5 text-400 font-semibold text-neutral-800 hover:bg-neutral-100"
        >
          <Upload className="h-4 w-4" />
          Import CSV
        </Link>
      </div>
    </div>
  );
}
