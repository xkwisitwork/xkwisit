"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/date";

import type { ApprovalListItem } from "../types";
import {
  approvalPriorityLabel,
  approvalPriorityTone,
  approvalResourceLabel,
} from "../utils/approvalLabels";
import { ApprovalActions } from "./ApprovalActions";
import { ApprovalBadge } from "./ApprovalBadge";

export function ApprovalCard({ item }: { item: ApprovalListItem }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-500">
              <Link
                href={item.clientId ? `/clients/${item.clientId}/approvals` : "#"}
                className="hover:text-primary"
              >
                {item.title}
              </Link>
            </CardTitle>
            <CardDescription className="mt-1">
              {approvalResourceLabel(item.resourceType)}
              {item.clientName ? ` · ${item.clientName}` : ""}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <ApprovalBadge status={item.status} />
            <Badge
              variant={
                approvalPriorityTone(item.priority) === "default"
                  ? "outline"
                  : approvalPriorityTone(item.priority)
              }
              size="sm"
            >
              {approvalPriorityLabel(item.priority)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
        <div className="space-y-1 text-300 text-neutral-600">
          <p>
            Requested by{" "}
            <span className="font-medium text-neutral-800">
              {item.requesterName ?? "-"}
            </span>
          </p>
          <p>
            Assignee{" "}
            <span className="font-medium text-neutral-800">
              {item.assigneeName ?? "Unassigned"}
            </span>
            {item.dueAt ? ` · Due ${formatDate(item.dueAt, "d MMM")}` : ""}
          </p>
        </div>
        <ApprovalActions approvalId={item.id} status={item.status} />
      </CardContent>
    </Card>
  );
}
