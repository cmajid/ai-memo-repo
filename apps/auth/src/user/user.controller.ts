import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UserController {
  @Get("jwt")
  @UseGuards(AuthGuard("jwt"))
  jwt(@Req() req) {
    return `jwt ${req.user.email}`;
  }
}
