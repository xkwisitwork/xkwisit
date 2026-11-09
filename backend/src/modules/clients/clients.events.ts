import { domainEvents } from "../../events/emitter.js";
import { logger } from "../../utils/logger.js";

export function registerClientsEvents() {
  domainEvents.on("*", (event) => {
    if (String(event.name).includes("clients")) {
      logger.info("clients.event", { name: event.name });
    }
  });
}
