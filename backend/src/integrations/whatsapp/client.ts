import { notImplemented } from "../../utils/errors.js";

export const whatsappClient = {
  async request(_input?: Record<string, unknown>): Promise<never> {
    throw notImplemented("whatsappClient");
  },
};
