import { Module } from "@nestjs/common";
import { UserController } from "./user/user.controller";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { ClientsModule } from "@nestjs/microservices";
import { MemoJwtStrategy } from "../../../libs/shared/src/auth/strategies/memo-jwt-strategy";
import SharedModule from "@app/shared/shared.module";

const appConfig = {
  isGlobal: true,
  validationSchema: Joi.object({
    PORT: Joi.number().required(),
    GRPC_USERS_SERVICE_URI: Joi.string().required(),
    GRPC_AUTH_SERVICE_URI: Joi.string().required(),
  }),
  envFilePath: "./apps/gateway/.env",
};

@Module({
  imports: [
    ConfigModule.forRoot(appConfig),
    ClientsModule.register([
      SharedModule.getAuthService_gRPC_Client(),
      SharedModule.getUserService_gRPC_Client(),
    ]),
  ],
  controllers: [UserController],
  providers: [MemoJwtStrategy],
})
export class GatewayModule {}
