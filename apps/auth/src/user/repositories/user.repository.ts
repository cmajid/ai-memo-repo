import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Connection, Model } from "mongoose";
import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(User.name);

  constructor(
    @InjectModel(User.name) orderModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}
