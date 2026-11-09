export type VisitorPlace = {
  ip: string | null;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  postal: string;
  latitude: number | null;
  longitude: number | null;
  timezone: string;
  isp: string;
  org: string;
  source: "cdn" | "ip" | "gps" | "unknown";
  label: string;
};

type ClientGeoPayload = {
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  timezone?: string;
  locale?: string;
};

function headerValue(request: Request, name: string): string {
  const raw = request.headers.get(name);
  if (!raw) return "";
  try {
    return decodeURIComponent(raw).trim();
  } catch {
    return raw.trim();
  }
}

function isPrivateIp(ip: string) {
  if (!ip) return true;
  if (ip === "::1" || ip === "127.0.0.1") return true;
  if (ip.startsWith("10.") || ip.startsWith("192.168.") || ip.startsWith("127.")) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)) return true;
  if (ip.startsWith("fc") || ip.startsWith("fd") || ip.startsWith("fe80:")) return true;
  return false;
}

export function clientIpFromRequest(request: Request): string | null {
  const candidates = [
    headerValue(request, "cf-connecting-ip"),
    headerValue(request, "x-real-ip"),
    headerValue(request, "x-vercel-forwarded-for"),
    headerValue(request, "x-forwarded-for").split(",")[0]?.trim() ?? "",
  ].filter(Boolean);
  return candidates[0] || null;
}

function parseCoord(raw: string): number | null {
  if (!raw.trim()) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function fromCdnHeaders(request: Request): Partial<VisitorPlace> | null {
  const country =
    headerValue(request, "x-vercel-ip-country") ||
    headerValue(request, "cf-ipcountry");
  const city =
    headerValue(request, "x-vercel-ip-city") ||
    headerValue(request, "cf-ipcity");
  const region =
    headerValue(request, "x-vercel-ip-country-region") ||
    headerValue(request, "cf-region");
  const latitude = parseCoord(
    headerValue(request, "x-vercel-ip-latitude") ||
      headerValue(request, "cf-iplatitude"),
  );
  const longitude = parseCoord(
    headerValue(request, "x-vercel-ip-longitude") ||
      headerValue(request, "cf-iplongitude"),
  );
  const postal =
    headerValue(request, "x-vercel-ip-postal-code") ||
    headerValue(request, "cf-postal-code");

  // Empty/missing CDN headers must not invent 0,0 coords.
  if (!country && !city && latitude == null) return null;

  return {
    country: country || "",
    countryCode: country || "",
    region: region || "",
    city: city || "",
    postal: postal || "",
    latitude,
    longitude,
    timezone: "",
    isp: "",
    org: "",
    source: "cdn",
  };
}

async function lookupIpWhoIs(ip: string | null): Promise<Partial<VisitorPlace> | null> {
  const url = ip && !isPrivateIp(ip) ? `https://ipwho.is/${encodeURIComponent(ip)}` : "https://ipwho.is/";
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      success?: boolean;
      ip?: string;
      country?: string;
      country_code?: string;
      region?: string;
      city?: string;
      postal?: string;
      latitude?: number;
      longitude?: number;
      timezone?: { id?: string } | string;
      connection?: { isp?: string; org?: string };
    };
    if (data.success === false) return null;
    const timezone =
      typeof data.timezone === "string"
        ? data.timezone
        : data.timezone?.id || "";
    return {
      ip: data.ip || ip,
      country: data.country || "Unknown",
      countryCode: data.country_code || "",
      region: data.region || "",
      city: data.city || "Unknown",
      postal: data.postal || "",
      latitude: typeof data.latitude === "number" ? data.latitude : null,
      longitude: typeof data.longitude === "number" ? data.longitude : null,
      timezone,
      isp: data.connection?.isp || "",
      org: data.connection?.org || "",
      source: "ip",
    };
  } catch {
    return null;
  }
}

async function reverseGeocode(lat: number, lng: number): Promise<Partial<VisitorPlace> | null> {
  try {
    const params = new URLSearchParams({
      format: "json",
      lat: String(lat),
      lon: String(lng),
      zoom: "18",
      addressdetails: "1",
    });
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "XkwisitVisitorPlaces/1.0 (platform@xkwisit.local)",
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      display_name?: string;
      address?: Record<string, string>;
    };
    const a = data.address || {};
    return {
      country: a.country || "Unknown",
      countryCode: a.country_code?.toUpperCase?.() || "",
      region: a.state || a.region || a.county || "",
      city: a.city || a.town || a.village || a.suburb || a.municipality || "Unknown",
      postal: a.postcode || "",
      latitude: lat,
      longitude: lng,
      label: data.display_name || "",
      source: "gps",
    };
  } catch {
    return null;
  }
}

function buildLabel(place: Partial<VisitorPlace>): string {
  if (place.label) return place.label;
  return [place.city, place.region, place.country, place.postal]
    .filter((part) => part && part !== "Unknown")
    .join(", ");
}

export async function resolveVisitorPlace(
  request: Request,
  client?: ClientGeoPayload,
): Promise<VisitorPlace> {
  const ip = clientIpFromRequest(request);
  const cdn = fromCdnHeaders(request);
  const ipLookup = await lookupIpWhoIs(ip);

  let gps: Partial<VisitorPlace> | null = null;
  if (
    typeof client?.latitude === "number" &&
    typeof client?.longitude === "number" &&
    Number.isFinite(client.latitude) &&
    Number.isFinite(client.longitude)
  ) {
    gps = await reverseGeocode(client.latitude, client.longitude);
    if (!gps) {
      gps = {
        latitude: client.latitude,
        longitude: client.longitude,
        source: "gps",
      };
    }
  }

  const pick = (...vals: Array<string | undefined | null>) =>
    vals.find((v) => typeof v === "string" && v.trim() && v !== "Unknown") || "";

  // Prefer GPS for exact pin, then filled CDN fields, then IP lookup.
  const merged: VisitorPlace = {
    ip: gps?.ip || ipLookup?.ip || ip,
    country: pick(gps?.country, cdn?.country, ipLookup?.country) || "Unknown",
    countryCode: pick(gps?.countryCode, cdn?.countryCode, ipLookup?.countryCode),
    region: pick(gps?.region, cdn?.region, ipLookup?.region),
    city: pick(gps?.city, cdn?.city, ipLookup?.city) || "Unknown",
    postal: pick(gps?.postal, cdn?.postal, ipLookup?.postal),
    latitude: gps?.latitude ?? cdn?.latitude ?? ipLookup?.latitude ?? null,
    longitude: gps?.longitude ?? cdn?.longitude ?? ipLookup?.longitude ?? null,
    timezone: pick(client?.timezone, gps?.timezone, cdn?.timezone, ipLookup?.timezone),
    isp: ipLookup?.isp || "",
    org: ipLookup?.org || "",
    source: gps?.source
      ? "gps"
      : cdn?.city || cdn?.country
        ? "cdn"
        : ipLookup?.source || "unknown",
    label: "",
  };

  merged.label = buildLabel(merged);
  return merged;
}
