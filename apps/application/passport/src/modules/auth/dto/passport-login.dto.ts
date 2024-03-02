import { IsEmail } from "class-validator";

export class PassportLoginDto {
  @IsEmail()
  destination: string;
}
