/**
 * Analytics page scaffold.
 */
export function page(..._args: unknown[]): void {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics:page]", _args);
  }
}
