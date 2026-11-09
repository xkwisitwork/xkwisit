import { notImplemented } from "../../utils/errors.js";

export const googleAnalyticsClient = {
  async request(_input?: Record<string, unknown>): Promise<never> {
    throw notImplemented("googleAnalyticsClient");
  },
};
