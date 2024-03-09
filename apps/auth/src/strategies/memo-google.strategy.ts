import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from "dotenv";

import { BadRequestException, Injectable } from "@nestjs/common";
import appConfig from "config/app.config";
import { AuthService } from "../auth.service";
import { UserService } from "../user/user.service";
import { User } from "../user/schemas/user.schema";

config();

@Injectable()
export class MemoGoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {
    super({
      clientID: appConfig().googleClientId,
      clientSecret: appConfig().googleClientSecret,
      callbackURL: "http://localhost:3002/auth/google/callback",
      scope: ["email", "profile"],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      provider: "google",
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
    } as User;
    const verify = this.userService.tryToRegister(user);
    if (!verify) throw new BadRequestException();

    const jwtToken = this.authService.login(accessToken, user.email, user.name);
    done(null, jwtToken);
  }
}
