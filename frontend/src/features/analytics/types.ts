import type { ID, ISODateString } from "@/types/common";

/* ─── Enums ──────────────────────────────────────────── */

export type AnalyticsProvider =
  "GOOGLE_ANALYTICS" | "META_PIXEL" | "SEGMENT" | "MIXPANEL" | "CUSTOM" | "OTHER";

export type DataSourceStatus = "CONNECTED" | "DISCONNECTED" | "ERROR" | "SYNCING";

export type WarehouseSyncState = "IDLE" | "RUNNING" | "FAILED" | "SUCCESS";

/* ─── Overview ───────────────────────────────────────── */

export type AnalyticsOverview = {
  sessions: number;
  users: number;
  pageviews: number;
  bounceRate: number;
  conversions: number;
  conversionRate: number;
  periodLabel: string;
  topEvents: AnalyticsEventListItem[];
};

/* ─── Events ─────────────────────────────────────────── */

export type AnalyticsEvent = {
  id: ID;
  name: string;
  description: string | null;
  category: string | null;
  isKeyEvent: boolean;
  count30d: number;
  lastSeenAt: ISODateString | null;
  properties: EventProperty[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type AnalyticsEventListItem = Pick<
  AnalyticsEvent,
  "id" | "name" | "category" | "isKeyEvent" | "count30d" | "lastSeenAt"
>;

export type EventProperty = {
  key: string;
  type: "string" | "number" | "boolean" | "date";
  required: boolean;
};

export type UpsertEventPayload = {
  name: string;
  description?: string;
  category?: string;
  isKeyEvent?: boolean;
  properties?: EventProperty[];
};

/* ─── UTM ────────────────────────────────────────────── */

export type UtmParams = {
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
};

export type UtmBuildResult = {
  params: UtmParams;
  queryString: string;
  previewUrl: string;
};

/* ─── Data sources ───────────────────────────────────── */

export type DataSource = {
  id: ID;
  provider: AnalyticsProvider;
  name: string;
  status: DataSourceStatus;
  accountLabel: string | null;
  lastSyncAt: ISODateString | null;
  errorMessage: string | null;
  connectedAt: ISODateString | null;
};

export type ConnectDataSourcePayload = {
  provider: AnalyticsProvider;
  name: string;
  accountLabel?: string;
};

/* ─── Warehouse / explorer ───────────────────────────── */

export type WarehouseStatus = {
  state: WarehouseSyncState;
  lastSyncAt: ISODateString | null;
  rowCount: number | null;
  errorMessage: string | null;
};

export type ExplorerQuery = {
  metric: string;
  dimension?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type ExplorerRow = {
  label: string;
  value: number;
};

export type ExplorerResult = {
  query: ExplorerQuery;
  rows: ExplorerRow[];
  total: number;
};
