import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { MagicLoginStrategy } from "./magiclogin.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    //.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: "HEY", // TODO:: env
      signOptions: {
        expiresIn: "1h",
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MagicLoginStrategy, JwtStrategy],
})
export class AuthModule {}

// @Module({
//   imports: [UsersModule, PassportModule, JwtModule.register({
//     secret: 'HEY', // TODO:: env
//     signOptions:{
//       expiresIn: '1h',
//     }
//   })],
//   controllers: [AuthController],
//   providers: [AuthService, MagicLoginStrategy, JwtStrategy],
// })
// export class AuthModule {}
