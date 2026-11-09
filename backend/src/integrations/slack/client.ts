import { notImplemented } from "../../utils/errors.js";

export const slackClient = {
  async request(_input?: Record<string, unknown>): Promise<never> {
    throw notImplemented("slackClient");
  },
};
