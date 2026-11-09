"use client";

import { useQuery } from "@tanstack/react-query";

export function useCurrentUser(enabled = true) {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => null as null | { id: string; email: string; name: string },
    enabled,
    staleTime: 60_000,
  });
}
