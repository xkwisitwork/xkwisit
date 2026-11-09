/**
 * Return unique values from an array (stable order).
 */
export function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}
