"use client";

import Link from "next/link";
import { Check, MessageSquareWarning, X } from "lucide-react";

import { Button } from "@/components/ui/Button";

import { useApprovalMutations } from "../hooks/useApprovalMutations";
import type { ApprovalStatus } from "@/lib/constants/statuses";

export function ApprovalActions({
  approvalId,
  status,
}: {
  approvalId: string;
  status: ApprovalStatus;
}) {
  const { approve, reject, requestChanges } = useApprovalMutations(approvalId);
  const busy = approve.isPending || reject.isPending || requestChanges.isPending;

  if (status !== "PENDING" && status !== "CHANGES_REQUESTED") {
    return (
      <Link
        href={`/approvals?focus=${approvalId}`}
        className="text-300 text-primary hover:underline"
      >
        View
      </Link>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        size="sm"
        variant="contained"
        leftIcon={<Check className="h-3.5 w-3.5" />}
        loading={approve.isPending}
        disabled={busy}
        onClick={() => approve.mutate({})}
      >
        Approve
      </Button>
      <Button
        size="sm"
        variant="outlined"
        leftIcon={<MessageSquareWarning className="h-3.5 w-3.5" />}
        loading={requestChanges.isPending}
        disabled={busy}
        onClick={() => requestChanges.mutate({ note: "Please revise" })}
      >
        Changes
      </Button>
      <Button
        size="sm"
        variant="ghost"
        leftIcon={<X className="h-3.5 w-3.5" />}
        loading={reject.isPending}
        disabled={busy}
        onClick={() => reject.mutate({})}
      >
        Reject
      </Button>
    </div>
  );
}
