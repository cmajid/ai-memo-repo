import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ClientGrpc } from "@nestjs/microservices";
import { get } from "env-var";
import IProtoUserService from "proto/user.service.proto.interface";

@Injectable()
export class MemoJwtStrategy
  extends PassportStrategy(Strategy, "jwt")
  implements OnModuleInit
{
  private usersService: IProtoUserService;
  constructor(@Inject("USER_SERVICE") private readonly client: ClientGrpc) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: get("secret_key").required().asString(),
    });
  }
  onModuleInit() {
    this.usersService = this.client.getService("UserService");
  }

  async validate(payload) {
    const user = await this.usersService.ValidateUser({ email: payload.email }).toPromise();
    console.log("user", user);
    return user;
  }
}
