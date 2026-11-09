export function isSignificant(
  confidence: number | null | undefined,
  threshold = 0.95,
): boolean {
  if (confidence == null) return false;
  return confidence >= threshold;
}

export function formatConfidence(confidence: number | null | undefined): string {
  if (confidence == null) return "-";
  return `${Math.round(confidence * 100)}%`;
}
