import { OrderRepository } from './order.repository';
import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order-request.dto';

@Injectable()
export class OrderService {

  constructor (private readonly orderRepository: OrderRepository){}
  async createOrder(request: CreateOrderRequest) {
    return this.orderRepository.create(request);
  }

}
