import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type {
  BillingSnapshot,
  OrganizationPlan,
  SubscriptionStatus,
} from "@/lib/constants/entitlements";

export type PlatformStats = {
  workspaces: number;
  trials: number;
  active: number;
  suspended: number;
  users: number;
  platformAdmins: number;
  assessments: number;
  bookings: number;
  sheetDownloads: number;
  newWorkspaces7d: number;
  newUsers7d: number;
};

export type PlatformWorkspace = {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  ownerEmail: string | null;
  ownerName: string | null;
  memberCount: number;
  plan: OrganizationPlan;
  status: SubscriptionStatus;
  trialEndsAt: string | null;
  seatsIncluded: number;
  billing: BillingSnapshot;
  /** Owner is a Super Admin — not a billed agency tenant. */
  ownerIsPlatformAdmin?: boolean;
  createdAt: string | null;
};

export type PlatformUser = {
  id: string;
  email: string;
  name: string;
  isPlatformAdmin: boolean;
  emailVerifiedAt: string | null;
  createdAt: string | null;
  memberships: Array<{
    orgId: string;
    orgName: string;
    orgSlug: string | null;
    role: string;
  }>;
};

export type PlatformHealth = {
  status: "healthy" | "degraded";
  mongodb: {
    state: string;
    readyState: number;
    name: string | null;
  };
  counts: {
    workspaces: number;
    users: number;
    assessments: number;
    bookings: number;
    sheetDownloads: number;
  };
  uptimeSeconds: number;
  nodeEnv: string;
  timestamp: string;
};

export type PlatformAuditEvent = {
  id: string;
  type: string;
  title: string;
  detail: string;
  at: string;
};

function withAuth(accessToken?: string | null): Record<string, string> | undefined {
  if (!accessToken) return undefined;
  return { Authorization: `Bearer ${accessToken}` };
}

export async function getPlatformStats(
  accessToken?: string | null,
): Promise<PlatformStats> {
  return apiClient<PlatformStats>(endpoints.platform.stats, {
    headers: withAuth(accessToken),
  });
}

export async function listPlatformWorkspaces(
  search?: string,
  accessToken?: string | null,
): Promise<PlatformWorkspace[]> {
  return apiClient<PlatformWorkspace[]>(endpoints.platform.workspaces, {
    query: search ? { search } : undefined,
    headers: withAuth(accessToken),
  });
}

export async function getPlatformWorkspace(
  id: string,
  accessToken?: string | null,
): Promise<PlatformWorkspace> {
  return apiClient<PlatformWorkspace>(endpoints.platform.workspace(id), {
    headers: withAuth(accessToken),
  });
}

export async function updatePlatformWorkspace(
  id: string,
  body: {
    plan?: OrganizationPlan;
    status?: SubscriptionStatus;
    seatsIncluded?: number;
    trialEndsAt?: string | null;
  },
  accessToken?: string | null,
): Promise<PlatformWorkspace> {
  return apiClient<PlatformWorkspace>(endpoints.platform.workspace(id), {
    method: "PATCH",
    body,
    headers: withAuth(accessToken),
  });
}

export async function extendWorkspaceTrial(
  id: string,
  days = 14,
  accessToken?: string | null,
): Promise<PlatformWorkspace> {
  return apiClient<PlatformWorkspace>(endpoints.platform.extendTrial(id), {
    method: "POST",
    body: { days },
    headers: withAuth(accessToken),
  });
}

export async function listPlatformUsers(
  search?: string,
  accessToken?: string | null,
): Promise<PlatformUser[]> {
  return apiClient<PlatformUser[]>(endpoints.platform.users, {
    query: search ? { search } : undefined,
    headers: withAuth(accessToken),
  });
}

export async function setPlatformAdminFlag(
  userId: string,
  isPlatformAdmin: boolean,
  accessToken?: string | null,
): Promise<Pick<PlatformUser, "id" | "email" | "name" | "isPlatformAdmin">> {
  return apiClient(endpoints.platform.setPlatformAdmin(userId), {
    method: "PATCH",
    body: { isPlatformAdmin },
    headers: withAuth(accessToken),
  });
}

export async function getPlatformHealth(
  accessToken?: string | null,
): Promise<PlatformHealth> {
  return apiClient<PlatformHealth>(endpoints.platform.health, {
    headers: withAuth(accessToken),
  });
}

export async function getPlatformAudit(
  limit = 40,
  accessToken?: string | null,
): Promise<PlatformAuditEvent[]> {
  return apiClient<PlatformAuditEvent[]>(endpoints.platform.audit, {
    query: { limit },
    headers: withAuth(accessToken),
  });
}
