export type ActivityKind =
  | "session_start"
  | "page_view"
  | "click"
  | "download"
  | "heartbeat"
  | "session_end";

export type ActivityEvent = {
  id: string;
  sessionId: string;
  kind: ActivityKind;
  path: string;
  at: string;
  /** Approximate identity from IP / geo (when available). */
  ip?: string | null;
  city?: string;
  country?: string;
  region?: string;
  label?: string;
  locale?: string;
  timezone?: string;
  /** Click / download target. */
  target?: string;
  tag?: string;
  href?: string;
  assetKey?: string;
  /** Time on site (ms). */
  durationMs?: number;
  activeMs?: number;
};

export type ActivitySession = {
  sessionId: string;
  startedAt: string;
  lastSeenAt: string;
  durationMs: number;
  activeMs: number;
  pageViews: number;
  clicks: number;
  downloads: number;
  paths: string[];
  clickTargets: string[];
  downloadTargets: string[];
  ip: string | null;
  city: string;
  country: string;
  region: string;
  label: string;
  locale: string;
  timezone: string;
};

const KINDS = new Set<ActivityKind>([
  "session_start",
  "page_view",
  "click",
  "download",
  "heartbeat",
  "session_end",
]);

export function normalizeActivityEvent(
  raw: Record<string, unknown>,
): ActivityEvent | null {
  const kind = typeof raw.kind === "string" ? raw.kind : "";
  if (!KINDS.has(kind as ActivityKind)) return null;
  const sessionId = typeof raw.sessionId === "string" ? raw.sessionId : "";
  if (!sessionId) return null;

  return {
    id: typeof raw.id === "string" ? raw.id : `${sessionId}-${raw.at ?? Date.now()}`,
    sessionId: sessionId.slice(0, 64),
    kind: kind as ActivityKind,
    path: typeof raw.path === "string" ? raw.path.slice(0, 180) : "/",
    at: typeof raw.at === "string" ? raw.at : new Date().toISOString(),
    ip: typeof raw.ip === "string" ? raw.ip : raw.ip === null ? null : undefined,
    city: typeof raw.city === "string" ? raw.city : undefined,
    country: typeof raw.country === "string" ? raw.country : undefined,
    region: typeof raw.region === "string" ? raw.region : undefined,
    label: typeof raw.label === "string" ? raw.label : undefined,
    locale: typeof raw.locale === "string" ? raw.locale : undefined,
    timezone: typeof raw.timezone === "string" ? raw.timezone : undefined,
    target: typeof raw.target === "string" ? raw.target.slice(0, 200) : undefined,
    tag: typeof raw.tag === "string" ? raw.tag.slice(0, 40) : undefined,
    href: typeof raw.href === "string" ? raw.href.slice(0, 400) : undefined,
    assetKey:
      typeof raw.assetKey === "string" ? raw.assetKey.slice(0, 80) : undefined,
    durationMs:
      typeof raw.durationMs === "number" && Number.isFinite(raw.durationMs)
        ? Math.max(0, Math.round(raw.durationMs))
        : undefined,
    activeMs:
      typeof raw.activeMs === "number" && Number.isFinite(raw.activeMs)
        ? Math.max(0, Math.round(raw.activeMs))
        : undefined,
  };
}

export function aggregateActivitySessions(
  events: ActivityEvent[],
): ActivitySession[] {
  const map = new Map<string, ActivitySession>();

  for (const event of events) {
    let session = map.get(event.sessionId);
    if (!session) {
      session = {
        sessionId: event.sessionId,
        startedAt: event.at,
        lastSeenAt: event.at,
        durationMs: 0,
        activeMs: 0,
        pageViews: 0,
        clicks: 0,
        downloads: 0,
        paths: [],
        clickTargets: [],
        downloadTargets: [],
        ip: event.ip ?? null,
        city: event.city || "",
        country: event.country || "",
        region: event.region || "",
        label: event.label || "",
        locale: event.locale || "",
        timezone: event.timezone || "",
      };
      map.set(event.sessionId, session);
    }

    if (event.at < session.startedAt) session.startedAt = event.at;
    if (event.at > session.lastSeenAt) session.lastSeenAt = event.at;

    if (event.ip && !session.ip) session.ip = event.ip;
    if (event.city && !session.city) session.city = event.city;
    if (event.country && !session.country) session.country = event.country;
    if (event.region && !session.region) session.region = event.region;
    if (event.label && !session.label) session.label = event.label;
    if (event.locale && !session.locale) session.locale = event.locale;
    if (event.timezone && !session.timezone) session.timezone = event.timezone;

    if (event.path && !session.paths.includes(event.path)) {
      session.paths.push(event.path);
    }

    if (event.kind === "page_view" || event.kind === "session_start") {
      session.pageViews += 1;
    }
    if (event.kind === "click") {
      session.clicks += 1;
      const target = event.target || event.href || event.tag || "click";
      if (!session.clickTargets.includes(target) && session.clickTargets.length < 40) {
        session.clickTargets.push(target);
      }
    }
    if (event.kind === "download") {
      session.downloads += 1;
      const target = event.target || event.assetKey || event.href || "download";
      if (
        !session.downloadTargets.includes(target) &&
        session.downloadTargets.length < 20
      ) {
        session.downloadTargets.push(target);
      }
    }

    if (typeof event.durationMs === "number") {
      session.durationMs = Math.max(session.durationMs, event.durationMs);
    }
    if (typeof event.activeMs === "number") {
      session.activeMs = Math.max(session.activeMs, event.activeMs);
    }
  }

  for (const session of map.values()) {
    if (session.durationMs <= 0) {
      const start = Date.parse(session.startedAt);
      const end = Date.parse(session.lastSeenAt);
      if (Number.isFinite(start) && Number.isFinite(end) && end >= start) {
        session.durationMs = end - start;
      }
    }
  }

  return [...map.values()].sort((a, b) =>
    a.lastSeenAt < b.lastSeenAt ? 1 : -1,
  );
}
