import mongoose from "mongoose";

import { Membership } from "../../models/Membership.js";
import {
  Organization,
  TRIAL_DAYS,
  type OrganizationDocument,
  type OrgPlan,
  type OrgStatus,
} from "../../models/Organization.js";
import { User } from "../../models/User.js";
import { Assessment } from "../../models/Assessment.js";
import { Booking } from "../../models/Booking.js";
import { SheetDownload } from "../../models/SheetDownload.js";
import { toBillingSnapshot } from "../../config/entitlements.js";
import type { WorkspaceListItem } from "../../types/organization.types.js";
import { badRequest, forbidden, notFound } from "../../utils/errors.js";
import { buildUserRoles } from "../auth/auth.types.js";

function serializeWorkspace(
  org: OrganizationDocument,
  extras?: { ownerIsPlatformAdmin?: boolean },
): Omit<WorkspaceListItem, "ownerEmail" | "ownerName" | "memberCount"> {

  const ownerIsPlatformAdmin = Boolean(extras?.ownerIsPlatformAdmin);
  const billing = toBillingSnapshot({
    plan: org.plan as OrgPlan,
    status: org.status as OrgStatus,
    trialStartsAt: org.trialStartsAt,
    trialEndsAt: org.trialEndsAt,
    seatsIncluded: org.seatsIncluded ?? 5,
  });

  return {
    id: String(org._id),
    name: org.name,
    slug: org.slug,
    ownerId: String(org.ownerId),
    plan: org.plan,
    status: org.status,
    trialStartsAt: org.trialStartsAt?.toISOString?.() ?? null,
    trialEndsAt: org.trialEndsAt?.toISOString?.() ?? null,
    seatsIncluded: org.seatsIncluded ?? 5,
    billing,
    /** Owner is a Super Admin — not a billed agency tenant. */
    ownerIsPlatformAdmin,
    createdAt: (org as { createdAt?: Date }).createdAt?.toISOString?.() ?? null,
    updatedAt: (org as { updatedAt?: Date }).updatedAt?.toISOString?.() ?? null,
  };
}

async function assertCanMutateWorkspace(
  org: OrganizationDocument,
  actorId: string,
  action: "plan" | "status" | "trial" | "seats",
) {
  const ownerId = String(org.ownerId);
  const isOwn = ownerId === actorId;
  const owner = await User.findById(org.ownerId).select("isPlatformAdmin").lean();
  const ownerIsPlatformAdmin = Boolean(owner?.isPlatformAdmin);

  if (isOwn && ownerIsPlatformAdmin) {
    throw forbidden(
      action === "status"
        ? "You cannot suspend or change status on your own Super Admin workspace"
        : action === "trial"
          ? "Super Admin workspaces do not use trials"
          : action === "plan"
            ? "Super Admin workspaces do not have a billing plan"
            : "You cannot change seats on your own Super Admin workspace",
    );
  }

  if (ownerIsPlatformAdmin && (action === "plan" || action === "trial")) {
    throw forbidden("Super Admin workspaces do not use plans or trials");
  }

  if (ownerIsPlatformAdmin && action === "status") {
    throw forbidden("You cannot suspend a Super Admin workspace");
  }
}

export async function listWorkspaces(query?: { search?: string }) {
  const filter: Record<string, unknown> = {};
  if (query?.search?.trim()) {
    const q = query.search.trim();
    filter.$or = [
      { name: { $regex: q, $options: "i" } },
      { slug: { $regex: q, $options: "i" } },
    ];
  }

  const orgs = await Organization.find(filter).sort({ createdAt: -1 }).limit(200);
  const ownerIds = orgs.map((o) => o.ownerId);
  const owners = await User.find({ _id: { $in: ownerIds } }).lean();
  const ownerById = new Map(owners.map((u) => [String(u._id), u]));

  const memberCounts = await Membership.aggregate<{
    _id: unknown;
    count: number;
  }>([{ $group: { _id: "$orgId", count: { $sum: 1 } } }]);
  const countByOrg = new Map(
    memberCounts.map((m) => [String(m._id), m.count]),
  );

  return orgs.map((org) => {
    const owner = ownerById.get(String(org.ownerId));
    return {
      ...serializeWorkspace(org, {
        ownerIsPlatformAdmin: Boolean(owner?.isPlatformAdmin),
      }),
      ownerEmail: owner?.email ?? null,
      ownerName: owner?.name ?? null,
      memberCount: countByOrg.get(String(org._id)) ?? 0,
    };
  });
}

export async function getWorkspace(id: string) {
  const org = await Organization.findById(id);
  if (!org) throw notFound("Workspace not found");

  const owner = await User.findById(org.ownerId).lean();
  const memberCount = await Membership.countDocuments({ orgId: org._id });

  return {
    ...serializeWorkspace(org, {
      ownerIsPlatformAdmin: Boolean(owner?.isPlatformAdmin),
    }),
    ownerEmail: owner?.email ?? null,
    ownerName: owner?.name ?? null,
    memberCount,
  };
}

export async function updateWorkspace(
  id: string,
  input: {
    plan?: OrgPlan;
    status?: OrgStatus;
    seatsIncluded?: number;
    trialEndsAt?: string | null;
  },
  actorId: string,
) {
  const org = await Organization.findById(id);
  if (!org) throw notFound("Workspace not found");

  if (input.plan) {
    await assertCanMutateWorkspace(org, actorId, "plan");
    org.plan = input.plan;
  }
  if (input.status) {
    await assertCanMutateWorkspace(org, actorId, "status");
    org.status = input.status;
  }
  if (typeof input.seatsIncluded === "number") {
    await assertCanMutateWorkspace(org, actorId, "seats");
    org.seatsIncluded = input.seatsIncluded;
  }
  if (input.trialEndsAt === null) {
    await assertCanMutateWorkspace(org, actorId, "trial");
    org.trialEndsAt = null;
  } else if (typeof input.trialEndsAt === "string") {
    await assertCanMutateWorkspace(org, actorId, "trial");
    org.trialEndsAt = new Date(input.trialEndsAt);
  }

  await org.save();
  return getWorkspace(id);
}

export async function extendTrial(
  id: string,
  days = TRIAL_DAYS,
  actorId: string,
) {
  if (days < 1) throw badRequest("days must be >= 1");

  const org = await Organization.findById(id);
  if (!org) throw notFound("Workspace not found");

  await assertCanMutateWorkspace(org, actorId, "trial");

  const base =
    org.trialEndsAt && org.trialEndsAt.getTime() > Date.now()
      ? org.trialEndsAt
      : new Date();

  org.trialEndsAt = new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
  org.status = "TRIAL";
  if (!org.trialStartsAt) org.trialStartsAt = new Date();
  await org.save();

  return getWorkspace(id);
}

export async function getPlatformStats() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    workspaces,
    trials,
    active,
    suspended,
    users,
    platformAdmins,
    assessments,
    bookings,
    sheetDownloads,
    newWorkspaces7d,
    newUsers7d,
  ] = await Promise.all([
    Organization.countDocuments(),
    Organization.countDocuments({ status: "TRIAL" }),
    Organization.countDocuments({ status: "ACTIVE" }),
    Organization.countDocuments({ status: "SUSPENDED" }),
    User.countDocuments(),
    User.countDocuments({ isPlatformAdmin: true }),
    Assessment.countDocuments().catch(() => 0),
    Booking.countDocuments().catch(() => 0),
    SheetDownload.countDocuments().catch(() => 0),
    Organization.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
  ]);

  return {
    workspaces,
    trials,
    active,
    suspended,
    users,
    platformAdmins,
    assessments,
    bookings,
    sheetDownloads,
    newWorkspaces7d,
    newUsers7d,
  };
}

export async function listUsers(query?: { search?: string }) {
  const filter: Record<string, unknown> = {};
  if (query?.search?.trim()) {
    const q = query.search.trim();
    filter.$or = [
      { email: { $regex: q, $options: "i" } },
      { name: { $regex: q, $options: "i" } },
    ];
  }

  const users = await User.find(filter).sort({ createdAt: -1 }).limit(200).lean();
  const userIds = users.map((u) => u._id);
  const memberships = await Membership.find({ userId: { $in: userIds } }).lean();
  const orgIds = [...new Set(memberships.map((m) => String(m.orgId)))];
  const orgs = await Organization.find({ _id: { $in: orgIds } }).lean();
  const orgById = new Map(orgs.map((o) => [String(o._id), o]));

  const membershipsByUser = new Map<string, typeof memberships>();
  for (const m of memberships) {
    const key = String(m.userId);
    const list = membershipsByUser.get(key) ?? [];
    list.push(m);
    membershipsByUser.set(key, list);
  }

  return users.map((u) => {
    const mems = membershipsByUser.get(String(u._id)) ?? [];
    return {
      id: String(u._id),
      email: u.email,
      name: u.name,
      isPlatformAdmin: Boolean(u.isPlatformAdmin),
      emailVerifiedAt:
        (u as { emailVerifiedAt?: Date | null }).emailVerifiedAt?.toISOString?.() ??
        null,
      createdAt:
        (u as { createdAt?: Date }).createdAt?.toISOString?.() ?? null,
      memberships: mems.map((m) => {
        const org = orgById.get(String(m.orgId));
        return {
          orgId: String(m.orgId),
          orgName: org?.name ?? "Unknown",
          orgSlug: org?.slug ?? null,
          role: m.role,
        };
      }),
    };
  });
}

export async function setUserPlatformAdmin(
  userId: string,
  isPlatformAdmin: boolean,
  actorId: string,
) {
  if (userId === actorId && !isPlatformAdmin) {
    throw forbidden("You cannot demote yourself from Super Admin");
  }

  const user = await User.findById(userId);
  if (!user) throw notFound("User not found");

  user.isPlatformAdmin = isPlatformAdmin;
  const membershipRole = user.membershipRole ?? "OWNER";
  user.roles = buildUserRoles(membershipRole, isPlatformAdmin);
  await user.save();

  return {
    id: String(user._id),
    email: user.email,
    name: user.name,
    isPlatformAdmin: Boolean(user.isPlatformAdmin),
  };
}

export async function getSystemHealth() {
  const state = mongoose.connection.readyState;
  const stateLabel =
    state === 1
      ? "connected"
      : state === 2
        ? "connecting"
        : state === 3
          ? "disconnecting"
          : "disconnected";

  const [workspaces, users, assessments, bookings, sheetDownloads] =
    await Promise.all([
      Organization.countDocuments(),
      User.countDocuments(),
      Assessment.countDocuments().catch(() => 0),
      Booking.countDocuments().catch(() => 0),
      SheetDownload.countDocuments().catch(() => 0),
    ]);

  return {
    status: state === 1 ? "healthy" : "degraded",
    mongodb: {
      state: stateLabel,
      readyState: state,
      name: mongoose.connection.name ?? null,
    },
    counts: { workspaces, users, assessments, bookings, sheetDownloads },
    uptimeSeconds: Math.floor(process.uptime()),
    nodeEnv: process.env.NODE_ENV ?? "development",
    timestamp: new Date().toISOString(),
  };
}

export async function getAuditTrail(limit = 40) {
  const take = Math.min(Math.max(limit, 1), 100);

  const [recentOrgs, recentUsers, recentBookings, recentAssessments] =
    await Promise.all([
      Organization.find()
        .sort({ updatedAt: -1 })
        .limit(take)
        .lean(),
      User.find().sort({ createdAt: -1 }).limit(take).lean(),
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(Math.ceil(take / 2))
        .lean()
        .catch(() => []),
      Assessment.find()
        .sort({ updatedAt: -1 })
        .limit(Math.ceil(take / 2))
        .lean()
        .catch(() => []),
    ]);

  type Event = {
    id: string;
    type: string;
    title: string;
    detail: string;
    at: string;
  };

  const events: Event[] = [];

  for (const org of recentOrgs) {
    const created =
      (org as { createdAt?: Date }).createdAt?.getTime?.() ?? 0;
    const updated =
      (org as { updatedAt?: Date }).updatedAt?.getTime?.() ?? created;
    const isNew = Math.abs(updated - created) < 60_000;
    events.push({
      id: `org-${String(org._id)}-${updated}`,
      type: isNew ? "workspace.created" : "workspace.updated",
      title: isNew ? "Workspace created" : "Workspace updated",
      detail: `${org.name} · ${org.plan} · ${org.status}`,
      at: new Date(updated || Date.now()).toISOString(),
    });
  }

  for (const user of recentUsers) {
    const at =
      (user as { createdAt?: Date }).createdAt?.toISOString?.() ??
      new Date().toISOString();
    events.push({
      id: `user-${String(user._id)}`,
      type: user.isPlatformAdmin ? "user.platform_admin" : "user.created",
      title: user.isPlatformAdmin ? "Platform admin account" : "User registered",
      detail: `${user.name} · ${user.email}`,
      at,
    });
  }

  for (const booking of recentBookings as Array<{
    _id: unknown;
    name?: string;
    email?: string;
    createdAt?: Date;
  }>) {
    events.push({
      id: `booking-${String(booking._id)}`,
      type: "booking.created",
      title: "Strategy call booked",
      detail: `${booking.name ?? "Guest"} · ${booking.email ?? ""}`.trim(),
      at: booking.createdAt?.toISOString?.() ?? new Date().toISOString(),
    });
  }

  for (const assessment of recentAssessments as Array<{
    _id: unknown;
    status?: string;
    updatedAt?: Date;
    createdAt?: Date;
  }>) {
    const at =
      assessment.updatedAt?.toISOString?.() ??
      assessment.createdAt?.toISOString?.() ??
      new Date().toISOString();
    events.push({
      id: `assessment-${String(assessment._id)}`,
      type: "assessment.updated",
      title: "Assessment activity",
      detail: `Status: ${assessment.status ?? "unknown"}`,
      at,
    });
  }

  return events
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, take);
}
