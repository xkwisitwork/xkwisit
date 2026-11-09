"use client";

import { useEffect, useRef } from "react";

/**
 * Declarative `setInterval`.
 * Pass `null` as the delay to pause the interval.
 * The callback always sees the latest closure - no need to memoize it.
 *
 * @example
 * useInterval(() => refetch(), isPolling ? 5000 : null);
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}
