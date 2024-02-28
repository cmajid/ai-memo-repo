import { Module } from "@nestjs/common";
import { WordsModule } from "./modules/words/words.module";

@Module({
  imports: [WordsModule],
  controllers: [],
  providers: [],
})
export class MemoModule {}
