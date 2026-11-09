import { domainEvents } from "../../events/emitter.js";
import { logger } from "../../utils/logger.js";

export function registerApprovalsEvents() {
  domainEvents.on("*", (event) => {
    if (String(event.name).includes("approvals")) {
      logger.info("approvals.event", { name: event.name });
    }
  });
}
