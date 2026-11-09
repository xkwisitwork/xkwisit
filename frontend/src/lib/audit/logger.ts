/**
 * Audit logger scaffold.
 */
export function logger(event: string, meta: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[audit]", event, meta);
  }
}
