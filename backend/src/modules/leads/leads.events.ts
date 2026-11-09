import { domainEvents } from "../../events/emitter.js";
import { logger } from "../../utils/logger.js";

export function registerLeadsEvents() {
  domainEvents.on("*", (event) => {
    if (String(event.name).includes("leads")) {
      logger.info("leads.event", { name: event.name });
    }
  });
}
