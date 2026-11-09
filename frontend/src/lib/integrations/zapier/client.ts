/**
 * Zapier API client scaffold.
 */
export type ZapierClientConfig = {
  apiKey?: string;
  baseUrl?: string;
};

export function createZapierClient(config: ZapierClientConfig = {}) {
  return {
    config,
    async request<T = unknown>(_path: string, _init?: RequestInit): Promise<T> {
      throw new Error("Zapier client is not configured yet.");
    },
  };
}
