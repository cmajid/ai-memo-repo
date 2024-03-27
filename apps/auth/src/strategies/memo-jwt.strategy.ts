import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "../user/user.service";
import { get } from "env-var";

@Injectable()
export class MemoJwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: get('secret_key').required().asString(),
    });
  }

  async validate(payload) {
    const user = this.usersService.validateUser(payload.email);
    return user;
  }
}
