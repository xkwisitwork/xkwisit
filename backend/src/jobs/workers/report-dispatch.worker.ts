import { logger } from "../../utils/logger.js";
export async function runReportDispatchWorker() {
  logger.info("worker.report_dispatch");
  return { dispatched: 0 };
}
