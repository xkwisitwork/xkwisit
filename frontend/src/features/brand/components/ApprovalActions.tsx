"use client";

import { useState } from "react";
import { Check, MessageSquareWarning } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";

import { useApproveBrandItem, useRequestBrandChanges } from "../hooks/useBrandApprovals";
import type { BrandApproval } from "../types";

export type ApprovalActionsProps = {
  approval: BrandApproval;
};

export function ApprovalActions({ approval }: ApprovalActionsProps) {
  const [comment, setComment] = useState("");
  const approveMutation = useApproveBrandItem();
  const changesMutation = useRequestBrandChanges();

  if (approval.status !== "PENDING") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{approval.title}</CardTitle>
          <CardDescription>Status: {approval.status.replace(/_/g, " ")}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{approval.title}</CardTitle>
        <CardDescription>
          {approval.clientName}
          {approval.requestedByName ? ` · from ${approval.requestedByName}` : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="Optional comment…"
        />
        <div className="flex flex-wrap gap-2">
          <Button
            variant="contained"
            size="sm"
            loading={approveMutation.isPending}
            onClick={() =>
              approveMutation.mutate({
                id: approval.id,
                payload: { comment: comment || undefined },
              })
            }
          >
            <Check className="h-4 w-4" />
            Approve
          </Button>
          <Button
            variant="outlined"
            size="sm"
            loading={changesMutation.isPending}
            disabled={!comment.trim()}
            onClick={() =>
              changesMutation.mutate({
                id: approval.id,
                payload: { comment },
              })
            }
          >
            <MessageSquareWarning className="h-4 w-4" />
            Request changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
