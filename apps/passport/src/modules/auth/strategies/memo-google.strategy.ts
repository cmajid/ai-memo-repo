import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from "dotenv";

import { Injectable } from "@nestjs/common";
import appConfig from "config/app.config";
import { AuthService } from "../auth.service";
import { JwtService } from "@nestjs/jwt";

config();

@Injectable()
export class MemoGoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private authService: AuthService ,  private jwtService: JwtService) {
    super({
      clientID: appConfig().googleClientId,
      clientSecret: appConfig().googleClientSecret,
      callbackURL: "http://localhost:3002/auth/google/callback",
      scope: ["email", "profile"],
      session: false, // Add this line
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<any> {
    //     const { name, emails, photos } = profile;
    //     // const user = {
    //     //     email: emails[0].value,
    //     //     firstName: name.givenName,
    //     //     lastName: name.familyName,
    //     //     picture: photos[0].value,
    //     //     accessToken,
    //     //     refreshToken
    //     // }

    //     console.log(profile);
    //     const user = this.authService.validateUser(emails[0].value);
    //     done(null, user);
    //     return this.authService.generateToken(user);
    //    // done(null, user);

    const jwtPayload = { accessToken, email: profile.emails[0].value, name: profile.displayName };
    const jwtToken = this.jwtService.sign(jwtPayload);
    done(null, jwtToken);
  }
}
