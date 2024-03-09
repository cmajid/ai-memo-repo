import { RmqService } from "@app/common";
import { Controller, Get } from "@nestjs/common";
import { BillingService } from "./billing.service";
import { EventPattern, Payload, Ctx, RmqContext } from "@nestjs/microservices";

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @EventPattern("order_created")
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.billingService.bill(data);
    this.rmqService.ack(context);
  }
}
