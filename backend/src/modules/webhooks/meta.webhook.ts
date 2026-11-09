import { notImplemented } from "../../utils/errors.js";

/** Placeholder for meta webhook. */
export async function runwebhook(..._args: unknown[]): Promise<never> {
  throw notImplemented("meta.webhook");
}
