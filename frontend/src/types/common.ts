/**
 * Common, framework-agnostic types used across the entire app.
 */

/* ─── Identifiers & primitives ────────────────────── */

export type ID = string;

export type ISODateString = string;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = T | null | undefined;

/* ─── Loading & state ─────────────────────────────── */

export type LoadStatus = "idle" | "loading" | "success" | "error";

export type AsyncState<T> = {
  data: Maybe<T>;
  status: LoadStatus;
  error: Maybe<string>;
};

/* ─── Pagination & sorting ────────────────────────── */

export type SortDirection = "asc" | "desc";

export type SortParam<TField extends string = string> = {
  field: TField;
  direction: SortDirection;
};

export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

/* ─── Filtering ───────────────────────────────────── */

export type DateRange = {
  from: Maybe<ISODateString>;
  to: Maybe<ISODateString>;
};

export type FilterOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "in"
  | "nin"
  | "contains"
  | "startsWith"
  | "endsWith"
  | "between";

export type FilterCondition = {
  field: string;
  operator: FilterOperator;
  value: unknown;
};

/* ─── Entities ────────────────────────────────────── */

export type BaseEntity = {
  id: ID;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type SoftDeletable = {
  deletedAt: Maybe<ISODateString>;
};

export type Auditable = {
  createdById: Maybe<ID>;
  updatedById: Maybe<ID>;
};

/* ─── Money & metrics ─────────────────────────────── */

export type Money = {
  amount: number;
  currency: "NGN" | "USD" | "GBP" | "EUR";
};

export type Trend = "up" | "down" | "flat";

export type MetricDelta = {
  value: number;
  percent: number;
  trend: Trend;
};

/* ─── UI primitives ───────────────────────────────── */

export type Option<TValue = string> = {
  label: string;
  value: TValue;
  description?: string;
  disabled?: boolean;
};

export type Breadcrumb = {
  label: string;
  href?: string;
};

export type TabItem = {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
};

/* ─── Misc ────────────────────────────────────────── */

export type WithChildren<T = unknown> = T & { children: React.ReactNode };

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
