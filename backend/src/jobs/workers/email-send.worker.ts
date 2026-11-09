import { emailService } from "../../services/email.service.js";
import { logger } from "../../utils/logger.js";

export async function runEmailSendWorker(payload: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}) {
  logger.info("worker.email_send.start");
  return emailService.send(payload);
}
