/**
 * Status enums and display metadata for every record type
 * that moves through a lifecycle on the platform.
 */

/* ─── Lead lifecycle ──────────────────────────────────── */

export const LEAD_STATUSES = {
  NEW: "NEW",
  CONTACTED: "CONTACTED",
  QUALIFIED: "QUALIFIED",
  DISCOVERY: "DISCOVERY",
  PROPOSAL: "PROPOSAL",
  NEGOTIATION: "NEGOTIATION",
  WON: "WON",
  LOST: "LOST",
} as const;

export type LeadStatus = (typeof LEAD_STATUSES)[keyof typeof LEAD_STATUSES];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  DISCOVERY: "Discovery",
  PROPOSAL: "Proposal Sent",
  NEGOTIATION: "Negotiation",
  WON: "Won",
  LOST: "Lost",
};

/* ─── Project health ─────────────────────────────────── */

export const PROJECT_STATUSES = {
  ON_TRACK: "ON_TRACK",
  AT_RISK: "AT_RISK",
  BLOCKED: "BLOCKED",
  OVERDUE: "OVERDUE",
  PAUSED: "PAUSED",
  COMPLETED: "COMPLETED",
} as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[keyof typeof PROJECT_STATUSES];

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  ON_TRACK: "On Track",
  AT_RISK: "At Risk",
  BLOCKED: "Blocked",
  OVERDUE: "Overdue",
  PAUSED: "Paused",
  COMPLETED: "Completed",
};

/* ─── Task status ────────────────────────────────────── */

export const TASK_STATUSES = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  BLOCKED: "BLOCKED",
  DONE: "DONE",
} as const;

export type TaskStatus = (typeof TASK_STATUSES)[keyof typeof TASK_STATUSES];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review",
  BLOCKED: "Blocked",
  DONE: "Done",
};

/* ─── Approval status ────────────────────────────────── */

export const APPROVAL_STATUSES = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CHANGES_REQUESTED: "CHANGES_REQUESTED",
} as const;

export type ApprovalStatus = (typeof APPROVAL_STATUSES)[keyof typeof APPROVAL_STATUSES];

export const APPROVAL_STATUS_LABELS: Record<ApprovalStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  CHANGES_REQUESTED: "Changes Requested",
};

/* ─── Proposal & contract status ────────────────────── */

export const PROPOSAL_STATUSES = {
  DRAFT: "DRAFT",
  SENT: "SENT",
  VIEWED: "VIEWED",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  EXPIRED: "EXPIRED",
} as const;

export type ProposalStatus = (typeof PROPOSAL_STATUSES)[keyof typeof PROPOSAL_STATUSES];

export const PROPOSAL_STATUS_LABELS: Record<ProposalStatus, string> = {
  DRAFT: "Draft",
  SENT: "Sent",
  VIEWED: "Viewed",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  EXPIRED: "Expired",
};

export const CONTRACT_STATUSES = {
  DRAFT: "DRAFT",
  SENT: "SENT",
  VIEWED: "VIEWED",
  SIGNED: "SIGNED",
  EXPIRED: "EXPIRED",
  VOID: "VOID",
} as const;

export type ContractStatus = (typeof CONTRACT_STATUSES)[keyof typeof CONTRACT_STATUSES];

export const CONTRACT_STATUS_LABELS: Record<ContractStatus, string> = {
  DRAFT: "Draft",
  SENT: "Sent",
  VIEWED: "Viewed",
  SIGNED: "Signed",
  EXPIRED: "Expired",
  VOID: "Void",
};

/* ─── Invoice & payment status ─────────────────────── */

export const INVOICE_STATUSES = {
  DRAFT: "DRAFT",
  SENT: "SENT",
  VIEWED: "VIEWED",
  PARTIALLY_PAID: "PARTIALLY_PAID",
  PAID: "PAID",
  OVERDUE: "OVERDUE",
  VOID: "VOID",
} as const;

export type InvoiceStatus = (typeof INVOICE_STATUSES)[keyof typeof INVOICE_STATUSES];

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  DRAFT: "Draft",
  SENT: "Sent",
  VIEWED: "Viewed",
  PARTIALLY_PAID: "Partially Paid",
  PAID: "Paid",
  OVERDUE: "Overdue",
  VOID: "Void",
};

/* ─── Campaign status ────────────────────────────────── */

export const CAMPAIGN_STATUSES = {
  DRAFT: "DRAFT",
  SCHEDULED: "SCHEDULED",
  ACTIVE: "ACTIVE",
  PAUSED: "PAUSED",
  COMPLETED: "COMPLETED",
  ARCHIVED: "ARCHIVED",
} as const;

export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[keyof typeof CAMPAIGN_STATUSES];

export const CAMPAIGN_STATUS_LABELS: Record<CampaignStatus, string> = {
  DRAFT: "Draft",
  SCHEDULED: "Scheduled",
  ACTIVE: "Active",
  PAUSED: "Paused",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
};

/* ─── Content pipeline status ──────────────────────── */

export const CONTENT_STATUSES = {
  IDEA: "IDEA",
  BRIEF: "BRIEF",
  DRAFT: "DRAFT",
  DESIGN: "DESIGN",
  INTERNAL_REVIEW: "INTERNAL_REVIEW",
  CLIENT_APPROVAL: "CLIENT_APPROVAL",
  SCHEDULED: "SCHEDULED",
  PUBLISHED: "PUBLISHED",
} as const;

export type ContentStatus = (typeof CONTENT_STATUSES)[keyof typeof CONTENT_STATUSES];

export const CONTENT_STATUS_LABELS: Record<ContentStatus, string> = {
  IDEA: "Idea",
  BRIEF: "Brief",
  DRAFT: "Draft",
  DESIGN: "Design",
  INTERNAL_REVIEW: "Internal Review",
  CLIENT_APPROVAL: "Client Approval",
  SCHEDULED: "Scheduled",
  PUBLISHED: "Published",
};

/* ─── Health / risk indicators ─────────────────────── */

export const HEALTH_LEVELS = {
  EXCELLENT: "EXCELLENT",
  STABLE: "STABLE",
  ATTENTION: "ATTENTION",
  AT_RISK: "AT_RISK",
  CRITICAL: "CRITICAL",
} as const;

export type HealthLevel = (typeof HEALTH_LEVELS)[keyof typeof HEALTH_LEVELS];

export const HEALTH_LEVEL_LABELS: Record<HealthLevel, string> = {
  EXCELLENT: "Excellent",
  STABLE: "Stable",
  ATTENTION: "Attention Required",
  AT_RISK: "At Risk",
  CRITICAL: "Critical",
};

/* ─── Alert severity ─────────────────────────────────── */

export const ALERT_SEVERITIES = {
  INFO: "INFO",
  WARNING: "WARNING",
  CRITICAL: "CRITICAL",
} as const;

export type AlertSeverity = (typeof ALERT_SEVERITIES)[keyof typeof ALERT_SEVERITIES];

export const ALERT_SEVERITY_LABELS: Record<AlertSeverity, string> = {
  INFO: "Info",
  WARNING: "Warning",
  CRITICAL: "Critical",
};

/* ─── Generic active/inactive ──────────────────────── */

export const GENERIC_STATUSES = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  ARCHIVED: "ARCHIVED",
} as const;

export type GenericStatus = (typeof GENERIC_STATUSES)[keyof typeof GENERIC_STATUSES];
