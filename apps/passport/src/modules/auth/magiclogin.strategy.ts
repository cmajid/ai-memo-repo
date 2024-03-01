import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import Strategy from 'passport-magic-login'
import { AuthService } from "./auth.service";
import appConfig from "config/app.config";

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(MagicLoginStrategy.name);
  constructor(private authService: AuthService) {
    super({
      secret: appConfig().appSecret,
      jwtOptions: {
        expiresIn: "5m",
      },
      callbackUrl: "http://localhost:3002/auth/login/callback",
      sendMagicLink: async (destination, href) => {
        // TODO: send email
        this.logger.debug(`sending email to ${destination} with link ${href}`);
      },
      verify: async (payload, callback) => {
        callback(null, this.validate(payload));
      },
    });
  }

  validate(payload: { destination: string }) {
    const user = this.authService.validateUser(payload.destination);

    return user;
  }
}
