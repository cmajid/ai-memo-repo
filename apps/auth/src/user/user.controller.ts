import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "../current-user.decorator";
import { User } from "./schemas/user.schema";

@Controller("users")
export class UserController {

  @Get("jwt")
  @UseGuards(AuthGuard("jwt"))
  async jwt( @CurrentUser() user: User) {
    
    return `jwt ${user.email}`;
  }
}
