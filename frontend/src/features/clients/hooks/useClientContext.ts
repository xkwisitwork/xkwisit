"use client";

import { useContext } from "react";

/**
 * useClientContext - reads the nearest feature context.
 * Wire to a real provider when the feature shell is ready.
 */
export function useClientContext() {
  // Placeholder until the feature Context is provided.
  return {
    id: null as string | null,
    name: null as string | null,
    ready: false,
  };
}

// silence unused until Context lands
void useContext;
