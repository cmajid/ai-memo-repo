import { NestFactory } from "@nestjs/core";
import { AiServiceModule } from "./ai-service.module";

async function bootstrap() {
  const port = 3001;
  const app = await NestFactory.create(AiServiceModule);
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}
bootstrap();
