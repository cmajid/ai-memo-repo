import {
  ClientProviderOptions,
  MicroserviceOptions,
  Transport,
} from "@nestjs/microservices";
import { get } from "env-var";
import { join } from "path";

export default class SharedModule {
  public static getUserService_gPRC_Server(
    grpcPort: string,
  ): MicroserviceOptions {
    return {
      transport: Transport.GRPC,
      options: {
        package: "users",
        protoPath: join(__dirname, "../../../proto/user.proto"),
        url: grpcPort,
      },
    };
  }

  public static getUserService_gRPC_Client(): ClientProviderOptions {
    return {
      name: "USER_SERVICE",
      transport: Transport.GRPC,
      options: {
        package: "users",
        protoPath: join(__dirname, "../../../proto/user.proto"),
        url: get("GRPC_USERS_SERVICE_URI").required().asString(),
      },
    };
  }

  public static getAuthService_gPRC_Server(
    grpcPort: string,
  ): MicroserviceOptions {
    return {
      transport: Transport.GRPC,
      options: {
        package: "auth",
        protoPath: join(__dirname, "../../../proto/auth.proto"),
        url: grpcPort,
      },
    };
  }

  public static getAuthService_gRPC_Client(): ClientProviderOptions {
    return {
      name: "AUTH_SERVICE",
      transport: Transport.GRPC,
      options: {
        package: "auth",
        protoPath: join(__dirname, "../../../proto/auth.proto"),
        url: get("GRPC_AUTH_SERVICE_URI").required().asString(),
      },
    };
  }
}