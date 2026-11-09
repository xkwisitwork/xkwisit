"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  getTeamMember,
  inviteTeamMember,
  listTeamMembers,
  updateTeamMember,
} from "../api/team.api";
import { teamKeys } from "../api/queryKeys";
import type { InviteMemberPayload, UpdateMemberPayload } from "../types";

export function useTeam(enabled = true) {
  return useQuery({
    queryKey: teamKeys.members(),
    queryFn: ({ signal }) => listTeamMembers(signal),
    enabled,
    staleTime: 30_000,
  });
}

export function useTeamMember(id: string, enabled = true) {
  return useQuery({
    queryKey: teamKeys.member(id),
    queryFn: ({ signal }) => getTeamMember(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useInviteTeamMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: InviteMemberPayload) => {
      try {
        return await inviteTeamMember(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: teamKeys.members() });
      toast.success("Invite sent.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useUpdateTeamMember(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateMemberPayload) => {
      try {
        return await updateTeamMember(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (data) => {
      qc.setQueryData(teamKeys.member(id), data);
      void qc.invalidateQueries({ queryKey: teamKeys.members() });
      toast.success("Member updated.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
