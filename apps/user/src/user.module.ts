import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

const appConfig = {
  isGlobal: true,
  validationSchema: Joi.object({
    RABBIT_MQ_URI: Joi.string().required(),
  }),
  envFilePath: "./apps/user/.env",
};

@Module({
  imports: [ConfigModule.forRoot(appConfig)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
