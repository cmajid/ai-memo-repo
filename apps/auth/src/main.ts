import { NestFactory } from "@nestjs/core";
import { AuthModule } from "./auth.module";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions } from "@nestjs/microservices";
import SharedModule from "@app/shared/shared.module";

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT");
  const userGrpcPort = configService.get("GRPC_USERS_SERVICE_URI");
  const authGrpcPort = configService.get("GRPC_AUTH_SERVICE_URI");

  app.connectMicroservice<MicroserviceOptions>(
    SharedModule.getUserService_gPRC_Server(userGrpcPort),
  );

  app.connectMicroservice<MicroserviceOptions>(
    SharedModule.getAuthService_gPRC_Server(authGrpcPort),
  );

  await app.startAllMicroservices();
  await app.listen(port);
  console.log(`Auth is running on port ${port}`);
}
bootstrap();
