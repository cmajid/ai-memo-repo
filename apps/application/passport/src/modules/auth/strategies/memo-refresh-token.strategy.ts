import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { PassportStrategy } from "@nestjs/passport";
import appConfig from "config/app.config";

@Injectable()
export class MemoRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "magiclogin-refresh",
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refresh"),
      ignoreExpiration: false,
      secretOrKey: appConfig().appSecret,
    });
  }

  async validate(payload) {
    const user = this.authService.validateUser(payload.email);
    return user;
  }
}
