import { logger } from "../utils/logger.js";

type CronTask = { name: string; intervalMs: number; timer?: NodeJS.Timeout };

const tasks = new Map<string, CronTask>();

export const cronService = {
  schedule(name: string, intervalMs: number, fn: () => void | Promise<void>) {
    this.cancel(name);
    const timer = setInterval(() => {
      void Promise.resolve(fn()).catch((err) => {
        logger.error("cron.task_failed", { name, error: String(err) });
      });
    }, intervalMs);
    if (typeof timer.unref === "function") timer.unref();
    tasks.set(name, { name, intervalMs, timer });
  },
  cancel(name: string) {
    const existing = tasks.get(name);
    if (existing?.timer) clearInterval(existing.timer);
    tasks.delete(name);
  },
  list() {
    return [...tasks.values()].map(({ name, intervalMs }) => ({ name, intervalMs }));
  },
};
