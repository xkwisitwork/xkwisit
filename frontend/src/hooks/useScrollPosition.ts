"use client";

import { useEffect, useState } from "react";

export type ScrollPosition = {
  x: number;
  y: number;
  direction: "up" | "down" | "idle";
};

/**
 * Tracks the current scroll position and direction.
 * Uses `requestAnimationFrame` to avoid layout thrash on scroll.
 */
export function useScrollPosition(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: "idle",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const direction: ScrollPosition["direction"] =
        y > lastY ? "down" : y < lastY ? "up" : "idle";

      setPosition({ x: window.scrollX, y, direction });
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return position;
}
