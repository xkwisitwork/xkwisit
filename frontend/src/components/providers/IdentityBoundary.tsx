"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

/**
 * Clears React Query when the authenticated principal changes so User B
 * never renders User A's cached dashboard/org data.
 */
export function IdentityBoundary({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const userId = session?.user?.id ?? null;
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (status === "loading") return;

    const prev = prevUserIdRef.current;
    if (prev === undefined) {
      prevUserIdRef.current = userId;
      return;
    }

    if (prev !== userId) {
      queryClient.clear();
      prevUserIdRef.current = userId;
    }
  }, [userId, status, queryClient]);

  return <>{children}</>;
}
