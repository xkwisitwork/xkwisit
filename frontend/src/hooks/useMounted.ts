"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` after the component has mounted on the client.
 * Useful for avoiding hydration mismatches when rendering values that
 * differ between server and client (dates, random values, localStorage).
 *
 * @example
 *   const mounted = useMounted();
 *   if (!mounted) return <Skeleton />;
 *   return <ClientOnlyContent />;
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
