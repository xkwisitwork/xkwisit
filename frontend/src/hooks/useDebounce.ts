"use client";

import { useEffect, useState } from "react";

/**
 * Debounces a value.
 * Returns the latest value only after `delay` milliseconds have elapsed
 * since the last change.
 *
 * @example
 *   const [search, setSearch] = useState("");
 *   const debouncedSearch = useDebounce(search, 400);
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

/**
 * Returns a debounced function wrapper.
 * Each call cancels the previous timer.
 *
 * @example
 *   const save = useDebouncedCallback((value) => api.save(value), 500);
 */
export function useDebouncedCallback<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delay = 300,
): (...args: TArgs) => void {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer) clearTimeout(timer);
    },
    [timer],
  );

  return (...args: TArgs) => {
    if (timer) clearTimeout(timer);

    const id = setTimeout(() => callback(...args), delay);

    setTimer(id);
  };
}
