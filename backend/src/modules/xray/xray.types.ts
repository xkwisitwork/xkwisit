export type XraySignalLabel =
  | "Brand clarity"
  | "Demand quality"
  | "Sales follow-through"
  | "Retention loop";

export type XrayFindingSeverity = "ok" | "warn" | "fail";

export type XrayFinding = {
  id: string;
  label: string;
  detail: string;
  severity: XrayFindingSeverity;
  dimension: XraySignalLabel;
};

export type XraySignal = {
  label: XraySignalLabel;
  score: number;
};

export type XrayScanResult = {
  domain: string;
  finalUrl: string;
  overall: number;
  constraint: XraySignalLabel;
  signals: XraySignal[];
  findings: XrayFinding[];
  scannedAt: string;
  timingMs: number;
};

export type PageSignals = {
  finalUrl: string;
  status: number;
  https: boolean;
  title: string;
  metaDescription: string;
  canonical: string;
  ogTitle: string;
  ogImage: string;
  h1s: string[];
  hasViewport: boolean;
  hasForm: boolean;
  hasTel: boolean;
  hasMailto: boolean;
  hasWhatsApp: boolean;
  hasCta: boolean;
  hasCartOrCheckout: boolean;
  hasLogin: boolean;
  hasNewsletter: boolean;
  hasSchema: boolean;
  hasBlogLink: boolean;
  hasPrivacy: boolean;
  hasLogoAlt: boolean;
  wordCount: number;
  timingMs: number;
};
