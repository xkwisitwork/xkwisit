"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { endpoints } from "@/lib/api/endpoints";

import type { BotChallenge, BotShieldFields } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

async function fetchChallenge(): Promise<BotChallenge> {
  const res = await fetch(`${API_URL}${endpoints.bot.challenge}`, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Could not start security check. Refresh and try again.");
  }
  const json = (await res.json()) as {
    data?: BotChallenge;
  } & BotChallenge;
  const data = json.data ?? json;
  if (!data?.challengeId || !data.signature || !data.issuedAt) {
    throw new Error("Could not start security check. Refresh and try again.");
  }
  return {
    challengeId: data.challengeId,
    issuedAt: data.issuedAt,
    signature: data.signature,
    minWaitMs: data.minWaitMs ?? 3000,
    expiresInMs: data.expiresInMs ?? 600_000,
  };
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/**
 * Loads a one-time signed challenge and enforces a minimum human wait
 * before the caller can submit a protected form.
 */
export function useBotShield(enabled = true) {
  const [challenge, setChallenge] = useState<BotChallenge | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const honeypotRef = useRef("");
  const inFlight = useRef<Promise<BotChallenge> | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled) return null;
    setLoading(true);
    setError(null);
    try {
      if (!inFlight.current) {
        inFlight.current = fetchChallenge().finally(() => {
          inFlight.current = null;
        });
      }
      const next = await inFlight.current;
      setChallenge(next);
      return next;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not start security check. Refresh and try again.";
      setError(message);
      setChallenge(null);
      throw err instanceof Error ? err : new Error(message);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    void refresh().catch(() => {});
  }, [enabled, refresh]);

  const ensureReady = useCallback(async (): Promise<BotShieldFields> => {
    if (!enabled) {
      return { _hp: "", _bc: "dev", _bts: Date.now(), _bsig: "dev" };
    }

    let current = challenge;
    if (!current) {
      current = await refresh();
    }
    if (!current) {
      throw new Error("Security check unavailable. Refresh and try again.");
    }

    const elapsed = Date.now() - current.issuedAt;
    if (elapsed < current.minWaitMs) {
      await sleep(current.minWaitMs - elapsed + 50);
    }

    // Expired — mint a fresh challenge and wait again.
    if (Date.now() - current.issuedAt > current.expiresInMs - 5_000) {
      current = await refresh();
      if (!current) {
        throw new Error("Security check expired. Refresh and try again.");
      }
      await sleep(current.minWaitMs + 50);
    }

    return {
      _hp: honeypotRef.current,
      _bc: current.challengeId,
      _bts: current.issuedAt,
      _bsig: current.signature,
    };
  }, [challenge, enabled, refresh]);

  return {
    loading,
    error,
    refresh,
    ensureReady,
    honeypotRef,
    /** Render-ready payload once a challenge exists (may still need wait). */
    fields: challenge
      ? ({
          _hp: "",
          _bc: challenge.challengeId,
          _bts: challenge.issuedAt,
          _bsig: challenge.signature,
        } satisfies BotShieldFields)
      : null,
  };
}
