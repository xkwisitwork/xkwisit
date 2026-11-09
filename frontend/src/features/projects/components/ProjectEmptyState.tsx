"use client";

import Link from "next/link";
import { FolderKanban } from "lucide-react";

import { Button } from "@/components/ui/Button";

export function ProjectEmptyState({ hasFilters }: { hasFilters: boolean }) {
  if (hasFilters) {
    return (
      <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
        <p className="font-display text-600 leading-tight">
          No projects match your filters
        </p>
        <p className="mx-auto mt-2 max-w-sm text-400 text-neutral-600">
          Try loosening the filters or clearing them to see all projects.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <FolderKanban className="h-7 w-7 text-primary" />
      </div>
      <p className="mt-6 font-display text-600 leading-tight">No projects yet</p>
      <p className="mx-auto mt-2 max-w-sm text-400 text-neutral-600">
        Create your first project and start tracking delivery.
      </p>
      <div className="mt-8 flex justify-center">
        <Button variant="contained">
          <Link href="/projects/new">
            <span>Create project</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
