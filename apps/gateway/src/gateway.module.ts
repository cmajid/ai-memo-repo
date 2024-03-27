import { Module } from "@nestjs/common";
import { UserController } from "./user/user.controller";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { get } from "env-var";
import { join } from "path";
import { MemoJwtStrategy } from "./memo-jwt-strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "config/jwt.config";

@Module({
  imports: [
    ////////////
    JwtModule.registerAsync(jwtConfig),
    //////////

    // App config
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        GRPC_URI: Joi.string().required(),
      }),
      envFilePath: "./apps/gateway/.env",
    }),

    // grpc
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.GRPC,
        options: {
          package: "users",
          protoPath: join(__dirname, "../../../proto/user.proto"),
          url: get("GRPC_URI").required().asString(),
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [MemoJwtStrategy],
})
export class GatewayModule {}
