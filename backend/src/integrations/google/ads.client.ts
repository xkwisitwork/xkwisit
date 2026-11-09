import { notImplemented } from "../../utils/errors.js";

export const googleAdsClient = {
  async request(_input?: Record<string, unknown>): Promise<never> {
    throw notImplemented("googleAdsClient");
  },
};
