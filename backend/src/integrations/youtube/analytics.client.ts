import { notImplemented } from "../../utils/errors.js";

export const youtubeAnalyticsClient = {
  async request(_input?: Record<string, unknown>): Promise<never> {
    throw notImplemented("youtubeAnalyticsClient");
  },
};
