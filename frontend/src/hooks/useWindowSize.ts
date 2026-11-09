"use client";

import { useEffect, useState } from "react";

export type WindowSize = {
  width: number;
  height: number;
};

/**
 * Tracks the current window size.
 * SSR-safe: returns `{ width: 0, height: 0 }` until mounted.
 */
export function useWindowSize(debounceMs = 100): WindowSize {
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const update = () => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }, debounceMs);
    };

    update();
    window.addEventListener("resize", update);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("resize", update);
    };
  }, [debounceMs]);

  return size;
}
