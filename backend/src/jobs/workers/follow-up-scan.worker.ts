import { logger } from "../../utils/logger.js";
export async function runFollowUpScanWorker() {
  logger.info("worker.follow_up_scan");
  return { due: 0 };
}
