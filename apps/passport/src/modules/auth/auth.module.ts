import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { MemoMagicLoginStrategy } from "./strategies/memo-magiclogin.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { MemoJwtStrategy } from "./strategies/memo-jwt.strategy";
import { jwtConfig } from "config/jwt.config";
import { MemoRefreshTokenStrategy } from "./strategies/memo-refresh-token.strategy";

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [
    AuthService,
    MemoMagicLoginStrategy,
    MemoRefreshTokenStrategy,
    MemoJwtStrategy,
  ],
})
export class AuthModule {}
