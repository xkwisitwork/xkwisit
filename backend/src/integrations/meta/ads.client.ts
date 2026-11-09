import { notImplemented } from "../../utils/errors.js";

export const metaAdsClient = {
  async request(_input?: Record<string, unknown>): Promise<never> {
    throw notImplemented("metaAdsClient");
  },
};
