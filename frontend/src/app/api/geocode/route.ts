import { NextResponse } from "next/server";

export const runtime = "nodejs";

type NominatimHit = {
  lat: string;
  lon: string;
  display_name?: string;
};

const cache = new Map<string, { lat: number; lng: number; label: string } | null>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = (searchParams.get("city") || "").trim();
  const country = (searchParams.get("country") || "").trim();

  if (!city && !country) {
    return NextResponse.json({ error: "city or country required" }, { status: 400 });
  }

  const key = `${city.toLowerCase()}|${country.toLowerCase()}`;
  if (cache.has(key)) {
    return NextResponse.json({ place: cache.get(key) });
  }

  const params = new URLSearchParams({
    format: "json",
    limit: "1",
    q: [city, country].filter(Boolean).join(", "),
  });

  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "XkwisitVisitorPlaces/1.0 (platform@xkwisit.local)",
      },
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!res.ok) {
      cache.set(key, null);
      return NextResponse.json({ place: null }, { status: 200 });
    }

    const data = (await res.json()) as NominatimHit[];
    const hit = data[0];
    if (!hit) {
      cache.set(key, null);
      return NextResponse.json({ place: null });
    }

    const place = {
      lat: Number(hit.lat),
      lng: Number(hit.lon),
      label: hit.display_name || [city, country].filter(Boolean).join(", "),
    };
    cache.set(key, place);
    return NextResponse.json({ place });
  } catch {
    cache.set(key, null);
    return NextResponse.json({ place: null });
  }
}
