import type { ID, ISODateString, Money } from "@/types/common";
import type { InvoiceStatus } from "@/lib/constants/statuses";

export type InvoiceCurrency = "NGN" | "USD" | "GBP" | "EUR";

export type PaymentStatus =
  "UNPAID" | "PENDING" | "PARTIAL" | "PAID" | "FAILED" | "REFUNDED";

export type InvoiceLineItem = {
  id: ID;
  description: string;
  quantity: number;
  unitAmount: number;
  taxRate: number;
  totalAmount: number;
};

export type Invoice = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  clientName: string;
  number: string;
  status: InvoiceStatus;
  paymentStatus: PaymentStatus;
  currency: InvoiceCurrency;
  subtotal: number;
  taxTotal: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  issueDate: ISODateString;
  dueDate: ISODateString;
  paidAt: ISODateString | null;
  sentAt: ISODateString | null;
  notes: string | null;
  lineItems: InvoiceLineItem[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type InvoiceListItem = Pick<
  Invoice,
  | "id"
  | "number"
  | "clientId"
  | "clientName"
  | "status"
  | "paymentStatus"
  | "currency"
  | "total"
  | "amountDue"
  | "issueDate"
  | "dueDate"
  | "paidAt"
>;

export type InvoiceFilterState = {
  search: string;
  statuses: InvoiceStatus[];
  paymentStatuses: PaymentStatus[];
  clientId: string | null;
  overdueOnly: boolean;
};

export const emptyInvoiceFilters: InvoiceFilterState = {
  search: "",
  statuses: [],
  paymentStatuses: [],
  clientId: null,
  overdueOnly: false,
};

export type CreateInvoicePayload = {
  clientId: string;
  currency?: InvoiceCurrency;
  issueDate?: string;
  dueDate?: string;
  notes?: string | null;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitAmount: number;
    taxRate?: number;
  }>;
};

export type UpdateInvoicePayload = Partial<CreateInvoicePayload> & {
  status?: InvoiceStatus;
};

export type InvoiceStats = {
  total: number;
  draft: number;
  sent: number;
  overdue: number;
  paid: number;
  outstanding: Money;
  collectedThisMonth: Money;
};
