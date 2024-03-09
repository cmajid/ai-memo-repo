import { DatabaseModule } from "@app/common";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersRepository } from "./repositories/users.repository";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

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
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersRepository, UsersService],
})
export class UsersModule {}
