import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { LoggerLoggedEvent } from "./events/logger.log.event";
import { events } from "./constans/events/event.constans";

@Injectable()
export class LoggerService {
  @OnEvent(events.LOGGER_LOG)
  log({ text, payload }: LoggerLoggedEvent): void {
    console.log(text, payload);
  }
}
