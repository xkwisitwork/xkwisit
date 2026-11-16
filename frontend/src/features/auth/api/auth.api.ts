import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { BotShieldFields } from "@/lib/bot-shield/types";
import type { User } from "@/types/auth";

export type RegisterAccountPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
} & BotShieldFields;

export type AuthResult = {
  user: User;
  accessToken: string;
  refreshToken?: string;
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

export async function loginAccount(
  payload: {
    email: string;
    password: string;
  } & BotShieldFields,
): Promise<AuthResult> {
  return apiClient<AuthResult>(endpoints.auth.login, {
    method: "POST",
    body: payload,
  });
}

export async function requestPasswordReset(
  payload: { email: string } & BotShieldFields,
): Promise<{ message?: string }> {
  return apiClient(endpoints.auth.forgotPassword, {
    method: "POST",
    body: payload,
  });
}
