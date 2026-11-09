/**
 * Analytics track scaffold.
 */
export function track(..._args: unknown[]): void {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics:track]", _args);
  }
}
