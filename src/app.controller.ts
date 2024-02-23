import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { LoggerLoggedEvent } from "./events/logger.log.event";

@Controller()
export class AppController {
  constructor(
    private eventEmitter: EventEmitter2,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    this.eventEmitter.emit(
      "logger.log",
      new LoggerLoggedEvent("Hello dear", Date.now()),
    );
    return this.appService.getHello();
  }
}
