import type { ReviewSentiment, SentimentSplit } from "../types";
import type { StatusTone } from "@/components/ui/Badge";

export function sentimentTone(sentiment: ReviewSentiment): StatusTone {
  if (sentiment === "POSITIVE") return "success";
  if (sentiment === "NEGATIVE") return "destructive";
  return "muted";
}

export function ratingTone(rating: number): StatusTone {
  if (rating >= 4) return "success";
  if (rating >= 3) return "warning";
  if (rating > 0) return "destructive";
  return "muted";
}

export function formatRating(value: number, digits = 1): string {
  return value.toFixed(digits);
}

export function dominantSentiment(split: SentimentSplit): ReviewSentiment {
  if (split.positive >= split.neutral && split.positive >= split.negative) {
    return "POSITIVE";
  }
  if (split.negative >= split.neutral) return "NEGATIVE";
  return "NEUTRAL";
}

export function sentimentPercent(split: SentimentSplit): {
  positive: number;
  neutral: number;
  negative: number;
} {
  const total = split.positive + split.neutral + split.negative;
  if (total <= 0) {
    return { positive: 0, neutral: 0, negative: 0 };
  }
  return {
    positive: Math.round((split.positive / total) * 100),
    neutral: Math.round((split.neutral / total) * 100),
    negative: Math.round((split.negative / total) * 100),
  };
}
