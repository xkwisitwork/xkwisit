import {
  differenceInCalendarDays,
  format,
  formatDistanceToNow,
  isToday,
  isTomorrow,
  isYesterday,
  parseISO,
} from "date-fns";

export type DateInput = Date | string | number;

/**
 * Safely coerces any date input into a `Date` object.
 * Returns `null` on invalid input.
 */
export function toDate(input: DateInput | null | undefined): Date | null {
  if (input === null || input === undefined) return null;

  if (input instanceof Date)
    return Number.isNaN(input.getTime()) ? null : input;

  if (typeof input === "string") {
    try {
      const parsed = parseISO(input);

      return Number.isNaN(parsed.getTime()) ? null : parsed;
    } catch {
      return null;
    }
  }

  if (typeof input === "number") {
    const parsed = new Date(input);

    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}

/**
 * Formats a date using date-fns patterns.
 * formatDate(new Date(), "dd MMM yyyy") → "24 Sep 2025"
 */
export function formatDate(
  input: DateInput | null | undefined,
  pattern = "dd MMM yyyy",
): string {
  const date = toDate(input);

  if (!date) return "";

  try {
    return format(date, pattern);
  } catch {
    return "";
  }
}

/**
 * Returns a human-friendly relative time.
 * "about 2 hours ago"
 */
export function formatRelative(input: DateInput | null | undefined): string {
  const date = toDate(input);

  if (!date) return "";

  return formatDistanceToNow(date, { addSuffix: true });
}

/**
 * Smart contextual date — Today, Tomorrow, Yesterday, else formatted.
 */
export function formatContextual(input: DateInput | null | undefined): string {
  const date = toDate(input);

  if (!date) return "";

  if (isToday(date)) return `Today, ${format(date, "h:mm a")}`;
  if (isTomorrow(date)) return `Tomorrow, ${format(date, "h:mm a")}`;
  if (isYesterday(date)) return `Yesterday, ${format(date, "h:mm a")}`;

  return format(date, "dd MMM yyyy, h:mm a");
}

/**
 * Formats a date range.
 * formatDateRange("2025-01-01", "2025-01-31") → "1 Jan – 31 Jan 2025"
 */
export function formatDateRange(
  start: DateInput | null | undefined,
  end: DateInput | null | undefined,
): string {
  const startDate = toDate(start);
  const endDate = toDate(end);

  if (!startDate && !endDate) return "";
  if (!endDate) return formatDate(startDate, "dd MMM yyyy");
  if (!startDate) return formatDate(endDate, "dd MMM yyyy");

  const sameYear = startDate.getFullYear() === endDate.getFullYear();
  const sameMonth = sameYear && startDate.getMonth() === endDate.getMonth();

  if (sameMonth) {
    return `${format(startDate, "d")} – ${format(endDate, "d MMM yyyy")}`;
  }

  if (sameYear) {
    return `${format(startDate, "d MMM")} – ${format(endDate, "d MMM yyyy")}`;
  }

  return `${format(startDate, "d MMM yyyy")} – ${format(endDate, "d MMM yyyy")}`;
}

/**
 * Returns the number of whole days between two dates.
 */
export function daysBetween(
  from: DateInput,
  to: DateInput = new Date(),
): number {
  const fromDate = toDate(from);
  const toDateValue = toDate(to);

  if (!fromDate || !toDateValue) return 0;

  return Math.abs(differenceInCalendarDays(fromDate, toDateValue));
}

/**
 * Returns a short "time ago" style label for tables and timelines.
 * - < 1 min  → "just now"
 * - < 1 hr   → "12m ago"
 * - < 1 day  → "3h ago"
 * - < 7 days → "2d ago"
 * - else     → "12 Jan 2025"
 */
export function formatShortRelative(
  input: DateInput | null | undefined,
): string {
  const date = toDate(input);

  if (!date) return "";

  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSeconds < 60) return "just now";

  const diffMinutes = Math.floor(diffSeconds / 60);

  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);

  if (diffDays < 7) return `${diffDays}d ago`;

  return format(date, "dd MMM yyyy");
}

/**
 * Returns the ISO string for the start of today (00:00:00.000).
 */
export function startOfToday(): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return now.toISOString();
}

/**
 * Returns an ISO date string (yyyy-MM-dd) suitable for <input type="date">.
 */
export function toDateInputValue(input: DateInput | null | undefined): string {
  const date = toDate(input);

  if (!date) return "";

  return format(date, "yyyy-MM-dd");
}
