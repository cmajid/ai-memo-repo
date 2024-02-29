import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UserController {
  @Get("permit")
  permit(@Req() req) {
    return `Permit ${req.user.email}`;
  }
}