"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  getPlatformAudit,
  getPlatformStats,
  type PlatformAuditEvent,
  type PlatformStats,
} from "@/features/platform/api/platform.api";
import { PlatformCommandCenter } from "@/features/platform/components/PlatformCommandCenter";
import { PlatformGate } from "@/features/platform/components/PlatformShell";

export default function PlatformHomePage() {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [events, setEvents] = useState<PlatformAuditEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated" || !accessToken) return;

    let cancelled = false;
    setLoading(true);
    void (async () => {
      try {
        const [s, a] = await Promise.all([
          getPlatformStats(accessToken),
          getPlatformAudit(8, accessToken),
        ]);
        if (cancelled) return;
        setStats(s);
        setEvents(a);
        setError(null);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load platform");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status, accessToken]);

  const adminName =
    session?.user?.fullName?.trim() ||
    session?.user?.name?.trim() ||
    [session?.user?.firstName, session?.user?.lastName].filter(Boolean).join(" ").trim() ||
    session?.user?.email ||
    "Super Admin";
  const adminImage = session?.user?.image ?? null;

  return (
    <PlatformGate>
      <PlatformCommandCenter
        adminName={adminName}
        adminImage={adminImage}
        stats={stats}
        events={events}
        loading={loading || status === "loading"}
        error={error}
      />
    </PlatformGate>
  );
}
