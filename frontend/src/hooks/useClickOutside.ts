"use client";

import { useEffect, type RefObject } from "react";

/**
 * Fires a handler when a click occurs outside one or more refs.
 * Useful for dropdowns, popovers, and off-canvas menus.
 *
 * @example
 *   const ref = useRef(null);
 *   useClickOutside(ref, () => setOpen(false));
 */
export function useClickOutside<T extends HTMLElement>(
  refs: RefObject<T> | RefObject<T>[],
  handler: (event: MouseEvent | TouchEvent) => void,
  options: { enabled?: boolean } = {},
): void {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const refList = Array.isArray(refs) ? refs : [refs];

    function listener(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;

      if (!target) return;

      const isInside = refList.some((ref) => {
        const element = ref.current;

        return element && element.contains(target);
      });

      if (!isInside) {
        handler(event);
      }
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler, enabled]);
}
