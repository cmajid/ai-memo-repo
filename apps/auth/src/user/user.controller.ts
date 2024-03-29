import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "../current-user.decorator";
import { User } from "./schemas/user.schema";
import { GrpcMethod } from "@nestjs/microservices";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("jwt")
  @UseGuards(AuthGuard("jwt"))
  async jwt(@CurrentUser() user: User) {
    return `jwt ${JSON.stringify(user)}`;
  }

  @GrpcMethod("UserService", "FindOneUser")
  findOne(data) {
    console.log("UserService", "FindOneUser", data);
    return data;
  }


}
