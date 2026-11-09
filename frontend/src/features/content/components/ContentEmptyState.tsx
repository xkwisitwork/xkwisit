"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

import { Button } from "@/components/ui/Button";

export function ContentEmptyState({ hasFilters }: { hasFilters: boolean }) {
  if (hasFilters) {
    return (
      <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
        <p className="font-display text-600 leading-tight">
          No content matches your filters
        </p>
        <p className="mx-auto mt-2 max-w-sm text-400 text-neutral-600">
          Try loosening the filters or clearing them.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <FileText className="h-7 w-7 text-primary" />
      </div>
      <p className="mt-6 font-display text-600 leading-tight">No content yet</p>
      <p className="mx-auto mt-2 max-w-sm text-400 text-neutral-600">
        Create your first piece and move it through the pipeline.
      </p>
      <div className="mt-8 flex justify-center">
        <Button variant="contained">
          <Link href="/content/new">
            <span>Create content</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
