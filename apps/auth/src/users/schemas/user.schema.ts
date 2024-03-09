import { AbstractDocument } from "@app/common";
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
}

export const UserSchema = SchemaFactory.createForClass(User);
