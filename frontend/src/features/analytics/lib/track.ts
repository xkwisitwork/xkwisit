/**
 * Client-side track helper - no-ops until a provider is wired.
 * Keeps call sites stable without inventing a full SDK.
 */
export type TrackPayload = {
  name: string;
  properties?: Record<string, string | number | boolean | null>;
};

export function track(payload: TrackPayload): void {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", payload.name, payload.properties ?? {});
  }
}
