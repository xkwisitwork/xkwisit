import type { ID, ISODateString } from "@/types/common";
import type { TaskStatus } from "@/lib/constants/statuses";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type Task = {
  id: ID;
  organizationId: ID;
  projectId: ID | null;
  projectName: string | null;
  clientId: ID | null;
  clientName: string | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: ID | null;
  assigneeName: string | null;
  assigneeAvatarUrl: string | null;
  dueDate: ISODateString | null;
  completedAt: ISODateString | null;
  estimateHours: number | null;
  loggedHours: number;
  parentTaskId: ID | null;
  tags: string[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type TaskFilters = {
  search: string;
  statuses: TaskStatus[];
  priorities: TaskPriority[];
  assigneeId: string | null;
  projectId: string | null;
  onlyMine: boolean;
};

export const emptyTaskFilters: TaskFilters = {
  search: "",
  statuses: [],
  priorities: [],
  assigneeId: null,
  projectId: null,
  onlyMine: false,
};

export type CreateTaskPayload = {
  projectId?: string;
  clientId?: string;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string;
  dueDate?: string;
  estimateHours?: number;
  tags?: string[];
};

export type UpdateTaskPayload = Partial<CreateTaskPayload> & {
  completedAt?: string;
};
