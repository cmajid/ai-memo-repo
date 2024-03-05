import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLoginDto } from "./dto/passport-login.dto";
import { MemoMagicLoginStrategy } from "./strategies/memo-magiclogin.strategy";
import { MagicLoginGuard } from "./guards/magiclogin.auth.guard";
import { MagicLoginRefreshGuard } from "./guards/magiclogin.refresh.jwt.auth.guard";
import { GoogleGuard } from "./guards/google.auth.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private strategy: MemoMagicLoginStrategy
  ) {}

  @Post("login")
  login(
    @Req() req,
    @Res() res,
    @Body(new ValidationPipe()) body: PassportLoginDto
  ) {
    this.authService.validateUser(body.destination);
    return this.strategy.send(req, res);
  }

  @UseGuards(MagicLoginGuard)
  @Get("login/callback")
  callback(@Req() req) {
    //return this.authService.generateToken(req.user);

    const user = req.user;
    return this.authService.login(user);
  }

  @UseGuards(MagicLoginRefreshGuard)
  @Post("refresh")
  refresh(@Req() req) {
    return this.authService.refreshToken(req.user);
  }

  // @Get("google/callback")
  // @UseGuards(GoogleGuard)
  // async googleAuthRedirect(@Req() req, @Res() res) {
  //   // const jwt = await this.authService.googleLogin(req.user);
  //   // res.set("authorization", jwt.access_token);
  //   // console.log(jwt.access_token)
  //   // res.status(200);
  //   // return res.json(req.user);
  //   return { msg: "ok"}
  // }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return { access_token: req.user }; // Assuming `req.user` contains the JWT token
  }
}
