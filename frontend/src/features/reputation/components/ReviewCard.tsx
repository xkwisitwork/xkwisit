"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/date";

import type { ReviewListItem } from "../types";
import { ratingTone, sentimentTone } from "../utils/sentiment";

export function ReviewCard({ review }: { review: ReviewListItem }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-500">{review.authorName}</CardTitle>
          <p className="mt-1 text-200 text-neutral-600">
            {review.source} · {formatDate(review.reviewedAt, "d MMM yyyy")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone={ratingTone(review.rating)}>
            {review.rating.toFixed(1)}
          </StatusBadge>
          <StatusBadge tone={sentimentTone(review.sentiment)}>
            {review.sentiment}
          </StatusBadge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {review.body ? (
          <p className="text-400 text-neutral-700">{review.body}</p>
        ) : (
          <p className="text-300 text-neutral-600">No written review.</p>
        )}
        <p className="text-200 text-neutral-600">Response: {review.responseStatus}</p>
      </CardContent>
    </Card>
  );
}
