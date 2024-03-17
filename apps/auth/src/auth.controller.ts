import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { AuthTokenVerifyRequestDto } from "./dto/auth-token-verify-request.dto";
import { OAuth2Client } from "google-auth-library";
import appConfig from "config/app.config";
import { User } from "./user/schemas/user.schema";
import { UserService } from "./user/user.service";
import { JwtService } from "@nestjs/jwt";

@Controller("auth")
export class AuthController {
  private readonly client = new OAuth2Client(appConfig().googleClientAppId);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  @Get("google/login")
  @UseGuards(AuthGuard("google"))
  permit(@Req() req) {
    return `Permit ${req.user.email}`;
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req) {
    return { access_token: req.user }; // Assuming `req.user` contains the JWT token
  }

  @Post("verify")
  async verifyToken(@Body() body: AuthTokenVerifyRequestDto): Promise<any> {
    const idToken = body.idToken;

    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: appConfig().googleClientAppId,
      });

      const payload = ticket.getPayload();
      const user = {
        provider: "google",
        name: payload.name,
        email: payload.email,
        photo: payload.picture,
      } as User;
      const verify = this.userService.tryToRegister(user);
      if (!verify) throw new BadRequestException();

      const userId = payload["sub"];
      const accessToken = this.authService.getAccessToken(userId);
      const jwtToken = this.authService.login(
        accessToken,
        user.email,
        user.name
      );

      return { access_token: jwtToken };
    } catch (error) {
      console.error("Error verifying token:", error);
      return { success: false, error: "Invalid token" };
    }
  }
}
