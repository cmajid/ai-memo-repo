import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { MemoGoogleStrategy } from "./strategies/memo-google.strategy";
import { UserModule } from "./user/user.module";
import * as Joi from "joi";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "@app/shared/auth/jwt.config";
import { MemoJwtStrategy } from "@app/shared/auth/strategies/memo-jwt-strategy";
import { ClientsModule } from "@nestjs/microservices";
import SharedModule from "@app/shared/shared.module";

const appConfig = {
  isGlobal: true,
  validationSchema: Joi.object({
    MONGODB_URI: Joi.string().required(),
    PORT: Joi.number().required(),
    RABBIT_MQ_URI: Joi.string().required(),
  }),
  envFilePath: "./apps/auth/.env",
};

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
    ConfigModule.forRoot(appConfig),
    ClientsModule.register([
      SharedModule.getUserService_gRPC_Client()
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, MemoJwtStrategy, MemoGoogleStrategy],
})
export class AuthModule {}


