import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { User } from "@/types/auth";

export type RegisterAccountPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
};

export type AuthResult = {
  user: User;
  accessToken: string;
  organization?: {
    id: string;
    name: string;
    slug: string;
  };
};

export async function registerAccount(
  payload: RegisterAccountPayload,
): Promise<AuthResult> {
  return apiClient<AuthResult>(endpoints.auth.register, {
    method: "POST",
    body: payload,
  });
}

export async function loginAccount(payload: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  return apiClient<AuthResult>(endpoints.auth.login, {
    method: "POST",
    body: payload,
  });
}
