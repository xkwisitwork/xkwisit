import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { User } from "@/types/auth";

export type ProfileMeResponse = {
  user: User;
  organization: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

export type UpdateProfilePayload = {
  firstName: string;
  lastName: string;
  phone: string;
  companyName: string;
};

export async function fetchMyProfile(): Promise<ProfileMeResponse> {
  return apiClient<ProfileMeResponse>(endpoints.auth.me, { method: "GET" });
}

export async function updateMyProfile(
  payload: UpdateProfilePayload,
): Promise<ProfileMeResponse> {
  return apiClient<ProfileMeResponse>(endpoints.auth.profile, {
    method: "PATCH",
    body: payload,
  });
}
