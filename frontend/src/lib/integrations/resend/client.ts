/**
 * Resend API client scaffold.
 */
export type ResendClientConfig = {
  apiKey?: string;
  baseUrl?: string;
};

export function createResendClient(config: ResendClientConfig = {}) {
  return {
    config,
    async request<T = unknown>(_path: string, _init?: RequestInit): Promise<T> {
      throw new Error("Resend client is not configured yet.");
    },
  };
}
