import { NestFactory } from "@nestjs/core";
import { BillingModule } from "./billing.module";

async function bootstrap() {
  const port = 3004;
  const app = await NestFactory.create(BillingModule);
  await app.listen(port);
  console.log(`Billing is running on port ${port}`);
}
bootstrap();
