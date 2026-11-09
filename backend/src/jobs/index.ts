import { startDailyScheduler } from "./schedulers/daily.scheduler.js";
import { startHourlyScheduler } from "./schedulers/hourly.scheduler.js";
import { startWeeklyScheduler } from "./schedulers/weekly.scheduler.js";

export function startJobs() {
  startHourlyScheduler();
  startDailyScheduler();
  startWeeklyScheduler();
}

export * from "./workers/index.js";
export * from "./schedulers/index.js";
