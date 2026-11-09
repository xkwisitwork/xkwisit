"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type UseIntersectionObserverOptions = {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
  enabled?: boolean;
};

type UseIntersectionObserverReturn<T extends Element> = {
  ref: RefObject<T>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
};

/**
 * Observes when an element enters or leaves the viewport.
 * Useful for lazy loading, animations on scroll, and infinite scroll triggers.
 *
 * @example
 *   const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>();
 *   return <div ref={ref}>{isIntersecting && <HeavyComponent />}</div>;
 */
export function useIntersectionObserver<T extends Element>({
  threshold = 0,
  root = null,
  rootMargin = "0px",
  freezeOnceVisible = false,
  enabled = true,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn<T> {
  const ref = useRef<T>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!enabled || !element || typeof IntersectionObserver === "undefined") {
      return;
    }

    if (freezeOnceVisible && isIntersecting) return;

    const observer = new IntersectionObserver(
      ([nextEntry]) => {
        if (!nextEntry) return;

        setEntry(nextEntry);
        setIsIntersecting(nextEntry.isIntersecting);
      },
      { threshold, root, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, root, rootMargin, enabled, freezeOnceVisible, isIntersecting]);

  return { ref, isIntersecting, entry };
}
