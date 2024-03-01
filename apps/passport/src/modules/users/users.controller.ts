import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guards/jwt.auth.guard";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  @Get("permit")
  permit(@Req() req) {
    return `Permit ${req.user.email}`;
  }
}
