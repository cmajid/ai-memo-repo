import { DatabaseModule } from "@app/common";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserRepository, UserService],
})
export class UserModule {}
