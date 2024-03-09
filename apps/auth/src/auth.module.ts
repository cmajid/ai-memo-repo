import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "config/jwt.config";
import { MemoJwtStrategy } from "./strategies/memo-jwt.strategy";
import { MemoGoogleStrategy } from "./strategies/memo-google.strategy";

@Module({
  imports: [
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
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService, MemoJwtStrategy, MemoGoogleStrategy],
})
export class AuthModule {}
