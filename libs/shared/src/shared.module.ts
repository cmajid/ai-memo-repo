import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import { get } from "env-var";
import { join } from "path";

export default class SharedModule {
  public static getUserService_gRPC_Client(): ClientProviderOptions {
    return {
      name: "USER_SERVICE",
      transport: Transport.GRPC,
      options: {
        package: "users",
        protoPath: join(__dirname, "../../../proto/user.proto"),
        url: get("GRPC_URI").required().asString(),
      },
    };
  }
}
