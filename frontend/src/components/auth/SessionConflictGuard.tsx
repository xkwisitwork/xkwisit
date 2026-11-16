"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

import { endpoints } from "@/lib/api/endpoints";
import { forceLogoutForSessionConflict } from "@/lib/auth/sessionConflict";

const PING_MS = 45_000;

/**
 * Periodically verifies the backend still accepts this device’s session.
 * If another login took over, force a logout redirect.
 */
export function SessionConflictGuard() {
  const { status, data } = useSession();
  const inFlight = useRef(false);

  useEffect(() => {
    if (data?.error === "SessionReplaced") {
      forceLogoutForSessionConflict();
      return;
    }

    if (status !== "authenticated") return;

    async function ping() {
      if (inFlight.current) return;
      inFlight.current = true;
      try {
        const headers: Record<string, string> = {
          Accept: "application/json",
        };
        const token = data?.accessToken;
        if (token) headers.Authorization = `Bearer ${token}`;

        const base =
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
        const res = await fetch(`${base}${endpoints.auth.me}`, {
          method: "GET",
          credentials: "include",
          headers,
        });

        if (!res.ok) {
          let code = "";
          try {
            const body = (await res.json()) as {
              error?: { code?: string };
            };
            code = body.error?.code ?? "";
          } catch {
            // ignore
          }
          if (code === "SESSION_SUPERSEDED" || res.status === 401) {
            // Only kick on explicit session takeover; avoid logout storms on
            // transient 401s during token refresh by requiring the code when possible.
            if (code === "SESSION_SUPERSEDED") {
              forceLogoutForSessionConflict();
            }
          }
        }
      } catch {
        // Network blips — ignore
      } finally {
        inFlight.current = false;
      }
    }

    void ping();
    const id = window.setInterval(() => void ping(), PING_MS);
    const onFocus = () => void ping();
    window.addEventListener("focus", onFocus);

    return () => {
      window.clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, [status, data?.accessToken, data?.error]);

  return null;
}
