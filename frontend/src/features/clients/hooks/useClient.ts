"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getClient,
  getClientAccess,
  getClientBusinessInfo,
  getClientContacts,
  getClientHealth,
} from "../api/clients.api";
import { clientKeys } from "../api/queryKeys";

export function useClient(id: string, enabled = true) {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: ({ signal }) => getClient(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useClientBusinessInfo(id: string, enabled = true) {
  return useQuery({
    queryKey: clientKeys.businessInfo(id),
    queryFn: ({ signal }) => getClientBusinessInfo(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useClientContacts(id: string, enabled = true) {
  return useQuery({
    queryKey: clientKeys.contacts(id),
    queryFn: ({ signal }) => getClientContacts(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useClientAccess(id: string, enabled = true) {
  return useQuery({
    queryKey: clientKeys.access(id),
    queryFn: ({ signal }) => getClientAccess(id, signal),
    enabled: enabled && Boolean(id),
  });
}

export function useClientHealth(id: string, enabled = true) {
  return useQuery({
    queryKey: clientKeys.health(id),
    queryFn: ({ signal }) => getClientHealth(id, signal),
    enabled: enabled && Boolean(id),
  });
}
