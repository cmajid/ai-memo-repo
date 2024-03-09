import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { DatabaseModule, RmqModule } from "@app/common";
import { OrderRepository } from "./order.repository";
import { Order, OrderSchema } from "./schemas/order.schema";
import { BILLING_SERVICE } from "./constants/services";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: "./apps/order/.env",
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    RmqModule.register({ name: BILLING_SERVICE }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
