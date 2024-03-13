import { NestFactory } from "@nestjs/core";
import { TextModule } from "./text.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { get } from "env-var";

async function bootstrap() {
  const app = await NestFactory.create(TextModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [get("RABBIT_MQ_URI").required().asString()],
      queue: "user_queue",
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3005);

  console.log(`Text is running on port ${3005}`);
}
bootstrap();
