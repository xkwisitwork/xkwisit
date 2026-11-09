import { domainEvents } from "../emitter.js";
import type { ApprovalPendingPayload, DomainEvent } from "../event.types.js";
import { logger } from "../../utils/logger.js";

export function onApprovalPending() {
  domainEvents.on("approval.pending", (event: DomainEvent<ApprovalPendingPayload>) => {
    logger.info("approval.pending", {
      approvalId: event.payload.approvalId,
      reviewerId: event.payload.reviewerId,
      organizationId: event.organizationId,
    });
  });
}
