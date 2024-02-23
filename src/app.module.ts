import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WordsModule } from "./words/words.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { LoggerService } from "./app.loggerService";

@Module({
  imports: [EventEmitterModule.forRoot(), WordsModule],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
