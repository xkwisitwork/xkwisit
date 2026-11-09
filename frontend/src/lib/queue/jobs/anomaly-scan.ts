/**
 * Queue job scaffold - anomaly-scan.
 */
export async function enqueueAnomalyScan(payload: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[queue:anomaly-scan]", payload);
  }
  return { id: `job_${Date.now()}`, status: "queued" as const };
}

export async function runAnomalyScan(_payload: Record<string, unknown> = {}) {
  return { ok: true };
}
