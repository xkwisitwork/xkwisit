import type { AnalyticsProvider } from "../types";

export const ANALYTICS_PROVIDERS: Array<{
  value: AnalyticsProvider;
  label: string;
}> = [
  { value: "GOOGLE_ANALYTICS", label: "Google Analytics" },
  { value: "META_PIXEL", label: "Meta Pixel" },
  { value: "SEGMENT", label: "Segment" },
  { value: "MIXPANEL", label: "Mixpanel" },
  { value: "CUSTOM", label: "Custom" },
  { value: "OTHER", label: "Other" },
];

export function providerLabel(provider: AnalyticsProvider): string {
  return ANALYTICS_PROVIDERS.find((p) => p.value === provider)?.label ?? provider;
}
