"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";

import { useRespondToReview } from "../hooks/useReputation";
import type { ReviewListItem } from "../types";

export function ReviewResponseForm({
  clientId,
  review,
}: {
  clientId: string;
  review: ReviewListItem;
}) {
  const [body, setBody] = useState("");
  const respond = useRespondToReview(clientId);

  const onSubmit = async (publish: boolean) => {
    if (!body.trim()) return;
    await respond.mutateAsync({
      id: review.id,
      payload: { body, publish },
    });
    setBody("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-500">Respond to {review.authorName}</CardTitle>
        <CardDescription>
          {review.rating.toFixed(1)} · {review.source}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {review.body ? (
          <p className="rounded-xl bg-neutral-200/50 p-3 text-300 text-neutral-600">
            {review.body}
          </p>
        ) : null}
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          placeholder="Write a public response…"
        />
        <div className="flex justify-end gap-2">
          <Button
            variant="outlined"
            loading={respond.isPending}
            onClick={() => onSubmit(false)}
          >
            Save draft
          </Button>
          <Button
            variant="contained"
            loading={respond.isPending}
            onClick={() => onSubmit(true)}
          >
            Publish
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
