import { notImplemented } from "../../utils/errors.js";

export const zapierClient = {
  async request(_input?: Record<string, unknown>): Promise<never> {
    throw notImplemented("zapierClient");
  },
};
