import { notImplemented } from "../../utils/errors.js";

export const paystackClient = {
  async request(_input?: Record<string, unknown>): Promise<never> {
    throw notImplemented("paystackClient");
  },
};
