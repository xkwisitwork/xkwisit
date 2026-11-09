"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { ReviewListItem } from "../types";
import { ReviewCard } from "./ReviewCard";

export function ReviewFeed({
  reviews,
  loading,
}: {
  reviews: ReviewListItem[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-36 w-full" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return <p className="text-400 text-neutral-600">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
