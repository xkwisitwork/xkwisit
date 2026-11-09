import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { Membership } from "../../models/Membership.js";
import { Organization } from "../../models/Organization.js";
import { User } from "../../models/User.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { unauthorized } from "../../utils/errors.js";
import { sendSuccess } from "../../utils/response.js";

/**
 * Live workspace overview for the agency command dashboard.
 * Every count is derived from the authenticated org — never fabricated.
 */
async function buildOverview(orgId: string) {
  const [memberships, org] = await Promise.all([
    Membership.find({ orgId }).sort({ createdAt: 1 }).lean(),
    Organization.findById(orgId).lean(),
  ]);

  const userIds = memberships.map((m) => m.userId);
  const users = await User.find({ _id: { $in: userIds } })
    .select("name email")
    .lean();
  const userById = new Map(users.map((u) => [String(u._id), u]));

  const memberCount = memberships.length;
  const seats = org?.seatsIncluded ?? 0;
  const teamUtilization =
    seats > 0 ? Math.min(100, Math.round((memberCount / seats) * 100)) : 0;

  const members = memberships.map((m) => {
    const u = userById.get(String(m.userId));
    return {
      id: String(m.userId),
      name: u?.name ?? "Member",
      email: u?.email ?? null,
      role: m.role,
    };
  });

  // Domains not yet persisted stay at zero until those modules write records.
  const activeProjects = 0;
  const pipelineValue = 0;
  const revenueMtd = 0;
  const openLeads = 0;
  const openTasks = 0;
  const attention: Array<{
    id: string;
    title: string;
    severity: "HIGH" | "MEDIUM" | "LOW";
    href: string | null;
  }> = [];
  const recentActivity: Array<{
    id: string;
    actorName: string;
    summary: string;
    createdAt: string;
  }> = [];

  const highAttention = attention.filter((a) => a.severity === "HIGH").length;
  const mediumAttention = attention.filter((a) => a.severity === "MEDIUM").length;

  return {
    stats: [
      {
        id: "projects",
        label: "Active projects",
        value: String(activeProjects),
        delta: null,
      },
      {
        id: "members",
        label: "Workspace members",
        value: String(memberCount),
        delta: null,
      },
      {
        id: "seats",
        label: "Seats included",
        value: String(seats),
        delta: null,
      },
      {
        id: "pipeline",
        label: "Pipeline",
        value: String(pipelineValue),
        delta: null,
      },
      {
        id: "tasks",
        label: "Open tasks",
        value: String(openTasks),
        delta: null,
      },
      {
        id: "leads",
        label: "Open leads",
        value: String(openLeads),
        delta: null,
      },
    ],
    attention,
    recentActivity,
    pipelineValue,
    revenueMtd,
    currency: "NGN" as const,
    activeProjects,
    openLeads,
    openTasks,
    teamUtilization,
    memberCount,
    seatsIncluded: seats,
    highAttention,
    mediumAttention,
    members,
    organization: org
      ? { id: String(org._id), name: org.name, slug: org.slug }
      : null,
  };
}

const router = Router();

router.get(
  "/overview",
  authMiddleware,
  asyncHandler(async (req, res) => {
    if (!req.user) throw unauthorized();
    const orgId = req.orgId ?? req.user.orgId;
    if (!orgId) throw unauthorized("Organization required");

    if (!req.user.isPlatformAdmin) {
      const membership = await Membership.findOne({
        userId: req.user.id,
        orgId,
      });
      if (!membership) throw unauthorized("Not a member of this organization");
    } else {
      const exists = await Organization.exists({ _id: orgId });
      if (!exists) throw unauthorized("Organization not found");
    }

    const user = await User.findById(req.user.id).select("_id");
    if (!user) throw unauthorized();

    return sendSuccess(res, await buildOverview(orgId));
  }),
);

router.get(
  "/command-center",
  authMiddleware,
  asyncHandler(async (req, res) => {
    // Same payload as /overview — retained for compatibility with older clients.
    if (!req.user) throw unauthorized();
    const orgId = req.orgId ?? req.user.orgId;
    if (!orgId) throw unauthorized("Organization required");

    if (!req.user.isPlatformAdmin) {
      const membership = await Membership.findOne({
        userId: req.user.id,
        orgId,
      });
      if (!membership) throw unauthorized("Not a member of this organization");
    } else {
      const exists = await Organization.exists({ _id: orgId });
      if (!exists) throw unauthorized("Organization not found");
    }

    return sendSuccess(res, await buildOverview(orgId));
  }),
);

export default router;
