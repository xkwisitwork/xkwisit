"use client";

import { useIntersectionObserver } from "./useIntersectionObserver";

/**
 * Convenience wrapper around `useIntersectionObserver` that returns only
 * the boolean and a ref - for the common case of "is this on screen yet?".
 *
 * @example
 * const [ref, isOnScreen] = useOnScreen<HTMLElement>();
 */
export function useOnScreen<T extends Element>(
  options: {
    rootMargin?: string;
    threshold?: number | number[];
    once?: boolean;
  } = {},
): [React.RefObject<T>, boolean] {
  const { rootMargin = "0px", threshold = 0, once = false } = options;

  const { ref, isIntersecting } = useIntersectionObserver<T>({
    rootMargin,
    threshold,
    freezeOnceVisible: once,
  });

  return [ref, isIntersecting];
}
