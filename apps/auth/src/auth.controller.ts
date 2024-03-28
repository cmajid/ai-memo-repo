import {
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
import { UserService } from "./user/user.service";
import { GrpcMethod } from "@nestjs/microservices";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Get("google/login")
  @UseGuards(AuthGuard("google"))
  permit(@Req() req) {
    return `Permit ${req.user.email}`;
  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req) {
    return req.user; // Assuming `req.user` contains the JWT token
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

  @GrpcMethod("AuthService", "ValidateUser")
  validateUser(data) {
    const result = this.userService.validateUser(data.email);
    return result;
  }

  @GrpcMethod("AuthService", "Login")
  login(data) {
    const token = this.authService.login(data);
    return { token };
  }
}
