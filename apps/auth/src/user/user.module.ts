import { DatabaseModule } from "@app/common";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { get } from 'env-var';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),

    //RMQ
    ClientsModule.register([
			{
				name: 'USER_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [
						get('RABBIT_MQ_URI').required().asString(),
					],
					queue: 	get('RABBIT_MQ_USER_QUEUE_NAME').required().asString(),
					queueOptions: {
						durable: false,
					},
				},
			},
		]),

  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserRepository, UserService],
})
export class UserModule {}
