export type VisitRow = {
  country: string;
  countryCode?: string;
  region?: string;
  city: string;
  postal?: string;
  latitude?: number | null;
  longitude?: number | null;
  timezone?: string;
  isp?: string;
  org?: string;
  ip?: string | null;
  label?: string;
  source?: "cdn" | "ip" | "gps" | "unknown";
  accuracy?: number | null;
  locale?: string;
  path: string;
  at: string;
};

export function normalizeVisit(raw: Record<string, unknown>): VisitRow {
  return {
    country: typeof raw.country === "string" ? raw.country : "Unknown",
    countryCode: typeof raw.countryCode === "string" ? raw.countryCode : "",
    region: typeof raw.region === "string" ? raw.region : "",
    city: typeof raw.city === "string" ? raw.city : "Unknown",
    postal: typeof raw.postal === "string" ? raw.postal : "",
    latitude: typeof raw.latitude === "number" ? raw.latitude : null,
    longitude: typeof raw.longitude === "number" ? raw.longitude : null,
    timezone: typeof raw.timezone === "string" ? raw.timezone : "",
    isp: typeof raw.isp === "string" ? raw.isp : "",
    org: typeof raw.org === "string" ? raw.org : "",
    ip: typeof raw.ip === "string" ? raw.ip : null,
    label: typeof raw.label === "string" ? raw.label : "",
    source:
      raw.source === "cdn" ||
      raw.source === "ip" ||
      raw.source === "gps" ||
      raw.source === "unknown"
        ? raw.source
        : "unknown",
    accuracy: typeof raw.accuracy === "number" ? raw.accuracy : null,
    locale: typeof raw.locale === "string" ? raw.locale : "",
    path: typeof raw.path === "string" ? raw.path : "/",
    at: typeof raw.at === "string" ? raw.at : new Date().toISOString(),
  };
}
