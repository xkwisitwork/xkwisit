/**
 * Shared primitives used across API DTOs and domain types.
 */

export type ID = string;

export type ISODateString = string;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = T | null | undefined;

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

export type DateRange = {
  from: Maybe<ISODateString>;
  to: Maybe<ISODateString>;
};

export type BaseEntity = {
  id: ID;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type Money = {
  amount: number;
  currency: "NGN" | "USD" | "GBP" | "EUR";
};

export type Trend = "up" | "down" | "flat";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
