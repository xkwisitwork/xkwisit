/**
 * Detect stale prospects by days since last contact.
 */
export function detectStale<T extends { lastContactedAt: string | null }>(
  items: T[],
  thresholdDays = 7,
): (T & { daysSilent: number })[] {
  const now = Date.now();
  return items
    .map((item) => {
      const last = item.lastContactedAt ? new Date(item.lastContactedAt).getTime() : 0;
      const daysSilent = last ? Math.floor((now - last) / 86400000) : thresholdDays + 30;
      return { ...item, daysSilent };
    })
    .filter((item) => item.daysSilent >= thresholdDays)
    .sort((a, b) => b.daysSilent - a.daysSilent);
}
