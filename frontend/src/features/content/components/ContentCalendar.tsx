"use client";

import Link from "next/link";

import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils/date";

import type { CalendarEntry } from "../types";
import {
  CONTENT_TYPE_LABELS,
  contentStatusLabel,
  contentStatusTone,
} from "../utils/contentLabels";

export type ContentCalendarProps = {
  items: CalendarEntry[];
  loading?: boolean;
};

export function ContentCalendar({ items, loading = false }: ContentCalendarProps) {
  if (loading) {
    return (
      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-40 w-full" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-400 text-neutral-600">No scheduled content yet.</p>;
  }

  const sorted = [...items].sort((a, b) => a.publishAt.localeCompare(b.publishAt));

  return (
    <div className="space-y-6">
      {sorted.map((item) => (
        <div key={item.id} className="grid gap-3 tablet:grid-cols-[140px_1fr]">
          <p className="text-300 text-neutral-600">
            {formatDate(item.publishAt, "d MMM yyyy")}
          </p>
          <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-4">
            <div className="flex items-start justify-between gap-3">
              <Link
                href={`/content/${item.id}`}
                className="text-500 font-medium hover:text-primary"
              >
                {item.title}
              </Link>
              <StatusBadge tone={contentStatusTone(item.status)} size="sm">
                {contentStatusLabel(item.status)}
              </StatusBadge>
            </div>
            <p className="mt-1 text-300 text-neutral-600">
              {item.clientName}
              {item.ownerName ? ` · ${item.ownerName}` : ""}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge variant="muted" size="sm">
                {CONTENT_TYPE_LABELS[item.type]}
              </Badge>
              {item.platforms.slice(0, 3).map((platform) => (
                <Badge key={platform} variant="muted" size="sm">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
