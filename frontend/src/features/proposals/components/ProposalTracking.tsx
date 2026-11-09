"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";
import type { ProposalStatus } from "@/lib/constants/statuses";

import type { ProposalListItem } from "../types";

function statusTone(status: ProposalStatus) {
  if (status === "ACCEPTED") return "success" as const;
  if (status === "REJECTED" || status === "EXPIRED") return "destructive" as const;
  if (status === "SENT" || status === "VIEWED") return "info" as const;
  return "muted" as const;
}

export function ProposalTracking({ proposals }: { proposals: ProposalListItem[] }) {
  if (proposals.length === 0) {
    return <p className="text-400 text-neutral-600">No proposals yet.</p>;
  }

  return (
    <div className="grid gap-3 tablet:grid-cols-2">
      {proposals.map((proposal) => (
        <Card key={proposal.id}>
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
            <div>
              <CardTitle className="text-500">{proposal.title}</CardTitle>
              <p className="mt-1 text-200 text-neutral-600">{proposal.clientName}</p>
            </div>
            <StatusBadge tone={statusTone(proposal.status)} size="sm">
              {proposal.status}
            </StatusBadge>
          </CardHeader>
          <CardContent className="text-300">
            <p className="font-medium tabular-nums">
              {formatCurrencyCompact(proposal.totalAmount, proposal.currency)}
            </p>
            <p className="mt-1 text-200 text-neutral-600">
              Updated {formatDate(proposal.updatedAt, "d MMM yyyy")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
