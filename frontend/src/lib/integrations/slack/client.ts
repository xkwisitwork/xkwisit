/**
 * Slack API client scaffold.
 */
export type SlackClientConfig = {
  apiKey?: string;
  baseUrl?: string;
};

export function createSlackClient(config: SlackClientConfig = {}) {
  return {
    config,
    async request<T = unknown>(_path: string, _init?: RequestInit): Promise<T> {
      throw new Error("Slack client is not configured yet.");
    },
  };
}
