"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  archiveLead,
  bulkAction,
  createLead,
  deleteLead,
  importLeads,
  reassignLead,
  updateLead,
} from "../api/leads.api";
import { leadKeys } from "../api/queryKeys";
import type { CreateLeadPayload, Lead, UpdateLeadPayload } from "../types";

/* ─── Create ─────────────────────────────────────────── */

export function useCreateLead() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<Lead, Error, CreateLeadPayload>({
    mutationFn: async (payload) => {
      try {
        return await createLead(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (lead) => {
      queryClient.invalidateQueries({ queryKey: leadKeys.all });
      toast.success("Lead created.");

      if (lead?.id) {
        router.push(`/crm/leads/${lead.id}`);
      } else {
        router.push("/crm/leads");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/* ─── Update ─────────────────────────────────────────── */

export function useUpdateLead(id: string) {
  const queryClient = useQueryClient();

  return useMutation<Lead, Error, UpdateLeadPayload>({
    mutationFn: async (payload) => {
      try {
        return await updateLead(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (lead) => {
      queryClient.setQueryData(leadKeys.detail(id), lead);
      queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leadKeys.activities(id) });
      toast.success("Lead updated.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/* ─── Delete ─────────────────────────────────────────── */

export function useDeleteLead() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      try {
        return await deleteLead(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadKeys.all });
      toast.success("Lead deleted.");
      router.push("/crm/leads");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/* ─── Archive ────────────────────────────────────────── */

export function useArchiveLead() {
  const queryClient = useQueryClient();

  return useMutation<Lead, Error, string>({
    mutationFn: async (id) => {
      try {
        return await archiveLead(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadKeys.all });
      toast.success("Lead archived.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/* ─── Reassign ───────────────────────────────────────── */

export function useReassignLead(id: string) {
  const queryClient = useQueryClient();

  return useMutation<Lead, Error, string>({
    mutationFn: async (ownerId) => {
      try {
        return await reassignLead(id, ownerId);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
      toast.success("Lead reassigned.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/* ─── Bulk ───────────────────────────────────────────── */

export function useBulkLeadAction() {
  const queryClient = useQueryClient();

  return useMutation<
    { updated: number },
    Error,
    {
      ids: string[];
      action: "archive" | "delete" | "assign" | "change-status";
      payload?: { ownerId?: string; status?: string };
    }
  >({
    mutationFn: async ({ ids, action, payload }) => {
      try {
        return await bulkAction(ids, action, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: leadKeys.all });
      toast.success(`${result.updated} lead${result.updated === 1 ? "" : "s"} updated.`);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/* ─── Import ─────────────────────────────────────────── */

export function useImportLeads() {
  const queryClient = useQueryClient();

  return useMutation<
    { imported: number; skipped: number; errors: string[] },
    Error,
    {
      rows: CreateLeadPayload[];
      source: string;
      defaultOwnerId?: string;
      skipDuplicates?: boolean;
    }
  >({
    mutationFn: async ({ rows, source, defaultOwnerId, skipDuplicates }) => {
      try {
        return await importLeads(rows, {
          source,
          defaultOwnerId,
          skipDuplicates,
        });
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: leadKeys.all });

      if (result.imported > 0) {
        toast.success(
          `${result.imported} lead${result.imported === 1 ? "" : "s"} imported.`,
        );
      }

      if (result.skipped > 0) {
        toast.info(
          `${result.skipped} row${result.skipped === 1 ? "" : "s"} skipped (duplicates or errors).`,
        );
      }

      if (result.errors.length > 0) {
        toast.warning(`${result.errors.length} row errors - check the import report.`);
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
