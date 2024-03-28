import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ClientGrpc } from "@nestjs/microservices";
import { get } from "env-var";
import IProtoAuthService from "proto/interfaces/auth.service.proto.interface";

@Injectable()
export class MemoJwtStrategy
  extends PassportStrategy(Strategy, "jwt")
  implements OnModuleInit
{
  private authService: IProtoAuthService;
  constructor(@Inject("AUTH_SERVICE") private readonly client: ClientGrpc) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: get("secret_key").required().asString(),
    });
  }
  onModuleInit() {
    this.authService = this.client.getService("AuthService");
  }

  async validate(payload) {
    const user = await this.authService
      .ValidateUser({ email: payload.email })
      .toPromise();
    return user;
  }
}
