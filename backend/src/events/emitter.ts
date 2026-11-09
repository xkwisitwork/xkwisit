import { EventEmitter } from "node:events";
import { randomUUID } from "node:crypto";

import type { DomainEvent, DomainEventName } from "./event.types.js";

class DomainEventBus extends EventEmitter {
  emitDomain<TPayload extends Record<string, unknown>>(
    name: DomainEventName,
    input: {
      organizationId?: string | null;
      actorId?: string | null;
      payload: TPayload;
    },
  ): DomainEvent<TPayload> {
    const event: DomainEvent<TPayload> = {
      id: randomUUID(),
      name,
      organizationId: input.organizationId ?? null,
      actorId: input.actorId ?? null,
      payload: input.payload,
      occurredAt: new Date().toISOString(),
    };
    this.emit(name, event);
    this.emit("*", event);
    return event;
  }
}

export const domainEvents = new DomainEventBus();
