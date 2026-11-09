"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  approveApproval,
  rejectApproval,
  requestApprovalChanges,
} from "../api/approvals.api";
import { approvalKeys } from "../api/queryKeys";
import type { ApprovalDecisionPayload } from "../types";

export function useApprovalMutations(approvalId: string) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: approvalKeys.all });
  };

  const approve = useMutation({
    mutationFn: (payload: ApprovalDecisionPayload = {}) =>
      approveApproval(approvalId, payload),
    onSuccess: () => {
      toast.success("Approved");
      invalidate();
    },
    onError: () => toast.error("Could not approve"),
  });

  const reject = useMutation({
    mutationFn: (payload: ApprovalDecisionPayload = {}) =>
      rejectApproval(approvalId, payload),
    onSuccess: () => {
      toast.success("Rejected");
      invalidate();
    },
    onError: () => toast.error("Could not reject"),
  });

  const requestChanges = useMutation({
    mutationFn: (payload: ApprovalDecisionPayload = {}) =>
      requestApprovalChanges(approvalId, payload),
    onSuccess: () => {
      toast.success("Changes requested");
      invalidate();
    },
    onError: () => toast.error("Could not request changes"),
  });

  return { approve, reject, requestChanges };
}
