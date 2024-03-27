import { Controller, Get, Inject, OnModuleInit, UseGuards } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "apps/auth/src/current-user.decorator";
import { User } from "apps/auth/src/user/schemas/user.schema";

@Controller("users")
export class UserController implements OnModuleInit {
  private userService;
  constructor(@Inject("USER_SERVICE") private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService("UserService");
  }

  @Get("users")
  async getUsers() {
    return this.userService.FindOneUser({ id: "TEST API GATEWAY" });
  }


  @Get("jwt")
  @UseGuards(AuthGuard("jwt"))
  async jwt(@CurrentUser() user: User) {
    return `jwt ${JSON.stringify(user)}`;
  }
}
