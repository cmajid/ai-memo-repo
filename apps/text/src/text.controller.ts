import { Controller, Get } from "@nestjs/common";
import { TextService } from "./text.service";
import { EventPattern } from "@nestjs/microservices";

@Controller()
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Get()
  getHello(): string {
    return this.textService.getHello();
  }

  @EventPattern("user_created")
  async handleUserCreated(data: any) {
    console.log("user_created catch in text with", data);
  }
}
