import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type {
  CapacityRow,
  InviteMemberPayload,
  TeamMember,
  TeamMemberListItem,
  TimesheetEntry,
  UpdateMemberPayload,
  UtilizationSnapshot,
} from "../types";

export async function listTeamMembers(
  signal?: AbortSignal,
): Promise<TeamMemberListItem[]> {
  return apiClient<TeamMemberListItem[]>(endpoints.team.members, {
    method: "GET",
    signal,
  });
}

export async function getTeamMember(
  id: string,
  signal?: AbortSignal,
): Promise<TeamMember> {
  return apiClient<TeamMember>(endpoints.team.memberDetail(id), {
    method: "GET",
    signal,
  });
}

export async function inviteTeamMember(
  payload: InviteMemberPayload,
): Promise<TeamMember> {
  return apiClient<TeamMember>(endpoints.team.invite, {
    method: "POST",
    body: payload,
  });
}

export async function updateTeamMember(
  id: string,
  payload: UpdateMemberPayload,
): Promise<TeamMember> {
  return apiClient<TeamMember>(endpoints.team.memberDetail(id), {
    method: "PATCH",
    body: payload,
  });
}

export async function listCapacity(signal?: AbortSignal): Promise<CapacityRow[]> {
  return apiClient<CapacityRow[]>(endpoints.team.capacity, {
    method: "GET",
    signal,
  });
}

export async function listTimesheets(signal?: AbortSignal): Promise<TimesheetEntry[]> {
  return apiClient<TimesheetEntry[]>(endpoints.team.timesheets, {
    method: "GET",
    signal,
  });
}

export async function getUtilization(signal?: AbortSignal): Promise<UtilizationSnapshot> {
  return apiClient<UtilizationSnapshot>(endpoints.team.utilization, {
    method: "GET",
    signal,
  });
}
