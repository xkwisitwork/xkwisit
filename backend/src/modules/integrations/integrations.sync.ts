import { notImplemented } from "../../utils/errors.js";

/** Placeholder for integrations sync. */
export async function runsync(..._args: unknown[]): Promise<never> {
  throw notImplemented("integrations.sync");
}
