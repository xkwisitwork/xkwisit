const SESSION_KEY = "xkwisit-aid";

function uuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Stable anonymous visitor id for this browser tab session. */
export function getActivitySessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing && existing.length >= 8 && existing.length <= 64) return existing;
    const next = uuid();
    window.sessionStorage.setItem(SESSION_KEY, next);
    return next;
  } catch {
    return uuid();
  }
}

export function hasStartedActivitySession(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.sessionStorage.getItem(`${SESSION_KEY}:started`) === "1";
  } catch {
    return false;
  }
}

export function markActivitySessionStarted(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(`${SESSION_KEY}:started`, "1");
  } catch {
    // ignore
  }
}
