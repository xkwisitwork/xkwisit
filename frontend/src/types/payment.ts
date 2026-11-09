import type { ID, ISODateString, Money } from "./common";
import type { InvoiceCurrency, PaymentStatus } from "./invoice";

/**
 * Payment domain types (settlements against invoices).
 */

export type { PaymentStatus };

export type PaymentMethod = "PAYSTACK" | "BANK_TRANSFER" | "CARD" | "CASH" | "OTHER";

export type Payment = {
  id: ID;
  organizationId: ID;
  invoiceId: ID;
  clientId: ID;
  clientName: string;
  status: PaymentStatus;
  method: PaymentMethod;
  amount: Money;
  currency: InvoiceCurrency;
  reference: string | null;
  paidAt: ISODateString | null;
  notes: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type PaymentListItem = Pick<
  Payment,
  | "id"
  | "invoiceId"
  | "clientId"
  | "clientName"
  | "status"
  | "method"
  | "amount"
  | "currency"
  | "reference"
  | "paidAt"
  | "createdAt"
>;

export type PaymentFilterState = {
  search: string;
  statuses: PaymentStatus[];
  clientId: string | null;
  invoiceId: string | null;
};

export const emptyPaymentFilters: PaymentFilterState = {
  search: "",
  statuses: [],
  clientId: null,
  invoiceId: null,
};

export type CreatePaymentPayload = {
  invoiceId: string;
  amount: number;
  currency?: InvoiceCurrency;
  method?: PaymentMethod;
  reference?: string | null;
  notes?: string | null;
};

export type UpdatePaymentPayload = Partial<CreatePaymentPayload> & {
  status?: PaymentStatus;
};
