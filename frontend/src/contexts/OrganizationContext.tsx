"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";

import type { Organization, OrganizationSettings } from "@/types/organization";
import type { ID } from "@/types/common";

type OrganizationContextValue = {
  organization: Organization | null;
  organizationId: ID | null;
  settings: OrganizationSettings | null;
  isLoading: boolean;
  setOrganization: (org: Organization | null) => void;
  updateSettings: (patch: Partial<OrganizationSettings>) => void;
};

const OrganizationContext = createContext<OrganizationContextValue | null>(null);

/**
 * Organization (tenant) provider.
 * Every record the user sees belongs to exactly one organization.
 * This context caches the active organization and its settings.
 */
export function OrganizationContextProvider({
  children,
  initialOrganization = null,
}: {
  children: ReactNode;
  initialOrganization?: Organization | null;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? null;
  const sessionOrgId = session?.user?.organizationId ?? null;

  const [organization, setOrganization] = useState<Organization | null>(
    initialOrganization,
  );

  // Re-bind when SSR org prop changes.
  useEffect(() => {
    setOrganization(initialOrganization);
  }, [initialOrganization]);

  // Drop tenant state when the authenticated user (or their org) changes.
  useEffect(() => {
    setOrganization((prev) => {
      if (!userId) return null;
      if (prev && sessionOrgId && prev.id !== sessionOrgId) return null;
      return prev;
    });
  }, [userId, sessionOrgId]);

  const updateSettings = useCallback((patch: Partial<OrganizationSettings>) => {
    setOrganization((prev) =>
      prev ? { ...prev, settings: { ...prev.settings, ...patch } } : prev,
    );
  }, []);

  const value = useMemo<OrganizationContextValue>(
    () => ({
      organization,
      organizationId: organization?.id ?? sessionOrgId ?? null,
      settings: organization?.settings ?? null,
      isLoading: false,
      setOrganization,
      updateSettings,
    }),
    [organization, sessionOrgId, updateSettings],
  );

  return (
    <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>
  );
}

export function useOrganization(): OrganizationContextValue {
  const context = useContext(OrganizationContext);

  if (!context) {
    throw new Error("useOrganization must be used within an OrganizationContextProvider");
  }

  return context;
}
