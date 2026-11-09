"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Persists state to localStorage.
 * SSR-safe: hydrates on mount and syncs across tabs.
 *
 * @example
 *   const [theme, setTheme] = useLocalStorage("theme", "light");
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [stored, setStored] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(key);

      if (raw !== null) {
        setStored(JSON.parse(raw) as T);
      }
    } catch (error) {
      console.warn(`useLocalStorage: failed to read "${key}"`, error);
    } finally {
      setHydrated(true);
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next = value instanceof Function ? value(prev) : value;

        try {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(next));
          }
        } catch (error) {
          console.warn(`useLocalStorage: failed to write "${key}"`, error);
        }

        return next;
      });
    },
    [key],
  );

  const remove = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`useLocalStorage: failed to remove "${key}"`, error);
    }

    setStored(initialValue);
  }, [key, initialValue]);

  // Sync across tabs
  useEffect(() => {
    if (typeof window === "undefined") return;

    function onStorage(event: StorageEvent) {
      if (event.key !== key || event.storageArea !== window.localStorage) return;

      try {
        setStored(event.newValue ? (JSON.parse(event.newValue) as T) : initialValue);
      } catch {
        // Ignore malformed payloads
      }
    }

    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, [key, initialValue]);

  // Avoid flashing the initial value before hydration in components that
  // render conditionally based on stored state.
  return [hydrated ? stored : initialValue, setValue, remove];
}
