import { NestFactory } from "@nestjs/core";
import { MemoModule } from "./memo-serivce.module";
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(MemoModule);
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
bootstrap();
