import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { LoggerLoggedEvent } from "./events/logger.log.event";

@Injectable()
export class LoggerService {
  @OnEvent("logger.log")
  log({ text, payload }: LoggerLoggedEvent): void {
    console.log(text, payload);
  }
}
