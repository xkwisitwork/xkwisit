import { domainEvents } from "../../events/emitter.js";
import { logger } from "../../utils/logger.js";

export function registerAnalyticsEvents() {
  domainEvents.on("*", (event) => {
    if (String(event.name).includes("analytics")) {
      logger.info("analytics.event", { name: event.name });
    }
  });
}
