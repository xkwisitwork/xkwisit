"use client";

import Link from "next/link";

import { StatusBadge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { CONTENT_STATUSES, type ContentStatus } from "@/lib/constants/statuses";

import type { ContentListItem, PipelineColumn } from "../types";
import {
  CONTENT_TYPE_LABELS,
  contentStatusLabel,
  contentStatusTone,
} from "../utils/contentLabels";

export type ContentPipelineBoardProps = {
  columns?: PipelineColumn[];
  items?: ContentListItem[];
  loading?: boolean;
};

export function ContentPipelineBoard({
  columns,
  items = [],
  loading = false,
}: ContentPipelineBoardProps) {
  if (loading) {
    return (
      <div className="grid gap-4 overflow-x-auto laptop:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-64 w-full" />
        ))}
      </div>
    );
  }

  const resolved: PipelineColumn[] =
    columns ??
    (Object.values(CONTENT_STATUSES) as ContentStatus[]).map((status) => {
      const columnItems = items.filter((item) => item.status === status);
      return {
        status,
        label: contentStatusLabel(status),
        count: columnItems.length,
        items: columnItems,
      };
    });

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {resolved.map((column) => (
        <div
          key={column.status}
          className="min-w-[220px] flex-1 rounded-2xl border border-neutral-400 bg-neutral-100 p-3"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <StatusBadge tone={contentStatusTone(column.status)} size="sm">
              {column.label}
            </StatusBadge>
            <span className="text-300 tabular-nums text-neutral-600">{column.count}</span>
          </div>

          <div className="space-y-2">
            {column.items.length === 0 ? (
              <p className="px-1 py-6 text-center text-300 text-neutral-600">Empty</p>
            ) : (
              column.items.map((item) => (
                <Link
                  key={item.id}
                  href={`/content/${item.id}`}
                  className="block rounded-xl border border-neutral-300 bg-white p-3 transition hover:border-neutral-500"
                >
                  <p className="text-400 font-medium leading-snug">{item.title}</p>
                  <p className="mt-1 text-200 text-neutral-600">
                    {item.clientName} · {CONTENT_TYPE_LABELS[item.type]}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
