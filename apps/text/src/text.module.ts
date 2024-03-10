import { Module } from "@nestjs/common";
import { TextController } from "./text.controller";
import { TextService } from "./text.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { get } from 'env-var';

@Module({
  imports: [
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
  controllers: [TextController],
  providers: [TextService],
})
export class TextModule {}
