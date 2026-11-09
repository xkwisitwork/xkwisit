/**
 * Queue job scaffold - follow-up-scan.
 */
export async function enqueueFollowUpScan(payload: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[queue:follow-up-scan]", payload);
  }
  return { id: `job_${Date.now()}`, status: "queued" as const };
}

export async function runFollowUpScan(_payload: Record<string, unknown> = {}) {
  return { ok: true };
}
