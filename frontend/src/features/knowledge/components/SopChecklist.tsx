"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/date";

import type { SopListItem } from "../types";

export function SopChecklist({ sop }: { sop: SopListItem }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-500">{sop.title}</CardTitle>
          <p className="mt-1 text-200 text-neutral-600">
            {sop.ownerName ?? "Unassigned"} · {formatDate(sop.updatedAt, "d MMM yyyy")}
          </p>
        </div>
        <StatusBadge tone={sop.status === "PUBLISHED" ? "success" : "muted"} size="sm">
          {sop.status}
        </StatusBadge>
      </CardHeader>
      <CardContent>
        <p className="text-300 text-neutral-600">{sop.summary ?? "No summary."}</p>
      </CardContent>
    </Card>
  );
}
