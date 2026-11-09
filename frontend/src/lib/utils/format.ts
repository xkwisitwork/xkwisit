/**
 * Text and label formatting helpers.
 * Pure functions - no side effects, no external dependencies.
 */

/**
 * Truncates a string to a maximum length, appending an ellipsis.
 * Preserves whole words where possible.
 */
export function truncate(value: string, maxLength: number, ellipsis = "…"): string {
  if (!value) return "";
  if (value.length <= maxLength) return value;

  const cut = value.slice(0, maxLength - ellipsis.length);
  const lastSpace = cut.lastIndexOf(" ");

  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + ellipsis;
}

/**
 * Extracts initials from a full name.
 * "Ada Obi Nwosu" → "AO" (max 2 by default)
 */
export function getInitials(name: string, max = 2): string {
  if (!name) return "";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, max)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

/**
 * Converts a string into a URL-safe slug.
 * "Hello, World! 🌍" → "hello-world"
 */
export function slugify(value: string): string {
  if (!value) return "";

  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Capitalizes the first letter of each word.
 */
export function titleCase(value: string): string {
  if (!value) return "";

  return value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Converts SCREAMING_SNAKE_CASE or kebab-case into Title Case.
 * "LEAD_STATUS" → "Lead Status"
 * "lead-status" → "Lead Status"
 */
export function humanize(value: string): string {
  if (!value) return "";

  return titleCase(
    value
      .replace(/[_-]+/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .trim(),
  );
}

/**
 * Pluralizes a word based on count.
 * pluralize(1, "item") → "item"
 * pluralize(3, "item") → "items"
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return singular;

  return plural ?? `${singular}s`;
}

/**
 * Returns a compact display for counts.
 * 1_200 → "1.2K"
 * 12_500 → "12.5K"
 * 1_200_000 → "1.2M"
 */
export function compactNumber(value: number, fractionDigits = 1): string {
  if (!Number.isFinite(value)) return "0";

  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/**
 * Formats a number with thousands separators.
 * 1234567 → "1,234,567"
 */
export function formatNumber(value: number, fractionDigits = 0): string {
  if (!Number.isFinite(value)) return "0";

  return new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/**
 * Formats a value as a percentage.
 * 0.125 → "12.5%"
 * 12.5 → "12.5%"
 */
export function formatPercent(
  value: number,
  options: { fromDecimal?: boolean; fractionDigits?: number } = {},
): string {
  const { fromDecimal = false, fractionDigits = 1 } = options;

  if (!Number.isFinite(value)) return "0%";

  const numeric = fromDecimal ? value * 100 : value;

  return `${numeric.toFixed(fractionDigits)}%`;
}

/**
 * Converts a string into a list of tags.
 * Splits on commas, trims whitespace, removes empties, dedupes.
 */
export function parseTags(value: string): string[] {
  if (!value) return [];

  return Array.from(
    new Set(
      value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  );
}

/**
 * Returns file size in a human-readable format.
 * 1024 → "1 KB"
 * 1_572_864 → "1.5 MB"
 */
export function formatFileSize(bytes: number, decimals = 2): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const k = 1024;
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1);
  const value = bytes / Math.pow(k, i);

  return `${value.toFixed(i === 0 ? 0 : decimals)} ${units[i]}`;
}
