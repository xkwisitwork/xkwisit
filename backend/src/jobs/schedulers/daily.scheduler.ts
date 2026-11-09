import { cronService } from "../../services/cron.service.js";
import { runAnomalyScanWorker } from "../workers/anomaly-scan.worker.js";
import { runReportDispatchWorker } from "../workers/report-dispatch.worker.js";

export function startDailyScheduler() {
  cronService.schedule("daily", 24 * 60 * 60 * 1000, async () => {
    await runAnomalyScanWorker();
    await runReportDispatchWorker();
  });
}
