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
import type { ContentStatus } from "@/lib/constants/statuses";

import { useApproveContent, useRequestContentChanges } from "../hooks/useContent";

export type ContentApprovalFlowProps = {
  contentId: string;
  status: ContentStatus;
};

export function ContentApprovalFlow({ contentId, status }: ContentApprovalFlowProps) {
  const [comment, setComment] = useState("");
  const approveMutation = useApproveContent();
  const changesMutation = useRequestContentChanges();

  const canAct = status === "INTERNAL_REVIEW" || status === "CLIENT_APPROVAL";

  if (!canAct) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Approvals</CardTitle>
          <CardDescription>
            This piece is not waiting on approval right now.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Approvals</CardTitle>
        <CardDescription>
          Approve this piece or request changes before it moves forward.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="Optional comment for the team…"
        />
        <div className="flex flex-wrap gap-2">
          <Button
            variant="contained"
            size="sm"
            loading={approveMutation.isPending}
            onClick={() =>
              approveMutation.mutate({
                id: contentId,
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
                id: contentId,
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
