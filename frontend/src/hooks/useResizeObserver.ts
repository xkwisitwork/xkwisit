"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type Size = {
  width: number;
  height: number;
};

type UseResizeObserverReturn<T extends Element> = {
  ref: RefObject<T>;
  size: Size;
};

/**
 * Tracks the size of an element via `ResizeObserver`.
 *
 * @example
 *   const { ref, size } = useResizeObserver<HTMLDivElement>();
 *   return <div ref={ref}>{size.width}px</div>;
 */
export function useResizeObserver<T extends Element>(
  options: { debounceMs?: number } = {},
): UseResizeObserverReturn<T> {
  const { debounceMs = 0 } = options;
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof ResizeObserver === "undefined") return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) return;

      const { width, height } = entry.contentRect;

      const apply = () => setSize({ width, height });

      if (debounceMs > 0) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(apply, debounceMs);
      } else {
        apply();
      }
    });

    observer.observe(element);

    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [debounceMs]);

  return { ref, size };
}
