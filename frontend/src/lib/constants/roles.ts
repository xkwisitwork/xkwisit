/**
 * System roles.
 * Every user in the platform has exactly one role.
 * Permissions are derived from the role (see `permissions.ts`).
 */

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  AGENCY_MANAGER: "AGENCY_MANAGER",
  STRATEGIST: "STRATEGIST",
  MARKETING_SPECIALIST: "MARKETING_SPECIALIST",
  DESIGNER: "DESIGNER",
  DEVELOPER: "DEVELOPER",
  SALES: "SALES",
  CLIENT_ADMIN: "CLIENT_ADMIN",
  CLIENT_VIEWER: "CLIENT_VIEWER",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const STAFF_ROLES: Role[] = [
  ROLES.SUPER_ADMIN,
  ROLES.AGENCY_MANAGER,
  ROLES.STRATEGIST,
  ROLES.MARKETING_SPECIALIST,
  ROLES.DESIGNER,
  ROLES.DEVELOPER,
  ROLES.SALES,
];

export const CLIENT_ROLES: Role[] = [ROLES.CLIENT_ADMIN, ROLES.CLIENT_VIEWER];

export const ROLE_LABELS: Record<Role, string> = {
  [ROLES.SUPER_ADMIN]: "Super Admin",
  [ROLES.AGENCY_MANAGER]: "Agency Manager",
  [ROLES.STRATEGIST]: "Strategist",
  [ROLES.MARKETING_SPECIALIST]: "Marketing Specialist",
  [ROLES.DESIGNER]: "Designer",
  [ROLES.DEVELOPER]: "Developer",
  [ROLES.SALES]: "Sales",
  [ROLES.CLIENT_ADMIN]: "Client Admin",
  [ROLES.CLIENT_VIEWER]: "Client Viewer",
};

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  [ROLES.SUPER_ADMIN]:
    "Full platform access. Manages organizations, users, and global settings.",
  [ROLES.AGENCY_MANAGER]:
    "Manages client accounts, teams, projects, and approves strategies.",
  [ROLES.STRATEGIST]:
    "Runs audits, competitor analysis, positioning, and growth roadmaps.",
  [ROLES.MARKETING_SPECIALIST]:
    "Runs campaigns, content, SEO, PPC, email, and analytics.",
  [ROLES.DESIGNER]: "Works on branding projects, assets, approvals, and revisions.",
  [ROLES.DEVELOPER]:
    "Builds websites, landing pages, integrations, and analytics setups.",
  [ROLES.SALES]: "Manages leads, prospects, opportunities, proposals, and deals.",
  [ROLES.CLIENT_ADMIN]: "Manages the client's account, users, and approves deliverables.",
  [ROLES.CLIENT_VIEWER]: "Read-only access to the client portal.",
};

export function isStaffRole(role: Role | string): boolean {
  return STAFF_ROLES.includes(role as Role);
}

export function isClientRole(role: Role | string): boolean {
  return CLIENT_ROLES.includes(role as Role);
}

export function isAdminRole(role: Role | string): boolean {
  return (
    role === ROLES.SUPER_ADMIN ||
    role === ROLES.AGENCY_MANAGER ||
    role === ROLES.CLIENT_ADMIN
  );
}
