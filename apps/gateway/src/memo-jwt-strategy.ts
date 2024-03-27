import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import appConfig from "config/app.config";
import { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class MemoJwtStrategy extends PassportStrategy(Strategy, "jwt") implements OnModuleInit {
  private usersService;
  constructor(@Inject("USER_SERVICE") private readonly client: ClientGrpc) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().appSecret,
    });
  }
  onModuleInit() {
    this.usersService = this.client.getService("UserService");
  }

  async validate(payload) {
    const user = await this.usersService.ValidateUser({email: payload.email}).toPromise();
    console.log("user",  user);
    return user;
  }
}
