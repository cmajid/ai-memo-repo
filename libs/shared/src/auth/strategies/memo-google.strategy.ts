import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from "dotenv";

import { Inject, Injectable, OnModuleInit } from "@nestjs/common";

import { get } from "env-var";
import IProtoAuthService from "proto/interfaces/auth.service.proto.interface";
import { ClientGrpc } from "@nestjs/microservices";
import { User } from "proto/interfaces/user.proto.type";

config();

@Injectable()
export class MemoGoogleStrategy
  extends PassportStrategy(Strategy, "google")
  implements OnModuleInit
{
  constructor(@Inject("AUTH_SERVICE") private readonly client: ClientGrpc) {
    super({
      clientID: get("google_client_id").required().asString(),
      clientSecret: get("google_client_secret").required().asString(),
      callbackURL: "http://localhost:3001/auth/google/callback",
      scope: ["email", "profile"],
    });
  }
  private authService: IProtoAuthService;
  onModuleInit() {
    this.authService = this.client.getService("AuthService");
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<any> {
    const user = {
      provider: "google",
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
    } as User;
    const result = await this.authService.Login(user).toPromise();
    done(null, result);
  }
}
