import { OrderRepository } from './order.repository';
import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order-request.dto';

@Injectable()
export class OrderService {
  async getOrders() {
   return this.orderRepository.find({});
  }

  constructor (private readonly orderRepository: OrderRepository){}
  async createOrder(request: CreateOrderRequest) {
    return this.orderRepository.create(request);
  }

}
