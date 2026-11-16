import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth/session";
import { ROLES } from "@/lib/constants/roles";
import { resolveVisitorPlace } from "@/lib/geo/resolveVisitorPlace";
import {
  aggregateActivitySessions,
  normalizeActivityEvent,
  type ActivityEvent,
  type ActivityKind,
} from "@/types/activity";

const LOG_PATH = path.join(process.cwd(), "data", "activity.ndjson");
const MAX_BATCH = 25;
const MAX_READ = 800;

const ALLOWED_KINDS = new Set<ActivityKind>([
  "session_start",
  "page_view",
  "click",
  "download",
  "heartbeat",
  "session_end",
]);

function newId() {
  return `a-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 64);
  }
  const realIp = request.headers.get("x-real-ip");
  return realIp ? realIp.slice(0, 64) : null;
}

type IncomingEvent = {
  sessionId?: string;
  kind?: string;
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
};

async function readEvents(): Promise<ActivityEvent[]> {
  try {
    const raw = await readFile(LOG_PATH, "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .slice(-MAX_READ)
      .map((line) => {
        try {
          return normalizeActivityEvent(JSON.parse(line) as Record<string, unknown>);
        } catch {
          return null;
        }
      })
      .filter((row): row is ActivityEvent => Boolean(row))
      .reverse();
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  let body: { events?: IncomingEvent[]; event?: IncomingEvent } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const incoming = [
    ...(Array.isArray(body.events) ? body.events : []),
    ...(body.event ? [body.event] : []),
  ].slice(0, MAX_BATCH);

  if (incoming.length === 0) {
    return NextResponse.json({ ok: false, error: "No events" }, { status: 400 });
  }

  const ip = clientIp(request);
  const needsPlace = incoming.some(
    (e) => e.kind === "session_start" || e.kind === "page_view",
  );

  let place:
    | Awaited<ReturnType<typeof resolveVisitorPlace>>
    | null = null;

  if (needsPlace) {
    const geoSource = incoming.find(
      (e) => typeof e.latitude === "number" && typeof e.longitude === "number",
    );
    try {
      place = await resolveVisitorPlace(request, {
        latitude: geoSource?.latitude,
        longitude: geoSource?.longitude,
        accuracy: geoSource?.accuracy,
        timezone: geoSource?.timezone,
        locale: geoSource?.locale,
      });
    } catch {
      place = null;
    }
  }

  const rows: ActivityEvent[] = [];
  for (const item of incoming) {
    const kind = typeof item.kind === "string" ? item.kind : "";
    if (!ALLOWED_KINDS.has(kind as ActivityKind)) continue;
    const sessionId =
      typeof item.sessionId === "string" ? item.sessionId.trim().slice(0, 64) : "";
    if (!sessionId) continue;

    const pathName =
      typeof item.path === "string" && item.path.startsWith("/")
        ? item.path.slice(0, 180)
        : "/";

    const row: ActivityEvent = {
      id: newId(),
      sessionId,
      kind: kind as ActivityKind,
      path: pathName,
      at: new Date().toISOString(),
      ip: place?.ip ?? ip,
      city: place?.city,
      country: place?.country,
      region: place?.region,
      label: place?.label,
      locale:
        typeof item.locale === "string" ? item.locale.slice(0, 40) : undefined,
      timezone:
        typeof item.timezone === "string"
          ? item.timezone.slice(0, 80)
          : place?.timezone,
      target:
        typeof item.target === "string" ? item.target.slice(0, 200) : undefined,
      tag: typeof item.tag === "string" ? item.tag.slice(0, 40) : undefined,
      href: typeof item.href === "string" ? item.href.slice(0, 400) : undefined,
      assetKey:
        typeof item.assetKey === "string" ? item.assetKey.slice(0, 80) : undefined,
      durationMs:
        typeof item.durationMs === "number" && Number.isFinite(item.durationMs)
          ? Math.max(0, Math.min(Math.round(item.durationMs), 86_400_000))
          : undefined,
      activeMs:
        typeof item.activeMs === "number" && Number.isFinite(item.activeMs)
          ? Math.max(0, Math.min(Math.round(item.activeMs), 86_400_000))
          : undefined,
    };
    rows.push(row);
  }

  if (rows.length === 0) {
    return NextResponse.json({ ok: false, error: "No valid events" }, { status: 400 });
  }

  await mkdir(path.dirname(LOG_PATH), { recursive: true });
  await appendFile(
    LOG_PATH,
    `${rows.map((row) => JSON.stringify(row)).join("\n")}\n`,
    "utf8",
  );

  return NextResponse.json({ ok: true, count: rows.length });
}

export async function GET(request: Request) {
  const session = await getSession();
  const role = session?.user.role;
  if (role !== ROLES.SUPER_ADMIN && role !== ROLES.AGENCY_MANAGER) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const limitRaw = Number(searchParams.get("limit") || "200");
  const limit = Number.isFinite(limitRaw)
    ? Math.max(1, Math.min(Math.round(limitRaw), MAX_READ))
    : 200;

  const events = (await readEvents()).slice(0, limit);
  const sessions = aggregateActivitySessions(events);

  const summary = {
    sessions: sessions.length,
    pageViews: events.filter((e) => e.kind === "page_view" || e.kind === "session_start")
      .length,
    clicks: events.filter((e) => e.kind === "click").length,
    downloads: events.filter((e) => e.kind === "download").length,
    avgDurationMs:
      sessions.length === 0
        ? 0
        : Math.round(
            sessions.reduce((sum, s) => sum + s.durationMs, 0) / sessions.length,
          ),
  };

  return NextResponse.json({ events, sessions, summary });
}
