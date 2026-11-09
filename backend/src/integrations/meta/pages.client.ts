import { notImplemented } from "../../utils/errors.js";

export const metaPagesClient = {
  async request(_input?: Record<string, unknown>): Promise<never> {
    throw notImplemented("metaPagesClient");
  },
};
