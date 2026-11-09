"use client";

import { useQuery } from "@tanstack/react-query";

export function useOrganization(enabled = true) {
  return useQuery({
    queryKey: ["organization"],
    queryFn: async () => null as null | { id: string; name: string },
    enabled,
    staleTime: 60_000,
  });
}
