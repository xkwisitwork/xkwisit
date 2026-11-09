import { domainEvents } from "../emitter.js";
import type { DomainEvent, ProposalViewedPayload } from "../event.types.js";
import { logger } from "../../utils/logger.js";

export function onProposalViewed() {
  domainEvents.on("proposal.viewed", (event: DomainEvent<ProposalViewedPayload>) => {
    logger.info("proposal.viewed", {
      proposalId: event.payload.proposalId,
      organizationId: event.organizationId,
    });
  });
}
