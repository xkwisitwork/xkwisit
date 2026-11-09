import { cronService } from "../../services/cron.service.js";
import { runExecutiveBriefWorker } from "../workers/executive-brief.worker.js";

export function startWeeklyScheduler() {
  cronService.schedule("weekly", 7 * 24 * 60 * 60 * 1000, async () => { await runExecutiveBriefWorker(); });
}
