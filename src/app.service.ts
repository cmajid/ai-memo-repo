import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { events } from "./constans/events/event.constans";
import { LoggerLoggedEvent } from "./events/logger-log.event";

@Injectable()
export class AppService {
  constructor(private eventEmitter: EventEmitter2) {}

  getHello(): string {
    this.eventEmitter.emit(
      events.LOGGER_LOG,
      new LoggerLoggedEvent("Hello dear", Date.now())
    );

    return "Hello World!";
  }
}
