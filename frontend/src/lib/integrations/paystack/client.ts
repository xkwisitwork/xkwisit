/**
 * Paystack API client scaffold.
 */
export type PaystackClientConfig = {
  apiKey?: string;
  baseUrl?: string;
};

export function createPaystackClient(config: PaystackClientConfig = {}) {
  return {
    config,
    async request<T = unknown>(_path: string, _init?: RequestInit): Promise<T> {
      throw new Error("Paystack client is not configured yet.");
    },
  };
}
