"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import {
  archiveClient,
  createClient,
  deleteClient,
  updateClient,
} from "../api/clients.api";
import { clientKeys } from "../api/queryKeys";
import type { Client, CreateClientPayload, UpdateClientPayload } from "../types";

export function useCreateClient() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<Client, Error, CreateClientPayload>({
    mutationFn: async (payload) => {
      try {
        return await createClient(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (client) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
      toast.success("Client created.");

      if (client?.id) {
        router.push(`/clients/${client.id}`);
      } else {
        router.push("/clients");
      }
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useUpdateClient(id: string) {
  const queryClient = useQueryClient();

  return useMutation<Client, Error, UpdateClientPayload>({
    mutationFn: async (payload) => {
      try {
        return await updateClient(id, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: (client) => {
      queryClient.setQueryData(clientKeys.detail(id), client);
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      toast.success("Client updated.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useArchiveClient() {
  const queryClient = useQueryClient();

  return useMutation<Client, Error, string>({
    mutationFn: async (id) => {
      try {
        return await archiveClient(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
      toast.success("Client archived.");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      try {
        return await deleteClient(id);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
      toast.success("Client deleted.");
      router.push("/clients");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
