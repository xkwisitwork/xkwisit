"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const BROWSE_RETURN_KEY = "xkwisit:lastBrowsePath";

const AUTH_PATH_RE =
  /^\/(login|register|forgot-password|reset-password|verify-email|mfa|accept-invite)(\/|$)/;

/**
 * Remembers the last marketing/public path so auth screens can send
 * "Back to home" / "Go back" somewhere useful (not a protected app URL).
 */
export function BrowseReturnTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || AUTH_PATH_RE.test(pathname)) return;
    try {
      sessionStorage.setItem(BROWSE_RETURN_KEY, pathname);
    } catch {
      // private mode / blocked storage
    }
  }, [pathname]);

  return null;
}
