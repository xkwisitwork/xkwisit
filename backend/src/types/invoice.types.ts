import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type InvoiceStatus = "DRAFT" | "SENT" | "VIEWED" | "PARTIAL" | "PAID" | "OVERDUE" | "VOID" | "CANCELLED";
export type InvoiceCurrency = Money["currency"];
export type PaymentStatus = "PENDING" | "PROCESSING" | "SUCCEEDED" | "FAILED" | "REFUNDED";

export type InvoiceLineItem = {
  id: ID;
  description: string;
  quantity: number;
  unitAmount: number;
  totalAmount: number;
};

export type Invoice = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  clientName: string;
  number: string;
  status: InvoiceStatus;
  currency: InvoiceCurrency;
  subtotal: number;
  taxAmount: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  lineItems: InvoiceLineItem[];
  issuedAt: ISODateString | null;
  dueAt: ISODateString | null;
  paidAt: ISODateString | null;
  notes: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type InvoiceListItem = Pick<
  Invoice,
  "id" | "number" | "clientId" | "clientName" | "status" | "currency" | "total" | "amountDue" | "dueAt" | "issuedAt"
>;

export type InvoiceStats = {
  outstanding: number;
  overdue: number;
  paidThisMonth: number;
  draftCount: number;
};

export type CreateInvoicePayload = {
  clientId: ID;
  currency?: InvoiceCurrency;
  lineItems: Array<Omit<InvoiceLineItem, "id" | "totalAmount"> & { totalAmount?: number }>;
  dueAt?: ISODateString | null;
  notes?: string | null;
};

export type UpdateInvoicePayload = Partial<CreateInvoicePayload> & {
  status?: InvoiceStatus;
};
