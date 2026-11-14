import { NextResponse } from "next/server";

import { resolveVisitorPlace } from "@/lib/geo/resolveVisitorPlace";

export const runtime = "nodejs";

/**
 * POST /api/geo/me
 * Resolves the visitor's approximate place (GPS preferred, then CDN/IP).
 */
export async function POST(request: Request) {
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
      latitude?: number;
      longitude?: number;
      accuracy?: number;
      timezone?: string;
      locale?: string;
    };
    client = {
      latitude: typeof body.latitude === "number" ? body.latitude : undefined,
      longitude: typeof body.longitude === "number" ? body.longitude : undefined,
      accuracy: typeof body.accuracy === "number" ? body.accuracy : undefined,
      timezone: typeof body.timezone === "string" ? body.timezone.slice(0, 80) : undefined,
      locale: typeof body.locale === "string" ? body.locale.slice(0, 40) : undefined,
    };
  } catch {
    client = undefined;
  }

  const place = await resolveVisitorPlace(request, client);
  return NextResponse.json({
    ok: true,
    place: {
      latitude: place.latitude,
      longitude: place.longitude,
      city: place.city,
      region: place.region,
      country: place.country,
      label: place.label,
      source: place.source,
    },
  });
}
