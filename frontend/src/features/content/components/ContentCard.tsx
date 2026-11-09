"use client";

import Link from "next/link";

import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/date";

import type { ContentListItem } from "../types";
import {
  CONTENT_OBJECTIVE_LABELS,
  CONTENT_TYPE_LABELS,
  contentStatusLabel,
  contentStatusTone,
} from "../utils/contentLabels";

export type ContentCardProps = {
  item: ContentListItem;
};

export function ContentCard({ item }: ContentCardProps) {
  return (
    <Card className="transition hover:border-neutral-500">
      <CardHeader className="space-y-2">
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
        <p className="text-300 text-neutral-600">
          <Link href={`/clients/${item.clientId}`} className="hover:text-primary">
            {item.clientName}
          </Link>
          {item.campaignName ? ` · ${item.campaignName}` : ""}
        </p>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="muted" size="sm">
            {CONTENT_TYPE_LABELS[item.type]}
          </Badge>
          <Badge variant="muted" size="sm">
            {CONTENT_OBJECTIVE_LABELS[item.objective]}
          </Badge>
          {item.approvalStatus ? (
            <Badge variant="warning" size="sm">
              {item.approvalStatus.replace(/_/g, " ")}
            </Badge>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="border-t border-neutral-300 pt-3 text-300 text-neutral-600">
        {item.publishAt
          ? `Publishes ${formatDate(item.publishAt, "d MMM yyyy")}`
          : item.dueDate
            ? `Due ${formatDate(item.dueDate, "d MMM yyyy")}`
            : (item.ownerName ?? "Unassigned")}
      </CardContent>
    </Card>
  );
}
