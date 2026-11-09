"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";

import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import {
  hasFeature,
  type BillingSnapshot,
  type FeatureKey,
} from "@/lib/constants/entitlements";

type MeOrganization = {
  id: string;
  name: string;
  slug: string;
};

type MePayload = {
  user: { isPlatformAdmin?: boolean; role?: string };
  billing: BillingSnapshot;
  organization?: MeOrganization | null;
};

type BillingContextValue = {
  billing: BillingSnapshot | null;
  organization: MeOrganization | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
  canAccess: (feature: FeatureKey | "always" | "platform") => boolean;
  isPlatformAdmin: boolean;
};

const BillingContext = createContext<BillingContextValue | null>(null);

/** Safe defaults while billing is unknown — never elevate to platform. */
const LOADING_FEATURES = new Set<FeatureKey | "always" | "platform">([
  "always",
  "dashboard",
  "settings",
]);

function authHeaders(accessToken?: string | null): Record<string, string> {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

export function BillingContextProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const userId = session?.user?.id ?? null;
  const sessionIsPlatformAdmin = Boolean(session?.user?.isPlatformAdmin);

  const [billing, setBilling] = useState<BillingSnapshot | null>(null);
  const [organization, setOrganization] = useState<MeOrganization | null>(null);
  // Seed from the *current* session claim only — never carry a previous user's elevation.
  const [isPlatformAdmin, setIsPlatformAdmin] = useState(sessionIsPlatformAdmin);
  const [isLoading, setIsLoading] = useState(true);
  const boundUserIdRef = useRef<string | null>(userId);

  // Drop tenant/platform state the moment the principal changes.
  useEffect(() => {
    if (boundUserIdRef.current === userId) return;
    boundUserIdRef.current = userId;
    setBilling(null);
    setOrganization(null);
    setIsPlatformAdmin(sessionIsPlatformAdmin);
    setIsLoading(status === "authenticated");
  }, [userId, sessionIsPlatformAdmin, status]);

  const refresh = useCallback(async () => {
    if (status !== "authenticated" || !userId) {
      setBilling(null);
      setOrganization(null);
      setIsPlatformAdmin(false);
      setIsLoading(false);
      return;
    }

    // Wait for the bearer token — calling /me without it causes a false deny flash.
    if (!accessToken) {
      setIsPlatformAdmin(sessionIsPlatformAdmin);
      setIsLoading(true);
      return;
    }

    setIsLoading(true);
    // Provisional flag from the new JWT only — never keep the previous user's value.
    setIsPlatformAdmin(sessionIsPlatformAdmin);
    try {
      const data = await apiClient<MePayload>(endpoints.auth.me, {
        method: "GET",
        headers: authHeaders(accessToken),
      });
      // Ignore late responses from a previous principal.
      if (boundUserIdRef.current !== userId) return;
      setBilling(data.billing ?? null);
      setOrganization(data.organization ?? null);
      setIsPlatformAdmin(Boolean(data.user?.isPlatformAdmin));
    } catch {
      if (boundUserIdRef.current !== userId) return;
      setBilling(null);
      setOrganization(null);
      // Keep the JWT claim on transient /me failures so Super Admin UI does not flicker.
      setIsPlatformAdmin(sessionIsPlatformAdmin);
    } finally {
      if (boundUserIdRef.current === userId) {
        setIsLoading(false);
      }
    }
  }, [status, accessToken, userId, sessionIsPlatformAdmin]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const canAccess = useCallback(
    (feature: FeatureKey | "always" | "platform") => {
      if (feature === "always") return true;

      // Platform is hard-gated — never open while loading or on missing billing.
      if (feature === "platform") return isPlatformAdmin;

      if (isPlatformAdmin) {
        return hasFeature([], feature, true);
      }

      if (isLoading || !billing) {
        return LOADING_FEATURES.has(feature);
      }

      return hasFeature(billing.entitlements, feature, false);
    },
    [billing, isLoading, isPlatformAdmin],
  );

  const value = useMemo(
    () => ({
      billing,
      organization,
      isLoading,
      refresh,
      canAccess,
      isPlatformAdmin,
    }),
    [billing, organization, isLoading, refresh, canAccess, isPlatformAdmin],
  );

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
}

export function useBilling(): BillingContextValue {
  const ctx = useContext(BillingContext);
  if (!ctx) {
    throw new Error("useBilling must be used within BillingContextProvider");
  }
  return ctx;
}
