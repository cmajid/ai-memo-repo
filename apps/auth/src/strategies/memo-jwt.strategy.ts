import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import appConfig from "config/app.config";
import { UsersService } from "../users/users.service";

@Injectable()
export class MemoJwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().appSecret,
    });
  }

  async validate(payload) {
    const user = this.usersService.validateUser(payload.email);
    return user;
  }
}
