import { z } from "zod";

import { PROJECT_STATUSES } from "@/lib/constants/statuses";

/**
 * Project & task schemas.
 */

const optionalString = (max = 500) =>
  z.string().max(max).trim().optional().or(z.literal(""));

/* ─── Project create ─────────────────────────────────── */

export const createProjectSchema = z.object({
  clientId: z.string().min(1, "Select a client."),
  name: z.string().min(2, "Project name is required.").max(160).trim(),
  description: optionalString(2000),
  status: z
    .enum(Object.values(PROJECT_STATUSES) as [string, ...string[]])
    .default("ON_TRACK"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  ownerId: z.string().optional(),
  teamMemberIds: z.array(z.string()).default([]),
  budgetAmount: z.coerce.number().nonnegative().optional(),
  currency: z.enum(["NGN", "USD", "GBP", "EUR"]).default("NGN"),
  tags: z.array(z.string()).max(10).default([]),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

/* ─── Milestones ─────────────────────────────────────── */

export const projectMilestoneSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Milestone name is required.").max(160),
  description: optionalString(500),
  dueDate: z.string().optional(),
  completedAt: z.string().optional(),
  order: z.coerce.number().int().nonnegative().default(0),
});

export type ProjectMilestoneInput = z.infer<typeof projectMilestoneSchema>;

/* ─── Deliverables ───────────────────────────────────── */

export const projectDeliverableSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Deliverable name is required.").max(160),
  description: optionalString(1000),
  dueDate: z.string().optional(),
  deliveredAt: z.string().optional(),
  requiresApproval: z.boolean().default(true),
  approvalStatus: z
    .enum(["PENDING", "APPROVED", "REJECTED", "CHANGES_REQUESTED"])
    .optional(),
  order: z.coerce.number().int().nonnegative().default(0),
});

export type ProjectDeliverableInput = z.infer<typeof projectDeliverableSchema>;

/* ─── Tasks ──────────────────────────────────────────── */

export const taskPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);

export const taskStatusSchema = z.enum([
  "TODO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "BLOCKED",
  "DONE",
]);

export const createTaskSchema = z.object({
  projectId: z.string().optional(),
  clientId: z.string().optional(),
  title: z.string().min(1, "Task title is required.").max(200).trim(),
  description: optionalString(2000),
  status: taskStatusSchema.default("TODO"),
  priority: taskPrioritySchema.default("MEDIUM"),
  assigneeId: z.string().optional(),
  dueDate: z.string().optional(),
  estimateHours: z.coerce.number().nonnegative().optional(),
  parentTaskId: z.string().optional(),
  tags: z.array(z.string()).max(10).default([]),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = createTaskSchema.partial().extend({
  completedAt: z.string().optional(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export const moveTaskSchema = z.object({
  status: taskStatusSchema,
  order: z.coerce.number().int().nonnegative(),
});

export type MoveTaskInput = z.infer<typeof moveTaskSchema>;

/* ─── Timesheet entry ────────────────────────────────── */

export const timesheetEntrySchema = z.object({
  taskId: z.string().optional(),
  projectId: z.string().optional(),
  date: z.string().min(1, "Date is required."),
  hours: z.coerce.number().positive().max(24, "Cannot log more than 24 hours in a day."),
  description: optionalString(500),
  billable: z.boolean().default(true),
});

export type TimesheetEntryInput = z.infer<typeof timesheetEntrySchema>;

/* ─── Project health update ─────────────────────────── */

export const projectHealthUpdateSchema = z.object({
  status: z.enum(Object.values(PROJECT_STATUSES) as [string, ...string[]]),
  reason: optionalString(500),
});

export type ProjectHealthUpdateInput = z.infer<typeof projectHealthUpdateSchema>;
