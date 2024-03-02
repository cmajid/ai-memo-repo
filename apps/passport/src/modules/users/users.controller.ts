import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GoogleGuard } from "../auth/guards/google.auth.guard";

@UseGuards(GoogleGuard)
@Controller("users")
export class UserController {
  @Get("permit")
  permit(@Req() req) {
    return `Permit ${req.user.email}`;
  }
}
