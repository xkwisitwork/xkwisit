"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useBilling } from "@/contexts/BillingContext";
import { AgencyCommandCenter, useDashboard } from "@/features/dashboard";
import { ROLES } from "@/lib/constants/roles";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { isPlatformAdmin, isLoading: billingLoading } = useBilling();

  const sessionReady = status === "authenticated";
  // Session claim / SUPER_ADMIN role wins for gating fetches — never let a
  // failed /me "fail closed" flip a Super Admin onto agency overview (401 spam).
  const sessionAdmin =
    Boolean(session?.user?.isPlatformAdmin) ||
    session?.user?.role === ROLES.SUPER_ADMIN;
  const isAdmin = sessionAdmin || (!billingLoading && isPlatformAdmin);

  // Never hit agency overview while redirecting Super Admins.
  const { data, isLoading, isError, refetch, isFetching } = useDashboard(
    sessionReady && !isAdmin,
  );

  useEffect(() => {
    if (sessionReady && isAdmin) {
      router.replace("/platform");
    }
  }, [sessionReady, isAdmin, router]);

  if (status === "loading") {
    return <p className="text-300 text-neutral-600">Loading workspace…</p>;
  }

  if (isAdmin) {
    return <p className="text-300 text-neutral-600">Opening platform control…</p>;
  }

  return (
    <AgencyCommandCenter
      overview={data}
      loading={isLoading && !data}
      error={isError}
      onRetry={() => {
        void refetch();
      }}
      retrying={isFetching && isError}
    />
  );
}
