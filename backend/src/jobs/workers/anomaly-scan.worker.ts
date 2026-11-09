import { logger } from "../../utils/logger.js";
export async function runAnomalyScanWorker() {
  logger.info("worker.anomaly_scan");
  return { scanned: 0, anomalies: [] as unknown[] };
}
