import { domainEvents } from "../emitter.js";
import type { DomainEvent, LeadCreatedPayload } from "../event.types.js";
import { logger } from "../../utils/logger.js";

export function onLeadCreated() {
  domainEvents.on("lead.created", (event: DomainEvent<LeadCreatedPayload>) => {
    logger.info("lead.created", {
      leadId: event.payload.leadId,
      organizationId: event.organizationId,
    });
  });
}
