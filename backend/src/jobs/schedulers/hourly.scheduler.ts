import { cronService } from "../../services/cron.service.js";
import { runFollowUpScanWorker } from "../workers/follow-up-scan.worker.js";

export function startHourlyScheduler() {
  cronService.schedule("hourly", 60 * 60 * 1000, async () => { await runFollowUpScanWorker(); });
}
