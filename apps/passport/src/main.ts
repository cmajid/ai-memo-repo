import { NestFactory } from "@nestjs/core";
import { PassportModule } from "./passport.module";
import * as dotenv from "dotenv";
dotenv.config();

async function bootstrap() {
  const port = 3002;
  const app = await NestFactory.create(PassportModule);
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
bootstrap();
