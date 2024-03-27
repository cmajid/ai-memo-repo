import { Module } from "@nestjs/common";
import { TextController } from "./text.controller";
import { TextService } from "./text.service";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

const appConfig = {
  isGlobal: true,
  validationSchema: Joi.object({
    RABBIT_MQ_URI: Joi.string().required(),
  }),
  envFilePath: "./apps/text/.env",
};

@Module({
  imports: [ConfigModule.forRoot(appConfig)],
  controllers: [TextController],
  providers: [TextService],
})
export class TextModule {}
