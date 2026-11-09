/**
 * Whatsapp API client scaffold.
 */
export type WhatsappClientConfig = {
  apiKey?: string;
  baseUrl?: string;
};

export function createWhatsappClient(config: WhatsappClientConfig = {}) {
  return {
    config,
    async request<T = unknown>(_path: string, _init?: RequestInit): Promise<T> {
      throw new Error("Whatsapp client is not configured yet.");
    },
  };
}
