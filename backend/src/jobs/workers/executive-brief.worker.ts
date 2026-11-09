import { logger } from "../../utils/logger.js";
export async function runExecutiveBriefWorker() {
  logger.info("worker.executive_brief");
  return { generated: 0 };
}
