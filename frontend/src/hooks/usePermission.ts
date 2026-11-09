"use client";

export function usePermission(permission: string) {
  void permission;
  return { allowed: true, loading: false };
}
