import { logger } from "../../utils/logger.js";
export async function runIntegrationSyncWorker() {
  logger.info("worker.integration_sync");
  return { synced: 0 };
}
