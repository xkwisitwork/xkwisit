"use client";

import { useEffect, useState } from "react";
import { CircleMarker, MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type VoicePlace = {
  latitude: number;
  longitude: number;
  label: string;
  city?: string;
  country?: string;
};

function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13, { animate: false });
  }, [map, lat, lng]);
  return null;
}

/**
 * Soft map backdrop for the voice modal — pins where the visitor is asking from.
 */
export function VoicePlaceMap({ place }: { place: VoicePlace | null }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready || !place) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#E7DEFF_0%,_#F7F4FF_55%,_#FFFFFF_100%)]"
      />
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <MapContainer
        center={[place.latitude, place.longitude]}
        zoom={13}
        className="h-full w-full [&_.leaflet-control-attribution]:!text-[8px] [&_.leaflet-control-attribution]:!bg-white/70"
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        keyboard={false}
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Recenter lat={place.latitude} lng={place.longitude} />
        <CircleMarker
          center={[place.latitude, place.longitude]}
          radius={10}
          pathOptions={{
            color: "#3B05C4",
            fillColor: "#3B05C4",
            fillOpacity: 0.85,
            weight: 2,
          }}
        />
      </MapContainer>
      {/* Brand wash so controls stay readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/88 via-white/72 to-white/92" />
    </div>
  );
}
