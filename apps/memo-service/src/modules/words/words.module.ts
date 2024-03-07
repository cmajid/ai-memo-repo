import { Module } from "@nestjs/common";
import { WordsService } from "./words.service";
import { WordsController } from "./words.controller";
import { LoggerModule } from "libs/clogger/src";

@Module({
  imports: [LoggerModule],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
