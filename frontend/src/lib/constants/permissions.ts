import { ROLES, type Role } from "./roles";

/**
 * Permission identifiers.
 * Format: `<resource>:<action>`
 * Wildcards: `*` for all, `<resource>:*` for all actions on a resource.
 */

export const PERMISSIONS = {
  // Organization & users
  ORG_VIEW: "org:view",
  ORG_MANAGE: "org:manage",
  USER_VIEW: "user:view",
  USER_INVITE: "user:invite",
  USER_MANAGE: "user:manage",
  ROLE_MANAGE: "role:manage",

  // Clients
  CLIENT_VIEW: "client:view",
  CLIENT_CREATE: "client:create",
  CLIENT_EDIT: "client:edit",
  CLIENT_ARCHIVE: "client:archive",

  // Leads
  LEAD_VIEW: "lead:view",
  LEAD_CREATE: "lead:create",
  LEAD_EDIT: "lead:edit",
  LEAD_DELETE: "lead:delete",
  LEAD_EXPORT: "lead:export",

  // Opportunities & deals
  DEAL_VIEW: "deal:view",
  DEAL_MANAGE: "deal:manage",

  // Projects & tasks
  PROJECT_VIEW: "project:view",
  PROJECT_CREATE: "project:create",
  PROJECT_EDIT: "project:edit",
  TASK_VIEW: "task:view",
  TASK_ASSIGN: "task:assign",
  TASK_MANAGE: "task:manage",

  // Approvals
  APPROVAL_VIEW: "approval:view",
  APPROVAL_APPROVE: "approval:approve",
  APPROVAL_REQUEST: "approval:request",

  // Proposals, contracts, invoices, payments
  PROPOSAL_VIEW: "proposal:view",
  PROPOSAL_CREATE: "proposal:create",
  PROPOSAL_SEND: "proposal:send",
  CONTRACT_VIEW: "contract:view",
  CONTRACT_MANAGE: "contract:manage",
  INVOICE_VIEW: "invoice:view",
  INVOICE_CREATE: "invoice:create",
  INVOICE_SEND: "invoice:send",
  PAYMENT_VIEW: "payment:view",
  PAYMENT_RECORD: "payment:record",

  // Campaigns, content, brand, SEO
  CAMPAIGN_VIEW: "campaign:view",
  CAMPAIGN_MANAGE: "campaign:manage",
  CONTENT_VIEW: "content:view",
  CONTENT_MANAGE: "content:manage",
  BRAND_VIEW: "brand:view",
  BRAND_MANAGE: "brand:manage",
  SEO_VIEW: "seo:view",
  SEO_MANAGE: "seo:manage",

  // Analytics & intelligence
  ANALYTICS_VIEW: "analytics:view",
  INTELLIGENCE_VIEW: "intelligence:view",
  INTELLIGENCE_MANAGE: "intelligence:manage",

  // Automation & AI
  AUTOMATION_VIEW: "automation:view",
  AUTOMATION_MANAGE: "automation:manage",
  AI_USE: "ai:use",

  // Reports
  REPORT_VIEW: "report:view",
  REPORT_CREATE: "report:create",
  REPORT_DISPATCH: "report:dispatch",

  // Finance & profitability
  FINANCE_VIEW: "finance:view",
  FINANCE_MANAGE: "finance:manage",
  PROFITABILITY_VIEW: "profitability:view",

  // Team & capacity
  TEAM_VIEW: "team:view",
  TEAM_MANAGE: "team:manage",

  // Knowledge
  KNOWLEDGE_VIEW: "knowledge:view",
  KNOWLEDGE_MANAGE: "knowledge:manage",

  // Audit & settings
  AUDIT_VIEW: "audit:view",
  SETTINGS_VIEW: "settings:view",
  SETTINGS_MANAGE: "settings:manage",
  INTEGRATION_VIEW: "integration:view",
  INTEGRATION_MANAGE: "integration:manage",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const ALL = Object.values(PERMISSIONS) as Permission[];

/**
 * Role → permission matrix.
 * Extend this map to grant new capabilities by role.
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [ROLES.SUPER_ADMIN]: ALL,

  [ROLES.AGENCY_MANAGER]: ALL.filter((p) => {
    const denied: Permission[] = [PERMISSIONS.ORG_MANAGE, PERMISSIONS.ROLE_MANAGE];

    return !denied.includes(p);
  }),

  [ROLES.STRATEGIST]: [
    PERMISSIONS.CLIENT_VIEW,
    PERMISSIONS.LEAD_VIEW,
    PERMISSIONS.PROJECT_VIEW,
    PERMISSIONS.PROJECT_EDIT,
    PERMISSIONS.TASK_VIEW,
    PERMISSIONS.TASK_MANAGE,
    PERMISSIONS.APPROVAL_VIEW,
    PERMISSIONS.APPROVAL_REQUEST,
    PERMISSIONS.CAMPAIGN_VIEW,
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.BRAND_VIEW,
    PERMISSIONS.SEO_VIEW,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.INTELLIGENCE_VIEW,
    PERMISSIONS.AI_USE,
    PERMISSIONS.REPORT_VIEW,
    PERMISSIONS.REPORT_CREATE,
    PERMISSIONS.KNOWLEDGE_VIEW,
    PERMISSIONS.KNOWLEDGE_MANAGE,
  ],

  [ROLES.MARKETING_SPECIALIST]: [
    PERMISSIONS.CLIENT_VIEW,
    PERMISSIONS.LEAD_VIEW,
    PERMISSIONS.LEAD_CREATE,
    PERMISSIONS.LEAD_EDIT,
    PERMISSIONS.PROJECT_VIEW,
    PERMISSIONS.TASK_VIEW,
    PERMISSIONS.TASK_MANAGE,
    PERMISSIONS.APPROVAL_VIEW,
    PERMISSIONS.APPROVAL_REQUEST,
    PERMISSIONS.CAMPAIGN_VIEW,
    PERMISSIONS.CAMPAIGN_MANAGE,
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.CONTENT_MANAGE,
    PERMISSIONS.SEO_VIEW,
    PERMISSIONS.SEO_MANAGE,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.AI_USE,
    PERMISSIONS.REPORT_VIEW,
    PERMISSIONS.KNOWLEDGE_VIEW,
  ],

  [ROLES.DESIGNER]: [
    PERMISSIONS.CLIENT_VIEW,
    PERMISSIONS.PROJECT_VIEW,
    PERMISSIONS.TASK_VIEW,
    PERMISSIONS.TASK_MANAGE,
    PERMISSIONS.APPROVAL_VIEW,
    PERMISSIONS.APPROVAL_REQUEST,
    PERMISSIONS.BRAND_VIEW,
    PERMISSIONS.BRAND_MANAGE,
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.AI_USE,
    PERMISSIONS.KNOWLEDGE_VIEW,
  ],

  [ROLES.DEVELOPER]: [
    PERMISSIONS.CLIENT_VIEW,
    PERMISSIONS.PROJECT_VIEW,
    PERMISSIONS.TASK_VIEW,
    PERMISSIONS.TASK_MANAGE,
    PERMISSIONS.APPROVAL_VIEW,
    PERMISSIONS.APPROVAL_REQUEST,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.INTEGRATION_VIEW,
    PERMISSIONS.AI_USE,
    PERMISSIONS.KNOWLEDGE_VIEW,
  ],

  [ROLES.SALES]: [
    PERMISSIONS.CLIENT_VIEW,
    PERMISSIONS.LEAD_VIEW,
    PERMISSIONS.LEAD_CREATE,
    PERMISSIONS.LEAD_EDIT,
    PERMISSIONS.LEAD_EXPORT,
    PERMISSIONS.DEAL_VIEW,
    PERMISSIONS.DEAL_MANAGE,
    PERMISSIONS.PROPOSAL_VIEW,
    PERMISSIONS.PROPOSAL_CREATE,
    PERMISSIONS.PROPOSAL_SEND,
    PERMISSIONS.CONTRACT_VIEW,
    PERMISSIONS.INVOICE_VIEW,
    PERMISSIONS.PAYMENT_VIEW,
    PERMISSIONS.AI_USE,
    PERMISSIONS.REPORT_VIEW,
    PERMISSIONS.KNOWLEDGE_VIEW,
  ],

  [ROLES.CLIENT_ADMIN]: [
    PERMISSIONS.CLIENT_VIEW,
    PERMISSIONS.PROJECT_VIEW,
    PERMISSIONS.APPROVAL_VIEW,
    PERMISSIONS.APPROVAL_APPROVE,
    PERMISSIONS.PROPOSAL_VIEW,
    PERMISSIONS.CONTRACT_VIEW,
    PERMISSIONS.INVOICE_VIEW,
    PERMISSIONS.PAYMENT_VIEW,
    PERMISSIONS.REPORT_VIEW,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_INVITE,
  ],

  [ROLES.CLIENT_VIEWER]: [
    PERMISSIONS.CLIENT_VIEW,
    PERMISSIONS.PROJECT_VIEW,
    PERMISSIONS.APPROVAL_VIEW,
    PERMISSIONS.REPORT_VIEW,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
};

export function roleHasPermission(role: Role | string, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role as Role];

  if (!permissions) return false;

  return permissions.includes(permission);
}

export function rolesHavePermission(
  roles: (Role | string)[],
  permission: Permission,
): boolean {
  return roles.some((role) => roleHasPermission(role, permission));
}
