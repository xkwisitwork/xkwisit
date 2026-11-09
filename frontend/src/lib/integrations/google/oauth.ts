/**
 * OAuth helpers scaffold.
 */
export function getAuthorizationUrl(state: string): string {
  return `/api/integrations/oauth/authorize?state=${encodeURIComponent(state)}`;
}

export async function exchangeCode(_code: string): Promise<{ accessToken: string }> {
  throw new Error("OAuth exchange is not configured yet.");
}
