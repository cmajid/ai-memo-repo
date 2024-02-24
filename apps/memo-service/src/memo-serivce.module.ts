import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { LoggerService } from "./memo-serivce.loggerService";
import { MemoService } from "./memo-serivce.service";
import { WordsModule } from "./modules/words/words.module";

@Module({
  imports: [EventEmitterModule.forRoot(), WordsModule],
  controllers: [],
  providers: [MemoService, LoggerService],
})
export class MemoModule {}
