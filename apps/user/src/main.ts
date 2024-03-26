import { NestFactory } from "@nestjs/core";
import { UserModule } from "./user.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");

  await app.listen(port);
  console.log(`User is running on port ${port}`);
}
bootstrap();
