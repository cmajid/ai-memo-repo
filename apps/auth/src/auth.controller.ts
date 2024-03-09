import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }


  @Get("permit")
  @UseGuards(AuthGuard("google"))
  permit(@Req() req) {
    return `Permit ${req.user.email}`;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return { access_token: req.user }; // Assuming `req.user` contains the JWT token
  }
}
