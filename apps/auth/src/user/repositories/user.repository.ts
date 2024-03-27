import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Connection, Model } from "mongoose";
import { AbstractRepository } from "libs/shared/src";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(User.name);

  constructor(
    @InjectModel(User.name) userModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }
}
