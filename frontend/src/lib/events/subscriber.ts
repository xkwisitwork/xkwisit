import { eventEmitter } from "./emitter";

export function subscribe(event: string, handler: (payload: unknown) => void) {
  return eventEmitter.on(event, handler);
}
