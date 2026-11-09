import { logger } from "../../utils/logger.js";

export async function runWebhookDeliveryWorker(payload: Record<string, unknown>) {
  logger.info("worker.webhook_delivery", { event: payload.event });
  return { delivered: false, reason: "no endpoints configured" };
}
