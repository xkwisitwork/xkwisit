import { notImplemented } from "../../utils/errors.js";

export const xAdsClient = {
  async request(_input?: Record<string, unknown>): Promise<never> {
    throw notImplemented("xAdsClient");
  },
};
