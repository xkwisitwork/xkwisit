import { toBillingSnapshot } from "../../config/entitlements.js";
import { Membership } from "../../models/Membership.js";
import {
  Organization,
  type OrgPlan,
  type OrgStatus,
} from "../../models/Organization.js";
import { User } from "../../models/User.js";
import type {
  OrganizationMember,
  OrganizationPublic,
} from "../../types/organization.types.js";
import { notFound } from "../../utils/errors.js";

export async function getCurrentOrganization(
  orgId: string,
): Promise<OrganizationPublic> {
  const org = await Organization.findById(orgId);
  if (!org) throw notFound("Organization not found");

  const billing = toBillingSnapshot({
    plan: org.plan as OrgPlan,
    status: org.status as OrgStatus,
    trialStartsAt: org.trialStartsAt,
    trialEndsAt: org.trialEndsAt,
    seatsIncluded: org.seatsIncluded,
  });

  return {
    id: String(org._id),
    name: org.name,
    slug: org.slug,
    ownerId: String(org.ownerId),
    plan: org.plan as OrgPlan,
    status: org.status as OrgStatus,
    trialStartsAt: org.trialStartsAt?.toISOString?.() ?? null,
    trialEndsAt: org.trialEndsAt?.toISOString?.() ?? null,
    seatsIncluded: org.seatsIncluded,
    billing,
    createdAt: (org as { createdAt?: Date }).createdAt?.toISOString?.() ?? null,
    updatedAt: (org as { updatedAt?: Date }).updatedAt?.toISOString?.() ?? null,
  };
}

export async function listCurrentMembers(
  orgId: string,
): Promise<OrganizationMember[]> {
  const memberships = await Membership.find({ orgId }).lean();
  const userIds = memberships.map((m) => m.userId);
  const users = await User.find({ _id: { $in: userIds } }).lean();
  const byId = new Map(users.map((u) => [String(u._id), u]));

  return memberships.map((m) => {
    const u = byId.get(String(m.userId));
    return {
      id: String(m._id),
      role: m.role,
      userId: String(m.userId),
      email: u?.email ?? null,
      name: u?.name ?? null,
      joinedAt:
        (m as { createdAt?: Date }).createdAt?.toISOString?.() ?? null,
    };
  });
}
