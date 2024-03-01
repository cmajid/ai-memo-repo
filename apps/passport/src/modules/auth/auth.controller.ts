import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLoginDto } from "./dto/passport-login.dto";
import { AuthGuard } from "@nestjs/passport";
import { MemoMagicLoginStrategy } from "./memo-magiclogin.strategy";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private strategy: MemoMagicLoginStrategy,
  ) {}

  @Post("login")
  login(
    @Req() req,
    @Res() res,
    @Body(new ValidationPipe()) body: PassportLoginDto,
  ) {
    this.authService.validateUser(body.destination);
    return this.strategy.send(req, res);
  }

  @UseGuards(AuthGuard('magiclogin'))
  @Get("login/callback")
  callback(@Req() req) {
    return this.authService.generateToken(req.user);
  }
}
