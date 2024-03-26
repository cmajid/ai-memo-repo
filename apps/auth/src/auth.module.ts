import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "config/jwt.config";
import { MemoJwtStrategy } from "./strategies/memo-jwt.strategy";
import { MemoGoogleStrategy } from "./strategies/memo-google.strategy";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig),

    // App config
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
      }),
      envFilePath: "./apps/auth/.env",
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MemoJwtStrategy, MemoGoogleStrategy],
})
export class AuthModule {}
