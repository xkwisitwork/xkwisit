/**
 * Integration registry - lists available connectors.
 */
export type IntegrationDefinition = {
  id: string;
  name: string;
  category: string;
  status: "available" | "beta" | "coming_soon";
};

export const integrationRegistry: IntegrationDefinition[] = [
  { id: "google-ads", name: "Google Ads", category: "ads", status: "available" },
  { id: "meta", name: "Meta Ads", category: "ads", status: "available" },
  { id: "paystack", name: "Paystack", category: "payments", status: "available" },
  { id: "whatsapp", name: "WhatsApp", category: "messaging", status: "beta" },
];

export function getIntegration(id: string) {
  return integrationRegistry.find((i) => i.id === id) ?? null;
}
