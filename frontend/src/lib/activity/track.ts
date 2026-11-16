import type { ActivityKind } from "@/types/activity";

import { getActivitySessionId } from "./session";

export type TrackActivityInput = {
  kind: ActivityKind;
  path?: string;
  target?: string;
  tag?: string;
  href?: string;
  assetKey?: string;
  durationMs?: number;
  activeMs?: number;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  timezone?: string;
  locale?: string;
  /** Prefer sendBeacon for unload (best-effort). */
  keepalive?: boolean;
};

type QueueItem = TrackActivityInput & { sessionId: string; path: string };

const MAX_QUEUE = 20;
let queue: QueueItem[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function currentPath(fallback?: string): string {
  if (fallback && fallback.startsWith("/")) return fallback.slice(0, 180);
  if (typeof window === "undefined") return "/";
  return (window.location.pathname || "/").slice(0, 180);
}

function enqueue(item: QueueItem) {
  queue.push(item);
  if (queue.length > MAX_QUEUE) queue = queue.slice(-MAX_QUEUE);
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flushQueue();
  }, 400);
}

async function flushQueue() {
  if (queue.length === 0) return;
  const batch = queue;
  queue = [];
  try {
    await fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: batch }),
      keepalive: true,
    });
  } catch {
    // Tracking must never break the app.
  }
}

/**
 * Fire-and-forget activity event. Safe to call from UI handlers.
 * Never throws.
 */
export function trackActivity(input: TrackActivityInput): void {
  try {
    const sessionId = getActivitySessionId();
    if (!sessionId) return;
    const payload: QueueItem = {
      ...input,
      sessionId,
      path: currentPath(input.path),
      timezone:
        input.timezone ||
        (typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : undefined),
      locale:
        input.locale ||
        (typeof navigator !== "undefined" ? navigator.language : undefined),
    };

    if (input.keepalive && typeof navigator !== "undefined" && navigator.sendBeacon) {
      const body = JSON.stringify({ events: [payload] });
      const ok = navigator.sendBeacon(
        "/api/activity",
        new Blob([body], { type: "application/json" }),
      );
      if (ok) return;
    }

    enqueue(payload);
  } catch {
    // ignore
  }
}

/** Immediately flush queued events (e.g. before unload). */
export function flushActivity(): void {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  void flushQueue();
}
