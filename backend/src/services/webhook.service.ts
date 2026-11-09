import { logger } from "../utils/logger.js";
import { queueService } from "./queue.service.js";

export const webhookService = {
  async dispatch(event: string, payload: Record<string, unknown>) {
    logger.info("webhook.dispatch", { event });
    return queueService.enqueue("webhook.delivery", { event, payload });
  },
};
