"use client";

import { useEffect, useRef } from "react";

/**
 * Returns the previous value of a variable across renders.
 *
 * @example
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
