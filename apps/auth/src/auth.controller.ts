import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { AuthTokenVerifyRequestDto } from "./dto/auth-token-verify-request.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async verify(@Body() body: AuthTokenVerifyRequestDto) {
    try {
      const result = await this.authService.getAccessTokenFromAppToken(body);
      return result;
    } catch (error) {
      console.error("Error verifying token:", error);
      return { success: false, error: "Invalid token" };
    }
  }
}
