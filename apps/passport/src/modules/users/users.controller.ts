import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Controller("users")
export class UserController {


  @Get("permit")
  @UseGuards(AuthGuard('google'))
  permit(@Req() req) {
    return `Permit ${req.user.email}`;
  }

  @Get("jwt")
  @UseGuards(AuthGuard('jwt'))
  jwt(@Req() req) {
    return `jwt ${req.user.email}`;
  }
}
