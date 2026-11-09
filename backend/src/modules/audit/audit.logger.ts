import { notImplemented } from "../../utils/errors.js";

/** Placeholder for audit logger. */
export async function runlogger(..._args: unknown[]): Promise<never> {
  throw notImplemented("audit.logger");
}
