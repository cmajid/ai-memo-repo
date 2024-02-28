import { EventEmitter2 } from "@nestjs/event-emitter";
import { LoggerLoggedEvent } from "@ai-memo/logger/events/logger-log.event";
import { events } from "apps/memo-service/src/constans/events/event.constans";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LoggerService {
  constructor(private eventEmitter: EventEmitter2) {}

  log({ text, payload }: LoggerLoggedEvent): void {
    this.eventEmitter.emit(
      events.LOGGER_LOG,
      new LoggerLoggedEvent(text, payload),
    );
  }
}
