import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely.
 * - `clsx` handles conditional and array-based classes.
 * - `twMerge` resolves conflicts (e.g. `p-2 p-4` → `p-4`).
 *
 * @example
 *   cn("px-4 py-2", isActive && "bg-primary", "px-2")
 *   // → "py-2 bg-primary px-2"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
