/**
 * Analytics identify scaffold.
 */
export function identify(..._args: unknown[]): void {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics:identify]", _args);
  }
}
