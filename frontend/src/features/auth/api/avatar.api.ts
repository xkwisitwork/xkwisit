import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { User } from "@/types/auth";

export async function saveAvatarUrl(
  avatarUrl: string,
  accessToken?: string | null,
): Promise<User> {
  const data = await apiClient<{ user: User }>(endpoints.auth.avatar, {
    method: "PATCH",
    body: { avatarUrl },
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  return data.user;
}
