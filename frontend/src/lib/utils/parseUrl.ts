/**
 * Safely parse a URL string. Returns null on failure.
 */
export function parseUrl(value: string, base?: string): URL | null {
  try {
    return new URL(value, base);
  } catch {
    return null;
  }
}
