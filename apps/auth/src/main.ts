import { NestFactory } from "@nestjs/core";
import { AuthModule } from "./auth.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");
  await app.listen(port);
  console.log(`Auth is running on port ${port}`);
}
bootstrap();
