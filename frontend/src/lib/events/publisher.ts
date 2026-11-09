import { eventEmitter } from "./emitter";

export function publish(event: string, payload?: unknown) {
  eventEmitter.emit(event, payload);
}
