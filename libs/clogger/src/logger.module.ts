import { Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
