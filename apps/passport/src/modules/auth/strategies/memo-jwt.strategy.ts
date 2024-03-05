import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { PassportStrategy } from "@nestjs/passport";
import appConfig from "config/app.config";

@Injectable()
export class MemoJwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().appSecret,
      session: false, // Add this line
    });
  }

  async validate(payload) {
    const user = this.authService.validateUser(payload.email);
    return user;
  }
}
