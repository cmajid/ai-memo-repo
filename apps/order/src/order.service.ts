import { OrderRepository } from "./order.repository";
import { Inject, Injectable } from "@nestjs/common";
import { CreateOrderRequest } from "./dto/create-order-request.dto";
import { BILLING_SERVICE } from "./constants/services";

import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy
  ) {}

  async getOrders() {
    return this.orderRepository.find({});
  }

  async createOrder(request: CreateOrderRequest) {
    const session = await this.orderRepository.startTransaction();
    try {
      const order = this.orderRepository.create(request, { session });
      await lastValueFrom(
        this.billingClient.emit("order_created", { request })
      );
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
}
