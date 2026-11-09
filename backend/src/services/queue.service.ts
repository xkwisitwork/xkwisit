import { logger } from "../utils/logger.js";

type Job = { name: string; payload: Record<string, unknown>; enqueuedAt: string };
const queue: Job[] = [];

export const queueService = {
  async enqueue(name: string, payload: Record<string, unknown> = {}) {
    const job = { name, payload, enqueuedAt: new Date().toISOString() };
    queue.push(job);
    logger.info("queue.enqueue", { name });
    return job;
  },
  async drain() {
    return queue.splice(0, queue.length);
  },
  size() {
    return queue.length;
  },
};
