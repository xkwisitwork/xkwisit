"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type GeoFix = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

function readGeo(): Promise<GeoFix | null> {
  if (typeof window === "undefined" || !("geolocation" in navigator)) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    const timer = window.setTimeout(() => resolve(null), 2500);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        window.clearTimeout(timer);
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      },
      () => {
        window.clearTimeout(timer);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 2200,
        maximumAge: 60_000,
      },
    );
  });
}

export function VisitBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    const key = `xkwisit-visit:${pathname}`;
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");

    void (async () => {
      const geo = await readGeo();
      await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          locale: navigator.language,
          ...(geo
            ? {
                latitude: geo.latitude,
                longitude: geo.longitude,
                accuracy: geo.accuracy,
              }
            : {}),
        }),
      }).catch(() => undefined);
    })();
  }, [pathname]);

  return null;
}
