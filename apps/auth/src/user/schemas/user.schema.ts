import { AbstractDocument } from "libs/shared/src";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  versionKey: false,
})
export class User extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  photo: string;

  @Prop()
  provider: string;

  @Prop()
  providerId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
