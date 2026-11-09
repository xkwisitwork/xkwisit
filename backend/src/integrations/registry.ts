export type IntegrationProviderId =
  | "google"
  | "meta"
  | "linkedin"
  | "paystack"
  | "resend"
  | "slack"
  | "whatsapp"
  | "youtube"
  | "x"
  | "zapier";

export type IntegrationDescriptor = {
  id: IntegrationProviderId;
  label: string;
  category: "ads" | "analytics" | "payments" | "comms" | "automation";
  configured: boolean;
};

export const integrationRegistry: IntegrationDescriptor[] = [
  { id: "google", label: "Google", category: "ads", configured: false },
  { id: "meta", label: "Meta", category: "ads", configured: false },
  { id: "linkedin", label: "LinkedIn", category: "ads", configured: false },
  { id: "paystack", label: "Paystack", category: "payments", configured: false },
  { id: "resend", label: "Resend", category: "comms", configured: false },
  { id: "slack", label: "Slack", category: "comms", configured: false },
  { id: "whatsapp", label: "WhatsApp", category: "comms", configured: false },
  { id: "youtube", label: "YouTube", category: "analytics", configured: false },
  { id: "x", label: "X", category: "ads", configured: false },
  { id: "zapier", label: "Zapier", category: "automation", configured: false },
];

export function listIntegrations() {
  return integrationRegistry;
}
