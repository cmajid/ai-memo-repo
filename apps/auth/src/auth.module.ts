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
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: "./apps/auth/.env",
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MemoJwtStrategy, MemoGoogleStrategy],
})
export class AuthModule {}
