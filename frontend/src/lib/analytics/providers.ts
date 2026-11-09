/**
 * Analytics providers scaffold.
 */
export function providers(..._args: unknown[]): void {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics:providers]", _args);
  }
}
