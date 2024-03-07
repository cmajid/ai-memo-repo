import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRequest } from './dto/create-order-request.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


  @Post()
  async createOrder(@Body() request: CreateOrderRequest){
    return this.orderService.createOrder(request);
  }

  @Get()
  async getOrders(){
    return this.orderService.getOrders();
  }
}
