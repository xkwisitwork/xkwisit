"use client";

import { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type MapPlace = {
  key: string;
  city: string;
  country: string;
  region?: string;
  label?: string;
  count: number;
  latitude: number;
  longitude: number;
  source?: string;
};

function FitPlaces({ places, focusKey }: { places: MapPlace[]; focusKey: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (!places.length) {
      map.setView([20, 0], 2);
      return;
    }

    const focused = focusKey ? places.find((p) => p.key === focusKey) : null;
    if (focused) {
      map.flyTo([focused.latitude, focused.longitude], Math.max(map.getZoom(), 6), {
        duration: 0.55,
      });
      return;
    }

    const only = places[0];
    if (places.length === 1 && only) {
      map.setView([only.latitude, only.longitude], 6);
      return;
    }

    const lats = places.map((p) => p.latitude);
    const lngs = places.map((p) => p.longitude);
    map.fitBounds(
      [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)],
      ],
      { padding: [36, 36], maxZoom: 7 },
    );
  }, [map, places, focusKey]);

  return null;
}

export function VisitorPlacesMap({
  places,
  selectedKey,
  onSelect,
  mode = "map",
}: {
  places: MapPlace[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
  mode?: "map" | "satellite";
}) {
  const tileUrl =
    mode === "satellite"
      ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const attribution =
    mode === "satellite"
      ? "Tiles &copy; Esri"
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  return (
    <div className="absolute inset-0 z-0">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="h-full w-full"
        scrollWheelZoom
        zoomControl={false}
      >
        <TileLayer attribution={attribution} url={tileUrl} />
        <FitPlaces places={places} focusKey={selectedKey} />
        {places.map((place) => {
          const active = place.key === selectedKey;
          return (
            <CircleMarker
              key={place.key}
              center={[place.latitude, place.longitude]}
              radius={active ? 12 : 8 + Math.min(place.count, 6)}
              pathOptions={{
                color: "#fff",
                weight: 2,
                fillColor: active ? "#FC3FE3" : "#16024A",
                fillOpacity: 0.95,
              }}
              eventHandlers={{
                click: () => onSelect(place.key),
              }}
            >
              <Popup>
                <div className="min-w-[9rem]">
                  <p className="font-semibold text-[#111827]">
                    {place.label || `${place.city}, ${place.country}`}
                  </p>
                  {place.region ? (
                    <p className="text-[0.75rem] text-[#6B7280]">{place.region}</p>
                  ) : null}
                  <p className="mt-1 text-[0.72rem] text-[#3B05C4]">
                    {place.count} visit{place.count === 1 ? "" : "s"}
                    {place.source ? ` · ${place.source}` : ""}
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
