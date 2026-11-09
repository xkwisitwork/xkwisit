import { notImplemented } from "../../utils/errors.js";

export async function setupMfa(_userId: string): Promise<never> {
  throw notImplemented("MFA setup");
}

export async function verifyMfa(_userId: string, _code: string): Promise<never> {
  throw notImplemented("MFA verify");
}

export async function disableMfa(_userId: string): Promise<never> {
  throw notImplemented("MFA disable");
}
