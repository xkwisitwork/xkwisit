"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseTimeoutReturn = {
  isActive: boolean;
  start: (ms?: number) => void;
  cancel: () => void;
  restart: (ms?: number) => void;
};

/**
 * Declarative `setTimeout` with manual control.
 *
 * @example
 *   const { start, cancel, isActive } = useTimeout(() => toast("Done"), 3000);
 */
export function useTimeout(callback: () => void, delay: number = 0): UseTimeoutReturn {
  const savedCallback = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsActive(false);
  }, []);

  const start = useCallback(
    (ms?: number) => {
      cancel();

      timeoutRef.current = setTimeout(() => {
        savedCallback.current();
        timeoutRef.current = null;
        setIsActive(false);
      }, ms ?? delay);

      setIsActive(true);
    },
    [cancel, delay],
  );

  const restart = useCallback(
    (ms?: number) => {
      cancel();
      start(ms);
    },
    [cancel, start],
  );

  useEffect(() => () => cancel(), [cancel]);

  return { isActive, start, cancel, restart };
}
