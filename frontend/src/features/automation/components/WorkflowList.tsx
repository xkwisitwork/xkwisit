"use client";

import Link from "next/link";

import { Skeleton } from "@/components/ui/Skeleton";

import type { WorkflowListItem } from "../types";
import { WorkflowCard } from "./WorkflowCard";

export function WorkflowList({
  workflows,
  loading,
}: {
  workflows: WorkflowListItem[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid gap-4 tablet:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (workflows.length === 0) {
    return <p className="text-400 text-neutral-600">No workflows yet.</p>;
  }

  return (
    <div className="grid gap-4 tablet:grid-cols-2">
      {workflows.map((workflow) => (
        <Link key={workflow.id} href={`/automation/${workflow.id}`}>
          <WorkflowCard workflow={workflow} />
        </Link>
      ))}
    </div>
  );
}
