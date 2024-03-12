import { NestFactory } from "@nestjs/core";
import { AuthModule } from "./auth.module";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");
  const grpcPort = configService.get("GRPC_URI");

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: "users",
      protoPath: join(__dirname, '../../../proto/user.proto'),
      url: grpcPort,
    }
  })

  await app.startAllMicroservices();
  await app.listen(port);
  console.log(`Auth is running on port ${port}`);
}
bootstrap();
