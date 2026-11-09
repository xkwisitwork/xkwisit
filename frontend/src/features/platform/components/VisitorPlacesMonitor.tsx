"use client";

import dynamic from "next/dynamic";
import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Globe2,
  Mail,
  MapPin,
  Minus,
  Phone,
  Search,
  Square,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";
import type { VisitRow } from "@/types/visits";

export type { VisitRow };

type PlaceAggregate = {
  key: string;
  city: string;
  country: string;
  region: string;
  postal: string;
  label: string;
  latitude: number | null;
  longitude: number | null;
  ip: string | null;
  isp: string;
  org: string;
  timezone: string;
  source: string;
  count: number;
  latest: string;
  paths: string[];
};

const DOT_COLORS = ["#F04438", "#3B05C4", "#F79009", "#12B76A", "#FC3FE3", "#1570EF"];

const VisitorPlacesMap = dynamic(
  () => import("./VisitorPlacesMap").then((mod) => mod.VisitorPlacesMap),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 grid place-items-center bg-[#E5E7EB] text-[0.8rem] font-medium text-[#6B7280]">
        Loading map…
      </div>
    ),
  },
);

function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-NG", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function placeKey(visit: VisitRow) {
  if (
    typeof visit.latitude === "number" &&
    typeof visit.longitude === "number" &&
    Number.isFinite(visit.latitude) &&
    Number.isFinite(visit.longitude)
  ) {
    return `${visit.latitude.toFixed(3)}|${visit.longitude.toFixed(3)}`;
  }
  return `${(visit.city || "unknown").toLowerCase()}|${(visit.country || "unknown").toLowerCase()}`;
}

function aggregatePlaces(visits: VisitRow[]): PlaceAggregate[] {
  const map = new Map<string, PlaceAggregate>();
  for (const visit of visits) {
    const key = placeKey(visit);
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
      if (visit.at > existing.latest) existing.latest = visit.at;
      if (!existing.paths.includes(visit.path)) existing.paths.push(visit.path);
      if (!existing.latitude && typeof visit.latitude === "number") {
        existing.latitude = visit.latitude;
        existing.longitude = visit.longitude ?? null;
      }
      if (!existing.label && visit.label) existing.label = visit.label;
      if (!existing.ip && visit.ip) existing.ip = visit.ip;
    } else {
      map.set(key, {
        key,
        city: visit.city || "Unknown",
        country: visit.country || "Unknown",
        region: visit.region || "",
        postal: visit.postal || "",
        label: visit.label || "",
        latitude: typeof visit.latitude === "number" ? visit.latitude : null,
        longitude: typeof visit.longitude === "number" ? visit.longitude : null,
        ip: visit.ip || null,
        isp: visit.isp || "",
        org: visit.org || "",
        timezone: visit.timezone || "",
        source: visit.source || "unknown",
        count: 1,
        latest: visit.at,
        paths: [visit.path],
      });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

function SideCard({
  title,
  icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-[0_8px_24px_-20px_rgba(15,23,42,0.35)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left"
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="text-[#4B5563]">{icon}</span>
          <span className="truncate text-[0.84rem] font-bold text-[#111827]">{title}</span>
        </span>
        {open ? (
          <Minus className="h-3.5 w-3.5 shrink-0 text-[#9CA3AF]" aria-hidden />
        ) : (
          <Square className="h-3 w-3 shrink-0 text-[#9CA3AF]" aria-hidden />
        )}
      </button>
      {open ? <div className="border-t border-[#F3F4F6] px-3.5 py-3">{children}</div> : null}
    </section>
  );
}

export function VisitorPlacesMonitor({ visits }: { visits: VisitRow[] }) {
  const places = useMemo(() => aggregatePlaces(visits), [visits]);
  const countries = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of places) map.set(p.country, (map.get(p.country) ?? 0) + p.count);
    return [...map.entries()]
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count);
  }, [places]);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(places[0]?.key ?? null);
  const [mapMode, setMapMode] = useState<"map" | "satellite">("map");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return places;
    return places.filter((p) =>
      [p.city, p.country, p.region, p.label, p.ip, p.isp]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [places, query]);

  const active = places.find((p) => p.key === selected) ?? filtered[0] ?? null;
  const mapPlaces = useMemo(
    () =>
      filtered
        .filter(
          (p) =>
            typeof p.latitude === "number" &&
            typeof p.longitude === "number" &&
            Number.isFinite(p.latitude) &&
            Number.isFinite(p.longitude),
        )
        .map((p) => ({
          key: p.key,
          city: p.city,
          country: p.country,
          region: p.region,
          label: p.label,
          count: p.count,
          latitude: p.latitude as number,
          longitude: p.longitude as number,
          source: p.source,
        })),
    [filtered],
  );

  return (
    <div className="min-w-0 overflow-hidden rounded-[1.25rem] border border-[#D1D5DB] bg-[#16024A] p-2 shadow-[0_24px_60px_-36px_rgba(22,2,74,0.65)] tablet:p-2.5">
      <div className="grid min-h-[32rem] min-w-0 gap-2.5 laptop:grid-cols-[minmax(0,1.7fr)_minmax(17rem,0.85fr)]">
        <div className="relative min-h-[22rem] overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#E5E7EB]">
          {mapPlaces.length > 0 ? (
            <VisitorPlacesMap
              places={mapPlaces}
              selectedKey={active?.key ?? null}
              onSelect={setSelected}
              mode={mapMode}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center px-6 text-center">
              <p className="rounded-full bg-white/95 px-3 py-1.5 text-[0.8rem] font-medium text-[#4B5563] shadow-sm">
                {visits.length === 0
                  ? "No visits recorded yet."
                  : "No geolocated places yet — open the marketing site to capture a fresh visit."}
              </p>
            </div>
          )}

          <div className="absolute left-3 top-3 z-[1000] flex items-center gap-2">
            <div className="flex overflow-hidden rounded-md border border-[#D1D5DB] bg-white text-[0.72rem] font-semibold shadow-sm">
              <button
                type="button"
                onClick={() => setMapMode("map")}
                className={cn(
                  "px-2.5 py-1.5 transition",
                  mapMode === "map" ? "bg-[#16024A] text-white" : "text-[#374151]",
                )}
              >
                Map
              </button>
              <button
                type="button"
                onClick={() => setMapMode("satellite")}
                className={cn(
                  "px-2.5 py-1.5 transition",
                  mapMode === "satellite" ? "bg-[#16024A] text-white" : "text-[#374151]",
                )}
              >
                Satellite
              </button>
            </div>
          </div>

          <form
            className="absolute right-3 top-3 z-[1000] flex w-[min(100%-1.5rem,20rem)] overflow-hidden rounded-md border border-[#D1D5DB] bg-white shadow-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2 px-2.5">
              <Search className="h-3.5 w-3.5 shrink-0 text-[#9CA3AF]" aria-hidden />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="City, country, IP, ISP"
                className="min-w-0 flex-1 bg-transparent py-2 text-[0.78rem] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#3B05C4] px-3 text-[0.75rem] font-bold text-white transition hover:bg-[#2C0494]"
            >
              Go
            </button>
          </form>

          <div className="absolute bottom-3 left-3 z-[1000] rounded-md bg-white/95 px-2.5 py-1.5 text-[0.68rem] font-medium text-[#4B5563] shadow-sm backdrop-blur-sm">
            IP + optional GPS · lat/lng stored for map pins
          </div>
        </div>

        <aside className="flex min-h-0 min-w-0 flex-col gap-2.5 overflow-y-auto rounded-xl bg-[#F3F4F6] p-2">
          <SideCard title="Visitor places" icon={<Globe2 className="h-4 w-4" />}>
            {filtered.length === 0 ? (
              <p className="text-[0.78rem] text-[#6B7280]">No places to show.</p>
            ) : (
              <ul className="max-h-48 space-y-2 overflow-y-auto pr-1">
                {filtered.map((place) => {
                  const isActive = active?.key === place.key;
                  return (
                    <li key={place.key}>
                      <button
                        type="button"
                        onClick={() => setSelected(place.key)}
                        className={cn(
                          "flex w-full items-start justify-between gap-2 rounded-lg px-2 py-1.5 text-left transition",
                          isActive ? "bg-[#EEF2FF]" : "hover:bg-white",
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-[0.84rem] font-bold text-[#111827]">
                            {place.city}
                          </span>
                          <span className="block truncate text-[0.72rem] text-[#6B7280]">
                            {[place.region, place.country].filter(Boolean).join(", ")}
                          </span>
                        </span>
                        <span className="shrink-0 text-[0.72rem] font-semibold tabular-nums text-[#3B05C4]">
                          {place.count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </SideCard>

          <SideCard title="Selected place" icon={<MapPin className="h-4 w-4" />}>
            {active ? (
              <div className="space-y-2">
                <div>
                  <p className="text-[0.95rem] font-bold text-[#111827]">{active.city}</p>
                  <p className="text-[0.78rem] text-[#6B7280]">
                    {[active.region, active.country, active.postal].filter(Boolean).join(" · ")}
                  </p>
                  {active.label ? (
                    <p className="mt-1 text-[0.7rem] leading-relaxed text-[#6B7280]">
                      {active.label}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-1 text-[0.72rem] text-[#4B5563]">
                  <p>
                    Coords:{" "}
                    {active.latitude != null && active.longitude != null
                      ? `${active.latitude.toFixed(5)}, ${active.longitude.toFixed(5)}`
                      : "—"}
                  </p>
                  <p>IP: {active.ip || "—"}</p>
                  <p>ISP: {active.isp || active.org || "—"}</p>
                  <p>Timezone: {active.timezone || "—"}</p>
                  <p>Source: {active.source}</p>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[0.72rem] text-[#4B5563]">
                  <span className="inline-flex items-center gap-1">
                    <Phone className="h-3 w-3" aria-hidden />
                    {active.count} visit{active.count === 1 ? "" : "s"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Mail className="h-3 w-3" aria-hidden />
                    {formatWhen(active.latest)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-[0.78rem] text-[#6B7280]">Select a marker to inspect a place.</p>
            )}
          </SideCard>

          <SideCard title="Countries" icon={<ChevronDown className="h-4 w-4" />}>
            {countries.length === 0 ? (
              <p className="text-[0.78rem] text-[#6B7280]">No country signals yet.</p>
            ) : (
              <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
                {countries.slice(0, 8).map((row, i) => (
                  <li key={row.country} className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: DOT_COLORS[i % DOT_COLORS.length] }}
                    />
                    <span className="min-w-0 truncate text-[0.75rem] font-medium text-[#111827]">
                      {row.country}
                    </span>
                    <span className="ml-auto shrink-0 text-[0.7rem] tabular-nums text-[#6B7280]">
                      {row.count}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </SideCard>

          <SideCard title="Recent visits" icon={<Square className="h-3.5 w-3.5" />} defaultOpen>
            {visits.length === 0 ? (
              <p className="text-[0.78rem] text-[#6B7280]">No visits recorded yet.</p>
            ) : (
              <ul className="max-h-44 space-y-2 overflow-y-auto">
                {visits.slice(0, 10).map((visit, i) => (
                  <li
                    key={`${visit.at}-${visit.path}-${i}`}
                    className="flex items-start justify-between gap-2 border-b border-[#F3F4F6] pb-2 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[0.8rem] font-bold text-[#111827]">
                        {visit.city}, {visit.country}
                      </p>
                      <p className="truncate text-[0.7rem] text-[#6B7280]">
                        {[visit.region, visit.ip, visit.path].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <span className="shrink-0 text-[0.65rem] text-[#9CA3AF]">
                      {formatWhen(visit.at)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </SideCard>

          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setQuery("");
              setSelected(places[0]?.key ?? null);
            }}
            className="mt-auto w-full rounded-lg bg-[#16024A] px-3 py-2.5 text-[0.8rem] font-bold text-white transition hover:bg-[#3B05C4]"
          >
            Reset map view
          </motion.button>
        </aside>
      </div>
    </div>
  );
}
