"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

export function InvoiceEmptyState({ hasFilters }: { hasFilters: boolean }) {
  if (hasFilters) {
    return (
      <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
        <p className="font-display text-600 leading-tight">
          No invoices match your filters
        </p>
        <p className="mx-auto mt-2 max-w-sm text-400 text-neutral-600">
          Clear filters to see the full invoice ledger.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <FileText className="h-7 w-7 text-primary" />
      </div>
      <p className="mt-6 font-display text-600 leading-tight">No invoices yet</p>
      <p className="mx-auto mt-2 max-w-sm text-400 text-neutral-600">
        Create your first invoice to start billing retainers and project fees.
      </p>
      <div className="mt-8 flex justify-center">
        <Link
          href="/finance/invoices/new"
          className="inline-flex items-center justify-center rounded-full bg-mint px-5 py-2.5 text-400 font-semibold text-white hover:bg-mint-deep"
        >
          New invoice
        </Link>
      </div>
    </div>
  );
}
