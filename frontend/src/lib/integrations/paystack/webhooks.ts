/**
 * Webhook verification / handling scaffold.
 */
export function verifyWebhookSignature(
  _payload: string,
  _signature: string,
  _secret: string,
): boolean {
  return false;
}

export async function handleWebhookEvent(_event: Record<string, unknown>): Promise<void> {
  // no-op until provider wiring lands
}
