import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { AppController } from "./app.controller";
import { LoggerService } from "./app.loggerService";
import { AppService } from "./app.service";
import { WordsModule } from "./modules/words/words.module";


@Module({
  imports: [EventEmitterModule.forRoot(), WordsModule],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
