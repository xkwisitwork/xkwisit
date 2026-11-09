import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE" | "BLOCKED" | "CANCELLED";

export type Task = {
  id: ID;
  organizationId: ID;
  projectId: ID | null;
  clientId: ID | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: ID | null;
  assigneeName: string | null;
  dueDate: ISODateString | null;
  completedAt: ISODateString | null;
  tags: string[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type TaskListItem = Pick<
  Task,
  "id" | "title" | "status" | "priority" | "assigneeName" | "dueDate" | "projectId" | "clientId"
>;

export type CreateTaskPayload = {
  title: string;
  description?: string | null;
  projectId?: ID | null;
  clientId?: ID | null;
  priority?: TaskPriority;
  assigneeId?: ID | null;
  dueDate?: ISODateString | null;
  tags?: string[];
};

export type UpdateTaskPayload = Partial<CreateTaskPayload> & {
  status?: TaskStatus;
};
