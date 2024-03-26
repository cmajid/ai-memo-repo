import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
  imports: [

    // App config
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
      }),
      envFilePath: "./apps/user/.env",
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
