/**
 * Relative luminance helpers for WCAG contrast checks.
 */
function luminance(hex: string): number {
  const cleaned = hex.replace("#", "");
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/** Contrast ratio between two hex colors (1–21). */
export function contrastRatio(foreground: string, background: string): number {
  const L1 = luminance(foreground);
  const L2 = luminance(background);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Whether the pair meets WCAG AA for normal text (4.5:1). */
export function meetsWcagAa(foreground: string, background: string): boolean {
  return contrastRatio(foreground, background) >= 4.5;
}
