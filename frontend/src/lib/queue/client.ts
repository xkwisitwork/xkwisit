/**
 * Queue job scaffold - client.
 */
export async function enqueueClient(payload: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[queue:client]", payload);
  }
  return { id: `job_${Date.now()}`, status: "queued" as const };
}

export async function runClient(_payload: Record<string, unknown> = {}) {
  return { ok: true };
}
