import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { GatewayModule } from "./gateway.module";

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");
  await app.listen(port);
  console.log(`API GATEWAY is running on port ${port}`);
}
bootstrap();
