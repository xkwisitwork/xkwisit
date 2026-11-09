import { notImplemented } from "../../utils/errors.js";

export async function getGoogleAuthUrl(_state?: string): Promise<never> {
  throw notImplemented("Google OAuth");
}

export async function exchangeGoogleCode(_code: string): Promise<never> {
  throw notImplemented("Google OAuth");
}
