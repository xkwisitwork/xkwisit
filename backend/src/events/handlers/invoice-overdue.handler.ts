import { domainEvents } from "../emitter.js";
import type { DomainEvent, InvoiceOverduePayload } from "../event.types.js";
import { logger } from "../../utils/logger.js";

export function onInvoiceOverdue() {
  domainEvents.on("invoice.overdue", (event: DomainEvent<InvoiceOverduePayload>) => {
    logger.warn("invoice.overdue", {
      invoiceId: event.payload.invoiceId,
      amountDue: event.payload.amountDue,
      organizationId: event.organizationId,
    });
  });
}
