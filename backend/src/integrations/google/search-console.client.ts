import { notImplemented } from "../../utils/errors.js";

export const googleSearchConsoleClient = {
  async request(_input?: Record<string, unknown>): Promise<never> {
    throw notImplemented("googleSearchConsoleClient");
  },
};
