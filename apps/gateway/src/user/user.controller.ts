import { Controller, Get, Inject, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";

@Controller("users")
export class UserController implements OnModuleInit {
  private userService;
  constructor(@Inject("USER_SERVICE") private readonly client: ClientGrpc) {}

  onModuleInit() {
   this.userService = this.client.getService("UserService");
  }

  @Get("users")
  async getUsers() {
    return this.userService.FindOneUser({id: "TEST API GATEWAY"});
  }
}
