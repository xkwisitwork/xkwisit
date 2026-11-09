"use client";

import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, waitMs = 300): T {
  const [throttled, setThrottled] = useState(value);
  const last = useRef(0);

  useEffect(() => {
    const now = Date.now();
    const remaining = waitMs - (now - last.current);
    if (remaining <= 0) {
      last.current = now;
      setThrottled(value);
      return;
    }
    const id = setTimeout(() => {
      last.current = Date.now();
      setThrottled(value);
    }, remaining);
    return () => clearTimeout(id);
  }, [value, waitMs]);

  return throttled;
}
