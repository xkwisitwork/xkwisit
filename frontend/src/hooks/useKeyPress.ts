"use client";

import { useEffect, useState } from "react";

/**
 * Returns true while the specified key is held down.
 *
 * @example
 *   const isShiftHeld = useKeyPress("Shift");
 */
export function useKeyPress(targetKey: string): boolean {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const normalized = targetKey.toLowerCase();

    const down = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === normalized) setPressed(true);
    };

    const up = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === normalized) setPressed(false);
    };

    const blur = () => setPressed(false);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, [targetKey]);

  return pressed;
}
