import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService)
  const port = configService.get("PORT");
  await app.listen(port);
  console.log(`Order is running on port ${port}`);
}
bootstrap();
