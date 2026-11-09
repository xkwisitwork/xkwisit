import { logger } from "../utils/logger.js";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
};

export const emailService = {
  async send(input: SendEmailInput): Promise<{ queued: true }> {
    logger.info("email.queued", {
      to: input.to,
      subject: input.subject,
    });
    return { queued: true };
  },
};
