import { Module } from "@nestjs/common";
import { UserController } from "./user/user.controller";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        GRPC_URI: Joi.string().required(),
      }),
      envFilePath: "./apps/api-gateway/.env",
    }),
  ],
  controllers: [UserController],
  providers: [],
})
export class ApiGatewayModule {}
