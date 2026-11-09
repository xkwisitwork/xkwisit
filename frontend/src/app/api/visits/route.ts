import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth/session";
import { ROLES } from "@/lib/constants/roles";
import { resolveVisitorPlace } from "@/lib/geo/resolveVisitorPlace";
import { normalizeVisit, type VisitRow } from "@/types/visits";

const LOG_PATH = path.join(process.cwd(), "data", "visits.ndjson");

export type { VisitRow };

export async function POST(request: Request) {
  let pagePath = "/";
  let client:
    | {
        latitude?: number;
        longitude?: number;
        accuracy?: number;
        timezone?: string;
        locale?: string;
      }
    | undefined;

  try {
    const body = (await request.json()) as {
      path?: string;
      latitude?: number;
      longitude?: number;
      accuracy?: number;
      timezone?: string;
      locale?: string;
    };
    if (typeof body.path === "string" && body.path.startsWith("/")) {
      pagePath = body.path.slice(0, 180);
    }
    client = {
      latitude: typeof body.latitude === "number" ? body.latitude : undefined,
      longitude: typeof body.longitude === "number" ? body.longitude : undefined,
      accuracy: typeof body.accuracy === "number" ? body.accuracy : undefined,
      timezone: typeof body.timezone === "string" ? body.timezone.slice(0, 80) : undefined,
      locale: typeof body.locale === "string" ? body.locale.slice(0, 40) : undefined,
    };
  } catch {
    pagePath = "/";
  }

  const place = await resolveVisitorPlace(request, client);
  const row: VisitRow = {
    country: place.country,
    countryCode: place.countryCode,
    region: place.region,
    city: place.city,
    postal: place.postal,
    latitude: place.latitude,
    longitude: place.longitude,
    timezone: place.timezone,
    isp: place.isp,
    org: place.org,
    ip: place.ip,
    label: place.label,
    source: place.source,
    accuracy: client?.accuracy ?? null,
    locale: client?.locale || "",
    path: pagePath,
    at: new Date().toISOString(),
  };

  await mkdir(path.dirname(LOG_PATH), { recursive: true });
  await appendFile(LOG_PATH, `${JSON.stringify(row)}\n`, "utf8");
  return NextResponse.json({ ok: true, place: row });
}

export async function GET() {
  const session = await getSession();
  const role = session?.user.role;
  if (role !== ROLES.SUPER_ADMIN && role !== ROLES.AGENCY_MANAGER) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const raw = await readFile(LOG_PATH, "utf8");
    const visits = raw
      .split("\n")
      .filter(Boolean)
      .slice(-200)
      .reverse()
      .map((line) => normalizeVisit(JSON.parse(line) as Record<string, unknown>));
    return NextResponse.json({ visits });
  } catch {
    return NextResponse.json({ visits: [] });
  }
}
